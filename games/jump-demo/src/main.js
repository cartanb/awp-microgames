import Phaser from 'phaser';
import Game from './scenes/Game';

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: Game,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
});
