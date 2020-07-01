import PostList from './components/PostList.jsx';
import AddPost from './components/AddPost.jsx';
import SinglePost from './components/SinglePost.jsx';

export const routes = [
  {
    path: '/list',
    Component: PostList,
  },
  {
    path: '/add',
    Component: AddPost,
  },
  {
    path: 'posts/:id',
    Component: SinglePost,
  }
];

