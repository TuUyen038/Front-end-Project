import { tasks } from './data';

export const getTasks = (column_id) =>
  tasks.filter((task) => task.column_id === column_id);

export const getTask = (id) => tasks.find((task) => task.id === id);

export const postTask = (task, column_id) => {
  const newTask = {
    id: tasks.length + 1,
    column_id: column_id,
    name: task.name,
  };
  tasks.push(newTask);
  return getTasks(column_id);
};

export const putTask = (id, payload) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex] = { ...tasks[taskIndex], name: payload.name };
  return tasks[taskIndex];
};

export const deleteTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  return tasks.splice(taskIndex, 1);
};

export const deleteTasks = (column_id) => {
  tasks.forEach((task, index) => {
    if (task.column_id === column_id) tasks.splice(index, 1);
  });
  return tasks;
};
