import { PROJECT_ENDPOINT } from '../../setting/globalVariable';

export const getProjectBySlug = async (slug, onFail) => {
  const url = PROJECT_ENDPOINT + `${slug}`; // sua cai nay hoy ne
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'apllication/json',
    },
  });

  if (!res.ok) {
    onFail();
  }

  const data = await res.json();
  return data;
};
