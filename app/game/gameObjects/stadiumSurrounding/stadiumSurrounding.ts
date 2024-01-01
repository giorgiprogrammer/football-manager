export class StadiumSurrounding extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addStadiumSurrounding();
  }

  addStadiumSurrounding() {
    const stadiumSurrounding = this.scene.add
      .image(0, 0, "stadiumSurrounding")
      .setOrigin(0.5)
      .setScale(0.5);
    this.add(stadiumSurrounding);
  }
}
