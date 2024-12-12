import {
  CARD_ENDPOINT,
  COMMENT_ENDPOINT,
} from '../../../../setting/globalVariable';

export const getCommentList = async (cardId) => {
  const Token = localStorage.token;

  const url = CARD_ENDPOINT + `${cardId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!res.ok) {
    alert('can not get comment list');
  }

  const data = await res.json();
  if (data.commentOrderIds.length === 0) {
    return [];
  }
  const comments = await Promise.all(
    data.commentOrderIds.map((id) => getComment(id))
  );
  return comments;
};

export const getComment = async (commentId) => {
  const Token = localStorage.token;

  const url = COMMENT_ENDPOINT + `${commentId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!res.ok) {
    alert('can not get this comment data', commentId);
  }

  const data = await res.json();
  return data;
};
