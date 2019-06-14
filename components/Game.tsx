import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import {  useStateValue } from './GameState';
import Score from './Score';
import Wheel from './Wheel'

const Game = (props) => {

   
    const [{ playerScore }, dispatch] = useStateValue();

    return(
        <View style={styles.container}>
            <Text style={{color:'#fff', marginBottom:20,}}>KARMA KLICKER</Text>
            
                    <Score 
                        playerScore= {playerScore} 
                    />
            
            <View style={{flexDirection:'row'}}>
                <Wheel
                    onUpdateScore = {
                        (val) => dispatch({
                            type: 'updateScore',
                            newScore: val
                          })  
                    }
                />
            </View>
        </View>
    )

}

export default Game;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
