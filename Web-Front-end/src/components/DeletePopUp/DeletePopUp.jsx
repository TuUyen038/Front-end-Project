import { Box, Button, Modal, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export default function DeletePopUp({ open, onClose, onDelete }) {
  var dark = localStorage.getItem('darkMode') === 'true';
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
        }}
      >
        <Box
          sx={{
            height: '10rem',
            width: '16rem',
            backgroundColor: dark ? '#555' : 'white',
            borderRadius: '5px',
          }}
        >
          <p
            style={{
              textAlign: 'left',
              fontSize: '2rem',
              color: '#2d9596',
              fontWeight: 'bold',
              margin: '0.6rem 0 2.2rem 1rem',
            }}
          >
            Delete this?
          </p>
          <Stack
            direction="row"
            sx={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Button
              variant="contained"
              onClick={onDelete}
              sx={{ backgroundColor: '#2D9596' }}
            >
              Sure
            </Button>
            <Button onClick={onClose} color="black">
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

DeletePopUp.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};
