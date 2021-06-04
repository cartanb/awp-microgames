import React, { useEffect } from 'react';
import Phaser from 'phaser';
import JumpGame from '../../games/jump-demo/src/scenes/JumpGame';

const Minigame = () => {
  useEffect(() => {
    new Phaser.Game({
      type: Phaser.AUTO,
      width: 640,
      height: 480,
      parent: 'game',
      scene: JumpGame,
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
