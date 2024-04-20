import { calculatePercentage } from "@/app/utils/math";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";
import { Match } from "./match";

export class CameraMotion {
  camera_z_index = 0.95;
  isCorner = false;

  constructor(
    public scene: Phaser.Scene,
    public stadium: Stadium,
    public ball: Ball,
    public match: Match
  ) {
    this.init();
  }

  init() {
    this.scene.cameras.main.startFollow(this.ball, false, 0.006);
    this.scene.cameras.main.setZoom(this.camera_z_index);

    const centerX = this.ball.x;

    this.scene.events.on("update", () => {
      if (this.isCorner) {
        this.scene.cameras.main.setZoom(this.camera_z_index);
        if (this.camera_z_index > 1.1) {
          this.camera_z_index -= 0.006;
        }
      }

      if (!this.match.isPlaying) return;
      this.scene.cameras.main.setZoom(this.camera_z_index);
      if (
        this.ball.x >
          centerX - calculatePercentage(25, this.stadium.stadiumWidth) &&
        this.ball.x <
          centerX + calculatePercentage(25, this.stadium.stadiumWidth)
      ) {
        if (this.camera_z_index > 1.1) {
          this.camera_z_index -= 0.006;
        }
      } else {
        if (this.camera_z_index < 1.5) {
          this.camera_z_index += 0.006;
        }
      }
    });

    this.startAnimation();
  }

  startAnimation() {
    this.scene.tweens.add({
      targets: this.scene.cameras.main,
      zoom: { from: 2.5, to: this.camera_z_index },
      duration: 7500,
      ease: Phaser.Math.Easing.Quadratic.InOut,
      onComplete: () => {
        this.scene.events.emit("cameraStartAnimationEnd");
      },
    });
  }
}
