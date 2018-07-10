import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { renderRoutes } from '../imports/startup/client/router'

Meteor.startup(() => {
  ReactDOM.render(renderRoutes(), document.getElementById('app'));
});
