import Phaser from 'phaser';
import JumpGame from './jump-demo/src/scenes/JumpGame';

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: 'game',
  scene: JumpGame,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
});
