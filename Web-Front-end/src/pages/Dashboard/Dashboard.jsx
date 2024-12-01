import { useEffect, useState } from 'react';
import Board from './Components/Board';
import { MenuItem, Select, Stack } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { getBoardList } from './service/board_service';

// import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const { project_id } = useOutletContext();
  const [boards, setBoards] = useState([]);
  const [boardId, setboardId] = useState(null);

  useEffect(() => {
    setBoards(getBoardList(project_id));
    setboardId(boards[0].id);
  }, []);

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
