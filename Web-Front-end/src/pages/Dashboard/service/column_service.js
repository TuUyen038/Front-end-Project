import {
  BOARD_ENDPOINT,
  COLUMN_ENDPOINT,
} from '../../../../setting/globalVariable';

export const getColumnList = async (boardId) => {
  const url = BOARD_ENDPOINT + `${boardId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not get board list');
  }

  const data = await res.json();
  const columns = await Promise.all(
    data.columnOrderIds.map((id) => getColumn(id))
  );
  return columns;
};

export const getColumn = async (columnId) => {
  const url = COLUMN_ENDPOINT + `${columnId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not get this column data');
  }

  const data = await res.json();
  return data;
};

// nhung thao tac se can chuyen doi sang socket.io / real-time

export const addColumn = async (payload) => {
  const url = COLUMN_ENDPOINT;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload), /// cai nay can phai xem xet lai ne (front end chua dung chuc nang)
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not add new column');
  }

  const data = await res.json();
  return getColumnList(data.boardId);
};

export const deleteColumn = async (columnId) => {
  const url = COLUMN_ENDPOINT + `${columnId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not delete this column');
  }

  const data = await res.json();
  return getColumnList(data.boardId);
};

export const editColumn = async (columnId, payload) => {
  const url = COLUMN_ENDPOINT + `${columnId}`;
  const res = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not edit this column');
  }

  const data = await res.json();
  return getColumnList(data.boardId);
};
