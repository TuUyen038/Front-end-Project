import { USER_ENDPOINT } from '../../../../setting/globalVariable';

export const getUser = async (id) => {
  const Token = localStorage.token;
  const url = USER_ENDPOINT + `/${id}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  // nếu lấy ko thành công
  if (!res.ok) {
    console.log('can not get user from fetch');
    return null;
  }

  return res.json();
};

export const getUsersOfProject = async (project) => {
  if (project.userOrderIds.length === 0) {
    return [];
  }
  const users = await Promise.all(
    project.userOrderIds.map((id) => getUser(id))
  );
  return users;
};

export const getMemberOfCard = async (card) => {
  if (card.userOrderIds.length === 0) {
    return;
  }
  const users = await Promise.all(card.userOrderIds.map((id) => getUser(id)));
  return users;
};
