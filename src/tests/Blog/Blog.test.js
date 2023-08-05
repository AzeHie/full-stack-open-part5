import React from 'react';
import { render, screen } from '@testing-library/react';
import Blog from '../../components/Blog';

describe('<Blog />', () => {
  test('Component renders blog title', () => {
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

    render(<Blog blog={blog} user={user} />);

    const element = screen.getByText(/Testing blog component/);
    expect(element).toBeDefined();
  });
});
