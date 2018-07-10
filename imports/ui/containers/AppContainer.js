import React, { Component } from 'react';
import { withHistory } from 'react-router-dom';

import AddPetPage from '../pages/AddPetPage/AddPet';
import PreFooter from '../components/PreFooter/PreFooter';
import MainFooter from '../components/MainFooter/MainFooter';

import Alert from 'react-s-alert';
 
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

export default class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = this.getMeteorData();
  }

  getMeteorData(){
    return { isAuthenticated: Meteor.userId() !== null };
  }

  notificationHandler =(petsLenth) => {
    this.props.history.push({
      pathname: '/notification',
      state: {petsLenth: petsLenth}
    });
  }

  loginHandler = () => {
    this.props.history.push('/login');
  }

  logoutHandler = () => {
    Meteor.logout( (err) => {
      if (err) {
        console.log("logout err: ", err.reason );
      } else {
        this.setState({isAuthenticated: false});
      }
    });
    this.props.history.push('/');
  }

  render(){
    const { isAuthenticated } = this.state;
    return (
      <div>
        <span>
          <AddPetPage onNotification = {this.notificationHandler}/>
          {isAuthenticated ? <MainFooter onLogout={this.logoutHandler}/> : <PreFooter onLogin={this.loginHandler}/>}
        </span>
      </div>
    );
  }
}
