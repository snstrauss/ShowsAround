// import react
import React from 'react';

// import react-native
import { View } from 'react-native';

import { StackNavigator } from 'react-navigation';

// import my own components
import ShowsList from '../shows-list/ShowsList.js';
import Areas from '../independance/areas/Areas-comp';

//import stylesheet
import mainStyle from './ShowsAroundApp-styles.js';

// the component
const ShowsAroundApp = StackNavigator({
    ShowsList: {
        screen: ShowsList
    },
    Areas: {
        screen: Areas
    }
}, {
    headerMode: 'screen'
})



export default ShowsAroundApp;
