import React, { useEffect } from 'react';
import DisplayPost from './DisplayPost.jsx';
import { useQuery } from '@apollo/react-hooks';
import postListQuery from '../../graphql/postList.graphql';

const DisplayPosts = ({ tag, titleQuery, setMounted }) => {
	window.onscroll = function(ev) {
		const scrollReachesBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
		if (scrollReachesBottom) {
			fetchMore({
				variables: {
					offset: data.getPosts.length
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					console.log(prev);
					if (!fetchMoreResult) {
						return prev;
					}
					return {
						getPosts: [ ...prev.getPosts, ...fetchMoreResult.getPosts ]
					};
				}
			});
		}
	};

	useEffect(() => {
		setMounted(true);
		return () => {
			setMounted(false);
		}
	}, []);

	const { loading, error, data, fetchMore } = useQuery(postListQuery, {
		variables: {
			offset: 0,
			limit: 10,
			tag,
			titleQuery
		}
	});

	if (loading) {
		return <p>loading...</p>;
	}

	if (error) {
		return <p>error :(</p>;
	}

	return (
		<div className="list-container">
			<div>
				{data.getPosts.map((post, i) => (
					<React.Fragment>
						<DisplayPost className="post-box" key={i} data={post} />
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default DisplayPosts;
