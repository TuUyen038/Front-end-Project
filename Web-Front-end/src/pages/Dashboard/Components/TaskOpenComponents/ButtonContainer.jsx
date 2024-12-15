import { Button, Stack } from '@mui/material';
import AddPersonIcon from '@mui/icons-material/PersonAddAlt';
import DeadlineIcon from '@mui/icons-material/AccessAlarm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemovePersonIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import DeletePopUp from '../../../../components/DeletePopUp/DeletePopUp';
import JoinIn from '../JoinIn';
import { toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RemoveMem from '../RemoveMem';
// import dayjs from 'dayjs';
import { debounce } from 'lodash';

export default function ButtonContainer({
  onDelete,
  onClose,
  setEditing,
  member,
  cardMem,
  onAddMemLs,
  onRemoveMem,
  onSetPayLoad,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openJoinIn, setOpenJoinIn] = useState(false);
  const [openRemoveMem, setOpenRemoveMem] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // const today = dayjs();

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const saveDelete = () => {
    onDelete();
    setOpenDelete(false);
    onClose();
  };

  const handleDateChange = useCallback(
    debounce((newDate) => {
      // if (newDate && newDate.isBefore(today, 'day')) {
      //   toast.error('Selected date is the past!');
      // } else
      if (newDate && newDate.isValid()) {
        setSelectedDate(newDate);
        onSetPayLoad({
          deadline: newDate.format('YYYY-MM-DD'),
          deadlinestatus: 'not_done',
        });
        setOpenDatePicker(false);
      } else {
        toast.warn('Invalid date selected. Please choose a valid date.');
      }
    }, 1000),
    []
  );

  return (
    <Stack
      className="task-method"
      sx={{
        gap: '1.5rem',
      }}
    >
      <div style={{ position: 'relative' }}>
        <Button
          className="task-button"
          variant="contained"
          startIcon={<AddPersonIcon />}
          onClick={() => {
            setOpenJoinIn(true);
            if (openDatePicker) setOpenDatePicker(false);
            if (openRemoveMem) setOpenRemoveMem(false);
          }}
          color="rgba(217, 217, 217, 217, 0.7)"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-start',
          }}
        >
          Join in
        </Button>
        {openJoinIn ? (
          <JoinIn
            member={member}
            cardMem={cardMem}
            onClose={() => {
              setOpenJoinIn(false);
              onClose();
            }}
            onAddMemLs={onAddMemLs}
            CloseJoinIn={() => setOpenJoinIn(false)}
          />
        ) : null}
      </div>
      <div style={{ position: 'relative' }}>
        <Button
          className="task-button"
          variant="contained"
          startIcon={<RemovePersonIcon />}
          onClick={() => {
            setOpenRemoveMem(true);
            if (openJoinIn) setOpenJoinIn(false);
            if (openDatePicker) setOpenDatePicker(false);
          }}
          color="rgba(217, 217, 217, 217, 0.7)"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-start',
          }}
        >
          Remove
        </Button>
        {openRemoveMem ? (
          <RemoveMem
            cardMem={cardMem}
            onClose={() => {
              setOpenRemoveMem(false);
              onClose();
            }}
            onRemoveMem={onRemoveMem}
            CloseRemoveMem={() => setOpenRemoveMem(false)}
          />
        ) : null}
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Button
          className="task-button"
          onClick={() => setOpenDatePicker(true)}
          variant="contained"
          startIcon={<DeadlineIcon />}
          disabled={openJoinIn || openRemoveMem}
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
            onChange={handleDateChange}
          />
        )}
        {selectedDate && <p>Deadline: {selectedDate.format('YYYY-MM-DD')}</p>}
      </LocalizationProvider>

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
  onRemoveMem: PropTypes.func,
  member: PropTypes.array,
  cardMem: PropTypes.array,
  onSetPayLoad: PropTypes.func,
};
