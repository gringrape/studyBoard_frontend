import React, { useState, useEffect } from 'react';
import { useRouteQuery } from '../../utils/routerUtils';
import DisplayPosts from './DisplayPosts.jsx';

const PostList = () => {
	let routeQuery = useRouteQuery();
	const [key, setKey] = useState(0);
	const [titleQuery, setTitleQuery] = useState('');
	const [tag, setTag] = useState('');
	const [mounted, setMounted] = useState(false);
	const tagParam = routeQuery.get('tag'); 

	const updateList = () => {
		if (mounted) {
			setKey(key + 1);
		}
	}

	useEffect(() => {
		setTag(tagParam);
		setTitleQuery('');
		updateList();
	}, [tagParam]);

	const keyDownHandler = (e) => {
		if (e.key === 'Enter') {
			setTitleQuery(e.target.value);
			setTag('');
			updateList();
		}
	}

	return (
		<React.Fragment>
			<input 
				type="text" 
				onKeyDown={keyDownHandler} 
			/>
			<DisplayPosts 
				key={key} 
				tag={tag}
				titleQuery={titleQuery}
				setMounted={setMounted}
			/>
		</React.Fragment>
	);
}

export default PostList;