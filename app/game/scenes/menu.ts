import { calculatePercentage } from "@/app/utils/math";
import { TeamsSelector } from "../ui/teamSelector";
import { MenuButton } from "../ui/menuButton";

export default class Menu extends Phaser.Scene {
  startButton!: MenuButton;

  constructor() {
    super("Menu");
  }

  create() {
    this.addUI();
  }

  addUI() {
    //Background
    this.add
      .rectangle(
        0,
        0,
        this.game.canvas.width,
        this.game.canvas.height,
        0x201b26
      )
      .setOrigin(0);

    //VS text
    this.add
      .text(this.game.canvas.width / 2, this.game.canvas.height / 2, "VS", {
        fontFamily: "Rubik Mono One",
        fontSize: 88,
        color: "#DAF2E9",
      })
      .setOrigin(0.5);

    this.addTeamsSelectors();

    // Start Button
    this.startButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height - 60,
      280,
      75,
      "Start Match"
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.start("GamePlay");
      });

    //Tactics Button
    this.startButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height - 130,
      200,
      75,
      "Tactics"
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.start("GamePlay");
      });
  }

  addTeamsSelectors() {
    //Left Selector
    const leftSelector = new TeamsSelector(
      this,
      0,
      0,
      false,
      calculatePercentage(60, this.game.canvas.height),
      160
    );
    leftSelector.setPosition(
      leftSelector.getBounds().width / 2 +
        calculatePercentage(7, this.game.canvas.width),
      this.game.canvas.height / 2
    );

    //Right Selector
    const rightSelector = new TeamsSelector(
      this,
      0,
      0,
      true,
      calculatePercentage(60, this.game.canvas.height),
      160
    );
    rightSelector.setPosition(
      this.game.canvas.width -
        rightSelector.getBounds().width / 2 -
        calculatePercentage(7, this.game.canvas.width),
      this.game.canvas.height / 2
    );
  }
}
