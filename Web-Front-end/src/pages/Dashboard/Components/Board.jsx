import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Column from './Column';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { getColumnList } from '../service/column_service';
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../../../../setting/socket';

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
    let tmpId = uuidv4();
    let tmpColumn = { ...newColumn, _id: tmpId };
    console.log('add a new column:' + newColumn);
    setColumns((prev) => [...prev, tmpColumn]);
    socket.emit('addColumn', newColumn, (response) => {
      if (response.success) {
        const colData = response.data;
        setColumns((prev) =>
          prev.map((col) => (col._id === tmpId ? colData : col))
        );
        console.log(columns);
      } else {
        console.log('Board: Fail to add column');
      }
    });
  };
  // const handleUpdateColumn = (id, payload) => {
  //   setColumns((prev) =>
  //     prev.map((col) => (col._id === id ? { ...col, ...payload } : col))
  //   );
  //   socket.emit('updateColumn', id, payload);
  // };

  const handleDeleteColumn = (id) => {
    console.log('BOARD : ', member);

    setColumns((prev) => prev.filter((col) => col._id !== id));
    socket.emit('deleteColumn', id);
  };

  const moveCard = (
    cardId,
    source_column_id,
    target_column_id,
    target_index
  ) => {
    setColumns((prev) => {
      let sourceCol = prev.find((col) => col._id === source_column_id);
      let targetCol = prev.find((col) => col._id === target_column_id);
      if (sourceCol === targetCol) {
        sourceCol.cardOrderIds.splice(target_index, 1);
        sourceCol.cardOrderIds.splice(target_index, 0, cardId);
        // socket.emit('updateColumn', sourceCol._id, sourceCol);
      } else {
        //loai bo card khoi tap nguon
        sourceCol.cardOrderIds = sourceCol.cardOrderIds.filter(
          (i) => i !== cardId
        );
        // socket.emit('updateColumn', sourceCol._id, sourceCol);
        // them vo tap dich
        targetCol.cardOrderIds.splice(target_index, 0, cardId);
        // socket.emit('updateColumn', targetCol._id, targetCol);
      }
      return [...prev];
    });
  };

  useEffect(() => {
    const handleAdd = (newColumn) => {
      setColumns((prev) => [...prev, newColumn]);
    };
    const handleUpdate = (id, payload) => {
      setColumns((prev) =>
        prev.map((col) => (col._id === id ? { ...col, ...payload } : col))
      );
    };
    const handleDelete = (id) => {
      setColumns((prev) => prev.filter((col) => col._id !== id));
    };

    socket.on('columnAdded', handleAdd);
    socket.on('columnUpdated', handleUpdate);
    socket.on('columnDeleted', handleDelete);

    return () => {
      socket.off('columnAdded', handleAdd);
      socket.off('columnUpdated', handleUpdate);
      socket.off('columnDeleted', handleDelete);
    };
  }, []);
  return (
    <Stack direction="column" className="Board">
      <Stack direction="row" className="Main">
        {columns.map((column) => {
          return (
            <Column
              title={column.title}
              key={column._id}
              board_id={board_id}
              column_id={column._id}
              delete={() => handleDeleteColumn(column._id)}
              moveCard={moveCard}
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
