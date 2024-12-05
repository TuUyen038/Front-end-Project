import { useEffect, useState } from 'react';
import Board from './Components/Board';
import { MenuItem, Select, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getBoardList } from './service/board_service';
import { getProjectBySlug } from '../../apis/project_service';

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [boardId, setboardId] = useState(null);
  const { projectSlug } = useParams();
  const [project, setProject] = useState();

  useEffect(() => {
    getProjectBySlug(projectSlug).then((data) => {
      if (!data) console.log('data is undefined');
      else setProject(data);
      // alert(project);
    });
  }, []);

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
        }
      );
  }, [project]);

  const handleChange = (e) => {
    setboardId(e.target.value);
  };

  if (boards.length > 0) {
    setboardId(boards[0].id);
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
                    {board.title}
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>
          <Board key={boardId} board_id={boardId} />
        </div>
        <button>AddBoard</button>
      </div>
    );
  } else return <button>AddBoard</button>;
}

/*
  1. Them button AddBoard
  2. Them button EditBoard
  3. Them button DeleteBoard (thao tac nay chi co owner dc quyen)
*/
