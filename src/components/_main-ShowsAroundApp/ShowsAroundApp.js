// import react
import React from 'react';

// import react-native
import { View } from 'react-native';

// import my own components
import Header from '../header/header-component.js';
import ShowsList from '../shows-list/ShowsList.js';

//import stylesheet
import mainStyle from './ShowsAroundApp-styles.js';

// the component
const ShowsAroundApp = () => (
    <View style={mainStyle}>
        <Header />        
        <ShowsList />
    </View>
);



export default ShowsAroundApp;
