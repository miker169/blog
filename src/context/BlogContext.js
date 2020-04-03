import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const DELETE_BLOG_POST = 'DELETE_BLOG_POST';
const EDIT_BLOG_POST = 'EDIT_BLOG_POST';
const GET_BLOG_POSTS = 'GET_BLOG_POSTS';

const blogReducer = (state, { type, payload }) => {
  console.log(type);
  switch (type) {
    case GET_BLOG_POSTS:
      return payload;
    case EDIT_BLOG_POST:
      console.log('here');
      return state.map((blogPost) => (blogPost.id === payload.id ? payload : blogPost));
    case DELETE_BLOG_POST:
      return state.filter((post) => post.id !== payload);
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => async () => {
  const response = await jsonServer.get('/blogPosts');
  dispatch({ type: GET_BLOG_POSTS, payload: response.data });
};

const addBlogPost = () => async (title, content, callback) => {
  await jsonServer.post('/blogPosts', {
    title,
    content
  });
  if (callback) {
    callback();
  }
};
const deleteBlogPost = (dispatch) => async (id) => {
  await jsonServer.delete(`/blogPosts/${id}`);
  dispatch({ type: DELETE_BLOG_POST, payload: id });
};

const editBlogPost = (dispatch) => async (id, title, content, callback) => {
  console.log('here');
  await jsonServer.put(`/blogPosts/${id}`, {
    title,
    content
  });
  console.log('heresd')
  dispatch({ type: EDIT_BLOG_POST, payload: {id, title, content} });
  callback();
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts
  },
  []
);
