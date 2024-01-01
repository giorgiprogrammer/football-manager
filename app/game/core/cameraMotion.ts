import { calculatePercentage } from "@/app/utils/math";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";

export class CameraMotion {
  camera_z_index = 1;

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
      this.scene.cameras.main.setZoom(this.camera_z_index);
      if (
        this.ball.x >
          centerX - calculatePercentage(30, this.stadium.stadiumWidth) &&
        this.ball.x <
          centerX + calculatePercentage(30, this.stadium.stadiumWidth)
      ) {
        if (this.camera_z_index > 1) {
          this.camera_z_index -= 0.003;
        }
      } else {
        if (this.camera_z_index < 1.25) {
          this.camera_z_index += 0.003;
        }
      }
    });
  }
}
