import React, { useState, useReducer, useContext } from 'react';


export const GameContext = React.createContext({});

export const GameStateProvider = ({reducer, initialState, children}) =>(
    <GameContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </GameContext.Provider>
  );

export const useStateValue = () => useContext(GameContext);