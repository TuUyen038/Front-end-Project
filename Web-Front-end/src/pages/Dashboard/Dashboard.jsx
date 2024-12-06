import { useEffect, useState } from 'react';
import Board from './Components/Board';
import { MenuItem, Select, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getBoardList } from './service/board_service';
import { getProjectBySlug } from '../../apis/project_service';
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState(null);
  const { projectSlug } = useParams();
  const [project, setProject] = useState();
  const [newBoard, setNewBoard] = useState('');

  useEffect(() => {
    if (!projectSlug) {
      console.log('slug is incorrect format');
      return;
    }
    getProjectBySlug(projectSlug).then((data) => {
      if (!data) console.log('data is undefined');
      else setProject(data);
    });
  }, [projectSlug]);

  useEffect(() => {
    console.log(project);
    if (project)
      getBoardList(
        project._id,
        () => {
          console.log('can not get board lít');
        },
        (boards) => {
          console.log(boards);
          setBoards(boards);
          if (boards.length > 0 && !boardId) {
            setBoardId(boards[0]._id);
          }
        }
      );
  }, [project]);

  const handleChange = (e) => {
    setBoardId(e.target.value);
  };

  const handleAdd = () => {};

  const handleBoardNameChange = (e) => {
    setNewBoard(e.target.value);
  };

  if (boards.length === 0) {
    return (
      <>
        <input onChange={handleBoardNameChange} />
        <button>AddBoard</button>
      </>
    );
  }

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
            {boards.map((board) => (
              <MenuItem key={board._id} value={board._id}>
                {board.title}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Board board_id={boardId} />
      </div>
      <button onClick={handleAdd}>AddBoard</button>
    </div>
  );
}
/*
  1. Them button AddBoard
  2. Them button EditBoard
  3. Them button DeleteBoard (thao tac nay chi co owner dc quyen)
*/
