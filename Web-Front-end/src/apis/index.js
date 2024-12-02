import { BACKEND_ENDPOINT } from '../../setting/globalVariable';

const baseURL = BACKEND_ENDPOINT;

export const UserAPI = {
  login: (email, password) => {
    try {
      const url = `${baseURL}/users/login`;
      const body = {
        email,
        password,
      };
      const res = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },

  register: (name, email, password) => {
    try {
      const url = `${baseURL}/users`;
      const body = {
        name,
        email,
        password,
      };
      const res = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },

  getUser: (token) => {
    try {
      const url = `${baseURL}/users`;
      const res = fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, //token để biết user nào đang login
          //request nào có protect thì phải có token
        },
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },

  confirmUserEmail: (email, verificationToken) => {
    try {
      const url = `${baseURL}/confirmation/${email}/${verificationToken}`
      const res = fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },

  resendVerification: (email) => {
    try {
      const url = `${baseURL}/resendverificationlink/${email}`
      const res = fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
};