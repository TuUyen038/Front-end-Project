import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Column from './Column';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { getColumnList } from '../service/column_service';
import { v4 as uuidv4 } from 'uuid';

export default function Board({ board_id }) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getColumnList(board_id).then((data) => {
      if (!data) {
        console.log('no date (Board)');
        return;
      }
      setColumns(data);
      console.log(data);
    });
  }, [board_id]);

  const AddColumn = () => {
    // socket.io
  };

  const DeleteColumn = (id) => {
    // socket.io
  };

  return (
    <Stack direction="column" className="Board">
      <Stack direction="row" className="Main">
        {/* {columns.map((column) => {
          return (
            <Column
              title={column.title}
              key={column._id}
              column_id={column._id}
              delete={() => DeleteColumn(column._id)}
            ></Column>
          );
        })} */}
        <Button
          variant="contained"
          className="add_board"
          endIcon={<AddIcon />}
          sx={{
            backgroundColor: 'rgba(235, 244, 214, 0.5)',
            color: 'black',
            height: '3rem',
            width: '20rem',
          }}
          onClick={AddColumn}
        >
          New
        </Button>
      </Stack>
    </Stack>
  );
}

Board.propTypes = {
  board_id: PropTypes.string,
};
