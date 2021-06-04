import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../redux';

const PlayAgain = () => {
  const dispatch = useDispatch();

  const score = useSelector((state) => state.score);

  const handleClick = () => {
    dispatch(startGame());
  };

  return (
    <div>
      <h2>Game Over!</h2>
      <h3>Your score was {score}</h3>
      <button type="button" onClick={handleClick}>
        Play Again?
      </button>
    </div>
  );
};

export default PlayAgain;
