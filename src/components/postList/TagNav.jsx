import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const TAG_LIST = gql`
	query {
    getTags {
      name
      count
    }
	}
`;

const TagNav = () => {
  const {loading, error, data} = useQuery(TAG_LIST);

  if (loading) {
    return <></>;
  }
  
  if (error) {
    return <></>;
  }

  const {getTags: tags} = data;
  return (
    <div>
      {
        tags.map(({name, count}, idx) => (
        <Link
          key={idx}
          to={`/list?tag=${name}`}
        >
          {name}(<span>{count}</span>)
        </Link>
        ))
      }
    </div>
  ); 
}

export default TagNav;