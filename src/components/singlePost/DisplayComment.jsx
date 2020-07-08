import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const DELETE_COMMENT = gql`
	mutation DeleteComment($id: String!) {
		deleteComment(id: $id) {
			id
		}
	}
`;

const MODIFY_COMMENT = gql`
	mutation ModifyComment($input: ModifyCommentInput) {
		modifyComment(input: $input) {
			id
			writer
			content
		}
	}
`;

const DisplayComment = ({ comment, deleteHandler, modifyHandler }) => {
	const { id, writer, content } = comment;
	const [ deleteComment ] = useMutation(DELETE_COMMENT);
	const [ modifyComment ] = useMutation(MODIFY_COMMENT);
	const [ isModifying, setIsModifying ] = useState(false);
	const [ newContent, setNewContent ] = useState(content);

	const deleteThis = async () => {
		const {data} = await deleteComment({ variables: { id } });
		if (data) {
			deleteHandler(id);
		}
		// TODO: error 처리
	};

	const modifyThis = async () => {
		const {data} = await modifyComment({ variables: { input: { id, content: newContent } } });
		if (data) {
      modifyHandler(data.modifyComment);
      setIsModifying(false);
		}
	};

	const modifyInputHandler = (e) => {
		setNewContent(e.target.value);
	};

	return (
		<div
			className="comment-container"
			style={{
				border: '1px solid black',
				padding: '2rem'
			}}
		>
			{isModifying ? (
				<React.Fragment>
					<p>작성자: {writer}</p>
					<input type="text" value={newContent} onChange={modifyInputHandler} />
					<button onClick={modifyThis}>댓글 수정</button>
					<button onClick={() => setIsModifying(false)}>수정취소</button>
				</React.Fragment>
			) : (
				<React.Fragment>
					<p>작성자: {writer}</p>
					<p>내용: {content}</p>
					<button onClick={deleteThis}>삭제하기</button>
					<button onClick={() => setIsModifying(true)}>수정하기</button>
				</React.Fragment>
			)}
		</div>
	);
};

export default DisplayComment;
