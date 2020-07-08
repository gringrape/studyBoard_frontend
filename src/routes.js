import PostList from './components/postList/PostList.jsx';
import AddPost from './components/addPost/AddPost.jsx';
import SinglePost from './components/singlePost/SinglePost.jsx';
import ModifyPost from './components/ModifyPost.jsx';

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
    path: '/posts/:id',
    Component: SinglePost,
  },
  {
    path: '/modify/:id',
    Component: ModifyPost,
  }
];

