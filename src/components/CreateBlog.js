import { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

import './CreateBlog.css';

const CreateBlog = ({ fetchBlogs, newNotification, toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      await blogService.createBlog(newBlog);
      fetchBlogs();
      toggleVisibility();
      newNotification('New blog created!', 'success');
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      console.log(exception);
      newNotification('Creating a new blog failed!', 'error');
    }
  };

  return (
    <div>
      <h2>Create new:</h2>
      <form onSubmit={handleSubmit} className='createBlog__form'>
        <label htmlFor='title'>Title:</label>
        <input
          name='title'
          value={title}
          type='text'
          id='title'
          onChange={({ target }) => setTitle(target.value)}
        />
        <label htmlFor='author'>Author:</label>
        <input
          name='author'
          value={author}
          type='text'
          id='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
        <label htmlFor='url'>url:</label>
        <input
          name='url'
          value={url}
          type='text'
          id='url'
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

CreateBlog.propTypes = {
  fetchBlogs: PropTypes.func.isRequired,
  newNotification: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
};

export default CreateBlog;
