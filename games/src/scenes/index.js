import Phaser from 'phaser';
import store, { endMinigame } from '../../../client/redux';
import timerStart from './helperFuncs';

class JumpGame extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  platforms;

  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;

  failedGame = false;

  timerId = '';

  constructor() {
    super('game');
    this.timerStart = timerStart.bind(this);
  }

  preload() {
    this.load.image('background', 'api/assets/bg_layer1.png');
    this.load.image('platform', 'api/assets/ground_grass.png');
    this.load.image('bunny-stand', 'api/assets/bunny1_stand.png');
    this.load.image('bunny-jump', 'api/assets/bunny1_jump.png');

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
      this.player.setTexture('bunny-jump');
    }

    const velY = this.player.body.velocity.y;
    if (velY > 0 && this.player.texture.key !== 'bunny-stand') {
      this.player.setTexture('bunny-stand');
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
    store.dispatch(endMinigame(!this.failedGame ? 1 : -1));
    clearInterval(this.timerId);
    this.sys.game.destroy(true);
  }
}

class ArrowGame extends Phaser.Scene {
  fired = false;
  failedGame = true;

  constructor() {
    super('game');
    this.timerStart = timerStart.bind(this);
  }

  preload() {
    this.load.image('background', 'api/assets/bg_green.png');
    this.load.image('bow-static', 'api/assets/bow1.png');
    this.load.image('arrow', 'api/assets/arrow.png');
    this.load.image('balloon', 'api/assets/balloon.png');
    this.load.image('pop', 'api/assets/pop.png');

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(240, 320, 'background');
    this.bow = this.physics.add.sprite(106, 48, 'bow-static').setScale(4.0);
    this.bow.body.setAllowGravity(false);
    this.arrow = this.physics.add
      .sprite(this.bow.x, this.bow.y, 'arrow')
      .setScale(4.0)
      .setSize(1, 8)
      .setOffset(14, 3);
    this.arrow.body.setAllowGravity(false);
    this.balloon = this.physics.add
      .staticImage(480, Phaser.Math.Between(100, 380), 'balloon')
      .setScale(4.0)
      .setSize(52, 64)
      .setOffset(-16, -28);

    this.physics.add.overlap(
      this.arrow,
      this.balloon,
      this.handleHitBalloon,
      undefined,
      this
    );

    const style = { color: '#000', fontSize: 24 };
    this.timer = this.add
      .text(590, 10, 'TIME: ??', style)
      .setScrollFactor(0)
      .setOrigin(0.8, 0);

    this.verb = this.add
      .text(320, 190, 'SHOOT!', style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0.5);

    this.timerStart();
  }

  update() {
    if (this.bow.y < 50 && !this.fired) {
      this.bow.setVelocityY(250);
    } else if (this.bow.y > 430 && !this.fired) {
      this.bow.setVelocityY(-250);
    }
    if (this.cursors.space.isDown && !this.fired) {
      this.fired = true;
      this.bow.setVelocityY(0);
      this.arrow.setVelocityX(550);
    }
    this.arrow.y = this.bow.y;
  }

  /**
   * @param {Phaser.Physics.Arcade.Sprite} arrow
   * @param {Phaser.Physics.Arcade.Sprit} balloon
   */
  handleHitBalloon(arrow, balloon) {
    const balloonY = balloon.y;
    this.physics.world.disableBody(balloon.body);
    this.balloon.destroy(true);
    this.pop = this.add.image(480, balloonY, 'pop').setScale(4.0);
    this.failedGame = false;
    setTimeout(() => {
      this.pop.destroy(true);
    }, 750);
  }

  gameEnd() {
    store.dispatch(endMinigame(!this.failedGame ? 1 : -1));
    clearInterval(this.timerId);
    this.sys.game.destroy(true);
  }
}

export default { JumpGame, ArrowGame };
