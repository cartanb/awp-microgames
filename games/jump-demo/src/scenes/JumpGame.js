import Phaser from 'phaser';

class JumpGame extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  platforms;

  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;

  failedGame = false;

  timerId = '';

  constructor() {
    super('game');
  }

  preload() {
    this.load.image('background', 'api/assets/bg_layer1.png');
    this.load.image('platform', 'api/assets/ground_grass.png');
    this.load.image('bunny-stand', 'api/assets/bunny1_stand.png');

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(240, 320, 'background').setScrollFactor(1, 0);

    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = this.platforms.create(x, y, 'platform');
      platform.scale = 0.5;

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject();
    }

    this.player = this.physics.add
      .sprite(240, 320, 'bunny-stand')
      .setScale(0.5);

    this.physics.add.collider(this.platforms, this.player);

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player);

    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    const style = { color: '#000', fontSize: 24 };
    this.timer = this.add
      .text(590, 10, 'TIME: ??', style)
      .setScrollFactor(0)
      .setOrigin(0.8, 0);

    this.verb = this.add
      .text(320, 190, 'JUMP!', style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0.5);

    this.timerStart();
  }

  update() {
    this.platforms.children.iterate((child) => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = child;

      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 550) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
      }
    });

    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.player.setVelocityY(-300);
    }

    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    this.horizontalWrap(this.player);

    const bottomPlat = this.findBottomPlatform();
    if (this.player.y > bottomPlat.y + 75) {
      this.failedGame = true;
    }
  }

  timerStart(timerNum = 5) {
    let num = timerNum;
    let value = `TIME: ${num}`;
    this.timer.text = value;
    setTimeout(() => {
      this.timerId = setInterval(() => {
        if (num > 0) {
          value = `TIME: ${--num}`;
          this.timer.text = value;
        } else {
          this.gameEnd();
        }
      }, 1000);
      this.verb.text = '';
    }, 1000);
  }

  /** @param {Phaser.GameObjects.Sprite} sprite */
  horizontalWrap(sprite) {
    const quarterWidth = sprite.displayWidth * 0.25;
    const gameWidth = this.scale.width;
    if (sprite.x < -(quarterWidth * 4)) {
      sprite.x = gameWidth + quarterWidth;
    } else if (sprite.x > gameWidth + quarterWidth) {
      sprite.x = -(quarterWidth / 2);
    }
  }

  findBottomPlatform() {
    const platforms = this.platforms.getChildren();
    let bottom = platforms[0];

    for (let i = 1; i < platforms.length; i++) {
      const platform = platforms[i];
      if (platform.y < bottom.y) {
        continue;
      }
      bottom = platform;
    }
    return bottom;
  }

  gameEnd() {
    console.log(!this.failedGame ? 1 : -1);
    clearInterval(this.timerId);
    this.sys.game.destroy(true);
  }
}

export default JumpGame;
