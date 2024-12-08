import {
  BOARD_ENDPOINT,
  COLUMN_ENDPOINT,
} from '../../../../setting/globalVariable';

export const getColumnList = async (boardId) => {
  const Token = localStorage.token;

  const url = BOARD_ENDPOINT + `${boardId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!res.ok) {
    alert('can not get board list');
  }

  const data = await res.json();
  if (data.columnOrderIds.length === 0) {
    return undefined;
  }
  const columns = await Promise.all(
    data.columnOrderIds.map((id) => getColumn(id))
  );
  return columns;
};

export const getColumn = async (columnId) => {
  const Token = localStorage.token;

  const url = COLUMN_ENDPOINT + `${columnId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!res.ok) {
    alert('can not get this column data');
  }

  const data = await res.json();
  return data;
};
