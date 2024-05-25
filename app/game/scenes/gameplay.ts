import { matchData } from "@/app/config/matchData";
import { Match } from "../core/match";
import { Stadium } from "../gameObjects/stadium";
import { GameManager } from "../core/gameManager";
import CavnasScene from "./canvasScene";
import { calculatePercentage } from "@/app/utils/math";

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

    this.addMasks();
  }

  addMasks() {
    this.match.hostTeam.footballers.forEach((footballer) => {
      const circle = this.add
        .graphics()
        .setPosition(
          footballer.getBounds().centerX,
          footballer.getBounds().centerY
        )
        .fillCircle(0, 0, 13);

      footballer.setMask(circle.createGeometryMask());

      this.scene.scene.events.on("update", () => {
        circle.setPosition(
          footballer.getBounds().centerX,
          footballer.getBounds().centerY
        );
      });
    });
  }

  addBackground() {
    this.add
      .image(this.game.canvas.width / 2, this.game.canvas.height / 2, "default")
      .setDisplaySize(1450, 780)
      .setTint(0x4d3916)
      .setDepth(-90);
  }
}
