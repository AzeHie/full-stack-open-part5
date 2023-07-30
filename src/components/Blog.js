import { Fragment, useState } from 'react';

import './Blog.css';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

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
          <span>
            Likes: {blog.likes}
            <button>like</button>
          </span>
          <span>Author: {blog.author}</span>
        </div>
      )}
    </Fragment>
  );
};

export default Blog;
