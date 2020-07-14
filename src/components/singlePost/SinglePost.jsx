import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useImperativeQuery } from '../../utils/queryUtils';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import AddComment from './AddComment.jsx';
import DisplayComment from './DisplayComment.jsx';
import DisplayContent from './DisplayContent.jsx';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import {
	sibling,
	siblings,
	siblingIcon,
	container,
	heading,
	headingBox,
	deleteButton,
	modifyButton,
	secondBox,
	writerBox
} from './SinglePost.module.scss';

const SINGLE_POST = gql`
	query GetSinglePost($id: ID!) {
		getPost(id: $id) {
			id
			writer
			title
			content
			tags
			at
			prev_id
			prev_title
			next_id
			next_title
			comments {
				id
				writer
				content
			}
		}
	}
`;

const DELETE_POST = gql`
	mutation DeletePost($id: String!) {
		deletePost(id: $id) {
			id
		}
	}
`;

const SinglePost = () => {
	let { id } = useParams();
	let history = useHistory();
	const callQuery = useImperativeQuery(SINGLE_POST);
	const [ postData, setPostData ] = useState({});
	const [ comments, setComments ] = useState([]);
	const [ deletePost ] = useMutation(DELETE_POST);

	const { title, postId, writer, content, tags, at, prev_id, prev_title, next_id, next_title } = postData;

	const deletePostHandler = async () => {
		const { data } = await deletePost({ variables: { id } });
		if (data) {
			history.push('/list');
			history.go();
		}
	};

	const modifyPostHandler = () => {
		history.push(`/modify/${id}`);
		history.go();
	};

	const addCommentHandler = (comment) => {
		setComments(comments.concat(comment));
	};

	const deleteCommentHandler = (id) => {
		setComments(comments.filter(({ id: commentId }) => commentId !== id));
	};

	const modifyCommentHandler = (newComment) => {
		setComments(comments.filter((comment) => comment.id !== newComment.id).concat(newComment));
	};

	const moveToSibling = (id) => {
		history.push(`/posts/${id}`);
		history.go();
	};

	const fetchPost = async (id) => {
		const { data, error } = await callQuery({ id });
		if (data) {
			const { comments: got } = data.getPost;
			setPostData(data.getPost);
			if (got) {
				console.log(got);
				setComments(comments.concat(got));
			}
		}
		// TODO: error 발생시의 대처
	};

	useEffect(() => {
		fetchPost(id);
	}, []);

	return (
		<div className={container}>
			<div className={headingBox}>
				<h1 className={heading}>{title}</h1>
			</div>
			<div className={secondBox}>
				<p className={writerBox}>by {writer}</p>
				<div className="single-post__title-button-box">
					<button className={modifyButton} onClick={modifyPostHandler}>
						수정하기
					</button>
					<button className={deleteButton} onClick={deletePostHandler}>
						삭제하기
					</button>
				</div>
			</div>

			<p>{postId}</p>
			<DisplayContent content={content} />
			<div className={siblings}>
				{prev_id ? (
					<button onClick={() => moveToSibling(prev_id)} className={sibling}>
						<MdArrowBack className={siblingIcon} /> &nbsp;&nbsp;&nbsp; {prev_title}
					</button>
				) : (
					''
				)}
				{next_id ? (
					<button onClick={() => moveToSibling(next_id)} className={sibling}>
						{next_title} &nbsp;&nbsp;&nbsp; <MdArrowForward className={siblingIcon} />
					</button>
				) : (
					''
				)}
			</div>
			<h2>{comments.length} 개의 댓글이 있습니다</h2>
			<AddComment post_id={id} addHandler={addCommentHandler} />
			{comments.map((comment, idx) => (
				<DisplayComment
					key={idx}
					comment={comment}
					deleteHandler={deleteCommentHandler}
					modifyHandler={modifyCommentHandler}
				/>
			))}
		</div>
	);
};

export default SinglePost;
