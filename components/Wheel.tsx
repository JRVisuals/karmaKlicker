import React, { Component, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import GestureHandler, { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';

class Wheel extends Component {

    transformValues = [];
    animInterval;
    decayInterval;
    maxIntervalVal= 100;
    intervalDecay= 5;
    intervalMsStart = 90;
    intervalMs= this.intervalMsStart;
    images=[];
    
    state = {
            currentFrame : 1,
            frameRate: 1, 
            karmaPoints: 0,
            isStopped: false,
    }

    componentDidMount() {
        this.prepAnimation();
        this.startAnimation();
    }

    prepAnimation = () => {
        this.images = [
            require(`../assets/images/wheel_1.png`),
            require(`../assets/images/wheel_2.png`),
            require(`../assets/images/wheel_3.png`),
            require(`../assets/images/wheel_4.png`),
            require(`../assets/images/wheel_5.png`),
            require(`../assets/images/wheel_6.png`),
            require(`../assets/images/wheel_7.png`),
            require(`../assets/images/wheel_8.png`),
            require(`../assets/images/wheel_9.png`),
            require(`../assets/images/wheel_10.png`),
            require(`../assets/images/wheel_11.png`),
            require(`../assets/images/wheel_12.png`),
            require(`../assets/images/wheel_13.png`),
            require(`../assets/images/wheel_14.png`),
            require(`../assets/images/wheel_15.png`),
            require(`../assets/images/wheel_16.png`),
            require(`../assets/images/wheel_17.png`),
            require(`../assets/images/wheel_18.png`),
        ];
    }

    startAnimation = () => {
       this.animInterval = setInterval (this.updateFrame, this.intervalMs);
       this.decayInterval = setInterval (this.forceSlowDown, 500);
    };
  

    scorePoints = () => {

        const newPoints = this.state.karmaPoints +1;
        this.setState({ ...this.state, karmaPoints: newPoints })
       
        const { onUpdateScore } = this.props;
        
        const val = {playerScore: newPoints, playerMs: this.intervalMs} ;
        onUpdateScore(val);
        
    }

    _handleStateChange = ({nativeEvent}) => {
        switch (nativeEvent.state) {
            case 2:
                    //this.intervalMs = this.maxIntervalVal;
                    //this.stopWheel();
            break;

            case 5:
                    this.addToSpin();
            break;

            default:
            break;
        }
        
    }

    resetSpin = () => {
            this.intervalMs = this.intervalMsStart;
            //this.startAnimation();
            this.setState({...this.state, isStopped: false})
            clearInterval(this.animInterval);
            this.animInterval = setInterval (this.updateFrame, this.intervalMs);        
    }

    addToSpin = () => {
        if( this.state.isStopped) {
            this.resetSpin();
        } else {
            this.intervalMs = Math.round(Math.max(this.intervalMs * .75, 1));
            clearInterval(this.animInterval);
            this.animInterval = setInterval (this.updateFrame, this.intervalMs);
        }
    }

    stopWheel = () => {
        this.setState({...this.state, isStopped: true})
    }

    updateFrame = () => {


        if(this.state.isStopped) { return; }

        const {currentFrame, frameRate, isStopped} = this.state;

        let newFrame = currentFrame + frameRate;

        if (newFrame > 17) { 
            newFrame=1;
            this.scorePoints();
        }

        this.setState( {currentFrame: newFrame})

        

    }

    forceSlowDown = () => {
       
        if(this.state.isStopped) { return; }

        this.intervalMs += this.intervalDecay;
        clearInterval(this.animInterval);

        if(this.intervalMs <= this.maxIntervalVal) {
            this.animInterval = setInterval (this.updateFrame, this.intervalMs);
        }else{
            this.stopWheel();
        }
       
    }


    render () {

        const { currentFrame } = this.state;
    
        return(
            

            <FlingGestureHandler direction={Directions.LEFT} 
                    onHandlerStateChange= {this._handleStateChange}
            >
            <View style={styles.container}>
                <Image
                    source={this.images[currentFrame-1]}
                />
            </View>    

            </FlingGestureHandler>
            
        )


    }
}

export default Wheel;


const styles = StyleSheet.create({
    container: {
      paddingVertical: 25,
      paddingHorizontal: 75,
      alignItems: "center",
      backgroundColor: "#050505",

    },
  });