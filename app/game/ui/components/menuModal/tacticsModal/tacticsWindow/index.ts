import { calculatePercentage } from "@/app/utils/math";
import { MenuButton } from "../button";
import { TeamData } from "@/app/config/initialTeamsData";

export class TacticsWindow extends Phaser.GameObjects.Container {
  modeButtons!: Phaser.GameObjects.Container;
  simpleModeWindow!: Phaser.GameObjects.Container;

  team!: TeamData;

  constructor(scene: Phaser.Scene, x: number, y: number, public side: string) {
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
    this.simpleModeWindow = this.scene.add.container(0, 0);
    this.add(this.simpleModeWindow);

    // Formation Title
    const formationTitle = this.scene.add
      .text(
        this.side === "left"
          ? calculatePercentage(-25, this.scene.game.canvas.width)
          : calculatePercentage(25, this.scene.game.canvas.width),
        calculatePercentage(-40, this.scene.game.canvas.height),
        "Formation",
        {
          fontFamily: "Rubik Mono One",
          fontSize: "14px",
          color: "#ffffff",
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.simpleModeWindow.add(formationTitle);

    // Back Button
    const backButtton = this.scene.add
      .image(
        this.side === "left"
          ? -calculatePercentage(48, this.scene.game.canvas.width)
          : calculatePercentage(48, this.scene.game.canvas.width),
        0,
        "arrow"
      )
      .setFlipX(this.side === "right")
      .setDisplaySize(40, 40)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.simpleModeWindow.destroy();
        this.modeButtons.setVisible(true);
      });
    this.simpleModeWindow.add(backButtton);

    // Stadium
    const stadium = this.scene.add
      .image(
        this.side === "left"
          ? -calculatePercentage(25, this.scene.game.canvas.width)
          : calculatePercentage(25, this.scene.game.canvas.width),
        -calculatePercentage(20, this.scene.game.canvas.height),
        "tactics-stadium"
      )
      .setAlpha(0.5)
      .setDisplaySize(350, 180);
    this.simpleModeWindow.add(stadium);

    // Add Defence Column
    const defencColumn = this.scene.add.container(
      stadium.x - calculatePercentage(35, stadium.getBounds().width),
      0
    );

    for (let i = 0; i < Number(this.team.formation.split("-")[0]); i++) {
      const player = this.scene.add
        .image(
          0,
          i * calculatePercentage(4, this.scene.game.canvas.height),
          this.team.logoKey
        )
        .setAlpha(0.8)
        .setDisplaySize(
          calculatePercentage(3, this.scene.game.canvas.height),
          calculatePercentage(3, this.scene.game.canvas.height)
        );
      this.scene.tweens.add({
        targets: player,
        alpha: 0.5,
        duration: 150,
        yoyo: true,
        repeat: -1,
      });
      defencColumn.add(player);
    }

    defencColumn.setPosition(
      defencColumn.x,
      stadium.y -
        defencColumn.getBounds().height / 2 +
        calculatePercentage(1.5, this.scene.game.canvas.height)
    );
    this.simpleModeWindow.add(defencColumn);

    // Add Center Column
    const centerColumn = this.scene.add.container(
      stadium.x - calculatePercentage(5, stadium.getBounds().width),
      0
    );

    for (let i = 0; i < Number(this.team.formation.split("-")[1]); i++) {
      const player = this.scene.add
        .image(
          0,
          i * calculatePercentage(4, this.scene.game.canvas.height),
          this.team.logoKey
        )
        .setAlpha(0.8)
        .setDisplaySize(
          calculatePercentage(3, this.scene.game.canvas.height),
          calculatePercentage(3, this.scene.game.canvas.height)
        );
      this.scene.tweens.add({
        targets: player,
        alpha: 0.5,
        duration: 150,
        yoyo: true,
        repeat: -1,
      });
      centerColumn.add(player);
    }

    centerColumn.setPosition(
      centerColumn.x,
      stadium.y -
        centerColumn.getBounds().height / 2 +
        calculatePercentage(1.5, this.scene.game.canvas.height)
    );
    this.simpleModeWindow.add(centerColumn);

    // Add Attack Column
    const attackColumn = this.scene.add.container(
      stadium.x + calculatePercentage(25, stadium.getBounds().width),
      0
    );

    for (let i = 0; i < Number(this.team.formation.split("-")[2]); i++) {
      const player = this.scene.add
        .image(
          0,
          i * calculatePercentage(4, this.scene.game.canvas.height),
          this.team.logoKey
        )
        .setAlpha(0.8)
        .setDisplaySize(
          calculatePercentage(3, this.scene.game.canvas.height),
          calculatePercentage(3, this.scene.game.canvas.height)
        );
      this.scene.tweens.add({
        targets: player,
        alpha: 0.5,
        duration: 150,
        yoyo: true,
        repeat: -1,
      });
      attackColumn.add(player);
    }

    attackColumn.setPosition(
      attackColumn.x,
      stadium.y -
        attackColumn.getBounds().height / 2 +
        calculatePercentage(1.5, this.scene.game.canvas.height)
    );
    this.simpleModeWindow.add(attackColumn);
  }

  addModeButtons() {
    const simpleModeButton = new MenuButton(
      this.scene,
      this.side === "left"
        ? calculatePercentage(-40, this.scene.game.canvas.width)
        : calculatePercentage(40, this.scene.game.canvas.width),
      calculatePercentage(-5, this.scene.game.canvas.height),
      100,
      50,
      "Simple Mode",
      () => {
        this.modeButtons.setVisible(false);
        this.addSimpleModeWindow();
      }
    );
    this.modeButtons.add(simpleModeButton);

    const detailsdModeButton = new MenuButton(
      this.scene,
      this.side === "left"
        ? calculatePercentage(-40, this.scene.game.canvas.width)
        : calculatePercentage(40, this.scene.game.canvas.width),
      calculatePercentage(5, this.scene.game.canvas.height),
      100,
      50,
      "Details Mode",
      () => {
        this.modeButtons.setVisible(false);
      }
    );
    this.modeButtons.add(detailsdModeButton);
  }
}
