import { useEffect, useState } from 'react';
import Board from './Components/Board';
import { MenuItem, Select, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getBoardList } from './service/board_service';
import { getProjectBySlug } from '../../apis/project_service';
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../../../setting/socket';
import AddBoard from './Components/AddBoard';
import EditBoard from './Components/EditBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState(null);
  const { projectSlug } = useParams();
  const [project, setProject] = useState();
  const [openAddBoardPopUp, setOpenAddBoardPopUp] = useState(false);
  const [openEditBoardPopUp, setOpenEditBoardPopUp] = useState(false);
  const [newBoard, setNewBoard] = useState('');

  useEffect(() => {
    if (!projectSlug) {
      console.log('slug is incorrect format');
      return;
    }
    getProjectBySlug(projectSlug).then((data) => {
      if (!data) console.log('data is undefined');
      else setProject(data);
      socket.emit('joinRoom', data._id);
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

  const handleAddBoard = (payload) => {
    let newBoard = {
      ...payload,
      description: 'none',
      projectId: project._id,
    };
    let tmpId = uuidv4();
    let tmpBoard = { ...newBoard, _id: tmpId };
    console.log(newBoard);
    setBoards((prev) => [...prev, tmpBoard]);
    console.log('add a new board ' + newBoard);
    socket.emit('addBoard', newBoard, (respone) => {
      if (respone.success) {
        const boardData = respone.data;
        setBoards((prev) =>
          prev.map((board) => (board._id === tmpId ? boardData : board))
        );
        console.log(boards);
      } else {
        console.log('Dashboard: Error when work with id');
      }
    });
    setOpenAddBoardPopUp(false);
    setNewBoard('');
  };
  const handleEditBoard = (id, payload) => {
    setBoards((prev) =>
      prev.map((board) => (board._id === id ? { ...board, ...payload } : board))
    );
    socket.emit('updateBoard', id, payload);
    console.log('Dashboard: edit board with id ' + id);

    setOpenEditBoardPopUp(false);
    setNewBoard('');
  };
  // const handleDeleteBoard = (id) => {
  //   setBoards((prev) => prev.filter((board) => board._id !== id));
  //   socket.emit('deleteBoard', id);
  //   console.log('Dashboard: delete board with id ' + id);
  // };

  // lang nghe cac su kien socket.io
  useEffect(() => {
    const handleAdd = (newBoard) => {
      setBoards((prev) => [...prev, newBoard]);
    };
    const handleEdit = (id, payload) => {
      setBoards((prev) =>
        prev.map((board) =>
          board._id === id ? { ...board, ...payload } : board
        )
      );
    };
    const handleDelete = (id) => {
      setBoards((prev) => prev.filter((board) => board._id !== id));
    };

    socket.on('boardAdded', handleAdd);
    socket.on('boardUpdated', handleEdit);
    socket.on('boardDeleted', handleDelete);

    // huy lang nghe khi willUnmount
    return () => {
      socket.off('boardAdded', handleAdd);
      socket.off('boardUpdated', handleEdit);
      socket.off('boardDeleted', handleDelete);
    };
  }, []);

  const handleChange = (e) => {
    setBoardId(e.target.value);
  };

  // const handleBoardNameChange = (e) => {
  //   setNewBoard(e.target.value);
  // };

  if (boards.length === 0) {
    return (
      <>
        {/* <input onChange={handleBoardNameChange} /> */}
        <button>AddBoard</button>
      </>
    );
  }

  if (!boardId) return null;

  return (
    <div>
      <div className="main">
        <Stack className="TeamThree" direction="row">
          <Select
            value={boardId}
            onChange={handleChange}
            className="BoardSelect"
            sx={{
              border: 'none',
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
          <div className="board-icon-container">
            <button onClick={() => setOpenAddBoardPopUp(true)}>New</button>
            <button onClick={() => setOpenEditBoardPopUp(true)}>Edit</button>
          </div>
        </Stack>
        <AddBoard
          open={openAddBoardPopUp}
          onClose={() => setOpenAddBoardPopUp(false)}
          onSave={() => handleAddBoard({ title: newBoard })}
          onChange={(e) => setNewBoard(e.target.value)}
        />

        <EditBoard
          open={openEditBoardPopUp}
          onClose={() => setOpenEditBoardPopUp(false)}
          onSave={() => handleEditBoard(boardId, { title: newBoard })}
          onChange={(e) => setNewBoard(e.target.value)}
          initTitle={
            boards[boards.findIndex((board) => board._id === boardId)].title
          }
        />
        <DndProvider backend={HTML5Backend}>
          <Board key={boardId} board_id={boardId} />
        </DndProvider>
      </div>
    </div>
  );
}
