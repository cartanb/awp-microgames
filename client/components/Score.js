import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startMinigame } from '../redux';

const Score = () => {
  const dispatch = useDispatch();

  const score = useSelector((state) => state.score);
  const lives = useSelector((state) => state.lives);
  const lastGameResult = useSelector((state) => state.lastGameResult);

  const [timer, setTimer] = useState(5);
  let timerId = undefined;

  useEffect(() => {
    setTimeout(() => {
      if (lastGameResult !== 0) {
        //TODO: last game result, win/loss
      }
    }, 1500);
    timerId = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        console.log(timer);
      } else {
        clearInterval(timerId);
        dispatch(startMinigame());
      }
    }, 1000);
  }, [timer]);

  return (
    <div>
      <h2>SCORE: {score}</h2>
      <h2>LIVES: {lives}</h2>
      <h3>Next game in {timer}...</h3>
    </div>
  );
};

export default Score;
