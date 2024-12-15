import { Button, Stack } from '@mui/material';
import AddPersonIcon from '@mui/icons-material/PersonAddAlt';
import DeadlineIcon from '@mui/icons-material/AccessAlarm';
import AttachIcon from '@mui/icons-material/Attachment';
import EditIcon from '@mui/icons-material/Edit';
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
  cardMem,
  onAddMemLs,
  onSetPayLoad,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openJoinIn, setOpenJoinIn] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDelete = () => {
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
          position: 'relative',
        }}
      >
        Join in
        {openJoinIn ? (
          <JoinIn
            member={member}
            cardMem={cardMem}
            onClose={() => {
              setOpenJoinIn(false);
              onClose();
            }}
            onAddMemLs={onAddMemLs}
          />
        ) : null}
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Button
          className="task-button"
          onClick={() => setOpenDatePicker(true)}
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
          <DatePicker
            label="Pick Up Deadline"
            value={selectedDate}
            onChange={(newDate) => {
              setSelectedDate(newDate);
              console.log('new date: ', newDate);
              onSetPayLoad({
                deadline: newDate.format('YYYY-MM-DD'),
                deadlinestatus: 'not_done',
              });
              setOpenDatePicker(false);
            }}
          />
        )}
        {selectedDate && <p>Deadline: {selectedDate.format('YYYY-MM-DD')}</p>}
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
  cardMem: PropTypes.array,
  onSetPayLoad: PropTypes.func,
};
