import { lazy } from 'react';

const componentRootPath = './components';

const config = [
  {
    path: '/list',
    Component: 'PostList',
    type: '.jsx'
  },
  {
    path: '/add',
    Component: 'AddPost',
    type: '.jsx'
  },
  {
    path: '/:id',
    Component: 'SinglePost',
    type: '.jsx'
  }
];

export default config.map(obj => {
  const componentPath = `${componentRootPath}/${obj.Component}${obj.type}`;
  return Object.assign(
    obj, 
    {Component: lazy(() => import(`${componentPath}`))}
)});