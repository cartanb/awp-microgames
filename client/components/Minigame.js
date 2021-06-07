import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Phaser from 'phaser';
import Games from '../../games/src/scenes';
import { addToPlayed, shiftPlayed } from '../redux';

const Minigame = () => {
  const dispatch = useDispatch();

  const playedGames = useSelector((state) => state.playedGames);

  const chooseGame = () => {
    const games = Object.keys(Games).filter(
      (game) => !playedGames.includes(game)
    );
    console.log(games.length);
    const randIdx = Math.floor(Math.random() * games.length);
    console.log(randIdx);
    const nextGame = games[randIdx];
    dispatch(addToPlayed(nextGame));
    console.log(playedGames.length);
    if (playedGames.length === Object.keys(Games).length) {
      dispatch(shiftPlayed());
    }
    return nextGame;
  };

  useEffect(() => {
    new Phaser.Game({
      type: Phaser.AUTO,
      width: 640,
      height: 480,
      parent: 'game',
      scene: Games['ArrowGame'],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
        },
      },
    });
  }, []);

  return (
    <div>
      <div id="game"></div>
    </div>
  );
};

export default Minigame;
