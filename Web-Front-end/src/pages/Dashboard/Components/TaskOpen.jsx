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
  ({ task, onClose, onDelete, member, onAddMemLs, onRemoveMem }, ref) => {
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
      if (!editPayload.title.trim() || editPayload.title.trim().length > 50)
        toast.warn('Your card title is too long or meaningless!');
      else if (
        task.title !== editPayload.title ||
        task.description !== editPayload.description ||
        task.deadline !== editPayload.deadline
      ) {
        socket.emit('updateCard', task._id, editPayload);
        onClose();
      }
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
    var dark = localStorage.getItem('darkMode') === 'true';
    return (
      <div className="TaskOpen" ref={ref} tabIndex={-1}>
        <Box
          sx={{
            backgroundColor: dark ? '#333' : 'white',
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
                  className="title-input"
                  value={editPayload.title}
                  onChange={(e) =>
                    setEditPayload((pre) => ({ ...pre, title: e.target.value }))
                  }
                />
              )}
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
                <div className="member-deadline-info">
                  {task.userOrderIds && task.userOrderIds.length > 0 && (
                    <Stack direction="row" spacing={2}>
                      <label>Member:</label>
                      {cardMem
                        ? cardMem.map((mem, index) => (
                            <Avatar
                              key={index}
                              {...stringAvatar(`${mem.name}`)}
                              sx={{
                                ...stringAvatar(`${mem.name}`).sx,
                                width: 22,
                                height: 22,
                                fontSize: 10,
                              }}
                            />
                          ))
                        : null}
                    </Stack>
                  )}
                  {task.deadline && (
                    <div>
                      <label>Deadline: </label>
                      <p>{task.deadline.slice(0, 10)} </p> <br />
                      <span>Done:</span>
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
                <label>Description:</label>
                {!editing ? (
                  <Typography variant="body2">
                    {task.description ? task.description : '<No description>'}
                  </Typography>
                ) : (
                  <TextField
                    variant="outlined"
                    value={editPayload.description}
                    placeholder="enter description ..."
                    onChange={(e) =>
                      setEditPayload((pre) => ({
                        ...pre,
                        description: e.target.value,
                      }))
                    }
                    multiline
                    maxRows={5}
                    sx={{
                      width: '45rem',
                      backgroundColor: 'rgba(217, 217, 217, 217, 0.7)',
                    }}
                  />
                )}

                <label>Discuss</label>
                <Stack
                  direction="row"
                  sx={{ height: '0.8rem', width: '40rem' }}
                >
                  <Avatar {...stringAvatar(`${user.name}`)} />

                  <TextField
                    variant="outlined"
                    placeholder="add comment ..."
                    value={mess}
                    multiline
                    maxRows={3}
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
                <br />
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
                  onRemoveMem={onRemoveMem}
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
  onRemoveMem: PropTypes.func,
};
TaskOpen.displayName = 'TaskOpen';

export default TaskOpen;
