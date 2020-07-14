import React, { useState, useEffect } from 'react';
import { useRouteQuery } from '../../utils/routerUtils';
import DisplayPosts from './DisplayPosts.jsx';
import { MdSearch } from 'react-icons/md';
import TagNav from './TagNav.jsx';
import {container, search, searchBox, searchIcon} from './PostList.module.scss';

const PostList = () => {
	let routeQuery = useRouteQuery();
	const [ key, setKey ] = useState(0);
	const [ titleQuery, setTitleQuery ] = useState('');
	const [ tag, setTag ] = useState('');
	const [ mounted, setMounted ] = useState(false);
	const tagParam = routeQuery.get('tag');

	const updateList = () => {
		if (mounted) {
			setKey(key + 1);
		}
	};

	useEffect(
		() => {
			setTag(tagParam);
			setTitleQuery('');
			updateList();
		},
		[ tagParam ]
	);

	const keyDownHandler = (e) => {
		if (e.key === 'Enter') {
			setTitleQuery(e.target.value);
			setTag('');
			updateList();
		}
	};

	return (
		<div className={container}>
			<div>
				<div className={searchBox}>
					<MdSearch className={searchIcon} size="2.5rem" />
					<input className={search} type="text" placeholder="제목을 검색하세요" onKeyDown={keyDownHandler} />
				</div>
				<TagNav />
			</div>
			<DisplayPosts key={key} tag={tag} titleQuery={titleQuery} setMounted={setMounted} />
		</div>
	);
};

export default PostList;
