import { calculatePercentage } from "@/app/utils/math";
import GamePlay from "./gameplay";
import { matchData } from "@/app/config/matchData";
import { tournamenrDataConfig } from "../config/tournamentDataConfig";
import { tournamentManager } from "@/app/core/tournamentsManager/tournametsManager";

export default class CavnasScene extends Phaser.Scene {
  scoreText!: Phaser.GameObjects.Text;

  startButton!: Phaser.GameObjects.Image;

  topIndicators!: Phaser.GameObjects.Container;
  startModal!: Phaser.GameObjects.Container;

  hostScore = 0;
  guestScore = 0;

  timerText!: Phaser.GameObjects.Text;

  constructor() {
    super("CanvasScene");
  }

  create() {
    this.topIndicators = this.add.container(0, 0).setVisible(false);

    this.addTopIndicators();
    this.addMenuButton();
    this.addStartModal();
  }

  async addStartModal() {
    await tournamentManager.init();
    let division = undefined;
    if (tournamenrDataConfig.division === 1) {
      division = tournamentManager.division_1;
    }
    if (tournamenrDataConfig.division === 2) {
      division = tournamentManager.division_2;
    }
    if (tournamenrDataConfig.division === 3) {
      division = tournamentManager.division_3;
    }

    this.startModal = this.add.container(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    );

    const background = this.add
      .image(0, 0, "default")
      .setTint(0x0e383b)
      .setAlpha(0.7)
      .setOrigin(0.5)
      .setDisplaySize(
        calculatePercentage(60, this.game.canvas.width),
        calculatePercentage(35, this.game.canvas.height)
      );
    this.startModal.add(background);

    const hostTeamName = this.add
      .text(
        -calculatePercentage(48, this.startModal.getBounds().width),
        0,
        matchData.hostTeam.name,
        {
          fontFamily: "Silkscreen",
          fontSize: 25,
          color: "#DAF2E9",
          align: "right",
        }
      )
      .setOrigin(0, 0.5);
    this.startModal.add(hostTeamName);

    division?.findIndex((team, index) => {
      if (team.team_name === matchData.hostTeam.name) {
        const hostTeamPositionText = this.add
          .text(
            hostTeamName.x,
            calculatePercentage(10, this.startModal.getBounds().height),
            `${index + 1}th`,
            {
              fontFamily: "Silkscreen",
              fontSize: 20,
              color: "#EB5344",
              align: "right",
            }
          )
          .setOrigin(0, 0);
        this.startModal.add(hostTeamPositionText);
      }
    });

    const guestTeamName = this.add
      .text(
        calculatePercentage(48, this.startModal.getBounds().width),
        0,
        matchData.guestTeam.name,
        {
          fontFamily: "Silkscreen",
          fontSize: 25,
          color: "#DAF2E9",
          align: "left",
        }
      )
      .setOrigin(1, 0.5);
    this.startModal.add(guestTeamName);

    division?.findIndex((team, index) => {
      if (team.team_name === matchData.guestTeam.name) {
        const guestTeamPositionText = this.add
          .text(
            guestTeamName.x,
            calculatePercentage(10, this.startModal.getBounds().height),
            `${index + 1}th`,
            {
              fontFamily: "Silkscreen",
              fontSize: 20,
              color: "#EB5344",
              align: "left",
            }
          )
          .setOrigin(1, 0);
        this.startModal.add(guestTeamPositionText);
      }
    });

    const vsText = this.add
      .text(0, 0, "VS", {
        fontFamily: "Silkscreen",
        fontSize: 30,
        color: "#FF7131",
        align: "center",
      })
      .setOrigin(0.5);
    this.startModal.add(vsText);

    this.tweens.add({
      targets: vsText,
      alpha: 0,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    this.startButton = this.add
      .image(
        0,
        calculatePercentage(50, this.startModal.getBounds().height),
        "start-button"
      )
      .setDisplaySize(
        calculatePercentage(8, this.startModal.getBounds().width),
        calculatePercentage(8, this.startModal.getBounds().width)
      )
      .setOrigin(0.5)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        this.startButton.setDisplaySize(
          calculatePercentage(9, this.startModal.getBounds().width),
          calculatePercentage(9, this.startModal.getBounds().width)
        );
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        this.startButton.setDisplaySize(
          calculatePercentage(8, this.startModal.getBounds().width),
          calculatePercentage(8, this.startModal.getBounds().width)
        );
      });

    this.startModal.add(this.startButton);

    const weekText = this.add
      .text(
        0,
        -calculatePercentage(32, this.startModal.getBounds().height),
        `Week ${tournamenrDataConfig.week}`,
        {
          fontFamily: "Silkscreen",
          fontSize: 27,
          color: "#DAF2E9",
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.startModal.add(weekText);
  }

  addMenuButton() {
    const menuIcon = this.add
      .image(
        calculatePercentage(2.5, this.game.canvas.width),
        calculatePercentage(5, this.game.canvas.height),
        "menuIcon"
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        const gamePlayScene = this.scene.get("GamePlay") as GamePlay;

        this.scene.stop();
        clearTimeout(gamePlayScene.match.interval);
        gamePlayScene.events.removeListener("update");
        gamePlayScene.scene.start("Menu");
      });
  }

  addTopIndicators() {
    this.scoreText = this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(5, this.game.canvas.height),
        `${this.hostScore} - ${this.guestScore}`,
        {
          fontFamily: "Silkscreen",
          fontSize: 40,
          color: "#DAF2E9",
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.topIndicators.add(this.scoreText);

    const hostTeamIcon = this.add
      .image(
        this.game.canvas.width / 2 -
          calculatePercentage(9, this.game.canvas.width),
        calculatePercentage(5, this.game.canvas.height),
        matchData.hostTeam.logoKey
      )
      .setScale(0.8);
    this.topIndicators.add(hostTeamIcon);

    const guestTeam = this.add
      .image(
        this.game.canvas.width / 2 +
          calculatePercentage(9, this.game.canvas.width),
        calculatePercentage(5, this.game.canvas.height),
        matchData.guestTeam.logoKey
      )
      .setScale(0.8);
    this.topIndicators.add(guestTeam);

    this.timerText = this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(10, this.game.canvas.height),
        "0",
        {
          fontFamily: "Silkscreen",
          fontSize: 35,
          color: "#DAF2E9",
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.topIndicators.add(this.timerText);

    const background = this.add
      .image(this.game.canvas.width / 2, 0, "default")
      .setTint(0x000000)
      .setOrigin(0.5, 0)
      .setAlpha(0.5)
      .setDisplaySize(
        calculatePercentage(120, this.topIndicators.getBounds().width),
        calculatePercentage(120, this.topIndicators.getBounds().height)
      );
    this.topIndicators.add(background);

    this.topIndicators.moveDown(background);
    this.topIndicators.moveDown(background);
    this.topIndicators.moveDown(background);
    this.topIndicators.moveDown(background);
  }

  setTimerText(time: number) {
    this.timerText.setText(`${time}`);
  }

  setScore(lefscore: number, rightScore: number) {
    this.scoreText.setText(`${lefscore} - ${rightScore}`);
  }
}
