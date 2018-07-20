import React, { Component } from 'react';
import MainFooter from '../../components/MainFooter/MainFooter';

import { withTracker } from 'meteor/react-meteor-data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Pets } from "../../../api/pets/index";
import DogList from "../../components/DogList/DogList";
import './ListPet.css';

import DetailPet from "../DetailPetPage/DetailPet";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw  } from '@fortawesome/fontawesome-free-solid'
import { faUser  } from '@fortawesome/fontawesome-free-solid'

class ListPet extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tabIndex: 0
    };
  }

  gettingCountProperties(props) {
    let totalInQueuePets = 0;
    let totalSchedulePets = 0;
    let totalCompletedPets = 0;
    let totalDeletedPets = 0;
    let totalUsers = 1;
    console.log("=>", props);

    if(props.inQueuePets.length) {
      for (let i = 0; i < props.inQueuePets.length; i ++) {
        totalInQueuePets += props.inQueuePets[i].dogs.length;
      }
    }

    if(props.scheduledPets.length) {
      for (let i = 0; i < props.scheduledPets.length; i ++) {
        totalSchedulePets += props.scheduledPets[i].dogs.length;
      }
    }

    if(props.completedPets.length) {
      for (let i = 0; i < props.completedPets.length; i ++) {
        totalCompletedPets += props.completedPets[i].dogs.length;
      }
    }

    if(props.deletedPets.length) {
      for (let i = 0; i < props.deletedPets.length; i ++) {
        totalDeletedPets += props.deletedPets[i].dogs.length;
      }
    }
    
    return {totalInQueuePets: totalInQueuePets, totalSchedulePets: totalSchedulePets, totalCompletedPets: totalCompletedPets, totalDeletedPets: totalDeletedPets};
  }

  gettingDisplaySchedule(props) {
    let displaySchedules = [false];
    let overdue= [false];
    for(let i = 0; i < props.scheduledPets.length; i ++) {
      let x = props.scheduledPets[i].scheduledTimeNew;

      var now = new Date();
      var difference = x - now.getTime();
      var minuteVal = difference / 60000;
      minuteVal = Math.round(minuteVal);

      if(minuteVal <= 10 && minuteVal >= 0) {
        displaySchedules[i] = true; //execute the manipulations
        overdue[i] = false;
      } else if(minuteVal < 0) {
        displaySchedules[i] = true;
        overdue[i] = true;
      } else {
        displaySchedules[i] = false;
        overdue[i] = false;
      }
    }
    return {displaySchedules: displaySchedules, overdue: overdue};
  }

  onClickHandler(pet) {
    this.props.history.push({
      pathname: `/listpet/${pet._id}`,
      state: { pet: pet }
    });
  }

  logoutHandler = () => {
    Meteor.logout( (err) => {
      if (err) {
      } else {
        this.setState({isAuthenticated: false});
      }
    });
    this.props.history.push('/');
  }

  render() {

    let tempPets = this.gettingCountProperties(this.props);
    let totalInQueuePets = tempPets.totalInQueuePets;
    let totalSchedulePets = tempPets.totalSchedulePets;
    let totalCompletedPets = tempPets.totalCompletedPets;
    let totalDeletedPets = tempPets.totalDeletedPets;


    let displaySchedules = [];
    let overdue = [];
    let temp = this.gettingDisplaySchedule(this.props);
    displaySchedules = temp.displaySchedules;
    // displaySchedules = this.gettingDisplaySchedule(this.props);
    overdue = temp.overdue;
    
    let condition = false;
    for(let i = 0; i < displaySchedules.length; i ++) {
      condition = condition || displaySchedules[i];
    }

    return (
      <div>
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            <Tab>Current</Tab>
            <Tab>Completed</Tab>
            <Tab>Scheduled</Tab>
            <Tab>Deleted</Tab>
          </TabList> 
          <TabPanel>
            <div className="list-div">
              <div className="status-div">
                <div className="status-part-div">
                  <FontAwesomeIcon icon={faUser}/>
                  <p className="status-count">1</p>
                </div>
                <div className="status-part-div">
                  <FontAwesomeIcon icon={faPaw}/>
                  <p className="status-count">{totalInQueuePets}</p>
                </div>
              </div>
              {this.props.scheduledPets.length && condition ? <p>Scheduled Queue: </p> : <div/>}
              {this.props.scheduledPets.length ? this.props.scheduledPets.map((pet, idx) => {
                return displaySchedules[idx] ? 
                  <div className="list-group" key={`dogs-${idx.toString()}`}>
                    <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.onClickHandler(pet)}>
                      <div className="d-flex w-100 justify-content-between">
                        <div layout="row" layout-align="space-between">
                          <div layout="row" className="overdue">
                            <h4 className="mb-1">
                              {pet.owner.firstName} {pet.owner.lastName}
                            </h4>
                            {overdue[idx] ? <div className="overdueTxt">(Overdue)</div> : <div/>}
                          </div>
                        </div>
                        <DogList pet={pet} />
                      </div>
                      <h4 className="mb-1">
                        {pet.scheduledTime}
                      </h4>
                    </div>
                  </div> : <div/> }) : <div className="no-events"></div>}

              {this.props.inQueuePets.length ? <p>Normal Queue: </p> : <div/>}
              {this.props.inQueuePets.length ? this.props.inQueuePets.map((pet, idx) => (
                <div className="list-group" key={`dogs-${idx.toString()}`}>
                  <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.onClickHandler(pet)}>
                    <div className="d-flex w-100 justify-content-between">
                      <div layout="row" layout-align="space-between">
                        <div layout="row">
                          <h4 className="mb-1">{pet.owner.firstName} {pet.owner.lastName}</h4>
                        </div>
                      </div>
                      <DogList pet={pet} />
                    </div>
                  </div>
                </div>
              )) : <div className="no-events"></div>}
            </div>  
          </TabPanel>
          <TabPanel>
            <div className="list-div">
              <div className="status-div">
                <div className="status-part-div">
                  <FontAwesomeIcon icon={faUser}/>
                  <p className="status-count">1</p>
                </div>
                <div className="status-part-div">
                  <FontAwesomeIcon icon={faPaw}/>
                  <p className="status-count">{totalCompletedPets}</p>
                </div>
              </div>
              {this.props.completedPets.length ? this.props.completedPets.map((pet, idx) => (
                <div className="list-group" key={`dogs-${idx.toString()}`}>
                  <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.onClickHandler(pet)}>
                    <div className="d-flex w-100 justify-content-between">
                      <div layout="row" layout-align="space-between">
                        <div layout="row">
                          <h4 className="mb-1">{pet.owner.firstName} {pet.owner.lastName}</h4>
                        </div>
                      </div>
                      <DogList pet={pet} />
                    </div>
                  </div>
                </div>
              )) : <div className="no-events"></div>}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="list-div">
              <div className="status-div">
                <div className="status-part-div">
                  <FontAwesomeIcon icon={faUser}/>
                  <p className="status-count">1</p>
                </div>
                <div className="status-part-sch-div">
                  <FontAwesomeIcon icon={faUser}/>
                  <p className="status-count">1</p>
                </div>
                <div className="status-part-sch-div">
                  <FontAwesomeIcon icon={faPaw}/>
                  <p className="status-count">{totalSchedulePets}</p>
                </div>
                <div className="status-part-div">
                  <FontAwesomeIcon icon={faPaw}/>
                  <p className="status-count">{totalInQueuePets}</p>
                </div>
              </div>
              {this.props.scheduledPets.length ? this.props.scheduledPets.map((pet, idx) => (
                <div className="list-group" key={`dogs-${idx.toString()}`}>
                  <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.onClickHandler(pet)}>
                    <div className="d-flex w-100 justify-content-between">
                      <div layout="row" layout-align="space-between">
                        <div layout="row">
                          <h4 className="mb-1">{pet.owner.firstName} {pet.owner.lastName}</h4>
                        </div>
                      </div>
                      <DogList pet={pet} />
                    </div>
                    <h4 className="mb-1">
                      {pet.scheduledTime}
                    </h4>
                  </div>
                </div>
              )) : <div className="no-events"></div>}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="list-div">
              <div className="status-div">
                <div className="status-part-div">
                  <FontAwesomeIcon icon={faUser}/>
                  <p className="status-count">1</p>
                </div>
                <div className="status-part-div">
                  <FontAwesomeIcon icon={faPaw}/>
                  <p className="status-count">{totalDeletedPets}</p>
                </div>
              </div>
              {this.props.deletedPets.length ? this.props.deletedPets.map((pet, idx) => (
                <div className="list-group" key={`dogs-${idx.toString()}`}>
                  <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={() => this.onClickHandler(pet)}>
                    <div className="d-flex w-100 justify-content-between">
                      <div layout="row" layout-align="space-between">
                        <div layout="row">
                          <h4 className="mb-1">{pet.owner.firstName} {pet.owner.lastName}</h4>
                        </div>
                      </div>
                      <DogList pet={pet} />
                    </div>
                  </div>
                </div>
              )) : <div className="no-events"></div>}
            </div>
          </TabPanel>
        </Tabs>
        <MainFooter onLogout={this.logoutHandler}/>
      </div>
    );
  }
}

const App = withTracker(() => {
  return {
    pets: Pets.find({}).fetch(),
    inQueuePets: Pets.find({ clientStatus: { inQueue: true, scheduled: false, completed: false, deleted: false } }).fetch(),
    scheduledPets: Pets.find({ clientStatus: { inQueue: false, scheduled: true, completed: false, deleted: false } }).fetch(),
    completedPets: Pets.find({ clientStatus: { inQueue: false, scheduled: false, completed: true, deleted: false } }).fetch(),
    deletedPets: Pets.find({ clientStatus: { inQueue: false, scheduled: false, completed: false, deleted: true } }).fetch()
  }
})(ListPet);

export default App;