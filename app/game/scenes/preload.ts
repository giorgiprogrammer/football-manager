export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
    console.log("preload scene");
  }

  preload() {
    console.log("preload");
  }
}
