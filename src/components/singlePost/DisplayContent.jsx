import React from 'react';
import parse from 'html-react-parser';
import './DisplayContent.scss';

const DisplayContent = ({ content = '...' }) => {
	return (
		<div>
			<div>{parse(content, {
				replace: domNode => {
					if (domNode.name === 'img') {
						domNode.attribs.class = 'content-img';
						return domNode;
					}
				}
			})}</div>
		</div>
	);
};

export default DisplayContent;
