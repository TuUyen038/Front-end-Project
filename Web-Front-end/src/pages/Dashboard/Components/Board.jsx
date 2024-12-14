import { Button, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Column from './Column';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { getColumnList } from '../service/column_service';
import { socket } from '../../../../setting/socket';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dnd/constants';

export default function Board({ board_id, member }) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getColumnList(board_id).then((data) => {
      if (!data) {
        console.log('no data (Board)');
        return;
      }
      setColumns(data);
      console.log(data);
    });
  }, [board_id]);

  const handleAddColumn = (payload) => {
    let newColumn = { ...payload, boardId: board_id };
    socket.emit('addColumn', newColumn, (response) => {
      if (response.success) {
        console.log(columns);
      } else {
        console.log('Board: Fail to add column');
      }
    });
  };

  const handleDeleteColumn = (id) => {
    socket.emit('deleteColumn', id);
  };

  useEffect(() => {
    const handleAdd = (newColumn) => {
      if (newColumn.boardId === board_id) {
        setColumns((prev) => [...prev, newColumn]);
        console.log('BE emit col added: ', newColumn);
      }
    };

    const handleUpdate = (id, payload) => {
      setColumns((prev) =>
        prev.map((col) => (col._id === id ? { ...col, ...payload } : col))
      );
    };

    const handleDelete = (id) => {
      setColumns((prev) => prev.filter((col) => col._id !== id));
    };

    console.log('BOARD dc dang ky lang nghe su kien tren COLUMN :', board_id);
    console.log('BOARD: ', socket);

    socket.on('columnAdded', handleAdd);
    socket.on('columnUpdated', handleUpdate);
    socket.on('columnDeleted', handleDelete);

    return () => {
      console.log('BOARD đã bị unmount');
      socket.off('columnAdded', handleAdd);
      socket.off('columnUpdated', handleUpdate);
      socket.off('columnDeleted', handleDelete);
    };
  }, [board_id]);

  // xử lý drop với column
  useEffect(() => {
    const handleMove = (col) => {
      console.log('BE emit move col: ', col);
      getColumnList(board_id).then((data) => setColumns(data));
    };
    socket.on('columnMoved', handleMove);
    return () => {
      socket.off('columnMoved', handleMove);
    };
  }, [board_id]);

  const [hoverIndex, setHoverIndex] = useState(0);
  const boardRef = useRef();
  const hoverIndexRef = useRef(hoverIndex);

  useEffect(() => {
    hoverIndexRef.current = hoverIndex; // Cập nhật ref khi hoverIndex thay đổi
  }, [hoverIndex]);

  const getHoverIndex = (monitor, ref, colCount) => {
    if (!ref.current) return colCount;

    const hoverBoundingRect = ref.current.getBoundingClientRect(); // Kích thước container
    const clientOffset = monitor.getClientOffset(); // Tọa độ con trỏ chuột

    if (!clientOffset) return colCount;

    const hoverClientX =
      clientOffset.x - hoverBoundingRect.left + ref.current.scrollLeft;

    const childNodes = ref.current.children;

    if (!childNodes.length) return 0;

    let cumulativeWidth = 0;
    const gap = 40;
    for (let i = 0; i < childNodes.length; i++) {
      const cardWidth = childNodes[i].offsetWidth;

      if (
        hoverClientX >= cumulativeWidth &&
        hoverClientX < cumulativeWidth + cardWidth
      ) {
        return i; // Vị trí chuột nằm trong thẻ này
      }

      cumulativeWidth += cardWidth + gap;
    }

    // Nếu vượt qua chiều cao của tất cả các thẻ, trả về colCount
    return colCount;
  };

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.COLUMN,
    hover: (item, monitor) => {
      let caculatedIndex = getHoverIndex(monitor, boardRef, columns.length);
      if (caculatedIndex !== hoverIndex) {
        setHoverIndex(caculatedIndex);
        hoverIndexRef.current = caculatedIndex;
        console.log('HOVER COL INDEX: ', caculatedIndex); // In giá trị mới được tính toán
      }
    },
    drop: (item, monitor) => {
      if (!item || monitor.didDrop() || !monitor.isOver()) return undefined;
      // setColumns((pre) => {
      //   const updatedCol = [...pre];
      //   updatedCol.splice(item.index, 1);
      //   updatedCol.splice(hoverIndexRef.current, 0, item);
      //   item.index = hoverIndexRef.current;
      //   return updatedCol;
      // });
      console.log('ID: ', item._id);
      console.log('INDEX: ', hoverIndex);
      socket.emit(
        'moveColumn',
        item._id.toString(),
        parseInt(hoverIndexRef.current)
      );
      setHoverIndex(0);
    },
  }));

  return (
    <Stack direction="column" className="Board">
      <Stack
        direction="row"
        className="Main"
        ref={(node) => {
          boardRef.current = node;
          drop(node);
        }}
      >
        {columns.map((column, index) => {
          return (
            <Column
              col={column}
              index={index}
              key={column._id}
              onDelete={() => handleDeleteColumn(column._id)}
              member={member}
            ></Column>
          );
        })}
        <Button
          variant="contained"
          className="add_board"
          endIcon={<AddIcon />}
          sx={{
            backgroundColor: 'rgba(235, 244, 214, 0.5)',
            color: 'black',
            height: '3rem',
            width: '20rem',
          }}
          onClick={() => handleAddColumn({ title: 'Test column' })}
        >
          New
        </Button>
      </Stack>
    </Stack>
  );
}

Board.propTypes = {
  board_id: PropTypes.string,
  member: PropTypes.array,
};
