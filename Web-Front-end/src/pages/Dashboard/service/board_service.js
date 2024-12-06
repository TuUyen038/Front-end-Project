import {
  BOARD_ENDPOINT,
  PROJECT_ENDPOINT,
} from '../../../../setting/globalVariable';

export const getBoardList = async (projectId, onFail, onSucess) => {
  const Token = localStorage.token;

  try {
    const url = PROJECT_ENDPOINT + `${projectId}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch board list');
    }

    const data = await res.json();
    console.log('Response data:', data);
    if (!Array.isArray(data.boardOrderIds) || data.boardOrderIds.length === 0) {
      throw new Error('Invalid response format for board list');
    }

    const boards = await Promise.all(
      data.boardOrderIds.map((id) => getBoard(id))
    );
    console.log(boards);
    onSucess(boards);
  } catch (error) {
    console.error('Error in getBoardList:', error);
    onFail();
  }
};

export const getBoard = async (boardId) => {
  const Token = localStorage.token;

  try {
    const url = BOARD_ENDPOINT + `${boardId}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch board info');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error in getBoard:', error);
    throw error; // Hoặc xử lý lỗi theo cách bạn muốn
  }
};

// lam them thao tac them board va xoa board nua (front-end)
// nhung thao tac se can chuyen doi sang socket.io / real-time
export const addBoard = async (payload) => {
  const Token = localStorage.token;

  const url = BOARD_ENDPOINT;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not add new board');
  }

  const data = await res.json();
  return getBoardList(data.projectId);
};

export const editBoard = async (boardId, payload) => {
  const Token = localStorage.token;

  const url = BOARD_ENDPOINT + `${boardId}`;
  const res = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not edit this board');
  }

  const data = await res.json();
  return getBoardList(data.projectId);
};

export const deleteBoard = async (boardId) => {
  const Token = localStorage.token;

  const url = BOARD_ENDPOINT + `${boardId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not delete this');
  }

  const data = await res.json();
  return getBoardList(data.projectId);
};
