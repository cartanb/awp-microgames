import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//ACTION TYPES
const START_GAME = 'START_GAME';
const END_GAME = 'END_GAME';
const START_MINIGAME = 'START_MINIGAME';
const END_MINIGAME = 'END_MINIGAME';
const WON_MINIGAME = 'WON_MINIGAME';
const LOST_MINIGAME = 'LOST_MINIGAME';
const ADD_TO_PLAYED = 'ADD_TO_PLAYED';
const RESET_PLAYED = 'RESET_PLAYED';

//ACTION CREATORS
export const startGame = () => ({
  type: START_GAME,
});
export const endGame = () => ({
  type: END_GAME,
});
export const startMinigame = () => ({
  type: START_MINIGAME,
});
export const endMinigame = (result) => ({
  type: END_MINIGAME,
  result,
});
export const wonMinigame = () => ({
  type: WON_MINIGAME,
});
export const lostMinigame = () => ({
  type: LOST_MINIGAME,
});
export const addToPlayed = (minigame) => ({
  type: ADD_TO_PLAYED,
  minigame,
});
export const resetPlayed = () => ({
  type: RESET_PLAYED,
});

//INITIAL STATE
const initialState = {
  gameRunning: false,
  minigameRunning: false,
  score: 0,
  lives: 4,
  lastGameResult: 0,
  playedGames: [],
};

//REDUCER
function appReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return { ...initialState, gameRunning: true };
    case END_GAME:
      return { ...state, gameRunning: false };
    case START_MINIGAME:
      return { ...state, minigameRunning: true };
    case END_MINIGAME:
      return {
        ...state,
        minigameRunning: false,
        lastGameResult: action.result,
      };
    case WON_MINIGAME:
      return { ...state, score: state.score + 1 };
    case LOST_MINIGAME:
      return { ...state, lives: state.lives - 1 };
    case ADD_TO_PLAYED:
      return { ...state, playedGames: [...state.playedGames, action.minigame] };
    case RESET_PLAYED:
      return {
        ...state,
        playedGames: [state.playedGames[state.playedGames.length - 1]],
      };
    default:
      return state;
  }
}

//MIDDLEWARE INCL. DEV TOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default createStore(appReducer, middleware);
