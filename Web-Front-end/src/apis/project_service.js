import { PROJECT_ENDPOINT } from '../../setting/globalVariable';


export const getProjectBySlug = async (slug) => {
  const Token = localStorage.token;
  const url = PROJECT_ENDPOINT + `${slug}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  if (!res.ok) {
    // alert('res not ok');
    console.log('fetch project from slug is not ok');
  }

  // const data = await res.json();
  // console.log('Response data:', data);
  return res.json();
};
