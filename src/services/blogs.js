import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const getConfig = () => {
  return {
    headers: { authorization: token },
  };
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);

  return request.data;
};

const createBlog = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const editBlog = async (newBlog) => {
  const response = await axios.put(
    `${baseUrl}/${newBlog.id}`,
    newBlog,
    getConfig()
  );
  return response.data;
};

const removeBlog = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, getConfig());
  return response.data;
};

export default { getAll, createBlog, setToken, editBlog, removeBlog };
