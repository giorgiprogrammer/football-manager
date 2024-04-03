import GamePlay from "@/app/game/scenes/gameplay";
import { calculatePercentage } from "@/app/utils/math";

export class MatchStatsModal extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public options: {
      title: string;
      hostTeamStats: {
        shoots: number;
        shotsOnTarget: number;
        ballPossession: number;
        corners: number;
        fouls: number;
        score: number;
      };
      guesTeamStats: {
        shoots: number;
        shotsOnTarget: number;
        ballPossession: number;
        corners: number;
        fouls: number;
        score: number;
      };
    }
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addBackground();
    this.addTitle();

    this.addHostTeamIndicators();
    this.addGuestTeamIndicators();

    const centerLine = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(7, calculatePercentage(70, this.getBounds().height));
    this.add(centerLine);

    const vsLine = this.scene.add
      .image(0, calculatePercentage(41.5, this.getBounds().height), "default")
      .setDisplaySize(calculatePercentage(4, this.getBounds().width), 4);
    this.add(vsLine);

    const continueButton = this.scene.add
      .image(
        0,
        calculatePercentage(50, this.getBounds().height),
        "start-button"
      )
      .setDisplaySize(
        calculatePercentage(8, this.getBounds().width),
        calculatePercentage(8, this.getBounds().width)
      )
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        continueButton.setDisplaySize(
          calculatePercentage(9, this.getBounds().width),
          calculatePercentage(9, this.getBounds().width)
        );
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        continueButton.setDisplaySize(
          calculatePercentage(8, this.getBounds().width),
          calculatePercentage(8, this.getBounds().width)
        );
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        const gamePlayScene = this.scene.scene.get("GamePlay") as GamePlay;
        gamePlayScene.gameManager.startSecondHalf();
      });
    this.add(continueButton);
  }

  addHostTeamIndicators() {
    const shootQuantity = this.scene.add
      .text(
        -calculatePercentage(45, this.getBounds().width),
        -calculatePercentage(30, this.getBounds().height),
        `Shoots: ${this.options.hostTeamStats.shoots} `,
        {
          fontFamily: "Silkscreen",
          fontSize: "18px",
          color: "#F0662E",
          align: "left",
        }
      )
      .setOrigin(0, 0.5);
    this.add(shootQuantity);

    const shotsOnTargetQuantity = this.scene.add
      .text(
        -calculatePercentage(45, this.getBounds().width),
        -calculatePercentage(15, this.getBounds().height),
        `Shots on Target: ${this.options.hostTeamStats.shotsOnTarget} `,
        {
          fontFamily: "Silkscreen",
          fontSize: "18px",
          color: "#F0662E",
          align: "left",
        }
      )
      .setOrigin(0, 0.5);
    this.add(shotsOnTargetQuantity);

    const ballPossession = this.scene.add
      .text(
        -calculatePercentage(45, this.getBounds().width),
        -calculatePercentage(0, this.getBounds().height),
        `Ball Possession: ${this.options.hostTeamStats.ballPossession}% `,
        {
          fontFamily: "Silkscreen",
          fontSize: "18px",
          color: "#F0662E",
          align: "left",
        }
      )
      .setOrigin(0, 0.5);
    this.add(ballPossession);

    const corners = this.scene.add
      .text(
        -calculatePercentage(45, this.getBounds().width),
        calculatePercentage(15, this.getBounds().height),
        `Corners: ${this.options.hostTeamStats.corners} `,
        {
          fontFamily: "Silkscreen",
          fontSize: "18px",
          color: "#F0662E",
          align: "left",
        }
      )
      .setOrigin(0, 0.5);
    this.add(corners);

    const fouls = this.scene.add
      .text(
        -calculatePercentage(45, this.getBounds().width),
        calculatePercentage(30, this.getBounds().height),
        `Fouls: ${this.options.hostTeamStats.fouls} `,
        {
          fontFamily: "Silkscreen",
          fontSize: "18px",
          color: "#F0662E",
          align: "left",
        }
      )
      .setOrigin(0, 0.5);
    this.add(fouls);

    const score = this.scene.add
      .text(
        -calculatePercentage(7, this.getBounds().width),
        calculatePercentage(40, this.getBounds().height),
        `${this.options.hostTeamStats.score}`,
        {
          fontFamily: "Silkscreen",
          fontSize: "40px",
          color: "#ffffff",
          align: "right",
        }
      )
      .setOrigin(1, 0.5);
    this.add(score);
  }

  addGuestTeamIndicators() {
    const shootQuantity = this.scene.add
      .text(
        calculatePercentage(45, this.getBounds().width),
        -calculatePercentage(30, this.getBounds().height),
        `Shoots: ${this.options.guesTeamStats.shoots} `,
        {
          fontFamily: "Silkscreen",
          fontSize: "18px",
          color: "#F0662E",
          align: "right",
        }
      )
      .setOrigin(1, 0.5);
    this.add(shootQuantity);

    const shotsOnTargetQuantity = this.scene.add
      .text(
        calculatePercentage(45, this.getBounds().width),
        -calculatePercentage(15, this.getBounds().height),
        `Shots on Target: ${this.options.guesTeamStats.shotsOnTarget} `,
        {
          fontFamily: "Silkscreen",
          fontSize: "18px",
          color: "#F0662E",
          align: "right",
        }
      )
      .setOrigin(1, 0.5);
    this.add(shotsOnTargetQuantity);

    const ballPossession = this.scene.add
      .text(
        calculatePercentage(45, this.getBounds().width),
        -calculatePercentage(0, this.getBounds().height),
        `Ball Possession: ${this.options.guesTeamStats.ballPossession}% `,
        {
          fontFamily: "Silkscreen",
          fontSize: "18px",
          color: "#F0662E",
          align: "right",
        }
      )
      .setOrigin(1, 0.5);
    this.add(ballPossession);

    const corners = this.scene.add
      .text(
        calculatePercentage(45, this.getBounds().width),
        calculatePercentage(15, this.getBounds().height),
        `Corners: ${this.options.guesTeamStats.corners} `,
        {
          fontFamily: "Silkscreen",
          fontSize: "18px",
          color: "#F0662E",
          align: "right",
        }
      )
      .setOrigin(1, 0.5);
    this.add(corners);

    const fouls = this.scene.add
      .text(
        calculatePercentage(45, this.getBounds().width),
        calculatePercentage(30, this.getBounds().height),
        `Fouls: ${this.options.guesTeamStats.fouls} `,
        {
          fontFamily: "Silkscreen",
          fontSize: "18px",
          color: "#F0662E",
          align: "right",
        }
      )
      .setOrigin(1, 0.5);
    this.add(fouls);

    const score = this.scene.add
      .text(
        calculatePercentage(7, this.getBounds().width),
        calculatePercentage(40, this.getBounds().height),
        `${this.options.guesTeamStats.score}`,
        {
          fontFamily: "Silkscreen",
          fontSize: "40px",
          color: "#ffffff",
          align: "left",
        }
      )
      .setOrigin(0, 0.5);
    this.add(score);
  }

  addTitle() {
    const title = this.scene.add
      .text(
        0,
        -calculatePercentage(45, this.getBounds().height),
        this.options.title,
        {
          fontFamily: "Silkscreen",
          fontSize: "20px",
          color: "#fff",
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.add(title);
  }

  addBackground() {
    const background = this.scene.add
      .image(0, 0, "default")
      .setTint(0x000000)
      .setDisplaySize(
        calculatePercentage(50, this.scene.game.canvas.width),
        calculatePercentage(70, this.scene.game.canvas.height)
      )
      .setAlpha(0.7)
      .setOrigin(0.5);
    this.add(background);
  }
}
