import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";
import { Footballer } from "../gameObjects/team/footballer";
import { Match } from "./match";

export class CollisionDetections {
  constructor(
    public scene: Phaser.Scene,
    public ball: Ball,
    public stadium: Stadium,
    public match: Match
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

  addFootballersAndBallCollision(
    Hostfootballers: Footballer[],
    Guestfootballers: Footballer[]
  ) {
    this.scene.physics.add.overlap(this.ball, Hostfootballers, (a, b) => {
      const footballer = b as Footballer;

      this.match.catchBall("host", footballer);
      footballer.setBall(this.ball);
    });

    this.scene.physics.add.overlap(this.ball, Guestfootballers, (a, b) => {
      const footballer = b as Footballer;

      this.match.catchBall("guest", footballer);
      footballer.setBall(this.ball);
    });
  }
}
