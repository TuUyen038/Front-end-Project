import { Button, Modal, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export default function EditBoard({
  open,
  onClose,
  onSave,
  onChange,
  initTitle,
}) {
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
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Edit board</p>
          <Stack direction="row">
            <input onChange={onChange} placeholder={initTitle + '...'} />
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

EditBoard.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  initTitle: PropTypes.string,
};
