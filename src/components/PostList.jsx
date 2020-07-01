import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const POST_LIST = gql`
	query {
		getPosts(number: 20) {
			title
			content
		}
	}
`;

const PostList = () => {
	const { loading, error, data } = useQuery(POST_LIST);

	if (loading) {
		return <p>loading...</p>;
	}

	if (error) {
		return <p>Error :(</p>;
	}

	const { getPosts: posts } = data;
	return (
		<div>
			{posts.map((post) => (
				<div>
					<h1>{post.title}</h1>
					<p>{post.content}</p>
				</div>
			))}
		</div>
	);
};

export default PostList;
