import {
  Avatar,
  Box,
  Button,
  IconButton,
  // Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
// import { useNavigate, useLocation } from 'react-router-dom';
import AddPersonIcon from '@mui/icons-material/PersonAddAlt';
import DeadlineIcon from '@mui/icons-material/AccessAlarm';
import AttachIcon from '@mui/icons-material/Attachment';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import FollowIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DeletePopUp from '../../../components/DeletePopUp/DeletePopUp';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import JoinIn from './JoinIn';
import { socket } from '../../../../setting/socket';
import { getCommentList } from '../service/comment_service';
import { v4 as uuidv4 } from 'uuid';
import { UserAPI } from '../../../apis';
// import { deleteCard } from '../service/card_service';

const TaskOpen = forwardRef(
  ({ task, onClose, onDelete, handleAddUserToCard }, ref) => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});
    const [mess, setMess] = useState('');
    useEffect(() => {
      getCommentList(task._id).then((data) => setComments(data));
      UserAPI.getUser(localStorage.token)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((error) => console.log(error));
    });

    useEffect(() => {
      const handleAdd = (newComment) => {
        setComments((prev) => [...prev, newComment]);
      };
      socket.on('commentAdded', handleAdd);
      return () => {
        socket.off('commentAdded', handleAdd);
      };
    }, []);

    const [openDelete, setOpenDelete] = useState(false);
    const [editing, setEditing] = useState(false);
    const handleDelete = () => {
      console.log(task);
      setOpenDelete(true);
    };
    const saveDelete = () => {
      onDelete();
      setOpenDelete(false);
      onClose();
    };

    const handleSendMess = (payload) => {
      let tmpId = uuidv4();
      let newCom = { ...payload, cardId: task._id };
      let tmpCom = { ...newCom, _id: tmpId };

      setComments((prev) => [...prev, tmpCom]);
      socket.emit('addComment', newCom, user, (res) => {
        if (res.success) {
          let comData = res.data;
          setComments((prev) =>
            prev.map((com) => (com._id === tmpId ? comData : com))
          );
        } else {
          console.log('TASKOPEN: Error when add comment');
        }
      });
    };

    const [openJoinIn, setOpenJoinIn] = useState(false);

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
          <IconButton
            onClick={onClose}
            sx={{
              // border: 'orange solid 1px',
              position: 'absolute',
              top: '8px',
              right: '8px',
              height: '3rem',
            }}
          >
            <CloseIcon />
          </IconButton>
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
                  <Avatar />
                  <TextField
                    variant="outlined"
                    onChange={(e) => setMess(e.target.value)}
                    sx={{
                      backgroundColor: 'rgba(217, 217, 217, 217, 0.7)',
                    }}
                  />
                  <SendIcon
                    onClick={() => handleSendMess({ description: mess })}
                  />
                </Stack>
                {/* <label>Discuss</label> */}
                {comments
                  ? comments.map((com) =>
                      com.cardId === task._id ? (
                        <p key={com._id}>{com.description}</p>
                      ) : null
                    )
                  : null}
              </Stack>
              <Stack
                className="task-method"
                sx={{
                  gap: '1.5rem',
                }}
              >
                <Button
                  className="task-button"
                  variant="contained"
                  startIcon={<AddPersonIcon />}
                  onClick={() => setOpenJoinIn(true)}
                  color="rgba(217, 217, 217, 217, 0.7)"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                >
                  Join in
                  {/* {openJoinIn ? (
                    <JoinIn
                      onClose={() => setOpenJoinIn(false)}
                      onAddMemLs={handleAddUserToCard}
                    />
                  ) : null} */}
                </Button>
                <Button
                  className="task-button"
                  variant="contained"
                  startIcon={<DeadlineIcon />}
                  color="rgba(217, 217, 217, 217, 0.7)"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                >
                  Deadline
                </Button>
                <Button
                  className="task-button"
                  variant="contained"
                  startIcon={<AttachIcon />}
                  color="rgba(217, 217, 217, 217, 0.7)"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                >
                  Attach
                </Button>
                <Button
                  className="task-button"
                  variant="contained"
                  startIcon={<ShareIcon />}
                  color="rgba(217, 217, 217, 217, 0.7)"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                >
                  Share
                </Button>
                <br />
                <label>Others</label>
                <Button
                  className="task-button"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setEditing(true)}
                  color="rgba(217, 217, 217, 217, 0.7)"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="task-button"
                  variant="contained"
                  startIcon={<FollowIcon />}
                  color="rgba(217, 217, 217, 217, 0.7)"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                >
                  Follow
                </Button>
                <Button
                  className="task-button"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  color="rgba(217, 217, 217, 217, 0.7)"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <DeletePopUp
                  open={openDelete}
                  onClose={() => setOpenDelete(false)}
                  onDelete={saveDelete}
                />
              </Stack>
            </Stack>
          </Stack>
          <Button
            // onClick={props.onSave}
            variant="contained"
            sx={{
              backgroundColor: '#2D9596',
              position: 'absolute',
              right: '4rem',
              bottom: '4rem',
            }}
          >
            Save
          </Button>
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
};
TaskOpen.displayName = 'TaskOpen';

export default TaskOpen;
