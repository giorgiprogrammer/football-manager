import {
  calculatePercentage,
  getRandomNumber,
  interpolate,
} from "@/app/utils/math";
import { Ball } from "../ball";
import { Stadium } from "../stadium";
import { TeamProperties } from "../../types/types";
import { Match } from "../../core/match";

export class Footballer extends Phaser.Physics.Arcade.Image {
  ball!: Ball;
  controllBall = false;
  passSound!: Phaser.Sound.BaseSound;
  shootSound!: Phaser.Sound.BaseSound;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public key: string,
    public footballerPosition: string,
    public isHost: boolean,
    public stadium: Stadium,
    public properties: TeamProperties
  ) {
    super(scene, x, y, key);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.passSound = this.scene.sound.add("passSound", {
      volume: 1,
      loop: false,
    });
    this.shootSound = this.scene.sound.add("shootSound", {
      volume: 1,
      loop: false,
    });

    this.setOrigin(0.5);
    this.setDisplaySize(
      calculatePercentage(3, this.stadium.stadiumWidth),
      calculatePercentage(3, this.stadium.stadiumWidth)
    );
    if (this.footballerPosition !== "goalkeeper") this.setAlpha(0.75);

    this.setCircle(
      this.displayWidth + calculatePercentage(0.4, this.stadium.stadiumWidth),
      calculatePercentage(0.3, this.stadium.stadiumWidth),
      calculatePercentage(0.3, this.stadium.stadiumWidth)
    );
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
    longVariants: Array<Footballer>,
    match: Match
  ) {
    let randomFootballer!: Footballer;
    if (this.footballerPosition !== "attacker") {
      randomFootballer =
        this.properties.passingStyle === "short"
          ? shortVariants[getRandomNumber(0, shortVariants.length - 1)]
          : longVariants[getRandomNumber(0, longVariants.length - 1)];
    }

    setTimeout(
      () => {
        if (match.isPlaying === false) {
          this.controllBall = false;
          if (this.footballerPosition !== "goalkeeper") this.setAlpha(0.75);

          return;
        }
        if (this.footballerPosition === "goalkeeper") {
          this.makePass(randomFootballer, match);
        }
        if (this.footballerPosition === "defender") {
          this.makePass(randomFootballer, match);
        }
        if (this.footballerPosition === "midfielder") {
          this.makePass(randomFootballer, match);
        }
        if (this.footballerPosition === "attacker") {
          this.shoot();
        }
      },
      this.footballerPosition === "goalkeeper"
        ? 0
        : interpolate(this.properties.passDelay, 30, 1800)
    );
  }

  makePass(footballer: Footballer, match: Match) {
    const y = getRandomNumber(
      0,
      interpolate(this.properties.passAccuracy, 100, 1)
    );

    const randomY = getRandomNumber(0, 1) === 0 ? y : -y;

    this.passSound.play();
    this.ball.kick(
      interpolate(this.properties.passSpeed, 140, 260),
      footballer.getBounds().centerX,
      footballer.getBounds().centerY + randomY
    );

    setTimeout(() => {
      this.controllBall = false;
      if (this.footballerPosition !== "goalkeeper") this.setAlpha(0.75);
    }, 500);
  }

  shoot() {
    this.shootSound.play();
    this.ball.kick(
      interpolate(this.properties.passSpeed, 180, 320),
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
      if (this.footballerPosition !== "goalkeeper") this.setAlpha(0.75);
    }, 600);
  }

  randomShoot() {
    this.passSound.play();
    this.ball.kick(
      interpolate(this.properties.passSpeed, 180, 320),
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
  }
}
