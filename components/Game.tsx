import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import  { GLView } from 'expo';

import {  useStateValue } from './GameState';
import Score from './Score';
import Wheel from './Wheel'

const Game = (props) => {

   
    const [{ playerScore, playerMs }, dispatch] = useStateValue();

    return(
        <View style={styles.container}>
            <Text style={{color:'#fff', marginBottom:20,}}>KARMA KLICKER</Text>
            
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

            <Score playerScore= {playerScore} playerMs= {playerMs} />

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
