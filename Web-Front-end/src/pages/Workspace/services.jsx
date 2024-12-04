/* eslint-disable no-unused-vars */
import { getApiProject, getApiDeadline } from "./config";

export const getListProject = async () => {
  const Token = localStorage.token;
  const url = "http://localhost:8017/v1/users/me";
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!res.ok) {
    const e = await res.json();
    console.error("loi la: ", e);
    alert("Can not get list ID of project");
  }
  const data = await res.json();
  return data.projectOrderIds;
};
export const getListDeadline = async () => {
  const Token = localStorage.token;
  const url = "http://localhost:8017/v1/users/me";
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!res.ok) {
    alert("Can not get list ID of deadline");
  }
  const data = await res.json();
  return await data.involvedCardOrderIds;
};
export const getProject = async (id) => {
  const Token = localStorage.token;
  const url = getApiProject(id);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  if (!res.ok) {
    alert("Can not get project");
  }
  return res.json();
};
export const getDeadline = async (id) => {
  const Token = localStorage.token;
  const url = getApiDeadline(id);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  if (!res.ok) {
    alert("Can not get deadline");
    const resp = await res.json();
    console.error("loi la:", resp);
  }
  return await res.json();
};

export const addDefaultBoard = async (id) => {
  const Token = localStorage.token;
  const defaultData = {
    title: "Board 01",
    description: "Default Board",
    projectId: id,
  };
  const url = "http://localhost:8017/v1/boards/";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(defaultData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    alert("can not create default board");
    console.error("Error response:", errorData);
  }
};

export const addProject = async (payload) => {
  const Token = localStorage.token;
  const url = getApiProject();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    if (res.status === 422 || res.status === 500) {
      alert("Data is not correct");
    } else {
      alert("Other error occurred: " + res.status);
    }
    return null;
  }
  const arr = await getListProject();
  const newProject = await getProject(arr[arr.length - 1]);
  addDefaultBoard(newProject._id);
  return await getProject(newProject._id);
};

export const updateProject = async (payload) => {
  const Token = localStorage.token;
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
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  if (!res.ok) {
    alert("Can not update data.");
    const errorData = await res.json();
    console.error("Error response:", errorData);
  }
  return await getProject(payload._id);
};

export const deleteProject = async (id) => {
  const Token = localStorage.token;
  const url = getApiProject(id);
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  if (!res.ok) {
    alert("Can not delete project");
    const errorData = await res.json();
    console.error("Error response:", errorData);
  }
  const arr = await getListProject();
  const newProject = await getProject(arr[arr.length - 1]);
  return await getProject(newProject._id);
};
