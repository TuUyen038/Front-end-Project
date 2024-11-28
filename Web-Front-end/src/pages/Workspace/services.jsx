/* eslint-disable no-unused-vars */
import { getApiProject, API_KEY } from "./config";
import { token } from "./config";

export const getListProject = async () => {
  const url = "http://localhost:8017/v1/users/me";
  const res = await fetch(url, {
    headers: {
      key: API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    alert("Can not get list of project's id");
  }
  const data = await res.json();
  return data.projectOrderIds;
};
export const getProject = async (id) => {
  const url = getApiProject(id);
  const res = await fetch(url, {
    headers: {
      key: API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    alert("Can not get project");
  }
  return res.json();
};

export const addProject = async (payload) => {
  const url = getApiProject();

  const res = await fetch(url, {
    method: "POST",
    headers: {
      key: API_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    if (res.status === 422) {
      alert("Data is not correct");
    } else if (res.status !== 422) {
      alert("Other error occurred: " + res.status);
    }
    return null;
  }
  const arr = await getListProject();
  const newProject = await getProject(arr[arr.length - 1]);
  return await getProject(newProject._id);
};

export const updateProject = async (payload) => {
  const url = getApiProject(payload._id);
  const {
    _id,
    slug,
    _destroy,
    boards,
    userOrderIds,
    createdAt,
    updatedAt,
    updateAt,
    ...updateData
  } = payload;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      key: API_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Error response:", errorData);
    alert(errorData.message);
  }
  return await getProject(payload._id);
};

export const deleteProjectFromList = async (projectId) => {
  const projectList = await getListProject();
  const updatedProjectList = projectList.filter((id) => id !== projectId);
  const url = "http://localhost:8017/v1/users/me";
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      key: API_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectOrderIds: updatedProjectList }),
  });

  if (!res.ok) {
    alert("Failed to update project list after deletion");
    const errorData = await res.json();
    console.error("Error response:", errorData);
    return;
  }
  return updatedProjectList;
};

export const deleteProject = async (id) => {
  const url = getApiProject(id);
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      key: API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    console.log(token);
    alert("Can not delete project");
    const errorData = await res.json();
    console.error("Error response:", errorData);
  }

  const arr = await getListProject();
  const newProject = await getProject(arr[arr.length - 1]);
  return await getProject(newProject._id);
};
