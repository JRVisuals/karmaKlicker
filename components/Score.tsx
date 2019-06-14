import React from 'react';
import {View, Text} from 'react-native';

const Score = (props) => {
    return(
        <Text style={{color:'#fff', marginBottom:20,}}>
            Merit: {props.playerScore}
        </Text>
    )
} 

export default Score;