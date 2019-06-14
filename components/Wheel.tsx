import React, { Component, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated, TouchableWithoutFeedback } from 'react-native';

class Wheel extends Component {

    transformValues = [];
    animInterval;
    decayInterval;
    maxIntervalVal= 100;
    intervalDecay= 10;
    intervalMsStart = 20;
    intervalMs= this.intervalMsStart;
    
    state = {
            currentFrame : 1,
            frameRate: 1, 
            karmaPoints: 0,
            isStopped: false,
    }


    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
       this.animInterval = setInterval (this.updateFrame, this.intervalMs);
       this.decayInterval = setInterval (this.forceSlowDown, 500);
    };

    forceSlowDown = () => {
       
        this.intervalMs += this.intervalDecay;
        clearInterval(this.animInterval);

        if(this.intervalMs <= this.maxIntervalVal) {
            this.animInterval = setInterval (this.updateFrame, this.intervalMs);
        }else{
            this.setState({...this.state, isStopped: true})
            clearInterval(this.decayInterval);
        }
       
    }

    updateFrame = () => {


        const {currentFrame, frameRate, isStopped} = this.state;


        if (!isStopped){

            let newFrame = currentFrame + frameRate;
            if (newFrame > 17) { 
                newFrame=1;
                this.scorePoints();
            }
            this.setState( {currentFrame: newFrame})

        }

    }

    scorePoints = () => {
        const newPoints = this.state.karmaPoints +1;
        this.setState({ ...this.state, karmaPoints: newPoints })
       
        const { onUpdateScore } = this.props;
        
        onUpdateScore(newPoints);
        
    }

    resetSpin = () => {

        if( !this.state.isStopped) {
            this.intervalMs = Math.min(Math.round(this.intervalMs*.5), 1);
        } else {
            this.intervalMs = 20;
            this.startAnimation();
            this.setState({...this.state, isStopped: false})
        }
        
    }

    render () {

        const frameWidth = 64;
        const totalFrames = 18;

        const { currentFrame } = this.state;
        

        return(
            <View style={styles.container}>

                <TouchableWithoutFeedback onPress={this.resetSpin}>
                <Image
                    source={require('../assets/images/wheelsheet.png')} 
                    style={{
                        transform: [
                            { translateX: currentFrame*-64,
                            },
                        ],
                    }}
                />
                </TouchableWithoutFeedback>
            </View>
        )


    }
}

export default Wheel;


const styles = StyleSheet.create({
    container: {
      height: 176,
      width: 64,
      overflow: "hidden",
      margin: 20,
    },
  });