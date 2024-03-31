import { matchData } from "@/app/config/matchData";
import { Match } from "../core/match";
import { Stadium } from "../gameObjects/stadium";
import { GameManager } from "../core/gameManager";
import CavnasScene from "./canvasScene";

export default class GamePlay extends Phaser.Scene {
  match!: Match;
  stadium!: Stadium;

  gameManager!: GameManager;
  canvasScene!: CavnasScene;

  constructor() {
    super("GamePlay");
  }

  create() {
    // Run Canvas Scene simultaneously
    this.scene.launch("CanvasScene");
    // Main Function
    this.main();

    //For Stadium it's temporary
    this.addBackground();
  }

  main() {
    this.match = new Match(this, matchData);
    this.canvasScene = this.scene.get("CanvasScene") as CavnasScene;
    this.gameManager = new GameManager(this, this.canvasScene, this.match);
  }

  addBackground() {
    // this.add
    //   .image(this.game.canvas.width / 2, this.game.canvas.height / 2, "city")
    //   .setScale(1.8)
    //   .setTint(0x467572)
    //   .setDepth(-90);

    this.add
      .image(this.game.canvas.width / 2, this.game.canvas.height / 2, "default")
      .setDisplaySize(
        this.match.stadium.getBounds().width,
        this.match.stadium.getBounds().height
      )
      .setTint(0x4d3916)
      .setDepth(-90);

    const topBorder = this.add
      .image(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2 - this.match.stadium.getBounds().height / 2,
        "roof"
      )
      .setOrigin(0.5, 1)
      .setTint(0x9c762d)
      .setDisplaySize(this.match.stadium.getBounds().width, 15);

    const bottomBorder = this.add
      .image(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2 + this.match.stadium.getBounds().height / 2,
        "roof"
      )
      .setOrigin(0.5, 0)
      .setTint(0x9c762d)
      .setDisplaySize(this.match.stadium.getBounds().width, 15);

    const leftBorder = this.add
      .image(
        this.game.canvas.width / 2 - this.match.stadium.getBounds().width / 2,
        this.game.canvas.height / 2,
        "roof"
      )
      .setOrigin(0.5, 0)
      .setTint(0x9c762d)
      .setAngle(90)
      .setDisplaySize(this.match.stadium.getBounds().height + 30, 15);

    const rightBorder = this.add
      .image(
        this.game.canvas.width / 2 + this.match.stadium.getBounds().width / 2,
        this.game.canvas.height / 2,
        "roof"
      )
      .setOrigin(0.5, 1)
      .setTint(0x9c762d)
      .setAngle(90)
      .setDisplaySize(this.match.stadium.getBounds().height + 30, 15);
  }
}
