import React from 'react';
import { useSelector } from 'react-redux';
import Start from './Start';
import Score from './Score';
import Minigame from './Minigame';
import PlayAgain from './PlayAgain';

const GameWindow = () => {
  const gameRunning = useSelector((state) => state.gameRunning);
  const minigameRunning = useSelector((state) => state.minigameRunning);
  const lives = useSelector((state) => state.lives);

  if (!gameRunning && lives > 0) {
    return <Start />;
  } else if (gameRunning && !minigameRunning) {
    return <Score />;
  } else if (minigameRunning) {
    return <Minigame />;
  } else {
    return <PlayAgain />;
  }
};

export default GameWindow;
