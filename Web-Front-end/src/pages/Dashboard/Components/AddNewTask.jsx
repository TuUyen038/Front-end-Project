import { Button, Modal, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export default function AddNewTask({ open, onClose, onSave, setTempTask }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          //   border: 'solid 1px black',
        }}
      >
        <Stack
          className="add-pop-up"
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            height: '24rem',
            width: '38.3rem',
            padding: '2rem 2.8rem 2rem 2.8rem',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#2d9596' }}
          >
            Add new task
          </p>
          <input
            onChange={(e) => setTempTask({ title: e.target.value })}
            placeholder="Task name ..."
          />
          <input
            onChange={(e) => setTempTask({ description: e.target.value })}
            placeholder="Add description ..."
          />
          <Stack
            direction="row"
            sx={{
              justifyContent: 'flex-end',
              gap: '2rem',
            }}
          >
            <Button
              onClick={onSave}
              sx={{ color: 'white', backgroundColor: '#2D9596' }}
            >
              Save
            </Button>

            <Button onClick={onClose} sx={{ color: 'black' }}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

AddNewTask.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  setTempTask: PropTypes.func,
};
