import { calculatePercentage, getRandomNumber } from "@/app/utils/math";

export class Ball extends Phaser.Physics.Arcade.Image {
  goalAnimation!: Phaser.Tweens.Tween;
  anglurarVelocity = 500;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "ball");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.4);
    this.setDepth(10);

    this.init();

    this.firstKick();
  }

  init() {
    this.setBounce(1, 1);
    this.setCircle(
      calculatePercentage(80, this.displayWidth),
      calculatePercentage(50, this.displayWidth),
      calculatePercentage(50, this.displayHeight)
    );

    this.makeTail();
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

  firstKick() {
    this.scene.physics.moveTo(
      this,
      getRandomNumber(-500, 500),
      getRandomNumber(-500, 500),
      150
    );
    this.setAngularVelocity(this.anglurarVelocity);
  }

  kick() {}

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
    this.radius = calculatePercentage(5, Math.abs(ball.body!.velocity.x));
    let circle = scene.add.circle(ball.x, ball.y, this.radius, 0xb8eb1c, 0.5);

    scene.events.on("update", () => {
      this.radius -= 0.3;

      if (this.radius < 0) {
        circle.destroy();
      } else {
        circle.setRadius(this.radius);
      }
    });
  }
}
