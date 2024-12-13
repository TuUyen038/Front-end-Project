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
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../../../../setting/socket';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dnd/constants';

export default function Column(props) {
  const [title, setTitle] = useState(props.title || 'New');
  const [tasks, setTasks] = useState([]);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [openTaskPopUp, setOpenTaskPopUp] = useState(false);
  const [tempTask, setTempTask] = useState({});
  const ref = useRef();

  const handleOutsideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      props.onUpdate(props.column_id, { title: tempTask });
      socket.emit('updateColumn', props.column_id, { title: tempTask });
      setTempTask('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleUpdate = (id, payload) => {
      if (props.column_id === id) props.onUpdate(id, payload);
    };
    socket.on('columnUpdated', handleUpdate);
    return () => {
      socket.off('columnUpdated', handleUpdate);
    };
  }, []);

  useEffect(() => {
    getCardList(props.column_id)
      .then((data) => {
        if (!data) console.log('COLUMN: can get card list');
        else {
          setTasks(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [props.column_id]);

  useEffect(() => {
    const addCard = (newCard) => {
      console.log('BE emit lai');
      if (newCard.columnId === props.column_id)
        setTasks((prev) => [...prev, newCard]);
    };

    const deleteCard = (id) => {
      setTasks((prev) => prev.filter((card) => card._id !== id));
    };

    socket.on('cardAdded', addCard);
    socket.on('cardDeleted', deleteCard);

    return () => {
      socket.off('cardAdded', addCard);
      socket.off('cardDeleted', deleteCard);
    };
  });

  const handleAddCard = (payload) => {
    let newCard = {
      ...payload,
      columnId: props.column_id,
      boardId: props.board_id,
    };
    socket.emit('addCard', newCard, (response) => {
      if (response.success) {
        console.log('da emit add card thanh cong');
        // const cardData = response.data;
        // setTasks(cardData);
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

  const columnRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState();
  const getHoverIndex = (monitor, ref, cardCount) => {
    if (!ref.current) return cardCount;

    const hoverBoundingRect = ref.current.getBoundingClientRect(); // Lấy kích thước của container
    const clientOffset = monitor.getClientOffset(); // Lấy tọa độ của con trỏ chuột

    // Tính toán vị trí Y tương đối so với container
    const hoverClientY =
      clientOffset.y - hoverBoundingRect.top + ref.current.scrollTop;

    const CARD_HEIGHT = 34; // Chiều cao của mỗi card (giả định)
    const hoverIndex = Math.floor(hoverClientY / CARD_HEIGHT);

    // Trả về vị trí hợp lệ (trong khoảng [0, cardCount])
    return Math.max(0, Math.min(cardCount, hoverIndex));
  };

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    hover: (item, monitor) => {
      if (!monitor.isOver()) return;
      if (item.index === hoverIndex && item.columnId === props.column_id)
        return;

      const calculatedHoverIndex = getHoverIndex(
        monitor,
        columnRef,
        tasks.length
      );
      if (calculatedHoverIndex >= 0 && calculatedHoverIndex !== hoverIndex) {
        setHoverIndex(calculatedHoverIndex);
      }
    },
    drop: (item, monitor) => {
      if (!item || monitor.didDrop() || !monitor.isOver()) return undefined;

      if (props.column_id === item.columnId) {
        setTasks((pre) => {
          const updatedTasks = [...pre];
          updatedTasks.splice(item.index, 1);
          return updatedTasks;
        });
      }

      setTasks((pre) => {
        const updatedTasks = [...pre];
        updatedTasks.splice(hoverIndex, 0, item);
        item.index = hoverIndex;
        return updatedTasks;
      });

      socket.emit(
        'moveCard',
        item._id,
        props.column_id.toString(),
        parseInt(hoverIndex)
      );

      return { columnId: props.column_id };
    },
  }));

  useEffect(() => {
    const handleCardMoved = (oldCol, newCol) => {
      if (props.column_id === oldCol._id) {
        getCardList(oldCol._id).then(setTasks);
      }
      if (props.column_id === newCol._id) {
        getCardList(newCol._id).then(setTasks);
      }
    };

    socket.on('cardMoved', handleCardMoved);
    return () => {
      socket.off('cardMoved', handleCardMoved);
    };
  }, [props.column_id]);

  return (
    <Stack
      className="Column"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        /* dang dung theo thong so tren may, can dieu chinh lai */
      }} // not this one
    >
      <Stack className="Top">
        <Stack className="Title" direction="row">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
                member={props.member}
                // onSetTasks={setTasks}
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
        onDelete={props.delete}
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
  title: PropTypes.string,
  column_id: PropTypes.string,
  board_id: PropTypes.string,
  delete: PropTypes.func,
  moveCard: PropTypes.func,
  member: PropTypes.array,
  onUpdate: PropTypes.func,
};
