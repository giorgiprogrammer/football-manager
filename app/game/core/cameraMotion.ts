import { calculatePercentage } from "@/app/utils/math";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";

export class CameraMotion {
  camera_z_index = 1.1;
  isPlaying = false;

  constructor(
    public scene: Phaser.Scene,
    public stadium: Stadium,
    public ball: Ball
  ) {
    this.init();
  }

  init() {
    this.scene.cameras.main.startFollow(this.ball, false, 0.006);
    this.scene.cameras.main.setZoom(this.camera_z_index);

    const centerX = this.ball.x;

    this.scene.events.on("update", () => {
      if (!this.isPlaying) return;
      this.scene.cameras.main.setZoom(this.camera_z_index);
      if (
        this.ball.x >
          centerX - calculatePercentage(25, this.stadium.stadiumWidth) &&
        this.ball.x <
          centerX + calculatePercentage(25, this.stadium.stadiumWidth)
      ) {
        if (this.camera_z_index > 1) {
          this.camera_z_index -= 0.002;
        }
      } else {
        if (this.camera_z_index < 1.25) {
          this.camera_z_index += 0.002;
        }
      }
    });

    this.startAnimation();
  }

  startAnimation() {
    this.scene.tweens.add({
      targets: this.scene.cameras.main,
      zoom: { from: 0.7, to: 1.1 },
      duration: 5000,
      ease: Phaser.Math.Easing.Quadratic.In,
      onComplete: () => {
        this.scene.events.emit("cameraStartAnimationEnd");
      },
    });
  }
}
