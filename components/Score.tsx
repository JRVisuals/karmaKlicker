import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const Score = (props) => {

    return(
        <View>
            <Text style={styles.scoreText}>
                Merit: {props.playerScore}
            </Text>
            <Text style={styles.scoreMs}>
                M/s: {props.playerMs}
            </Text>
        </View>
    )
} 

export default Score;

Score.defaultProps = {
    playerScore: 0,
    playerMs: 0,
}


const styles = StyleSheet.create({
    scoreText: {
      color: "#ffbb30",
      marginBottom: 5,
      marginTop: 25,
    },
    scoreMs: {
        color: "#f60502",
        marginBottom: 5,
      },
  });