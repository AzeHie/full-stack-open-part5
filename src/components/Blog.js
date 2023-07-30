import { Fragment, useState } from 'react';

import blogService from '../services/blogs';
import './Blog.css';

const Blog = ({ blog, fetchBlogs, newNotification, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleNewLike = async () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    try {
      await blogService.editBlog(newBlog);
      fetchBlogs();
    } catch (exception) {
      newNotification('Failed to add new like!', 'error');
    }
  };

  const handleRemove = async () => {
    const confirmation = window.confirm(
      `Are you sure you want to remove blog ${blog.title} by ${blog.author}`
    );

    if (confirmation) {
      try {
        await blogService.removeBlog(blog.id);
        newNotification('Blog removed Successfully', 'success');
        fetchBlogs();
      } catch (exception) {
        newNotification('Removing the blog failed!', 'error');
      }
    }
  };

  const removeBtn =
    blog.user.username === user.username ? (
      <button className='blog__remove-button' onClick={handleRemove}>
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
          <span>
            Likes: {blog.likes}
            <button onClick={handleNewLike}>like</button>
          </span>
          <span>Author: {blog.author}</span>
          {removeBtn}
        </div>
      )}
    </Fragment>
  );
};

export default Blog;
