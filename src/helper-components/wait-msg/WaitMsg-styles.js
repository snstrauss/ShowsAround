
import { Dimensions } from 'react-native';

let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

let boxHeight = 75;
let boxWidth = boxHeight * 2;

const WaitMsgStyles = {

    waitMsgBox: {
        borderWidth: 1,
        borderColor: 'red',

        height: boxHeight,
        // aspectRatio: 2,
        width: boxWidth,

        justifyContent: 'center',
        alignItems: 'center',

        // alignSelf: 'center',

        backgroundColor: 'firebrick',
        shadowRadius: 35,
        shadowColor: 'black',
        shadowOffset: {
            width: 25,
            height: 25
        },

        position: 'absolute',
        top: (windowHeight / 2) - boxHeight,
        left: (windowWidth / 2) - boxWidth/2,
    },

    waitMsgText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    waitMsgContainer: {
        borderWidth: 2,
        borderColor: 'green',
        
        // justifyContent: 'center',
        // alignItems: 'center',

        height: windowHeight - 70,
        // flexDirection: 'column',
        // flex: 1,
        // flexDirection: 'row'
    }

};

export default WaitMsgStyles;
