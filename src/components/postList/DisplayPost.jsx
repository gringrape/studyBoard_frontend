import React from 'react';
import DisplayDate from './DisplayDate.jsx';
import { Link } from 'react-router-dom';
import { MdSchedule, MdDateRange } from 'react-icons/md';
import './DisplayPost.scss';

// content 에서 text 뽑아내기
const getText = (content) => {
	const doc = new DOMParser().parseFromString(content, 'text/html').body;
	let children = Array.from(doc.querySelectorAll('*'));
	children.forEach((node) => {
		if (node.textContent) {
			node.textContent += ' ';
		}
	});
	const text = doc.textContent;
	return text.length > 200 ? text.slice(0, 200) + '...' : text;
};

const calculateReadingTime = (content) => {
	const wordCount = getText(content).split(' ').length;
	return Math.round(wordCount / 200);
};

const PostItem = (props) => {
	const { id, title, content, tags, at } = props.data;
	return (
		<div className="post">
			<div className="post__tag-box">
				{tags.map((tag, i) => (
					<span key={i} className="post__tag-box" >
						<Link className="post__tag" to={`/list?tag=${tag}`}>
						#{tag}
				</Link>
						
					</span>
				))}
			</div>
			<div className="post__title-box">
				<h1>
					<Link className="post__title" to={`/posts/${id}`}>
						{title}
					</Link>
				</h1>
			</div>
			<p> {getText(content)}</p>
			<br />
			<p>
				<MdDateRange style={{ color: 'lightblue' }} /> <DisplayDate dateString={at} />  &nbsp;
				<MdSchedule style={{ color: 'lightblue' }} /> {calculateReadingTime(content)} min read{' '}
			</p>
			<Link className="post__title" to={`/posts/${id}`}>
				<button className="btn post__btn">READ MORE</button>
			</Link>
		</div>
	);
};

export default PostItem;
