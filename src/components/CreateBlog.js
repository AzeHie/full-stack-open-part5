import { useState } from 'react';
import PropTypes from 'prop-types';

import './CreateBlog.css';

const CreateBlog = ({ handleCreateBlog, toggleVisibility }) => {
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

    handleCreateBlog(newBlog);
    toggleVisibility();
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new:</h2>
      <form onSubmit={handleSubmit} className='createBlog__form'>
        <label htmlFor='title-input'>Title:</label>
        <input
          name='title'
          value={title}
          type='text'
          id='title-input'
          onChange={({ target }) => setTitle(target.value)}
        />
        <label htmlFor='author-input'>Author:</label>
        <input
          name='author'
          value={author}
          type='text'
          id='author-input'
          onChange={({ target }) => setAuthor(target.value)}
        />
        <label htmlFor='url-input'>url:</label>
        <input
          name='url'
          value={url}
          type='text'
          id='url-input'
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type='submit' id='create-button'>Create</button>
      </form>
    </div>
  );
};

CreateBlog.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
};

export default CreateBlog;
