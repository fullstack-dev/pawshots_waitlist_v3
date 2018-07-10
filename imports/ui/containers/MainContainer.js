import { createContainer } from 'meteor/react-meteor-data';
import AddPetPage from '../pages/AddPetPage/AddPet'
import AppContainer from './AppContainer'

export default MainContainer = createContainer(({params}) => {
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
}, AppContainer);
