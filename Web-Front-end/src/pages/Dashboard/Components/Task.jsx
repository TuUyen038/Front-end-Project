import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TaskOpen from './TaskOpen';
import Modal from '@mui/material/Modal';
import { Avatar, AvatarGroup, Box, Stack, Typography } from '@mui/material';
import DeadlineIcon from '@mui/icons-material/AccessAlarm';
import DiscussIcon from '@mui/icons-material/Forum';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dnd/constants';

export default function Task({ task, index, onDelete }) {
  const [isOpened, setIsOpened] = useState(false);
  // const navigate = useNavigate();
  const OpenTask = () => {
    setIsOpened(true);
    console.log('open pop up');
  };

  const Close = () => {
    setIsOpened(false);
  };

  const members = [
    { name: 'A', color: 'green' },
    { name: 'B', color: 'blue' },
    { name: 'C', color: 'orange' },

    // se chuyen thanh members = task.userOrderIds
  ];

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
  useEffect(() => {});

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
            {task.title ? task.title : 'Say Hello World'}
          </Typography>
          <Stack
            className="other-info"
            direction="row"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box className="deadline-discuss" sx={{ display: 'flex', gap: 1 }}>
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
                  3 Mar
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2 }}>
                <DiscussIcon fontSize="small" />
                <>3</>
              </Box>
            </Box>

            <AvatarGroup className="menbers" max={3} spacing={5}>
              {members.map((member, index) => (
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
          // delete={task.delete}
          onClose={Close}
          task={task}
          onDelete={onDelete}
          sx={{ position: 'relative' }}
        />
      </Modal>
    </>
  );
}

Task.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
  onDelete: PropTypes.func,
};
