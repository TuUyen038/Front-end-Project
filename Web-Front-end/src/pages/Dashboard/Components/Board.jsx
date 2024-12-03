import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Column from './Column';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import {
  addColumn,
  deleteColumn,
  getColumnList,
} from '../service/column_service';
import { v4 as uuidv4 } from 'uuid';

export default function Board({ board_id }) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(getColumnList(board_id));
  }, []);

  const AddColumn = () => {
    setColumns(
      addColumn({
        id: uuidv4(),
        title: 'NEW',
      })
    );
    console.log(columns);
  };

  const DeleteColumn = (id) => {
    setColumns(deleteColumn(id));
  };

  return (
    <Stack direction="column" className="Board">
      <Stack direction="row" className="Main">
        {columns.map((column) => {
          return (
            <Column
              title={column.title}
              key={column.id}
              column_id={column.id}
              delete={() => DeleteColumn(column.id)}
            ></Column>
          );
        })}
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
