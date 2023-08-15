import { Fragment, useState } from 'react';

import './Blog.css';

const Blog = ({ blog, user, handleNewLike, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false);

  const newLike = () => {
    handleNewLike(blog);
  };

  const removeBlog = () => {
    handleRemove(blog);
  };

  const removeBtn =
    blog.user.username === user.username ? (
      <button className='blog__remove-button' onClick={removeBlog}>
        Remove
      </button>
    ) : null;

  return (
    <Fragment>
      {!showDetails && (
        <div className='blog__title'>
          {blog.title} by {blog.author}
          <button
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            View
          </button>
        </div>
      )}
      {showDetails && (
        <div className='blog__all-details'>
          <span>
            Title: {blog.title}
            <button
              onClick={() => {
                setShowDetails(!showDetails);
              }}
            >
              hide
            </button>
          </span>
          <span>Url: {blog.url}</span>
          <span className="blog__likes">
            Likes: {blog.likes}
            <button onClick={newLike}>like</button>
          </span>
          <span>Author: {blog.author}</span>
          {removeBtn}
        </div>
      )}
    </Fragment>
  );
};

export default Blog;
