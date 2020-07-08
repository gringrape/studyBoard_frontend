import React from 'react';
import DisplayDate from './DisplayDate.jsx';
import { Link } from 'react-router-dom';

// content 에서 text 뽑아내기
const getText = (content) => {
	return (new DOMParser())
		.parseFromString(content, 'text/html')
		.documentElement
		.textContent;
};

const PostItem = (props) => {
	const { id, title, content, tags, at } = props.data;
	return (
		<div>
			<h1>
				<Link to={`/posts/${id}`}>
					{title}
				</Link>
			</h1>
			<p>{getText(content)}</p>
			<DisplayDate dateString={at} />
			<p>
				{tags.map((tag, i) => (
					<span key={i} className="tag">
						{tag}
					</span>
				))}
			</p>
		</div>
	);
};

export default PostItem;
