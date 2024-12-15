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
import { getMemberOfCard } from '../service/user_service';

import { toast } from 'react-toastify';

import { stringAvatar } from '../avatarExe/avatar';

const TaskOpen = forwardRef(
  ({ task, onClose, onDelete, member, onAddMemLs }, ref) => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});
    const [cardMem, setCardMem] = useState([]);
    const [checked, setChecked] = useState(task.deadlinestatus === 'on_time');
    const [mess, setMess] = useState('');
    const [editing, setEditing] = useState(false);
    const [editPayload, setEditPayload] = useState({
      title: task.title,
      description: task.description,
    });

    //handler
    const handleSendMess = (payload) => {
      socket.emit('addComment', payload, user);
      console.log('comment has been sent');
      setMess('');
    };

    const handleSave = () => {
      console.log(task.deadlinestatus);
      console.log(checked);
      if (
        task.title !== editPayload.title ||
        task.description !== editPayload.description ||
        task.deadline !== editPayload.deadline
      )
        console.log('edit pay load : ', editPayload);
      socket.emit('updateCard', task._id, editPayload);
      onClose();
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
      getMemberOfCard(task).then((data) => setCardMem(data));
    }, []);

    useEffect(() => {
      const handleAdd = (newComment) => {
        console.log('You got comment from the socket ', newComment);
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
            <Stack className="props-header">
              {!editing ? (
                <h1>{task.title}</h1>
              ) : (
                <input
                  value={editPayload.title}
                  onChange={(e) =>
                    setEditPayload((pre) => ({ ...pre, title: e.target.value }))
                  }
                />
              )}
              <div className="member-deadline-info">
                {task.userOrderIds && task.userOrderIds.length > 0 && (
                  <Stack direction="row" spacing={2}>
                    <label>Member:</label>
                    {cardMem.map((mem, index) => (
                      <Avatar
                        key={index}
                        {...stringAvatar(`${mem.name}`)}
                        sx={{
                          ...stringAvatar(`${mem.name}`).sx,
                          width: 20,
                          height: 20,
                          fontSize: 10,
                        }}
                      />
                    ))}
                  </Stack>
                )}
                {task.deadline && (
                  <div>
                    <label>Deadline: </label>
                    {task.deadline.slice(0, 10)}, Done:
                    {task.deadlinestatus !== 'late' && (
                      <input
                        type="checkbox"
                        checked={checked}
                        value={checked}
                        onChange={(e) => {
                          setChecked(!checked);
                          setEditPayload((prev) => ({
                            ...prev,
                            deadlinestatus: e.target.checked
                              ? 'on_time'
                              : 'not_done',
                          }));
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
              <br />
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
                    value={editPayload.description}
                    onChange={(e) =>
                      setEditPayload((pre) => ({
                        ...pre,
                        description: e.target.value,
                      }))
                    }
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
                  <Avatar {...stringAvatar(`${user.name}`)} />

                  <TextField
                    variant="outlined"
                    value={mess}
                    onChange={(e) => setMess(e.target.value)}
                    sx={{
                      backgroundColor: 'rgba(217, 217, 217, 217, 0.7)',
                    }}
                  />
                  <SendIcon
                    onClick={() => {
                      if (mess.trim()) {
                        handleSendMess({ description: mess, cardId: task._id });
                        setMess('');
                      } else {
                        toast.warn('Your message should be meaningful');
                      }
                    }}
                  />
                </Stack>
                {/* <label>Discuss</label> */}
                <br /> <br />
                <Stack className="discuss-area">
                  {comments
                    ? comments
                        .slice()
                        .reverse()
                        .map((com) =>
                          com.cardId === task._id ? (
                            <Comment key={com._id} comment={com} />
                          ) : null
                        )
                    : null}
                </Stack>
              </Stack>
              <Stack>
                <ButtonContainer
                  onDelete={onDelete}
                  onClose={onClose}
                  setEditing={setEditing}
                  member={member}
                  cardMem={cardMem}
                  onAddMemLs={onAddMemLs}
                  onSetPayLoad={(payload) =>
                    setEditPayload((pre) => ({ ...pre, ...payload }))
                  }
                />
              </Stack>
            </Stack>
          </Stack>
          <Save onSave={handleSave} />
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
