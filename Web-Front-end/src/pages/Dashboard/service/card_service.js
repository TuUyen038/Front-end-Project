import {
  CARD_ENDPOINT,
  COLUMN_ENDPOINT,
} from '../../../../setting/globalVariable';

export const getCardList = async (columnId) => {
  const url = COLUMN_ENDPOINT + `${columnId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not get card list');
  }

  const data = await res.json();
  const cards = await Promise.all(data.cardOrderIds.map((id) => getCard(id)));
  return cards;
};

export const getCard = async (cardId) => {
  const url = CARD_ENDPOINT + `${cardId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not get this card data');
  }

  const data = await res.json();
  return data;
};

// nhung thao tac se can chuyen doi sang socket.io / real-time

export const addCard = async (payload) => {
  const url = CARD_ENDPOINT;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not add new card');
  }

  const data = await res.json();
  return getCardList(data.columnId);
};

export const editCard = async (cardId, payload) => {
  const url = CARD_ENDPOINT + `${cardId}`;
  const res = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not edit this card');
  }

  const data = await res.json();
  return getCardList(data.columnId);
};

export const deleteCard = async (cardId) => {
  const url = CARD_ENDPOINT + `${cardId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    alert('can not delete this card');
  }

  const data = await res.json();
  return getCardList(data.columnId);
};
