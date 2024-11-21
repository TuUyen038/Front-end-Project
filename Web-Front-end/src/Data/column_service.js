import { columns } from './data';
import { deleteTasks } from './task_service';

export const getColumns = (board_id) =>
  columns.filter((column) => column.board_id === board_id);

export const getColumn = (id) => columns.find((column) => column.id === id);

export const postColumn = (column, board_id) => {
  const newColumn = {
    id: columns.length + 1,
    board_id: board_id,
    name: column.name,
  };
  columns.push(newColumn);
  return getColumns(board_id);
};

export const putColumn = (id, payload) => {
  const columnIndex = columns.findIndex((column) => column.id === id);
  columns[columnIndex] = { ...columns[columnIndex], name: payload.name };
  return columns[columnIndex];
};

export const deleteColumn = (id) => {
  const columnIndex = columns.findIndex((column) => column.id === id);
  deleteTasks(id);
  return columns.splice(columnIndex, 1);
};

export const deleteColumns = (board_id) => {
  columns.forEach((column, index) => {
    if (column.board_id === board_id) columns.splice(index, 1);
  });
  return columns;
};
