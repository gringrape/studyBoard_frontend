import PostList from './components/postList/PostList';
import AddPost from './components/addPost/AddPost';
import SinglePost from './components/singlePost/SinglePost';
import ModifyPost from './components/modifyPost/ModifyPost';

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

