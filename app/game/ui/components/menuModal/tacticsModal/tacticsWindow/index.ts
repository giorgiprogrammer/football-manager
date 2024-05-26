import { calculatePercentage } from "@/app/utils/math";
import { MenuButton } from "../button";
import { TeamData } from "@/app/config/initialTeamsData";
import { SimpleModeWindow } from "./components/simpleModeWindow";
import Menu from "@/app/game/scenes/menu";

export class TacticsWindow extends Phaser.GameObjects.Container {
  modeButtons!: Phaser.GameObjects.Container;
  simpleModeWindow!: Phaser.GameObjects.Container;

  team!: TeamData;

  constructor(public scene: Menu, x: number, y: number, public side: string) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.modeButtons = this.scene.add.container(0, 0);
    this.add(this.modeButtons);

    this.addModeButtons();
  }

  addSimpleModeWindow() {
    this.simpleModeWindow = new SimpleModeWindow(
      this.scene,
      0,
      0,
      this.side,
      this.team,
      this.modeButtons
    );
    this.add(this.simpleModeWindow);
  }

  addModeButtons() {
    const simpleModeButton = new MenuButton(
      this.scene,
      this.side === "left"
        ? calculatePercentage(-40, this.scene.game.canvas.width)
        : calculatePercentage(40, this.scene.game.canvas.width),
      calculatePercentage(-8, this.scene.game.canvas.height),
      100,
      50,
      "Simple Mode",
      () => {
        this.modeButtons.setVisible(false);
        this.addSimpleModeWindow();
        this.scene.buttonPressSound.play();
      }
    );
    this.modeButtons.add(simpleModeButton);

    const detailsdModeButton = new MenuButton(
      this.scene,
      this.side === "left"
        ? calculatePercentage(-40, this.scene.game.canvas.width)
        : calculatePercentage(40, this.scene.game.canvas.width),
      calculatePercentage(8, this.scene.game.canvas.height),
      100,
      50,
      "Details Mode",
      () => {
        this.modeButtons.setVisible(false);
        this.scene.buttonPressSound.play();
      }
    );
    this.modeButtons.add(detailsdModeButton);
  }
}
