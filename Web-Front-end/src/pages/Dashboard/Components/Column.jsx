import { Button, Input, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
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

export default function Column(props) {
  const [title, setTitle] = useState(props.title || 'New');
  const [tasks, setTasks] = useState([]);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [openTaskPopUp, setOpenTaskPopUp] = useState(false);
  const [tempTask, setTempTask] = useState('');

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
      setTasks((prev) => [...prev, newCard]);
    };
    const updateCard = (id, payload) => {
      setTasks((prev) =>
        prev.map((card) => (card._id === id ? { ...card, ...payload } : card))
      );
    };
    const deleteCard = (id) => {
      setTasks((prev) => prev.filter((card) => card._id !== id));
    };

    socket.on('cardAdded', addCard);
    socket.on('cardUpdated', updateCard);
    socket.on('cardDeleted', deleteCard);

    return () => {
      socket.off('cardAdded', addCard);
      socket.off('cardUpdated', updateCard);
      socket.off('cardDeleted', deleteCard);
    };
  });

  const handleAddCard = (payload) => {
    let newCard = {
      ...payload,
      columnId: props.column_id,
      boardId: props.board_id,
    };
    let tmpId = uuidv4();
    let tmpCard = { ...newCard, _id: tmpId };
    setTasks((prev) => [...prev, tmpCard]);

    socket.emit('addCard', newCard, (response) => {
      if (response.success) {
        const cardData = response.data;
        setTasks((prev) =>
          prev.map((card) => (card._id === tmpId ? cardData : card))
        );
      } else {
        console.log('COLUMN: Fail to add card, Error: ' + response.error);
      }
    });

    setTempTask('');

    // else pop up sth like "make a new task unsuccess cause of null error"
    setOpenTaskPopUp(false);
  };

  const handleDeleteCard = (id) => {
    setTasks((prev) => prev.filter((card) => card._id !== id));
    socket.emit('deleteCard', id);
  };

  return (
    <Stack
      className="Column"
      draggable
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
          sx={{
            height: 'auto',
            paddingTop: 2,
          }}
        >
          {tasks.map((task) => {
            return (
              <Task
                key={task._id}
                task={task}
                className="Task"
                onDelete={() => handleDeleteCard(task.id)}
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
        onSave={() => handleAddCard({ title: tempTask })}
        onChange={(e) => setTempTask(e.target.value)}
      />
    </Stack>
  );
}

Column.propTypes = {
  title: PropTypes.string,
  column_id: PropTypes.string,
  board_id: PropTypes.string,
  delete: PropTypes.func,
};
