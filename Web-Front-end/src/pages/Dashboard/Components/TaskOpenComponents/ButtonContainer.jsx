import { Button, Stack } from '@mui/material';
import AddPersonIcon from '@mui/icons-material/PersonAddAlt';
import DeadlineIcon from '@mui/icons-material/AccessAlarm';
import AttachIcon from '@mui/icons-material/Attachment';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import FollowIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

// import JoinIn from './JoinIn';
import { useState } from 'react';
import PropTypes from 'prop-types';
import DeletePopUp from '../../../../components/DeletePopUp/DeletePopUp';

export default function ButtonContainer({ onDelete, onClose, setEditing }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openJoinIn, setOpenJoinIn] = useState(false);

  const handleDelete = () => {
    //   console.log(task);
    setOpenDelete(true);
  };
  const saveDelete = () => {
    onDelete();
    setOpenDelete(false);
    onClose();
  };

  return (
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
  );
}

ButtonContainer.propTypes = {
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
  setEditing: PropTypes.func,
};
