import { Fragment, useState } from 'react';

import './Blog.css';
import Notification from '../shared/Notification';
import { newNotification } from '../shared/utils/NotificationUtils';
import blogService from '../services/blogs';

const Blog = ({ blog, fetchBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [notificationStyles, setNotificationStyles] = useState();

  const handleNewLike = async () => {
    const newBlog = {
      ...blog,
      user: blog.user._id,
      likes: blog.likes + 1,
    };

    try {
      await blogService.editBlog(newBlog);
      fetchBlogs();
    } catch (exception) {
      newNotification(
        'Failed to add new like!',
        'error',
        setNotificationMessage,
        setNotificationStyles
      );
    }
  };

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
          <Notification message={notificationMessage} styles={notificationStyles} />
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
        </div>
      )}
    </Fragment>
  );
};

export default Blog;
