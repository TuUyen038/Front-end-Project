import { Button, Input, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import Task from './Task';
import PropTypes from 'prop-types';
import DeletePopUp from '../../../components/DeletePopUp/DeletePopUp';
import AddNewTask from './AddNewTask';
import { getCardList } from '../service/card_service';
import { socket } from '../../../../setting/socket';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../dnd/constants';

export default function Column({ col, index, onDelete, member }) {
  const [title, setTitle] = useState(col.title || 'New');
  const [tasks, setTasks] = useState([]);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [openTaskPopUp, setOpenTaskPopUp] = useState(false);
  const [tempTask, setTempTask] = useState({});
  const ref = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (title.trim() && title !== col.title) {
          console.log(title);
          socket.emit('updateColumn', col._id, { title });
          console.log('emit update column title');
        } else if (!title.trim()) {
          // toast
          setTitle(col.title);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        console.log(title);
        if (title.trim() && title !== col.title) {
          socket.emit('updateColumn', col._id, { title });
          console.log('emit update column title');
        } else if (!title.trim()) {
          // toast
          setTitle(col.title);
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [title, col.title]);

  useEffect(() => {
    getCardList(col._id)
      .then((data) => {
        if (!data) console.log('COLUMN: can get card list');
        else {
          setTasks(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [col._id]);

  useEffect(() => {
    const addCard = (newCard) => {
      console.log('BE emit lai');
      if (newCard.columnId === col._id) setTasks((prev) => [...prev, newCard]);
    };

    const deleteCard = (id) => {
      setTasks((prev) => prev.filter((card) => card._id !== id));
    };

    console.log('COL: ', socket);
    socket.on('cardAdded', addCard);
    socket.on('cardDeleted', deleteCard);

    return () => {
      socket.off('cardAdded', addCard);
      socket.off('cardDeleted', deleteCard);
    };
  }, [col._id]);

  const handleAddCard = (payload) => {
    let newCard = {
      ...payload,
      columnId: col._id,
      boardId: col.boardId,
    };
    socket.emit('addCard', newCard, (response) => {
      if (response.success) {
        console.log('da emit add card thanh cong');
      } else {
        console.log('COLUMN: Fail to add card, Error: ' + response.error);
      }
    });

    setTempTask({});

    // else pop up sth like "make a new task unsuccess cause of null error"
    setOpenTaskPopUp(false);
  };

  const handleDeleteCard = (id) => {
    setTasks((prev) => prev.filter((card) => card._id !== id));
    socket.emit('deleteCard', id);
  };

  // xử lý di chuyển, drop card
  const columnRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(0);
  const hoverIndexRef = useRef(hoverIndex);

  useEffect(() => {
    hoverIndexRef.current = hoverIndex; // Cập nhật ref khi hoverIndex thay đổi
  }, [hoverIndex]);

  const getHoverIndex = (monitor, ref, cardCount) => {
    if (!ref.current) return cardCount;

    const hoverBoundingRect = ref.current.getBoundingClientRect(); // Kích thước container
    const clientOffset = monitor.getClientOffset(); // Tọa độ con trỏ chuột

    if (!clientOffset) return cardCount;

    const hoverClientY =
      clientOffset.y - hoverBoundingRect.top + ref.current.scrollTop;

    console.log('HoverClientY : ', hoverClientY);
    const childNodes = ref.current.children;

    if (!childNodes.length) return 0;

    let cumulativeHeight = 0;
    const gap = 0;
    for (let i = 0; i < childNodes.length; i++) {
      const cardHeight = childNodes[i].offsetHeight;
      console.log('i: ', i);
      console.log('cardHeight: ', cardHeight);
      console.log('cumulativeHeight: ', cumulativeHeight);
      if (
        hoverClientY >= cumulativeHeight &&
        hoverClientY < cumulativeHeight + cardHeight
      ) {
        console.log('this position');
        return i;
      }

      cumulativeHeight += cardHeight + gap;
    }

    // Nếu vượt qua chiều cao của tất cả các thẻ, trả về cardCount
    return cardCount;
  };

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover: (item, monitor) => {
        if (!monitor.isOver()) return;

        const calculatedHoverIndex = getHoverIndex(
          monitor,
          columnRef,
          tasks.length
        );

        if (calculatedHoverIndex !== hoverIndex || item.columnId !== col._id) {
          setHoverIndex(calculatedHoverIndex);
          hoverIndexRef.current = calculatedHoverIndex;
        }

        console.log('hover index caculate: ', calculatedHoverIndex);
        console.log('Hover index', hoverIndexRef.current);
      },
      drop: (item, monitor) => {
        if (!item || monitor.didDrop() || !monitor.isOver()) return undefined;

        console.log('move index: ', hoverIndexRef.current);
        socket.emit(
          'moveCard',
          item._id,
          col._id.toString(),
          parseInt(hoverIndexRef.current)
        );
        setHoverIndex(0);
        return { columnId: col._id };
      },
    }),
    [hoverIndex]
  );

  useEffect(() => {
    const handleCardMoved = (oldCol, newCol) => {
      if (col._id === oldCol._id) {
        getCardList(col._id).then((data) => setTasks(data));
      } else if (col._id === newCol._id) {
        getCardList(col._id).then((data) => setTasks(data));
      }
    };

    socket.on('cardMoved', handleCardMoved);
    return () => {
      socket.off('cardMoved', handleCardMoved);
    };
  }, [col._id]);

  // xử lý di chuyển column

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COLUMN,
    item: { ...col, index },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        const dropResult = monitor.getDropResult();
        if (!dropResult) {
          console.log(`Card ${item._id} was dropped outside`);
          //reset here
          return;
        }
        console.log(`Card dropped into column: ${dropResult.columnId}`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Stack
      ref={(node) => {
        ref.current = node;
        drag(node);
      }}
      className="Column"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: isDragging ? 0.5 : 1,
        /* dang dung theo thong so tren may, can dieu chinh lai */
      }} // not this one
    >
      <Stack className="Top">
        <Stack className="Title" direction="row">
          <Input
            value={title}
            onChange={(e) => {
              console.log(title);
              setTitle(e.target.value);
            }}
            sx={{ fontSize: '1.6rem' }}
          />
          <MoreIcon sx={{ fontSize: '2.4rem' }} />
        </Stack>
        <Stack
          className="Main"
          ref={(node) => {
            columnRef.current = node;
            drop(node);
          }}
          sx={{
            height: 'auto',
            paddingTop: 2,
            minHeight: 100,
          }}
        >
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                className="Task"
                onDelete={() => handleDeleteCard(task._id)}
                member={member}
              ></Task>
            );
          })}
        </Stack>
      </Stack>
      <Stack
        className="Bottom"
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'space-between', // cho 2 cai icon nam o 2 ben
          height: '2.4rem',
          width: '100%',
          // border: 'solid black 1px',
          marginTop: '1.5rem', // not this one
        }}
      >
        <Button onClick={() => setOpenTaskPopUp(true)} title="add">
          <AddIcon className="Icon" sx={{ fontSize: '2.4rem' }} />
        </Button>

        <Button onClick={() => setOpenDeletePopUp(true)} title="delete">
          <DeleteIcon className="Icon" sx={{ fontSize: '2.4rem' }} />
        </Button>
      </Stack>
      <DeletePopUp
        open={openDeletePopUp}
        onClose={() => setOpenDeletePopUp(false)}
        onDelete={onDelete}
      />
      <AddNewTask
        open={openTaskPopUp}
        onClose={() => setOpenTaskPopUp(false)}
        onSave={() =>
          handleAddCard({
            title: tempTask.title,
            description: tempTask.description,
          })
        }
        setTempTask={(payload) =>
          setTempTask((pre) => ({ ...pre, ...payload }))
        }
      />
    </Stack>
  );
}

Column.propTypes = {
  col: PropTypes.object,
  index: PropTypes.number,
  onDelete: PropTypes.func,
  member: PropTypes.array,
};
