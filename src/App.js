import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import userService from './services/users';

import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const loadedBlogs = await blogService.getAll();

      setBlogs(loadedBlogs);
    };
    fetchBlogs();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const userLogin = await userService.login(username, password);

    setUser(userLogin);
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div className='login__inputs'>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              value={username}
              name='username'
              id='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className='login__inputs'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              value={password}
              name='password'
              id='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
