import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const navStyle = {
		display: 'flex',
		flexDirection: 'column'
	};
  return (
    <div className="nav" style={navStyle}>
      <Link to="/add">add post</Link>
      <Link to="/list">list</Link>
    </div>
  );
}

export default Nav;