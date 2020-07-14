import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { commentInput } from './AddComment.module.scss';
import addCommentQuery from '../../graphql/addComment.graphql';

const AddComment = ({ post_id, addHandler }) => {
	const [ addComment ] = useMutation(addCommentQuery);
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
