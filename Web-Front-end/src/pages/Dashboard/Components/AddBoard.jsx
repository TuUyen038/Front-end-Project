import { Button, Modal, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export default function AddBoard({ open, onClose, onSave, onChange }) {
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
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            height: '24rem',
            width: '38.3rem',
            padding: '1.2rem 2.4rem 1.2rem 2.4rem',
            justifyContent: 'space-between',
          }}
        >
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Add new board</p>
          <Stack direction="row">
            <input onChange={onChange} placeholder="Board name ..." />
            <button>Add</button>
          </Stack>
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

AddBoard.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
};
