import React, { useState, useEffect } from 'react';
import { useRouteQuery } from '../../utils/routerUtils';
import DisplayPosts from './DisplayPosts.jsx';

const PostList = () => {
	let routeQuery = useRouteQuery();
	const [key, setKey] = useState(0);
	const [titleQuery, setTitleQuery] = useState('');
	const [mounted, setMounted] = useState(false);
	const currentTag = routeQuery.get('tag');

	useEffect(() => {
		if (mounted) {
			setKey(key + 1);
		}
	}, [currentTag, titleQuery]);

	const keyDownHandler = (e) => {
		if (e.key === 'Enter') {
			setTitleQuery(e.target.value);
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
				tag={currentTag}
				titleQuery={titleQuery}
				setMounted={setMounted}
			/>
		</React.Fragment>
	);
}

export default PostList;