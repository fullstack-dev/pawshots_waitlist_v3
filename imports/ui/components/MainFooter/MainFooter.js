import React from 'react';
import './MainFooter.css';

// Footer component - represents a single todo item

export default (props) => (
  <div className="navbar-collapse">
  	<ul className="nav navbar-nav navbar-left">
      <li>
        <a href="/">Home</a>
      </li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
      <li className="navbar-left">
        <a href="/listpet">Queue</a>
      </li>
      <li className="navbar-right">
        <a onClick={props.onLogout}>Logout</a>
      </li>
    </ul>
  </div>
);
