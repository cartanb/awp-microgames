import React from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../redux';

const Start = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(startGame());
  };

  return (
    <div>
      <h2>Welcome!</h2>
      <h3>Each microgame lasts 5 seconds and uses the arrow keys <strong>OR</strong> the spacebar - not both!</h3>
      <button type="button" onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
};

export default Start;
