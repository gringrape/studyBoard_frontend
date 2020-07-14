import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { linkBox, linkItem, linkTitle } from './TagNav.module.scss';

const TAG_LIST = gql`
	query {
		getTags {
			name
			count
		}
	}
`;

const TagNav = () => {
	const { loading, error, data } = useQuery(TAG_LIST);

	if (loading) {
		return '';
	}

	if (error) {
		return '';
	}

	const { getTags: tags } = data;
	return (
		<div className={linkBox}>
      <h2 className={linkTitle}>TAGs</h2>
			{tags.map(({ name, count }, idx) => (
				<Link className={linkItem} key={idx} to={`/list?tag=${name}`}>
					#{name} (<span>{count}</span>)
				</Link>
			))}
		</div>
	);
};

export default TagNav;
