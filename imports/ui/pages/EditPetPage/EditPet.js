import React, { Component } from 'react';
import { Pets } from "../../../api/pets/index";
import './EditPet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/fontawesome-free-regular'

class EditPet extends Component {
	constructor(props) {
		super(props);
		let { pet } = this.props.location.state
		this.state = {
			...pet
		};
	}

	handleLeftArrow = (event) => {
		this.props.history.goBack();
	}

	handleChangeOwner = (event) => {
	    const field = event.target.name;
	    let { owner } = this.state;
	    owner = {
	      ...owner,
	      [field]: event.target.value,
	    }
	    this.setState({owner});
	}

	handleDogNameChange = (idx) => (evt) => {
		const newDogs = this.state.dogs.map((dog, sidx) => {
        if (idx !== sidx) return dog;
        	return { ...dog, dogName: evt.target.value };
    	});
    	this.setState({ dogs: newDogs });
  	}

  	handleDogNumberChange = (idx) => (evt) => {
		const newDogsNum = this.state.dogsNum.map((dogNum, sidx) => {
	        if (idx !== sidx) return dogNum;
	        return { ...dogNum, dogNum: evt.target.value };
	    });
	    this.setState({ dogsNum: newDogsNum });
	}

    handleRemoveDog = (idx) => () => {
	  	this.setState({
	        dogs: this.state.dogs.filter((s, sidx) => idx !== sidx),
	        dogsNum: this.state.dogsNum.filter((s, sidx) => idx !== sidx)
	    });
    }

	handleAddDog = () => {
		this.setState({
      		dogs: this.state.dogs.concat([{ dogName: '' }]),
      		dogsNum: this.state.dogsNum.concat([{ dogNum: 0 }])
    	});
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
				paymentStatus: {
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

	handleClientStatusClick = (event) => {
		let clientStatusValue = event.target.name;
		if(clientStatusValue == "inQueue") {
			this.setState({
				clientStatus: {
					inQueue: true,
					scheduled: false,
					completed: false,
					deleted: false
				}
			});
		} else if(clientStatusValue == "scheduled") {
			this.setState({
				clientStatus: {
					inQueue: false,
					scheduled: true,
					completed: false,
					deleted: false
				}
			});
		} else if(clientStatusValue == "completed") {
			this.setState({
				clientStatus: {
					inQueue: false,
					scheduled: false,
					completed: true,
					deleted: false
				}
			});
		} else {
			this.setState({
				clientStatus: {
					inQueue: false,
					scheduled: false,
					completed: false,
					deleted: true
				}
			});
		}
	}

	handleScheduledTimeChange = (event) => {
		let scheduledTime = event.target.value;
		var now = new Date();
		var year = now.getFullYear();
      	var month = now.getMonth();
      	var day = now.getDate();
      	var temp = new Date(year,month,day).getTime();
	  	this.setState({
	  		scheduledTime: scheduledTime,
	  		scheduledTimeNew: temp + event.target.valueAsDate.getTime()
	  	});
	}

	handleSaveClick = (event) => {
		const currentStatus = this.state;
		Pets.update(this.state._id, {$set: currentStatus});
		this.props.history.push({
	      pathname: `/listpet`,
	      state: {pet: currentStatus}
	    });
	}

	addSuffix(i) {
	    var j = i % 10,
	      	k = i % 100;
	    if (j == 1 && k != 11) {
	      	return i + "st";
	    }
	    if (j == 2 && k != 12) {
	      	return i + "nd";
	    }
	    if (j == 3 && k != 13) {
	      	return i + "rd";
	    }
	    return i + "th";
  	}

	render() {
		let none_btn_class = this.state.paymentStatus.noneStatus ? "activeBtn" : "noneActiveBtn";
		let card_btn_class = this.state.paymentStatus.cardStatus ? "activeBtn" : "noneActiveBtn";
		let cash_btn_class = this.state.paymentStatus.cashStatus ? "activeBtn" : "noneActiveBtn";
		let inqueue_btn_class = this.state.clientStatus.inQueue ? "selected-status-btn" : "status-btn";
		let scheduled_btn_class = this.state.clientStatus.scheduled ? "selected-status-btn" : "status-btn";
		let completed_btn_class = this.state.clientStatus.completed ? "selected-status-btn" : "status-btn";
		let deleted_btn_class = this.state.clientStatus.deleted ? "selected-status-btn" : "status-btn";
	    return (
	      <div className="detail-div">
	      	<div className="nav-div">
		      	<div onClick={this.handleLeftArrow} >
			      	<FontAwesomeIcon icon={faSquare}/>
			    </div>
	      	</div>
	      	<div className="gen-input">
	      		<input className="edit-input" type="text" onChange={this.handleChangeOwner} name="firstName" value={this.state.owner.firstName} placeholder={'First Name'} />	
    			<input className="edit-input" type="text" onChange={this.handleChangeOwner} name="lastName" value={this.state.owner.lastName} placeholder={'Last Name'} />
    			<input className="edit-input" type="email" onChange={this.handleChangeOwner} name="email" value={this.state.owner.email} placeholder={'Email'} />
    			<input className="edit-input" type="tel" onChange={this.handleChangeOwner} name="phone" value={this.state.owner.phone} placeholder={'Phone'} />
	      	</div>
	      	{this.state.dogs.map((dog, idx) => (
            <div className="dog" key={`dogs-${idx.toString()}`}>
              <input className="dogname-input" type="text" placeholder={`${this.addSuffix(idx+1)} Dog's Name`} value={dog.dogName} onChange={this.handleDogNameChange(idx)} />
              <input className="dognumber-input" type="number" onChange={this.handleDogNumberChange(idx)} name="dogNumber" value={this.state.dogsNum[idx].dogNum} placeholder={'Number'} />
              {(idx !== 0) && <button className="small" type="button" onClick={this.handleRemoveDog(idx)}>X</button>}
            </div>
          ))}
          <button className="btn-full" type="button" onClick={this.handleAddDog}>Add Additional Photo</button>
	    		<p className="notes-title">Notes:</p>
	    		<input className="notes-val" type="text" onChange={this.handleNoteChange} name="note" value={this.state.note} placeholder={'Notes'} />
	    		<p className="payment-title">Payment Method:</p>
	    		<div className="payment-btns">
	    			<button className={none_btn_class} type="button" onClick={this.handlePaymentClick} name="none">None</button>
						<button className={card_btn_class} type="button" onClick={this.handlePaymentClick} name="card">Card</button>
						<button className={cash_btn_class} type="button" onClick={this.handlePaymentClick} name="cash">Cash</button>
	    		</div>
	    		<p className="total-title">Total: ${ this.state.dogs.length * 10 }</p>
	    		<p className="status-title">Client Status:</p>
	    		<div className="status-btns">
	    			<button className={inqueue_btn_class} type="button" onClick={this.handleClientStatusClick} name="inQueue">In Queue</button>
	    			<button className={scheduled_btn_class} type="button" onClick={this.handleClientStatusClick} name="scheduled">Scheduled</button>
	    			<button className={completed_btn_class} type="button" onClick={this.handleClientStatusClick} name="completed">Completed</button>
	    			<button className={deleted_btn_class} type="button" onClick={this.handleClientStatusClick} name="deleted">Deleted</button>
	    		</div>
	    		<p className="">Scheduled Time:</p>
	    		<input className="scheduledtime-input" type="time" value={this.state.scheduledTime} onChange={this.handleScheduledTimeChange} />
	    		<button className="last-save-btn" type="button" onClick={this.handleSaveClick}>Save</button>
	      </div>
	    );
	}
}

export default EditPet;