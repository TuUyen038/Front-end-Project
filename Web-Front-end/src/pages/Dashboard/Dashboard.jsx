import { useEffect, useState } from 'react';
import Board from './Components/Board';
import { MenuItem, Select, Stack } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { getBoards } from '../../Data/board_service';
// import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const { project_id } = useOutletContext();
  const boards = getBoards(project_id);
  const [boardId, setboardId] = useState(boards[0].id);

  useEffect(() => {
    console.log(project_id);
    console.log(boards);
  }, [boardId]);

  const handleChange = (e) => {
    setboardId(e.target.value);
  };
  return (
    <div>
      <div className="main">
        <Stack className="TeamThree" direction="row">
          <Select
            value={boardId}
            onChange={handleChange}
            className="BoardSelect"
            sx={{
              border: '',
              '& fieldset': { border: 'none' },
              fontSize: '1.6rem',
            }}
          >
            {boards.map((board) => {
              return (
                <MenuItem key={board.id} value={board.id}>
                  {board.name}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
        <Board key={boardId} board_id={boardId} />
      </div>
    </div>
  );
}
