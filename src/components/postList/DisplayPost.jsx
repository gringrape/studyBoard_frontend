import React from 'react';
import DisplayDate from './DisplayDate.jsx';

// content 에서 text 뽑아내기
const getText = (content) => {
	const array = content.match(/<p>.*<\/p>/g);
	return array ? array.map((str) => str.slice(3, -4)).join(' ') : '';
};

const PostItem = (props) => {
	const { title, content, tags, at } = props.data;
	return (
		<div>
			<h1>{title}</h1>
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
