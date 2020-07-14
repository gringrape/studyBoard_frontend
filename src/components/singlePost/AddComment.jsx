import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { commentInput } from './AddComment.module.scss';

const ADD_COMMENT = gql`
	mutation AddComment($commentInput: CommentInput) {
		addComment(input: $commentInput) {
			id
			writer
			content
		}
	}
`;

const AddComment = ({ post_id, addHandler }) => {
	const [ addComment ] = useMutation(ADD_COMMENT);
	const [ content, setContent ] = useState('');

	const keyDownHanlder = async (e) => {
		if (e.key === 'Enter' && content.length > 0 && !e.shiftKey) {
			const { data } = await addComment({
				variables: {
					commentInput: {
						post_id,
						writer: 'Jin',
						content
					}
				}
			});
			addHandler(data.addComment);
			setContent('');
		}
	};

	const changeHandler = (e) => {
		setContent(e.target.value);
	};

	return (
		<div>
			<textarea
				className={commentInput}
				placeholder="댓글을 입력하세요"
				onKeyDown={keyDownHanlder}
				onChange={changeHandler}
				value={content}
			/>
		</div>
	);
};

export default AddComment;
