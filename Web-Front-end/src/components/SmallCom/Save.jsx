import { Button } from '@mui/material';
import PropTypes from 'prop-types';

export default function Save({ onSave }) {
  return (
    <div>
      <Button
        onClick={onSave}
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
    </div>
  );
}

Save.propTypes = {
  onSave: PropTypes.func,
};
