import React from 'react';
import './PreFooter.css';

// Footer component - represents a single todo item

export default (props) => (
  <div className="navbar-collapse">
  	<ul className="nav navbar-nav navbar-left">
	    <li>
	      <a href="/">Home</a>
	    </li>
	  </ul>
	  <ul className="nav navbar-nav navbar-right">
	    <li>
	      <a onClick={props.onLogin}>Login</a>
	    </li>
	  </ul>
	</div>
);
