import { calculatePercentage } from "@/app/utils/math";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";
import { Match } from "./match";

export class CameraMotion {
  camera_z_index = calculatePercentage(0.1, this.scene.game.canvas.width);
  startCameraZoomIndex = this.camera_z_index;
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
    this.scene.cameras.main.startFollow(this.ball, false, 0.009);
    this.scene.cameras.main.setZoom(this.camera_z_index);

    // alert(window.innerWidth);
    // alert(window.innerHeight);

    // this.scene.cameras.main.setBounds(
    //   0,
    //   0,
    //   this.match.stadium.getBounds().width,
    //   this.match.stadium.getBounds().height,
    //   true
    // );

    const centerX = this.ball.x;

    this.scene.events.on("update", () => {
      if (this.isCorner) {
        this.scene.cameras.main.setZoom(this.camera_z_index);
        if (
          this.camera_z_index >
          this.startCameraZoomIndex -
            calculatePercentage(0.01, this.scene.game.canvas.width)
        ) {
          this.camera_z_index -= 0.009;
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
        if (
          this.camera_z_index >
          this.startCameraZoomIndex -
            calculatePercentage(0.01, this.scene.game.canvas.width)
        ) {
          this.camera_z_index -= 0.009;
        }
      } else {
        if (
          this.camera_z_index <
          this.startCameraZoomIndex +
            calculatePercentage(0.01, this.scene.game.canvas.width)
        ) {
          this.camera_z_index += 0.009;
        }
      }
    });

    this.startAnimation();
  }

  startAnimation() {
    this.scene.tweens.add({
      targets: this.scene.cameras.main,
      zoom: { from: this.camera_z_index + 1.5, to: this.camera_z_index },
      duration: 7500,
      ease: Phaser.Math.Easing.Quadratic.InOut,
      onComplete: () => {
        this.scene.events.emit("cameraStartAnimationEnd");
      },
    });
  }
}
