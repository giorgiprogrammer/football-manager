import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";

export class CollisionDetections {
  constructor(
    public scene: Phaser.Scene,
    public ball: Ball,
    public stadium: Stadium
  ) {
    this.init();
  }

  init() {
    this.scene.physics.add.collider(this.ball, this.stadium.colliders, () => {
      this.ball.changeRotation();
    });
    this.scene.physics.add.collider(
      this.ball,
      this.stadium.leftGoalPost.colliders,
      () => {
        this.ball.changeRotation();
      }
    );
    this.scene.physics.add.collider(
      this.ball,
      this.stadium.rightGoalPost.colliders,
      () => {
        this.ball.changeRotation();
      }
    );
  }
}
