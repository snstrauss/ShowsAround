// import react
import React from 'react';

// import react-native
import { AppRegistry } from 'react-native';

// import main ShowsAroundApp component
import ShowsAroundApp from './src/components/_main-ShowsAroundApp/ShowsAroundApp.js';

const App = () => (
  <ShowsAroundApp />
);

AppRegistry.registerComponent('ShowsAround', () => App);
