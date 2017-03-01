import React from 'react';

import { AppRegistry } from 'react-native';

import ShowsAround from './src/components/_main-ShowsAroundApp/ShowsAroundApp.js';


const App = () => (
  <ShowsAround />
);

AppRegistry.registerComponent('ShowsAround', () => App);
