import { Button, Stack } from '@mui/material';
import AddPersonIcon from '@mui/icons-material/PersonAddAlt';
import DeadlineIcon from '@mui/icons-material/AccessAlarm';
import AttachIcon from '@mui/icons-material/Attachment';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import FollowIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState } from 'react';
import PropTypes from 'prop-types';
import DeletePopUp from '../../../../components/DeletePopUp/DeletePopUp';
import JoinIn from '../JoinIn';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ButtonContainer({
  onDelete,
  onClose,
  setEditing,
  member,
  onAddMemLs,
  onSetPayLoad,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openJoinIn, setOpenJoinIn] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDelete = () => {
    //   console.log(task);
    setOpenDelete(true);
  };
  const handleDeadline = () => {
    onSetPayLoad({ deadline: selectedDate });
    setOpenDatePicker(false);
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
          position: 'relative',
        }}
      >
        Join in
        {openJoinIn ? (
          <JoinIn
            member={member}
            onClose={() => setOpenJoinIn(false)}
            onAddMemLs={onAddMemLs}
          />
        ) : null}
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Button
          className="task-button"
          onClick={() => setOpenDatePicker(!openDatePicker)}
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
        {openDatePicker && (
          <>
            <DatePicker
              label="Pick Up Deadline"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
            <button onClick={handleDeadline}>OK</button>
          </>
        )}
      </LocalizationProvider>

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
  onAddMemLs: PropTypes.func,
  member: PropTypes.array,
  onSetPayLoad: PropTypes.func,
};
