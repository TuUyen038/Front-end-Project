import {
  CARD_ENDPOINT,
  COLUMN_ENDPOINT,
} from '../../../../setting/globalVariable';

export const getCardList = async (columnId) => {
  const Token = localStorage.token;

  const url = COLUMN_ENDPOINT + `${columnId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.log('can not get card list');
  }

  const data = await res.json();
  if (data.cardOrderIds === 0) {
    return [];
  }
  const cards = await Promise.all(data.cardOrderIds.map((id) => getCard(id)));
  return cards;
};

export const getCard = async (cardId) => {
  const Token = localStorage.token;

  const url = CARD_ENDPOINT + `${cardId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.log('can not get this card data');
  }

  const data = await res.json();
  return data;
};
