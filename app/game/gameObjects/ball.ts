import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Stadium } from "./stadium";
import EventEmitter from "events";

export class Ball extends Phaser.Physics.Arcade.Image {
  private eventEmitter: EventEmitter = new EventEmitter();

  goalAnimation!: Phaser.Tweens.Tween;
  anglurarVelocity = 800;

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

  isGoal() {
    this.setAngularVelocity(0);
    this.setVelocity(0, 0);
    this.setPosition(this.x, this.y);
    this.startGoalAnimation();
  }

  startGoalAnimation() {
    let count = 0;
    if (this.goalAnimation !== undefined) {
      this.goalAnimation.resume();
    } else {
      this.goalAnimation = this.scene.tweens.add({
        targets: this,
        alpha: 0.2,
        repeat: -1,
        yoyo: true,
        duration: 300,
        onRepeat: () => {
          count += 1;
          if (count > 6) {
            count = 0;
            this.eventEmitter.emit("finishGoalAniamtion");
          }
        },
      });
    }
  }

  onFinishGoalAnimation(callback: () => void) {
    this.eventEmitter.on("finishGoalAniamtion", callback);
  }

  stopGoalAnimation() {
    this.goalAnimation?.pause();
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
      new Circle(this.scene, this);
    });
  }

  changeRotation() {
    this.anglurarVelocity = -this.anglurarVelocity;
    this.setAngularVelocity(-this.anglurarVelocity);
  }
}

class Circle {
  constructor(public scene: Phaser.Scene, public ball: Ball) {
    let circle = scene.add.circle(
      ball.x,
      ball.y,
      calculatePercentage(30, ball.displayWidth),
      0xe1ffff
    );

    scene.tweens.add({
      targets: circle,
      alpha: 0,
      duration: 500,
      radius: 0,
      onComplete: () => {
        circle.destroy(true);
      },
    });
  }
}
