import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Pets } from "../../../api/pets/index";
import { Counts } from 'meteor/tmeasday:publish-counts';
import logo from './logo.svg';
import './AddPet.css';
import { FormErrors } from "../../components/FormErrors/FormErrors";

class AddPet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      created: '',
      owner: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      dogs: [{ dogName: '' }],
      note: '',
      paymentStatus : {
        noneStatus: true,
        cardStatus: false,
        cashStatus: false
      },
      dogsNum: [{ dogNum: 0 }],
      clientStatus : {
        inQueue: true,
        scheduled: false,
        completed: false,
        deleted: false
      },
      scheduledTime: '',
      formErrors: { firstName: '', lastName: '', email: '', phone: ''},
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      phoneValid: false,
      formValid: false
    };
    this.submitted = false;
  }

  handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    let { owner } = this.state;
    owner = {
      ...owner,
      [field]: event.target.value,
    }
    this.setState({owner},
    () => { this.validateField(field, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;

    switch(fieldName) {
      case 'firstName':
        firstNameValid = (value != "");
        fieldValidationErrors.firstName = firstNameValid ? '' : ' must be filled out';
        break;
      case 'lastName':
        lastNameValid = (value != "");
        fieldValidationErrors.lastName = lastNameValid ? '' : ' must be filled out';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'phone':
        phoneValid = value.length >= 8 && !isNaN(value);
        fieldValidationErrors.phone = phoneValid ? '': ' is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    firstNameValid: firstNameValid,
                    lastNameValid: lastNameValid,
                    emailValid: emailValid,
                    phoneValid: phoneValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.phoneValid});
  }

  handleDogNameChange = (idx) => (evt) => {
    const newDogs = this.state.dogs.map((dog, sidx) => {
      if (idx !== sidx) return dog;
      return { ...dog, dogName: evt.target.value };
    });
    this.setState({ dogs: newDogs });
  }

  handleAddDog = () => {
    this.setState({
      dogs: this.state.dogs.concat([{ dogName: '' }]),
      dogsNum: this.state.dogsNum.concat([{ dogNum: 0 }])
    });
  }

  handleRemoveDog = (idx) => () => {
    this.setState({
      dogs: this.state.dogs.filter((s, sidx) => idx !== sidx),
      dogsNum: this.state.dogsNum.filter((s, sidx) => idx !== sidx)
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.setState({
      created: Date.now()
    }, () => {
      const { created, owner, dogs, note, paymentStatus, dogsNum, clientStatus, scheduledTime } = this.state;

      Pets.insert({ created, owner, dogs, note, paymentStatus, dogsNum, clientStatus, scheduledTime });

      // clears input fields onSubmit
      this.setState({
        created: '',
        owner: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        },
        dogs: [{ dogName: '' }],
        note: '',
        paymentStatus : {
          noneStatus: true,
          cardStatus: false,
          cashStatus: false
        },
        dogsNum: [{ dogNum: 0 }],
        clientStatus : {
          inQueue: true,
          scheduled: false,
          completed: false,
          deleted: false
        },
        scheduledTime: ''
      }, () => {  
        this.props.onNotification(this.props.inQueuePets.length);
      });

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
    return (
      <div className="form">
        <header className="form-header">
          <img src={logo} className="form-logo" alt="logo" />
          <h3 className="form-title">Waitlist</h3>
        </header>

        <form className="input-form" onSubmit={this.handleSubmit}>

          <input className="input-full form-control" type="text" onChange={this.handleChange} value={this.state.owner.firstName} name="firstName" placeholder={'First Name'} />
          {this.state.formErrors.firstName.length ? <span className="help-block">First Name{this.state.formErrors.firstName}</span> : <div/>}

          <input className="input-full form-control" type="text" onChange={this.handleChange} value={this.state.owner.lastName} name="lastName" placeholder={'Last Name'} />
          {this.state.formErrors.lastName.length ? <span className="help-block">Last Name{this.state.formErrors.lastName}</span> : <div/>}

          <input className="input-full form-control" type="email" onChange={this.handleChange} value={this.state.owner.email} name="email" placeholder={'Email'} />
          {this.state.formErrors.email.length ? <span className="help-block">Email{this.state.formErrors.email}</span> : <div/>}

          <input className="input-full form-control" type="tel" onChange={this.handleChange} value={this.state.owner.phone} name="phone" placeholder={'Phone'} />
          {this.state.formErrors.phone.length ? <span className="help-block">Phone{this.state.formErrors.phone}</span> : <div/>}

          {this.state.dogs.map((dog, idx) => (
            <div className="dog" key={`dogs-${idx.toString()}`}>
              <input className="input-full" type="text" placeholder={`${this.addSuffix(idx+1)} Dog's Name`} value={dog.dogName} onChange={this.handleDogNameChange(idx)} />

              {(idx !== 0) && <button className="small" type="button" onClick={this.handleRemoveDog(idx)}>X</button>}
            </div>
          ))}
          <button className="btn-full" type="button" onClick={this.handleAddDog}>Add Additional Photo</button>

          <button className="btn-submit" type="submit" disabled={!this.state.formValid}>Submit (Total is ${ this.state.dogs.length * 10 })</button>
        </form>
      </div>
    );
  }
}

const App = withTracker(() => {
  return {
    pets: Pets.find({}).fetch(),
    inQueuePets: Pets.find({ clientStatus: { inQueue: true, scheduled: false, completed: false, deleted: false } }).fetch()
  }
})(AddPet);

export default App;
