import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
  return (
    <div className="nav">
      <h1 className="nav-title">Jin.Study</h1>
      <div className="nav-link-container">
        <Link className="nav-item" to="/add">write</Link>
        <Link className="nav-item" to="/list">list</Link>
      </div>
    </div>
  );
}

export default Nav;