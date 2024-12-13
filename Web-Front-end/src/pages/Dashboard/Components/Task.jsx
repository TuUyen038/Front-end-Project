import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TaskOpen from './TaskOpen';
import Modal from '@mui/material/Modal';
import { Avatar, AvatarGroup, Box, Stack, Typography } from '@mui/material';
import DeadlineIcon from '@mui/icons-material/AccessAlarm';
import DiscussIcon from '@mui/icons-material/Forum';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dnd/constants';
import { socket } from '../../../../setting/socket';
import { getCard } from '../service/card_service';

export default function Task({ task, index, onDelete, member }) {
  const [Task, setTask] = useState(task);
  const [isOpened, setIsOpened] = useState(false);
  const OpenTask = () => {
    setIsOpened(true);
    console.log('open pop up');
  };

  const Close = () => {
    setIsOpened(false);
  };

  const handleAddUserToCard = (users) => {
    users.forEach((user) => socket.emit('addUserCard', Task._id, user.id));
    console.log('emit add user id to card');
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { ...task, index },
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

  // get detailed info of one card, like: title, description, deadline, member
  useEffect(() => {
    getCard(task._id)
      .then((data) => {
        setTask(data);
      })
      .catch((error) => console.log(error.message));
  }, [isOpened, task._id]);

  useEffect(() => {
    const handleAdd = (userId) => {
      console.log('get update from socket');
      setTask((prev) => ({
        ...prev,
        userOrderIds: [...prev.userOrderIds, userId],
      }));
    };
    socket.on('userCardAdded', (cardId, userId) => {
      if (cardId === task._id) handleAdd(userId);
    });
    return () => {
      socket.off('userCardAdded', (cardId, userId) => {
        if (cardId === task._id) handleAdd(userId);
      });
    };
  }, []);

  useEffect(() => {
    const updateCard = (cardId, data) => {
      if (cardId === Task._id) {
        setTask(data);
      }
    };
    socket.on('cardUpdated', updateCard);
    return () => {
      socket.off('cardUpdated', updateCard);
    };
  }, []);

  return (
    <>
      <div className="Task" draggable onClick={OpenTask} ref={drag}>
        <Stack
          sx={{
            backgroundColor: 'white',
            width: '19.6rem',
            padding: '0.2rem 0.4rem 0.2rem 0.4rem',
            borderRadius: '1rem',
            // border: '1px #2D9596 ',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            opacity: isDragging ? 0.5 : 1,
          }}
        >
          <Typography className="task-title">
            {Task.title ? Task.title : 'Say Hello World'}
          </Typography>
          <Stack
            className="other-info"
            direction="row"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box className="deadline-discuss" sx={{ display: 'flex', gap: 1 }}>
              {Task.deadline ? (
                <Box
                  backgroundColor="#2D9596"
                  borderRadius={0.3}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.4,
                    margin: 0.4,
                    padding: 0.2,
                  }}
                >
                  <DeadlineIcon sx={{ color: 'white', fontSize: '10px' }} />
                  <Typography color="white" fontSize={8}>
                    {Task.deadline.slice(0, 10)}
                  </Typography>
                </Box>
              ) : null}

              {Task.commentOrderIds ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2 }}>
                  <DiscussIcon fontSize="small" />
                  <>{Task.commentOrderIds.length}</>
                </Box>
              ) : null}
            </Box>

            {Task.userOrderIds ? (
              <AvatarGroup className="menbers" max={3} spacing={5}>
                {Task.userOrderIds.map((member, index) => (
                  <Avatar
                    key={index}
                    sx={{
                      backgroundColor: member.color,
                      width: 12,
                      height: 12,
                      fontSize: 8,
                    }}
                  >
                    {member.name}
                  </Avatar>
                ))}
              </AvatarGroup>
            ) : null}
          </Stack>
        </Stack>
      </div>
      <Modal
        open={isOpened}
        onClose={Close}
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TaskOpen
          delete={task.delete}
          onClose={Close}
          task={Task}
          onDelete={onDelete}
          sx={{ position: 'relative' }}
          handleAddUserToCard={handleAddUserToCard}
          member={member}
          onAddMemLs={handleAddUserToCard}
        />
      </Modal>
    </>
  );
}

Task.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
  onDelete: PropTypes.func,
  member: PropTypes.array,
};
