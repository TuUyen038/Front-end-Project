import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

export default function CloseX({ onClose }) {
  return (
    <div>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          height: '3rem',
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}

CloseX.propTypes = {
  onClose: PropTypes.func,
};
