import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//ACTION TYPES
const START_GAME = 'START_GAME';
const START_MINIGAME = 'START_MINIGAME';

//ACTION CREATORS
export const startGame = () => ({
  type: START_GAME,
});
export const startMinigame = () => ({
  type: START_MINIGAME,
});

//INITIAL STATE
const initialState = {
  gameRunning: false,
  minigameRunning: false,
  score: 0,
  lives: 4,
  lastGameResult: 0,
};

//REDUCER
function appReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return { ...state, gameRunning: true };
    case START_MINIGAME:
      return { ...state, minigameRunning: true };
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
