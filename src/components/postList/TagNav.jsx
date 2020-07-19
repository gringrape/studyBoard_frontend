import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { linkBox, linkItem, linkTitle } from './TagNav.module.scss';
import tagListQuery from '../../graphql/tagList.graphql';

const TagNav = () => {
	const { loading, error, data } = useQuery(tagListQuery);

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
			{tags ? tags.map(({ name, count }, idx) => (
				<Link className={linkItem} key={idx} to={`/list?tag=${name}`}>
					#{name} (<span>{count}</span>)
				</Link>
			)): ''}
		</div>
	);
};

export default TagNav;
