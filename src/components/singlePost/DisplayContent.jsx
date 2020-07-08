import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

const DisplayContent = ({ content = '...' }) => {
	const [ headings, setHeadings ] = useState([]);

	const extractHeadings = (content) => {
		let headings = [];
		parse(content, {
			replace: ({name, children}) => {
				if (name && name.match(/^h[1-3]/) && children[0].data) {
					headings.push(children[0].data);
				}
			}
		});
		console.log(headings); 
	}

	return (
		<div>
			<div>{extractHeadings(content)}</div>
		</div>
	);
};

export default DisplayContent;
