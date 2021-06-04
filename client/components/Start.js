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
      <button type="button" onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
};

export default Start;
