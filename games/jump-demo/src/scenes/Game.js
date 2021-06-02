import Phaser from 'phaser';

class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.load.image('background', 'api/assets/bg_layer1.png');
  }

  create() {
    this.add.image(240, 320, 'background');
  }
}

export default Game;
