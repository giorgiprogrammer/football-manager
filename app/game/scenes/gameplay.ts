import { CameraMotion } from "../core/cameraMotion";
import { CollisionDetections } from "../core/collisionDetections";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";

export default class GamePlay extends Phaser.Scene {
  constructor() {
    super("GamePlay");
  }

  create() {
    this.addStadium();
  }

  addStadium() {
    const stadium = new Stadium(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      850,
      400,
      70,
      0x2c1463,
      0xdf1463
    );

    const ball = new Ball(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    );

    new CollisionDetections(this, ball, stadium);
    const cameraMotion = new CameraMotion(this, stadium, ball);

    this.events.on("cameraStartAnimationEnd", () => {
      cameraMotion.isPlaying = true;
    });
  }
}
