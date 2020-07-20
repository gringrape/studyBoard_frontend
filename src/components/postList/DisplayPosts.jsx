import React, { useEffect } from 'react';
import DisplayPost from './DisplayPost.jsx';
import { useQuery } from '@apollo/react-hooks';
import postListQuery from '../../graphql/postList.graphql';
import { useInView } from 'react-intersection-observer';

const DisplayPosts = ({ tag, titleQuery, setMounted }) => {
	const [ref, inView, entry] = useInView({
    threshold: 0,
  });

	useEffect(() => {
		setMounted(true);
		return () => {
			setMounted(false);
		};
	}, []);

	useEffect(() => {
		if (inView) {
			const updateQuery = (prevData, { fetchMoreResult: moreData }) => {
				return (!moreData) 
					? prevData
					: ({ getPosts: [ ...prevData.getPosts, ...moreData.getPosts ]});
			};
			fetchMore({ 
				variables: {offset: data.getPosts.length},
				updateQuery
			});
		}
	}, [inView]);

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
					<DisplayPost className="post-box" key={i} data={post} />
				))}
				<div ref={ref} style={{width: "100%", height: "5rem", backgroundColor: "white", margin: "5rem 0"}}></div>
			</div>
		</div>
	);
};

export default DisplayPosts;
