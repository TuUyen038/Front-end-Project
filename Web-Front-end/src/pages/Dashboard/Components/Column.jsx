import { Button, Input, Stack } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import Task from './Task';
import PropTypes from 'prop-types';
import DeletePopUp from '../../../components/DeletePopUp/DeletePopUp';
import AddNewTask from './AddNewTask';
import { getTasks } from '../../../Data/task_service';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Column(props) {
  const [title, setTitle] = useState(props.title || 'New');
  const [tasks, setTasks] = useState(getTasks(props.column_id) || []);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [openTaskPopUp, setOpenTaskPopUp] = useState(false);
  const [tempTask, setTempTask] = useState('');

  const OpenDeletePopUp = () => {
    setOpenDeletePopUp(true);
  };

  const CloseDeletePopUp = () => {
    setOpenDeletePopUp(false);
  };

  const OpenTaskPopUp = () => {
    setOpenTaskPopUp(true);
  };

  const CloseTaskPopUp = () => {
    setOpenTaskPopUp(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTempTaskChange = (event) => {
    setTempTask(event.target.value);
  };

  const AddTask = () => {
    if (tempTask != '') {
      setTasks((preTasks) => [
        ...preTasks,
        {
          id: preTasks.length + 1,
          title: tempTask,
        },
      ]);
      // console.log(tasks);
      setTempTask('');
    }
    // else pop up sth like "make a new task unsuccess cause of null error"
    setOpenTaskPopUp(false);
  };

  const DeleteTaskFromColumn = (id) => {
    setTasks((preTasks) => preTasks.filter((task) => task.id !== id));
    console.log(tasks);
  };

  return (
    // <DndProvider backend={HTML5Backend}>
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
            onChange={handleTitleChange}
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
                key={task.id}
                task={task}
                className="Task"
                onDelete={() => DeleteTaskFromColumn(task.id)}
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
        <Button onClick={OpenTaskPopUp} title="add">
          <AddIcon className="Icon" sx={{ fontSize: '2.4rem' }} />
        </Button>

        <Button onClick={OpenDeletePopUp} title="delete">
          <DeleteIcon className="Icon" sx={{ fontSize: '2.4rem' }} />
        </Button>
      </Stack>
      <DeletePopUp
        open={openDeletePopUp}
        onClose={CloseDeletePopUp}
        onDelete={props.delete}
      />
      <AddNewTask
        open={openTaskPopUp}
        onClose={CloseTaskPopUp}
        onSave={AddTask}
        onChange={handleTempTaskChange}
      />
    </Stack>
  );
}

Column.propTypes = {
  title: PropTypes.string,
  column_id: PropTypes.string,
  delete: PropTypes.func,
};
