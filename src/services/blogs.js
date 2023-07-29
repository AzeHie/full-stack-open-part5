import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);

  return request.data;
};

const createBlog = async (newObject) => {
  const config = {
    headers: { authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, setToken };
