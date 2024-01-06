import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Ball } from "../ball";
import { Stadium } from "../stadium";

export class Footballer extends Phaser.Physics.Arcade.Image {
  ball!: Ball;
  controllBall = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public key: string,
    public footballerPosition: string,
    public isHost: boolean,
    public stadium: Stadium
  ) {
    super(scene, x, y, key);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setOrigin(0.5);
    this.setScale(0.5);
    this.setAlpha(0.65);

    this.setCircle(this.displayWidth);
  }

  setBall(ball: Ball) {
    if (this.controllBall) return;
    this.controllBall = true;

    ball.setPosition(this.getBounds().centerX, this.getBounds().centerY);
    ball.setVelocity(0, 0);
    ball.setAngularVelocity(0);
    this.ball = ball;
    this.setAlpha(1);
  }

  makeDesicion(
    shortVariants: Array<Footballer>,
    longVariants: Array<Footballer>
  ) {
    let randomFootballer!: Footballer;
    if (this.footballerPosition !== "attacker") {
      randomFootballer =
        shortVariants[getRandomNumber(0, shortVariants.length - 1)];
    }

    if (this.footballerPosition === "goalkeeper") {
      this.makePass(randomFootballer);
    }
    if (this.footballerPosition === "defender") {
      this.makePass(randomFootballer);
    }
    if (this.footballerPosition === "midfielder") {
      this.makePass(randomFootballer);
    }
    if (this.footballerPosition === "attacker") {
      this.shoot();
    }
  }

  makePass(footballer: Footballer) {
    this.ball.kick(
      150,
      footballer.getBounds().centerX,
      footballer.getBounds().centerY
    );

    setTimeout(() => {
      this.controllBall = false;
      this.setAlpha(0.65);
    }, 600);
  }

  shoot() {
    this.ball.kick(
      220,
      this.isHost
        ? this.stadium.rightGoalPost.getBounds().centerX
        : this.stadium.leftGoalPost.getBounds().centerX,
      getRandomNumber(
        this.stadium.leftGoalPost.getBounds().centerY -
          calculatePercentage(20, this.stadium.stadiumHeight),
        this.stadium.leftGoalPost.getBounds().centerY +
          calculatePercentage(20, this.stadium.stadiumHeight)
      )
    );
    setTimeout(() => {
      this.controllBall = false;
      this.setAlpha(0.65);
    }, 600);
  }
}
