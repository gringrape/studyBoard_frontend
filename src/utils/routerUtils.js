import { useLocation } from 'react-router-dom';

const useRouteQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export {
  useRouteQuery
};