import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// containers
import AppContainer from '../../ui/containers/AppContainer'
import MainContainer from '../../ui/containers/MainContainer'

// pages
import SignupPage from '../../ui/pages/SignUpPage/SignUp'
import LoginPage from '../../ui/pages/LoginPage/Login'
import ListPetPage from '../../ui/pages/ListPetPage/ListPet'
import DetailPetPage from '../../ui/pages/DetailPetPage/DetailPet'
import EditPetPage from '../../ui/pages/EditPetPage/EditPet'
import NotificationPage from '../../ui/pages/NotificationPage/Notification'

export const renderRoutes = () => (
  <Router>
    <div>
      <Route path="/login" component={ LoginPage } />
      <Route path="/signup" component={ SignupPage } />
      <Route exact path="/listpet" component={ ListPetPage } />
      <Route path="/listpet/:id" component={ DetailPetPage } />
      <Route path="/editpet" component={ EditPetPage } />
      <Route path="/notification" component={ NotificationPage } />
      <Route exact={true} path="/" component={ MainContainer } />
    </div>
  </Router>
);

