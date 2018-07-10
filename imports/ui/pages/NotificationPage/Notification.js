import React, { Component } from 'react';
import logo from '../AddPetPage/logo.svg';
import './Notification.css';

class Notification extends Component {
	constructor(props) {
		super(props);
	}

	handleCloseClick = (evt) => {
		evt.preventDefault();
		this.props.history.goBack();
	}

	render() {
		return (
		  	<div className="form">
		        <header className="form-header">
		          	<img src={logo} className="form-logo" alt="logo" />
		          	<h3 className="form-title">Waitlist</h3>
		        </header>

		        <div className="notification-div">
		        	<p className="thk-txt">Thank You</p>
		        	<p className="you-txt">You are {this.props.location.state.petsLenth + 1}th in line</p>
		        	<p className="main-txt">We will call your name shortly and collect payment after we take your photos</p>
		        	<button className="btn-close" onClick={this.handleCloseClick}>Close</button>
		        </div>

		    </div>
		);
	}
}

export default Notification;