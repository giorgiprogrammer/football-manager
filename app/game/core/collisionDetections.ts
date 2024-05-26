import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";
import { Footballer } from "../gameObjects/team/footballer";
import GamePlay from "../scenes/gameplay";
import { Match } from "./match";

export class CollisionDetections {
  constructor(
    public scene: GamePlay,
    public ball: Ball,
    public stadium: Stadium,
    public match: Match
  ) {
    this.init();
  }

  init() {
    this.scene.physics.add.collider(this.ball, this.stadium.colliders, () => {
      if (!this.match.isPlaying) return;
      this.scene.gameManager.match.soundManager.playBorderSound();

      this.ball.changeRotation();
    });
    this.scene.physics.add.collider(
      this.ball,
      this.stadium.leftGoalPost.colliders,
      () => {
        if (!this.match.isPlaying) return;

        this.scene.gameManager.match.soundManager.playGoalBorderSound();
        this.ball.changeRotation();
      }
    );
    this.scene.physics.add.collider(
      this.ball,
      this.stadium.rightGoalPost.colliders,
      () => {
        if (!this.match.isPlaying) return;

        this.scene.gameManager.match.soundManager.playGoalBorderSound();
        this.ball.changeRotation();
      }
    );

    this.addCornerCollisions();
  }

  addFootballersAndBallCollision(
    Hostfootballers: Footballer[],
    Guestfootballers: Footballer[]
  ) {
    this.scene.physics.add.overlap(this.ball, Hostfootballers, (a, b) => {
      if (!this.match.isPlaying) return;

      const footballer = b as Footballer;

      this.match.catchBall("host", footballer);
      if (!footballer.isFaul && !footballer.isPenalty) {
        footballer.setBall(this.ball);
      }
    });

    this.scene.physics.add.overlap(this.ball, Guestfootballers, (a, b) => {
      if (!this.match.isPlaying) return;

      const footballer = b as Footballer;

      this.match.catchBall("guest", footballer);
      if (!footballer.isFaul && !footballer.isPenalty) {
        footballer.setBall(this.ball);
      }
    });
  }

  addCornerCollisions() {
    this.scene.physics.add.collider(
      this.ball,
      this.stadium.leftCornerColliders,
      () => {
        if (!this.match.isPlaying) return;
        this.scene.gameManager.match.soundManager.playGoalBorderSound();

        this.ball.changeRotation();

        if (this.match.ballGoesToCorner) {
          const verticalSide =
            this.ball.getBounds().y >
            this.stadium.leftGoalPost.getBounds().centerY
              ? "bottom"
              : "top";
          this.match.isCornerEvent("left", verticalSide);
        }
      }
    );

    this.scene.physics.add.collider(
      this.ball,
      this.stadium.rightCornerColliders,
      () => {
        if (!this.match.isPlaying) return;
        this.scene.gameManager.match.soundManager.playGoalBorderSound();

        this.ball.changeRotation();

        if (this.match.ballGoesToCorner) {
          const verticalSide =
            this.ball.getBounds().y >
            this.stadium.leftGoalPost.getBounds().centerY
              ? "bottom"
              : "top";
          this.match.isCornerEvent("right", verticalSide);
        }
      }
    );
  }
}
