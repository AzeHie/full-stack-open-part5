import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../../components/Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Testing blog component',
    author: 'Test author',
    url: 'Some random url',
    likes: 0,
    user: {
      username: 'testing',
      name: 'test',
      id: 'testuserid',
    },
  };

  const user = {
    username: 'testing',
    id: 'testuserid',
  };

  test('Component renders blog title', () => {
    render(<Blog blog={blog} user={user} />);

    const element = screen.getByText(/Testing blog component/);
    expect(element).toBeDefined();
  });

  test('all the blog details are shown, if button clicked', async () => {
    render(<Blog blog={blog} user={user}/>);

    const userInstance = userEvent.setup();
    const button = screen.getByText('View');
    await userInstance.click(button);

    const urlElement = screen.getByText('Url: Some random url');
    const likesElement = screen.getByText('Likes: 0');
    const authorElement = screen.getByText('Author: Test author');

    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();
    expect(authorElement).toBeDefined();
  });
});
