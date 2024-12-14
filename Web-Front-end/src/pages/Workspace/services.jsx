/* eslint-disable no-unused-vars */
import { getApiProject, getApiDeadline } from "./config";
import { toast } from "react-toastify";

export const updateDeadline = async (id, payload) => {
  const Token = localStorage.token;
  const url = "http://localhost:8017/v1/cards/" + id;
  console.log(url)
  const body = JSON.stringify({ deadlinestatus: payload });
  console.log(body)
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
    body,
  });
  if (!res.ok) {
    const errorData = await res.json();
    return;
  }
  const kq = await res.json()
  console.log(kq)
  return kq;
};

export const exitProject = async (id) => {
  const Token = localStorage.token;
  const url = "http://localhost:8017/v1/projects/exitproject/" + id;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    toast.error(errorData.errors);
    return false;
  }
  const updatedProject = await res.json();
  toast.success("Exit project successfully!")
  return updatedProject;
  
}
export const removeUser = async (prjId, userId) => {
  const Token = localStorage.token;
  const url = "http://localhost:8017/v1/projects/" + prjId +"/" + userId;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    toast.error(errorData.errors);
    return false;
  }
  const updatedProject = await res.json();
  toast.success("Remove user successfully!")
  return updatedProject;
}

export const DeleteAdmin = async (idPrj, idAd) => {
  const Token = localStorage.token;
  const url = "http://localhost:8017/v1/projects/admin/" + idPrj + "/" + idAd;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();


    toast.error(errorData.errors);
    return false;
  }
  const updatedProject = await res.json();
  toast.success(updateProject.resultMessage);

  return updatedProject;
};

export const addAdmin = async (idPrj, idAd) => {
  const Token = localStorage.token;
  const url = "http://localhost:8017/v1/projects/admin/" + idPrj + "/" + idAd;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();

    toast.error(errorData.errors);
    return false;
  }
  const updatedProject = await res.json();
  return updatedProject;
};
export const getDetailUser = async (id) => {
  const Token = localStorage.token;
  const url = "http://localhost:8017/v1/users/" + id;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  if (!res.ok) {
    toast.error("Can not get admin!");
    return;
  }
  return await res.json();
};
export const getListProject = async () => {
  const Token = localStorage.token;
  const url = "http://localhost:8017/v1/users/me";
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!res.ok) {
    const catchError = await res.json();
    console.error(catchError.errors);
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
    const catchError = await res.json();
    console.error(catchError.errors);
    return;
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
    toast.error("Can not get project!");
    return;
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
    const resp = await res.json();
    console.error("getDl:", resp);
    return;
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
      toast.error("Data is not correct!");
    } else {
      toast.error("Other error occurred: " + res.status);
    }
    return null;
  }
  toast.success("Add project successfully! 😉");
  const arr = await getListProject();
  const newProject = await getProject(arr[arr.length - 1]);
  addDefaultBoard(newProject._id);
  return await getProject(newProject._id);
};

export const AddFriend = async (id, email) => {
  const Token = localStorage.token;
  const url = getApiProject(id) + (email ? `/${email}` : "");
  const body = email ? JSON.stringify({ email }) : undefined;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
    body,
  });
  if (!res.ok) {
    const errorData = await res.json();
    toast.error(errorData.errors);
    return;
  }
  toast.success("Your friend has been added")
  return await getProject(id);
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
    adminOrderIds,
    boardOrderIds,
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
    const errorData = await res.json();
    toast.error(errorData.errors);
    return;
  }

  toast.success("Update project successfully! 😉");
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
    const errorData = await res.json();
    toast.error(errorData.errors);
    return;
  }
  toast.success("Delete project successfully! 😉");
  return await getListProject();
};
