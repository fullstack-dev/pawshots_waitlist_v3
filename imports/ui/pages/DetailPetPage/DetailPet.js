import React, { Component } from 'react';
import { Pets } from "../../../api/pets/index";
import './DetailPet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/fontawesome-free-regular'

class DetailPet extends Component {
	constructor(props) {
		super(props);
		let { pet } = this.props.location.state;
	    this.state = {
	      	...pet
	    };
	}

	handleDogNumberChange = (idx) => (evt) => {
		const newDogsNum = this.state.dogsNum.map((dogNum, sidx) => {
	      if (idx !== sidx) return dogNum;
	      return { ...dogNum, dogNum: evt.target.value };
	    });
	    this.setState({ dogsNum: newDogsNum });
	}

	handleNoteChange = (event) => {
		let noteVal = event.target.value;
	  	this.setState({
	  		note: noteVal
	  	});
	}

	handlePaymentClick = (event) => {
		let paymentValue = event.target.name;
		if(paymentValue == 'none') {
			this.setState({ 
				paymentStatus : {
					noneStatus: true,
					cardStatus: false,
					cashStatus: false
				}
			});
		} else if (paymentValue == 'card') {
			this.setState({
				paymentStatus : { 
					noneStatus: false,
					cardStatus: true,
					cashStatus: false
				}
			});
		} else {
			this.setState({ 
				paymentStatus : {
					noneStatus: false,
					cardStatus: false,
					cashStatus: true
				}
			});
		}
	}

	handleSaveClick = (event) => {
		const currentStatus = this.state;
		Pets.update(this.state._id, {$set: currentStatus});
		this.props.history.goBack();
	}

	handleDoneClick = (event) => {
		this.setState({
			clientStatus: {
				inQueue: false,
				scheduled: false,
				completed: true,
				deleted: false
			}
		}, () => {
			let currentStatus = this.state;
			Pets.update(this.state._id, {$set: currentStatus});
			this.props.history.goBack();
		});
	}

	handleLeftArrow = () => {
		this.props.history.goBack();
	}

	handleRightArrow = () => {
		this.props.history.push({
		  pathname: '/editpet',
		  state: {pet: this.state}
		});
	}

	render() {
		let none_btn_class = this.state.paymentStatus.noneStatus ? "activeBtn" : "noneActiveBtn";
		let card_btn_class = this.state.paymentStatus.cardStatus ? "activeBtn" : "noneActiveBtn";
		let cash_btn_class = this.state.paymentStatus.cashStatus ? "activeBtn" : "noneActiveBtn";
		return (
		  <div className="detail-div">
			<div className="nav-div">
				<div onClick={this.handleLeftArrow} >
			      	<FontAwesomeIcon icon={faSquare}/>
			    </div>
			    <div onClick={this.handleRightArrow} >
			      	<FontAwesomeIcon icon={faSquare}/>
			    </div>
			</div>
			<div className="gen-info">
				<ul className="detail-ul">
					<li className="detail-li">Name:</li>
					<li className="detail-li">Phone:</li>
					<li className="detail-li">Email:</li>
				</ul>
				<ul className="detail-num-ul">
					<li className="detail-li">{this.state.owner.firstName} {this.state.owner.lastName}</li>
					<li className="detail-li">{this.state.owner.phone}<FontAwesomeIcon icon={faSquare} className="phone-ri"/></li>
					<li className="detail-li">{this.state.owner.email}</li>
				</ul>
			</div>
			<p className="dog-names"> Dog's Names: </p>
			{this.state.dogs.map((dog, idx) => (
				<div className="dog-name-div" key={`dogs-${idx.toString()}`}>
					<p className="dog-name-title">{idx+1}. {dog.dogName}</p>
					<input className="dog-name-num" type="number" onChange={this.handleDogNumberChange(idx)} name="dogName" value={this.state.dogsNum[idx].dogNum} placeholder={'Number'} />
				</div>
			))}
			<p className="notes-title">Notes:</p>
			<input className="notes-val" type="text" onChange={this.handleNoteChange} name="note" value={this.state.note} placeholder={'Notes'} />
			<p className="payment-title">Payment Method:</p>
			<div className="payment-btns">
				<button className={none_btn_class} type="button" onClick={this.handlePaymentClick} name="none">None</button>
				<button className={card_btn_class} type="button" onClick={this.handlePaymentClick} name="card">Card</button>
				<button className={cash_btn_class} type="button" onClick={this.handlePaymentClick} name="cash">Cash</button>
			</div>
			<p className="total-title">Total: ${ this.state.dogs.length * 10 }</p>
			<div className="total-btns">
				<button className="save-btn" type="button" onClick={this.handleSaveClick}>Save</button>
				<button className="done-btn" type="button" onClick={this.handleDoneClick}>Done</button>
			</div>
		  </div>
		);
	}
}

export default DetailPet;