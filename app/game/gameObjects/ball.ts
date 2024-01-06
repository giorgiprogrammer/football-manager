import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Stadium } from "./stadium";

export class Ball extends Phaser.Physics.Arcade.Image {
  goalAnimation!: Phaser.Tweens.Tween;
  anglurarVelocity = 500;

  constructor(scene: Phaser.Scene, x: number, y: number, stadium: Stadium) {
    super(scene, x, y, "ball");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(calculatePercentage(0.04, stadium.stadiumWidth));
    this.setDepth(10);

    this.init();
  }

  init() {
    this.setBounce(1, 1);
    this.setCircle(
      calculatePercentage(90, this.displayWidth),
      calculatePercentage(60, this.displayWidth),
      calculatePercentage(60, this.displayHeight)
    );

    this.makeTail();
  }

  reset() {
    this.setPosition(
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2
    );
    this.setVelocity(0, 0);
    this.setAlpha(1);
    this.setAngularVelocity(0);
    this.stopGoalAnimation();
  }

  startGoalAnimation() {
    if (this.goalAnimation !== undefined) {
      this.goalAnimation.resume();
    } else {
      this.goalAnimation = this.scene.tweens.add({
        targets: this,
        alpha: 0.2,
        repeat: -1,
        yoyo: true,
        duration: 400,
      });
    }
  }

  stopGoalAnimation() {
    this.goalAnimation.pause();
  }

  firstKick(x: number, y: number) {
    this.scene.physics.moveTo(this, x, y, 200);
    this.setAngularVelocity(this.anglurarVelocity);
  }

  kick(speed: number, x: number, y: number) {
    this.scene.physics.moveTo(this, x, y, speed);
    this.setAngularVelocity(this.anglurarVelocity);
  }

  makeTail() {
    this.scene.events.on("update", () => {
      if (this.body?.velocity.x !== 0) new Circle(this.scene, this);
    });
  }

  changeRotation() {
    this.anglurarVelocity = -this.anglurarVelocity;
    this.setAngularVelocity(-this.anglurarVelocity);
  }
}

class Circle {
  radius!: number;

  constructor(public scene: Phaser.Scene, public ball: Ball) {
    this.radius = calculatePercentage(30, ball.displayWidth);
    let circle = scene.add.circle(ball.x, ball.y, this.radius, 0xb8eb1c, 0.5);
    scene.events.on("update", () => {
      this.radius -= 0.4;
      if (this.radius < 0) {
        circle.destroy();
      } else {
        circle.setRadius(this.radius);
      }
    });
  }
}
