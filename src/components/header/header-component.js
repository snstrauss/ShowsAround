// import react
import React, { Component } from 'react';

// import react-native
import { View, Text, Image } from 'react-native';

// import stylesheet
import headerStyles from './header-styles.js';

// import helper components
import ShowIf from '../../helper-components/show-if/ShowIf.js';
import WaitMsg from '../../helper-components/wait-msg/WaitMsg.js';

class Header extends Component {
    
    state = {
        bigLogoUri: ''
    }

    // componentWillMount(){
        
    //     const fetchObj = {
    //         url: 'http://showsaround.s3-website-eu-west-1.amazonaws.com/img/FinalLogo512px.png',
    //         method: 'GET'
    //     }

    //     fetch(fetchObj)
    //     .then(response => response.url)
    //     .then(uri => {
            
    //         console.log('got big logo uri:');
    //         console.log(uri);

    //         this.setState({
    //             bigLogoUri: uri
    //         })
    //     })
    //     .catch(err => {
            
    //         console.log('err');
    //         console.log(err);
    //     })

    // }
    
    render(){

        let imageUri = 'http://showsaround.s3-website-eu-west-1.amazonaws.com/img/FinalLogo512px.png';

        const { headerContainer,
                imageParentStyle, 
                imageStyle,
                textParentStyle,
                textStyle } = headerStyles;

        return (
            <ShowIf condition={imageUri}>
                <View style={headerContainer}>
                    <View style={imageParentStyle}>
                        <Image style={imageStyle} source={{uri: imageUri}} />
                    </View>
                    <View style={textParentStyle}>
                        <Text style={textStyle}>ShowsAround</Text>
                    </View>
                </View>
            </ShowIf>
        )
    }
};

export default Header;
