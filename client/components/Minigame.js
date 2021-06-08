import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Phaser from 'phaser';
import Games from '../../games/src/scenes';
import { addToPlayed, resetPlayed } from '../redux';

const Minigame = () => {
  const dispatch = useDispatch();

  const playedGames = useSelector((state) => state.playedGames);

  const chooseGame = () => {
    const games = Object.keys(Games).filter(
      (game) => !playedGames.includes(game)
    );

    const randIdx = Math.floor(Math.random() * games.length);

    const nextGame = games[randIdx];
    dispatch(addToPlayed(nextGame));

    return nextGame;
  };

  useEffect(() => {
    new Phaser.Game({
      type: Phaser.AUTO,
      width: 640,
      height: 480,
      parent: 'game',
      scene: Games[chooseGame()],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
          debug: true,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (playedGames.length === Object.keys(Games).length) {
      dispatch(resetPlayed());
    }
  }, [playedGames]);

  return (
    <div>
      <div id="game"></div>
    </div>
  );
};

export default Minigame;
