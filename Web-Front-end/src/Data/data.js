import { v4 as uuidv4 } from 'uuid';

const project_count = 4;
const project_ids = Array.from({ length: project_count }, () => uuidv4());

const board_count = 4;
const board_ids = Array.from({ length: board_count }, () => uuidv4());

const column_count = 16;
const column_ids = Array.from({ length: column_count }, () => uuidv4());

const task_count = 12;
const task_ids = Array.from({ length: task_count }, () => uuidv4());

export const projects = [
  {
    id: project_ids[0],
    user_id: 1,
    name: 'Lap trinh truc quan',
    slug: 'lap-trinh-truc-quan',
  },
  {
    id: project_ids[1],
    user_id: 1,
    name: 'Nhap mon mang may tinh',
    slug: 'nhap-mon-mang-may-tinh',
  },
  {
    id: project_ids[2],
    user_id: 1,
    name: 'Co so du lieu',
    slug: 'co-so-du-lieu',
  },
  {
    id: project_ids[3],
    user_id: 1,
    name: 'He-dieu-hanh',
    slug: 'he-dieu-hanh',
  },
];

export const boards = [
  {
    id: board_ids[0],
    project_id: project_ids[0],
    name: 'Board 1',
  },
  {
    id: board_ids[1],
    project_id: project_ids[0],
    name: 'Board 2',
  },
  {
    id: board_ids[2],
    project_id: project_ids[0],
    name: 'Board 3',
  },
  {
    id: board_ids[3],
    project_id: project_ids[0],
    name: 'Board 4',
  },
];

export const columns = [
  {
    id: column_ids[0],
    name: 'TO DO',
    board_id: board_ids[0],
  },
  {
    id: column_ids[1],
    name: 'DOING',
    board_id: board_ids[0],
  },
  {
    id: column_ids[2],
    name: 'DONE',
    board_id: board_ids[0],
  },
  {
    id: column_ids[3],
    name: 'PLAN',
    board_id: board_ids[0],
  },
  {
    id: column_ids[4],
    name: 'TO DO',
    board_id: board_ids[1],
  },
  {
    id: column_ids[5],
    name: 'DOING',
    board_id: board_ids[1],
  },
  {
    id: column_ids[6],
    name: 'DONE',
    board_id: board_ids[1],
  },
  {
    id: column_ids[7],
    name: 'PLAN',
    board_id: board_ids[1],
  },
  {
    id: column_ids[8],
    name: 'TO DO',
    board_id: board_ids[2],
  },
  {
    id: column_ids[9],
    name: 'DOING',
    board_id: board_ids[2],
  },
  {
    id: column_ids[10],
    name: 'DONE',
    board_id: board_ids[2],
  },
  {
    id: column_ids[11],
    name: 'PLAN',
    board_id: board_ids[2],
  },
  {
    id: column_ids[12],
    name: 'TO DO',
    board_id: board_ids[3],
  },
  {
    id: column_ids[13],
    name: 'DOING',
    board_id: board_ids[3],
  },
  {
    id: column_ids[14],
    name: 'DONE',
    board_id: board_ids[3],
  },
  {
    id: column_ids[15],
    name: 'PLAN',
    board_id: board_ids[3],
  },
];

export const tasks = [
  {
    id: task_ids[0],
    title: 'Learn JS',
    column_id: column_ids[0],
  },
  {
    id: task_ids[1],
    title: 'Learn C#',
    column_id: column_ids[0],
  },
  {
    id: task_ids[2],
    title: 'Learn PHP',
    column_id: column_ids[0],
  },

  {
    id: task_ids[3],
    title: 'Learn JS',
    column_id: column_ids[1],
  },
  {
    id: task_ids[4],
    title: 'Learn C#',
    column_id: column_ids[1],
  },
  {
    id: task_ids[5],
    title: 'Learn PHP',
    column_id: column_ids[1],
  },

  {
    id: task_ids[6],
    title: 'Learn JS',
    column_id: column_ids[2],
  },
  {
    id: task_ids[7],
    title: 'Learn C#',
    column_id: column_ids[2],
  },
  {
    id: task_ids[8],
    title: 'Learn PHP',
    column_id: column_ids[2],
  },

  {
    id: task_ids[9],
    title: 'Learn JS',
    column_id: column_ids[3],
  },
  {
    id: task_ids[10],
    title: 'Learn C#',
    column_id: column_ids[3],
  },
  {
    id: task_ids[11],
    title: 'Learn PHP',
    column_id: column_ids[3],
  },
];
