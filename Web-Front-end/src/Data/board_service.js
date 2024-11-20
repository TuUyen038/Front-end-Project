import { deleteColumns } from './column_service';
import { boards } from './data';

export const getBoards = (project_id) =>
  boards.filter((board) => board.project_id === project_id);

export const getBoard = (id) => boards.filter((board) => board.id === id);

export const postBoard = (board, project_id) => {
  const newBoard = {
    id: boards.length + 1,
    project_id: project_id,
    name: board.name,
  };
  boards.push(newBoard);
  return getBoards(project_id);
};

export const putBoard = (id, payload) => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  boards[boardIndex] = { ...boards[boardIndex], name: payload.name };
  return boards[boardIndex];
};

export const deleteBoard = (id) => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  deleteColumns(id);
  return boards.splice(boardIndex, 1);
};

export const deleteBoards = (project_id) => {
  boards.forEach((board, index) => {
    if (board.project_id === project_id) boards.splice(index, 1);
  });
  return boards;
};
