import { USER_ENDPOINT } from '../../../../setting/globalVariable';

export const getUser = async (id) => {
  const Token = localStorage.token;
  const url = USER_ENDPOINT + `${id}`;
  const res = fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  // nếu lấy ko thành công
  if (!res.ok()) {
    console.log('can not get user from fetch');
    return null;
  }

  return res.json();
};