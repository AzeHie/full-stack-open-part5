import axios from 'axios';

const baseUrl = '/api/login';

const login = async (username, password) => {
  const res = await axios.post(baseUrl, { username, password });

  return res.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
