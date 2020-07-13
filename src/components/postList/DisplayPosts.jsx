import React, { useState, useEffect } from 'react';
import { useImperativeQuery } from '../../utils/queryUtils.js';
import { useInView } from 'react-intersection-observer';
import { gql } from 'apollo-boost';
import DisplayPost from './DisplayPost.jsx';
import './DisplayPosts.scss';

const POST_LIST = gql`
	query GetPosts($page: Int!, $per: Int!, $tag: String, $titleQuery: String) {
		getPosts(page: $page, per: $per, tag: $tag, titleQuery: $titleQuery) {
			id
			title
			content
			tags
			at
		}
	}
`;

const DisplayPosts = ({ tag, titleQuery, setMounted }) => {
	const callQuery = useImperativeQuery(POST_LIST);
	const [ posts, setPosts ] = useState([]);
	const [ page, setPage ] = useState(0);
	const [ prevY, setPrevY ] = useState(0);
	const [ ref, inView, entry ] = useInView({
		/* Optional options */
		threshold: 0
	});

	const fetchPosts = async (page, per) => {
		const { data, error } = await callQuery({ page, per, tag, titleQuery });
		if (data) {
			setPosts(posts.concat(data.getPosts));
			setPage(page + 1);
		}
		// TODO: error 발생시의 대처
	};

	useEffect(() => {
		// component did mount
		setMounted(true);
		fetchPosts(page, 10);
		return () => {
			// component will unmount
			setMounted(false);
		};
	}, []);

	useEffect(
		() => {
			if (entry && inView) {
				const bodyRect = document.body.getBoundingClientRect();
				const elemRect = entry.target.getBoundingClientRect();
				const y = elemRect.top - bodyRect.top;
				if (prevY < y) {
					fetchPosts(page, 10);
					setPrevY(y);
				}
			}
		},
		[ inView ]
	);

	return (
		<div className="list-container">
			<div>
				{posts.map((post, i) => (
					<React.Fragment>
						<DisplayPost className="post-box" key={i} data={post} />
						<hr className="post-divider"/>
					</React.Fragment>
				))}
			</div>
			<br ref={ref} />
		</div>
	);
};

export default DisplayPosts;
