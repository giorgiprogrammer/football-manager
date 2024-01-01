import { WebFontFile } from "../helper/webFontLoader";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`../../game/assets/`);

    //Font
    this.load.addFile(new WebFontFile(this.load, "Rubik Mono One"));

    //UI
    this.load.image("neon-arrow", "image/ui/neon-arrow.png");
    this.load.image("menu-button", "image/ui/menu-button.png");
    this.load.image("default", "image/ui/default.png");
    this.load.image("grass", "image/ui/grass.jpg");

    //Team Logos
    this.load.image("arsenal", "image/teamLogos/arsenal.png");
    this.load.image("aston-villa", "image/teamLogos/aston-villa.png");
    this.load.image("bournemouth", "image/teamLogos/bournemouth.png");
    this.load.image("brighton", "image/teamLogos/brighton.png");
    this.load.image("burnley", "image/teamLogos/burnley.png");
    this.load.image("chelsea", "image/teamLogos/chelsea.png");
    this.load.image("crystal-palace", "image/teamLogos/crystal-palace.png");
    this.load.image("everton", "image/teamLogos/everton.png");
    this.load.image("fulham", "image/teamLogos/fulham.png");

    //GameObjects
    this.load.image("ball", "image/gameObjects/ball.png");
  }

  create() {
    // this.scene.start("Menu");
    this.scene.start("GamePlay");
  }
}
