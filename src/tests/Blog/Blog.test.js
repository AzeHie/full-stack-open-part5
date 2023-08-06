import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../../components/Blog';
import blogService from '../../services/blogs';
import CreateBlog from '../../components/CreateBlog';
jest.mock('../../services/blogs');


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
    render(<Blog blog={blog} user={user} />);

    blogService.editBlog.mockResolvedValue({});

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

  test('when like button is clicked, handler function is called', async () => {
    const mockHandler = jest.fn();

    render(<Blog blog={blog} user={user} handleNewLike={mockHandler} />);

    const userInstance = userEvent.setup();

    const viewButton = screen.getByText('View');
    await userInstance.click(viewButton);

    const likeButton = screen.getByText('like');
    await userInstance.click(likeButton);
    await userInstance.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});

describe('<CreateBlog />', () => {
  test('handleCreateBlog is called with correct data', async () => {
    const handleCreateBlog = jest.fn();
    const toggleVisibility = jest.fn();

    const { container } = render(<CreateBlog handleCreateBlog={handleCreateBlog} toggleVisibility={toggleVisibility}/>);

    const titleInput = container.querySelector('#title-input');
    const authorInput = container.querySelector('#author-input');
    const urlInput = container.querySelector('#url-input');
    const createButton = screen.getByText('Create');

    await userEvent.type(titleInput, 'testing blog creation');
    await userEvent.type(authorInput, 'test author');
    await userEvent.type(urlInput, 'randomurlhere');
    await userEvent.click(createButton);

    expect(handleCreateBlog).toHaveBeenCalledTimes(1);
    expect(handleCreateBlog).toHaveBeenCalledWith({
      title: 'testing blog creation',
      author: 'test author',
      url: 'randomurlhere'
    });
  });
});
