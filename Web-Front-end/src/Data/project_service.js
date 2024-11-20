import { deleteBoards } from './board_service';
import { projects } from './data';

export const getProjects = (user_id, id) => {
  return projects.filter(
    (project) => project.user_id === user_id && (id ? project.id === id : true)
  );
};

export const postProject = (project, user_id) => {
  const newProject = {
    id: projects.length + 1,
    user_id: user_id,
    name: project.name,
    slug: project.name.toLowerCase().replace(/\s+/g, '-'), // Tạo slug từ name
  };
  projects.push({ newProject });
  return projects;
};

export const putProject = (id, payload) => {
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex === -1) {
    throw new Error(`Project with id ${id} not found`);
  }

  projects[projectIndex] = {
    ...projects[projectIndex], // Giữ lại các thuộc tính cũ
    name: payload.name,
    slug: payload.name.toLowerCase().replace(/\s+/g, '-'), // Cập nhật slug
  };

  return projects[projectIndex]; // Trả về dự án đã cập nhật
};

export const deleteProject = (id) => {
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex === -1) {
    throw new Error(`Project with id ${id} not found`);
  }
  deleteBoards(id);
  return projects.splice(projectIndex, 1);
};
