import {
  calculatePercentage,
  getRandomNumber,
  interpolate,
} from "@/app/utils/math";
import { Ball } from "../ball";
import { Stadium } from "../stadium";
import { Match } from "../../core/match";
import { TeamTechniqueProperties } from "@/app/config/initialTeamsData";
import { matchStats } from "@/app/config/matchData";
import { SoundManager } from "../../core/soundManager";

export class Footballer extends Phaser.Physics.Arcade.Image {
  ball!: Ball;
  controllBall = false;

  shadow: any;

  isFaul = false;
  isPenalty = false;

  tweenForFaul!: Phaser.Tweens.Tween;

  circle!: Phaser.GameObjects.Arc;

  soundManager!: SoundManager;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public key: string,
    public type: string,
    public isHost: boolean,
    public stadium: Stadium,
    public properties: TeamTechniqueProperties
  ) {
    super(scene, x, y, key, undefined);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.soundManager = new SoundManager(this.scene);

    this.setOrigin(0.5);
    this.setDisplaySize(
      calculatePercentage(3, this.stadium.stadiumWidth),
      calculatePercentage(3, this.stadium.stadiumWidth)
    );
    if (this.type !== "goalkeeper") this.setAlpha(0.75);

    this.setCircle(
      this.displayWidth + calculatePercentage(0.4, this.stadium.stadiumWidth),
      calculatePercentage(0.3, this.stadium.stadiumWidth),
      calculatePercentage(0.3, this.stadium.stadiumWidth)
    );
  }

  setBall(ball: Ball) {
    if (this.controllBall) return;
    if (this.type !== "goalkeeper") {
      this.controllBall = true;
      ball.setPosition(this.getBounds().centerX, this.getBounds().centerY);
    }

    if (this.type !== "goalkeeper") {
      setTimeout(() => {
        ball.setPosition(this.getBounds().centerX, this.getBounds().centerY);
      }, 100);
    }

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
    if (this.type !== "attacker") {
      const shortPassChance = getRandomNumber(0, 100);

      randomFootballer =
        shortPassChance < this.properties.shortPassChance
          ? shortVariants[getRandomNumber(0, shortVariants.length - 1)]
          : longVariants[getRandomNumber(0, longVariants.length - 1)];
    }

    setTimeout(
      () => {
        if (match.isPlaying === false) {
          this.controllBall = false;
          this.setAlpha(0.75);
          return;
        }
        if (this.type === "goalkeeper") {
          this.makePass(randomFootballer, match);
        }
        if (this.type === "defender") {
          this.makePass(randomFootballer, match);
        }
        if (this.type === "midfielder") {
          this.makePass(randomFootballer, match);
        }
        if (this.type === "attacker") {
          this.shoot();
        }
      },
      this.type === "goalkeeper"
        ? 0
        : interpolate(this.properties.passDelay, 30, 1800)
    );
  }

  makePass(footballer: Footballer, match: Match) {
    const y = getRandomNumber(
      interpolate(this.properties.passAccuracy, 150, 0),
      interpolate(this.properties.passAccuracy, 250, 2)
    );

    const randomY = getRandomNumber(0, 1) === 0 ? y : -y;

    this.soundManager.playPassSound();

    this.ball.kick(
      interpolate(this.properties.passSpeeed, 140, 260),
      footballer.getBounds().centerX,
      footballer.getBounds().centerY + randomY
    );

    this.isHost
      ? matchStats.hostTeamStats.passes++
      : matchStats.guesTeamStats.passes++;

    setTimeout(() => {
      this.controllBall = false;
      if (this.type !== "goalkeeper") this.setAlpha(0.75);
    }, 300);
  }

  shoot() {
    this.isHost
      ? matchStats.hostTeamStats.shoots++
      : matchStats.guesTeamStats.shoots++;

    this.soundManager.playShootSound();

    this.ball.kick(
      interpolate(this.properties.shootSpeed, 140, 330),
      this.isHost
        ? this.stadium.rightGoalPost.getBounds().centerX
        : this.stadium.leftGoalPost.getBounds().centerX,
      getRandomNumber(
        this.stadium.leftGoalPost.getBounds().centerY -
          interpolate(this.properties.shootAccuracy, 200, 50),
        this.stadium.leftGoalPost.getBounds().centerY +
          interpolate(this.properties.shootAccuracy, 200, 50)
      )
    );
    setTimeout(() => {
      this.controllBall = false;
      if (this.type !== "goalkeeper") this.setAlpha(0.75);
    }, 300);
  }

  randomShoot() {
    this.soundManager.playPassSound();

    this.ball.kick(
      interpolate(this.properties.passSpeeed, 180, 320),
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

  startPenaltyBehaviour() {
    this.isPenalty = true;

    if (this.tweenForFaul) {
      this.tweenForFaul.resume();
      return;
    }

    this.tweenForFaul = this.scene.add.tween({
      targets: this,
      alpha: 0.2,
      duration: 300,
      yoyo: true,
      repeat: -1,
    });
  }

  startFaulBehaviour() {
    this.isFaul = true;

    if (this.tweenForFaul) {
      this.tweenForFaul.resume();
      return;
    }

    this.tweenForFaul = this.scene.add.tween({
      targets: this,
      alpha: 0.2,
      duration: 300,
      yoyo: true,
      repeat: -1,
    });
  }

  stopFaulBehaviour() {
    this.isFaul = false;
    if (this.tweenForFaul) this.tweenForFaul.pause();

    this.setAlpha(0.75);
  }

  stopPenaltyBehaviour() {
    this.isPenalty = false;
    if (this.tweenForFaul) this.tweenForFaul.pause();

    this.setAlpha(0.75);
  }
}
