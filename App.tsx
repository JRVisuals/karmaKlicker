import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';


import { GameStateProvider } from './components/GameState';
import Game from './components/Game';

export default function App() {

  const initialState = {
      playerScore: 0,
  };

  const reducer = (state, action) => {

      switch (action.type) {

          case 'updateScore':
          return {
              ...state,
              playerScore: action.newScore
          };
          
          default:
          return state;
      }
  };

  return (
    <GameStateProvider initialState={initialState} reducer={reducer}>
      <Game/>
    </GameStateProvider>
    
  );
}
