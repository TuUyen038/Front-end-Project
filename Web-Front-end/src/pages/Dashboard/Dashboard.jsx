import { useEffect, useState } from 'react';
import Board from './Components/Board';
import { MenuItem, Select, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getBoardList } from './service/board_service';
import { getProjectBySlug } from '../../apis/project_service';
import { socket } from '../../../setting/socket';
import AddBoard from './Components/AddBoard';
import EditBoard from './Components/EditBoard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsersOfProject } from './service/user_service';
import DeletePopUp from '../../components/DeletePopUp/DeletePopUp';

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState(null);
  const { projectSlug } = useParams();
  const [project, setProject] = useState();
  const [openAddBoardPopUp, setOpenAddBoardPopUp] = useState(false);
  const [openEditBoardPopUp, setOpenEditBoardPopUp] = useState(false);
  const [openDeleteBoardPopUp, setOpenDeleteBoardPopUp] = useState(false);
  const [newBoard, setNewBoard] = useState('');
  const [userLs, setUserLs] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      if (!projectSlug) {
        console.log('slug is incorrect format');
        return;
      }

      getProjectBySlug(projectSlug)
        .then((data) => {
          if (!data) {
            console.log('data is undefined');
            return;
          }

          setProject(data);
          socket.emit('joinRoom', data._id);

          return getUsersOfProject(data);
        })
        .then((resData) => {
          console.log('get users: ', resData);
          setUserLs(resData);
        })
        .catch((error) => console.log(error.message));
    };
    fetchData();
    return () => {
      socket.emit('leaveRoom');
    };
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

    socket.emit('addBoard', newBoard, (respone) => {
      if (respone.success) {
        toast.success('Create new board successfully');
      } else {
        console.log('Dashboard: Error when work with id');
      }
    });
    setOpenAddBoardPopUp(false);
    setNewBoard('');
  };
  const handleEditBoard = (id, payload) => {
    socket.emit('updateBoard', id, payload);
    console.log('Dashboard: edit board with id ' + id);
    toast.success('Update board successfully');
    setOpenEditBoardPopUp(false);
    setNewBoard('');
  };
  const handleDeleteBoard = (id) => {
    socket.emit('deleteBoard', id);
    console.log('Dashboard: delete board with id ' + id);
  };

  const handleSaveDeleteBoard = () => {
    if (boards.length === 1) {
      toast.error('Can not delete! Your project must have at least one board!');
      setOpenDeleteBoardPopUp(false);
      return;
    }
    const updatedBoards = boards.filter((board) => board._id !== boardId);
    const newBoardId = updatedBoards[0]._id;
    setBoardId(newBoardId);
    handleDeleteBoard(boardId);
    toast.success('Delete board successfully!');
    setOpenDeleteBoardPopUp(false);
  };

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

    console.log('DASHBOARD socket: ', socket);
    socket.on('boardAdded', handleAdd);
    socket.on('boardUpdated', handleEdit);
    socket.on('boardDeleted', handleDelete);

    // huy lang nghe khi willUnmount
    return () => {
      socket.off('boardAdded', handleAdd);
      socket.off('boardUpdated', handleEdit);
      socket.off('boardDeleted', handleDelete);
      console.log('DASHBOARD socket: ', socket);
    };
  }, [projectSlug]);

  const handleChange = (e) => {
    setBoardId(e.target.value);
  };

  // const handleBoardNameChange = (e) => {
  //   setNewBoard(e.target.value);
  // };

  if (boards.length === 0) {
    return <>LOADING ...</>;
  }

  if (!boardId) return null;

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
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
            <button
              className="cus-btn"
              onClick={() => setOpenAddBoardPopUp(true)}
            >
              New
            </button>
            <button
              className="cus-btn"
              onClick={() => setOpenEditBoardPopUp(true)}
            >
              Edit
            </button>
            <button
              className="cus-btn"
              onClick={() => setOpenDeleteBoardPopUp(true)}
            >
              Delete
            </button>
          </div>
        </Stack>
        <AddBoard
          open={openAddBoardPopUp}
          onClose={() => setOpenAddBoardPopUp(false)}
          onSave={() => {
            if (newBoard.trim() && newBoard.trim().length > 2)
              handleAddBoard({ title: newBoard });
            else toast.warn('Board name is not valid!');
          }}
          onChange={(e) => setNewBoard(e.target.value)}
        />

        <EditBoard
          open={openEditBoardPopUp}
          onClose={() => setOpenEditBoardPopUp(false)}
          onSave={() => {
            if (newBoard.trim() && newBoard.trim().length > 2)
              handleEditBoard(boardId, { title: newBoard });
            else toast.warn('Board name is not valid!');
          }}
          onChange={(e) => setNewBoard(e.target.value)}
          initTitle={
            boards[boards.findIndex((board) => board._id === boardId)].title
          }
        />

        <DeletePopUp
          open={openDeleteBoardPopUp}
          onClose={() => setOpenDeleteBoardPopUp(false)}
          onDelete={handleSaveDeleteBoard}
        />

        <DndProvider backend={HTML5Backend}>
          <Board key={boardId} board_id={boardId} member={userLs} />
        </DndProvider>
      </div>
    </div>
  );
}
