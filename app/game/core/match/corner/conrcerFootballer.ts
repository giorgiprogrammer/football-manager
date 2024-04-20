import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Stadium } from "@/app/game/gameObjects/stadium";
import { Ball } from "@/app/game/gameObjects/ball";

export class CornerFootballer extends Phaser.Physics.Arcade.Image {
  controllBall = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public key: string,
    public type: string,
    public stadium: Stadium,
    public ball: Ball
  ) {
    super(scene, x, y, key);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.setOrigin(0.5);
    this.setDisplaySize(
      calculatePercentage(3, this.stadium.stadiumWidth),
      calculatePercentage(3, this.stadium.stadiumWidth)
    );

    this.setCircle(
      this.displayWidth + calculatePercentage(0.4, this.stadium.stadiumWidth),
      calculatePercentage(0.3, this.stadium.stadiumWidth),
      calculatePercentage(0.3, this.stadium.stadiumWidth)
    );
    this.setDepth(1000);
  }
}
