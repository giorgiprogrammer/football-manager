import { text } from "stream/consumers";
import { Team } from "../gameObjects/team/team";
import { MatchData } from "../types/types";
import { CameraMotion } from "./cameraMotion";
import { Ball } from "../gameObjects/ball";
import { CollisionDetections } from "./collisionDetections";
import { Footballer } from "../gameObjects/team/footballer";
import { getRandomNumber } from "@/app/utils/math";
import MatchIndicators from "../scenes/matchIndicators";

export class Match {
  startText!: Phaser.GameObjects.Text;
  hostTeam!: Team;
  guestTeam!: Team;

  interval!: NodeJS.Timeout;

  hostTeamScore = 0;
  guestTeamScore = 0;

  isGoal = false;

  isPlaying = false;

  collisionDetections!: CollisionDetections;

  footballerWithBall!: Footballer;

  timer = 0;

  constructor(
    public scene: Phaser.Scene,
    public matchData: MatchData,
    public cameraMotion: CameraMotion,
    public ball: Ball
  ) {
    this.init();
  }

  init() {
    this.addTeams();
    this.createStartUI();
    this.addCollisionDetections();

    this.scene.events.on("update", () => {
      this.checkIfIsGoal();
    });
  }

  stopHalfTime() {
    this.ball.reset();
    this.hostTeam.reset();
    this.guestTeam.reset();
    this.isGoal = false;

    this.startText.setVisible(true);
    const inputImage = this.scene.add
      .image(0, 0, "default")
      .setOrigin(0)
      .setDepth(500)
      .setAlpha(0.001)
      .setDisplaySize(
        this.scene.game.canvas.width,
        this.scene.game.canvas.height
      )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.startText.setVisible(false);
        inputImage.destroy();
        this.timer++;
        const matchIndicatorsScene = this.scene.scene.get(
          "MatchIndicators"
        ) as MatchIndicators;
        matchIndicatorsScene.setTimerText(this.timer);

        this.resumeMatch("host");
      });

    this.isPlaying = false;
  }

  resetMatch(team: string) {
    this.ball.reset();
    this.hostTeam.reset();
    this.guestTeam.reset();
    this.isGoal = false;

    const matchIndicatorsScene = this.scene.scene.get(
      "MatchIndicators"
    ) as MatchIndicators;
    if (team === "host") {
      this.hostTeamScore++;
      matchIndicatorsScene.setScore(this.hostTeamScore, this.guestTeamScore);
    } else {
      this.guestTeamScore++;
      matchIndicatorsScene.setScore(this.hostTeamScore, this.guestTeamScore);
    }

    setTimeout(() => {
      this.resumeMatch(team);
    }, 1500);
  }

  resumeMatch(team: string) {
    this.matchData.stadium!.stadiumSurrounding.stopSelebrating();

    const footballer =
      team === "host"
        ? this.guestTeam.midfielderColumn.footballers[
            getRandomNumber(
              0,
              this.guestTeam.midfielderColumn.footballers.length - 1
            )
          ]
        : this.hostTeam.midfielderColumn.footballers[
            getRandomNumber(
              0,
              this.hostTeam.midfielderColumn.footballers.length - 1
            )
          ];

    team === "host"
      ? this.hostTeam.startMotion()
      : this.guestTeam.startMotion();

    this.ball.firstKick(
      footballer.getBounds().centerX,
      footballer.getBounds().centerY
    );

    this.isPlaying = true;
  }

  checkIfIsGoal() {
    if (this.isGoal) return;

    // Guest Team Goal
    if (
      this.ball.getBounds().centerX <
      this.matchData.stadium!.leftGoalPost.getBounds().centerX
    ) {
      this.ball.setVelocity(0, 0);
      this.ball.setAngularVelocity(0);
      this.ball.startGoalAnimation();
      this.isGoal = true;
      this.isPlaying = false;
      this.matchData.stadium!.stadiumSurrounding.rightFansSelebrate();
      setTimeout(() => {
        this.resetMatch("guest");
      }, 2500);
    }

    // Host Team Goal
    if (
      this.ball.getBounds().centerX >
      this.matchData.stadium!.rightGoalPost.getBounds().centerX
    ) {
      this.ball.setVelocity(0, 0);
      this.ball.setAngularVelocity(0);
      this.ball.startGoalAnimation();
      this.isGoal = true;
      this.isPlaying = false;
      this.matchData.stadium!.stadiumSurrounding.leftFansSelebrate();
      setTimeout(() => {
        this.resetMatch("host");
      }, 2500);
    }
  }

  addCollisionDetections() {
    this.collisionDetections = new CollisionDetections(
      this.scene,
      this.ball,
      this.matchData.stadium!,
      this
    );

    this.collisionDetections.addFootballersAndBallCollision(
      this.hostTeam.footballers,
      this.guestTeam.footballers
    );
  }

  openStartText() {
    this.startText.setVisible(true);
    const inputImage = this.scene.add
      .image(0, 0, "default")
      .setOrigin(0)
      .setDepth(500)
      .setAlpha(0.001)
      .setDisplaySize(
        this.scene.game.canvas.width,
        this.scene.game.canvas.height
      )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.startText.setVisible(false);
        inputImage.destroy();
        this.startGame();
      });
  }

  createStartUI() {
    this.startText = this.scene.add
      .text(
        this.scene.game.canvas.width / 2,
        this.scene.game.canvas.height / 2,
        "Press To Start",
        {
          fontFamily: "Rubik Mono One",
          fontSize: 44,
          color: "#F2F2FF",
          align: "center",
        }
      )
      .setDepth(1200)
      .setOrigin(0.5)
      .setVisible(false);

    this.scene.tweens.add({
      targets: this.startText,
      duration: 800,
      alpha: 0.2,
      yoyo: true,
      repeat: -1,
    });

    this.scene.scene.launch("MatchIndicators");
  }

  addTeams() {
    this.hostTeam = new Team(
      this.scene,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      this.matchData.stadium!,
      true,
      this.matchData.hostTeamData!
    );

    this.guestTeam = new Team(
      this.scene,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      this.matchData.stadium!,
      false,
      this.matchData.guestTeamData!
    );
  }

  finishMatch() {
    this.ball.reset();
    this.hostTeam.reset();
    this.guestTeam.reset();
    this.isGoal = false;

    this.isPlaying = false;
  }

  startGame() {
    this.cameraMotion.isPlaying = true;

    const footballer =
      this.hostTeam.midfielderColumn.footballers[
        getRandomNumber(
          0,
          this.hostTeam.midfielderColumn.footballers.length - 1
        )
      ];

    this.ball.firstKick(
      footballer.getBounds().centerX,
      footballer.getBounds().centerY
    );

    this.guestTeam.startMotion();

    this.isPlaying = true;
    this.timer++;
    const matchIndicatorsScene = this.scene.scene.get(
      "MatchIndicators"
    ) as MatchIndicators;
    matchIndicatorsScene.setTimerText(this.timer);

    this.interval = setInterval(() => {
      if (!this.isPlaying) return;
      if (this.isGoal) return;

      if (this.timer === 45) {
        this.stopHalfTime();
        return;
      }

      if (this.timer === 90) {
        this.finishMatch();
        return;
      }

      this.timer++;

      const matchIndicatorsScene = this.scene.scene.get(
        "MatchIndicators"
      ) as MatchIndicators;
      matchIndicatorsScene.setTimerText(this.timer);
    }, 2500);
  }

  catchBall(team: string, footballer: Footballer) {
    if (this.isGoal) return;
    if (footballer.controllBall) return;

    this.footballerWithBall = footballer;

    if (team === "host") {
      this.hostTeam.stopMotion();
      this.guestTeam.startMotion();
    } else {
      this.hostTeam.startMotion();
      this.guestTeam.stopMotion();
    }

    this.nextOperation(team);
  }

  nextOperation(team: string) {
    const shortVariants: Array<Footballer> = [];
    const longVariants: Array<Footballer> = [];

    if (this.footballerWithBall.footballerPosition === "goalkeeper") {
      if (team === "host") {
        shortVariants.push(...this.hostTeam.defenceColumn.footballers);
        longVariants.push(...this.hostTeam.midfielderColumn.footballers);
      } else {
        shortVariants.push(...this.guestTeam.defenceColumn.footballers);
        longVariants.push(...this.guestTeam.midfielderColumn.footballers);
      }
    }
    if (this.footballerWithBall.footballerPosition === "defender") {
      if (team === "host") {
        shortVariants.push(...this.hostTeam.midfielderColumn.footballers);
        longVariants.push(...this.hostTeam.attackerColumn.footballers);
      } else {
        shortVariants.push(...this.guestTeam.midfielderColumn.footballers);
        longVariants.push(...this.guestTeam.attackerColumn.footballers);
      }
    }
    if (this.footballerWithBall.footballerPosition === "midfielder") {
      if (team === "host") {
        shortVariants.push(...this.hostTeam.attackerColumn.footballers);
        longVariants.push(...this.hostTeam.attackerColumn.footballers);
      } else {
        shortVariants.push(...this.guestTeam.attackerColumn.footballers);
        longVariants.push(...this.guestTeam.attackerColumn.footballers);
      }
    }

    this.footballerWithBall.makeDesicion(shortVariants, longVariants, this);
  }
}
