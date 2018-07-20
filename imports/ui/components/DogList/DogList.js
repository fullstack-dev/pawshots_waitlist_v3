import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { Pets } from "../../../api/pets/index";
import './DogList.css';

export default class DogList extends Component {
  render() {
    const pet = this.props.pet;
    
    const listItems = pet.dogs.map((dog, idx) =>
      <li className="doglist-li" key={`dog-${idx.toString()}`}>
        {dog.dogName},
      </li>
    );
    return (
      <ul className="doglist-ul">
        {listItems}
      </ul>
    );
  }
}