import { Avatar, Box, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { socket } from '../../../../setting/socket';
import { getCommentList } from '../service/comment_service';
import { UserAPI } from '../../../apis';
import Comment from './TaskOpenComponents/Comment';
import ButtonContainer from './TaskOpenComponents/ButtonContainer';
import CloseX from '../../../components/SmallCom/CloseX';
import Save from '../../../components/SmallCom/Save';

const TaskOpen = forwardRef(
  ({ task, onClose, onDelete, member, onAddMemLs }, ref) => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});
    const [mess, setMess] = useState('');
    const [editing, setEditing] = useState(false);

    //handler
    const handleSendMess = (payload) => {
      socket.emit('addComment', payload, user);
      console.log('comment has been sent');
      setMess('');
    };

    //useEffect
    useEffect(() => {
      getCommentList(task._id).then((data) => setComments(data));
      UserAPI.getUser(localStorage.token)
        .then((res) => res.json())
        .then((data) => {
          setUser({ ...data, _id: data.id });
          console.log('get user successfully', data);
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
      const handleAdd = (newComment) => {
        console.log('You got comment from the socket');
        if (!Array.isArray(comments)) {
          console.error('State is not an array:', comments);
        } else setComments((prev) => [...prev, newComment]);
      };
      socket.on('commentAdded', handleAdd);
      return () => {
        socket.off('commentAdded', handleAdd);
      };
    }, []);

    return (
      <div className="TaskOpen" ref={ref} tabIndex={-1}>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            height: '56rem',
            width: '72rem',
            position: 'relative',
          }}
        >
          <CloseX onClose={onClose} />
          <Stack
            direction="column"
            sx={{
              padding: '1rem 4rem 0 4rem',
            }}
          >
            <Stack className="props-header" direction="row">
              <h1>{task.title}</h1>
            </Stack>
            <Stack
              className="task-body"
              direction="row"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Stack className="task-main" sx={{ gap: '1.2rem' }}>
                <label>Description</label>
                {!editing ? (
                  <Typography variant="body2">
                    {task.description ? task.description : '<No description>'}
                  </Typography>
                ) : (
                  <TextField
                    variant="outlined"
                    value={task.description}
                    sx={{
                      height: '2rem',
                      width: '40rem',
                      backgroundColor: 'rgba(217, 217, 217, 217, 0.7)',
                    }}
                  />
                )}
                <br />
                <label>Discuss</label>
                <Stack
                  direction="row"
                  sx={{ height: '0.8rem', width: '40rem' }}
                >
                  <Avatar>{user.name}</Avatar>
                  <TextField
                    variant="outlined"
                    onChange={(e) => setMess(e.target.value)}
                    sx={{
                      backgroundColor: 'rgba(217, 217, 217, 217, 0.7)',
                    }}
                  />
                  <SendIcon
                    onClick={() =>
                      handleSendMess({ description: mess, cardId: task._id })
                    }
                  />
                </Stack>
                {/* <label>Discuss</label> */}
                <div>
                  {comments
                    ? comments.map((com) =>
                        com.cardId === task._id ? (
                          <Comment key={com._id} comment={com} />
                        ) : null
                      )
                    : null}
                </div>
              </Stack>
              <Stack>
                <ButtonContainer
                  onDelete={onDelete}
                  onClose={onClose}
                  setEditing={setEditing}
                  member={member}
                  onAddMemLs={onAddMemLs}
                />
              </Stack>
            </Stack>
          </Stack>
          <Save />
        </Box>
      </div>
    );
  }
);

TaskOpen.propTypes = {
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  task: PropTypes.object,
  handleAddUserToCard: PropTypes.func,
  member: PropTypes.array,
  onAddMemLs: PropTypes.func,
};
TaskOpen.displayName = 'TaskOpen';

export default TaskOpen;
