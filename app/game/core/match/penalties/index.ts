import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Match } from "..";
import { matchData } from "@/app/config/matchData";
import CavnasScene from "@/app/game/scenes/canvasScene";

export class Penalties {
  horizontalSide!: "left" | "right";
  firstTeamWhoWillStart!: "host" | "guest";

  footballer!: Phaser.GameObjects.Image;

  hostTeamPenaltyScore = 0;
  guestTeamPenaltyScore = 0;

  penaltyStage = 1;

  isFinishedPenalty = false;

  constructor(public scene: Phaser.Scene, public match: Match) {
    this.init();
  }

  init() {
    this.horizontalSide = getRandomNumber(0, 100) > 50 ? "left" : "right";
    this.firstTeamWhoWillStart =
      getRandomNumber(0, 100) > 50 ? "host" : "guest";

    this.makeArrangement();
    this.addGoalEventListener();
    this.addCollisions();
  }

  makeArrangement() {
    if (this.horizontalSide === "left") {
      this.match.hostTeam.startGoalKeeperMotion();
      this.match.hostTeam.goalKeeper.setVisible(true);
    } else {
      this.match.guestTeam.startGoalKeeperMotion();
      this.match.guestTeam.goalKeeper.setVisible(true);
    }

    if (this.firstTeamWhoWillStart === "host") {
      this.match.guestTeam.goalKeeper.setTexture(matchData.guestTeam.logoKey);
      this.match.hostTeam.goalKeeper.setTexture(matchData.guestTeam.logoKey);
    } else {
      this.match.hostTeam.goalKeeper.setTexture(matchData.hostTeam.logoKey);
      this.match.guestTeam.goalKeeper.setTexture(matchData.hostTeam.logoKey);
    }

    if (this.horizontalSide === "left") {
      this.match.ball.setPosition(
        this.match.stadium.leftGoalPost.getBounds().centerX +
          calculatePercentage(13, this.match.stadium.stadiumWidth),
        this.match.stadium.leftGoalPost.getBounds().centerY
      );

      this.footballer = this.scene.add
        .image(
          this.match.ball.x + 20,
          this.match.ball.getBounds().centerY,
          this.firstTeamWhoWillStart === "host"
            ? matchData.hostTeam.logoKey
            : matchData.guestTeam.logoKey
        )
        .setOrigin(0.5, 0.5)
        .setDisplaySize(
          calculatePercentage(3, this.match.stadium.stadiumWidth),
          calculatePercentage(3, this.match.stadium.stadiumWidth)
        );
    } else {
      this.match.ball.setPosition(
        this.match.stadium.rightGoalPost.getBounds().centerX -
          calculatePercentage(13, this.match.stadium.stadiumWidth),
        this.match.stadium.rightGoalPost.getBounds().centerY
      );

      this.footballer = this.scene.add
        .image(
          this.match.ball.x - 20,
          this.match.ball.getBounds().centerY,
          this.firstTeamWhoWillStart === "host"
            ? matchData.hostTeam.logoKey
            : matchData.guestTeam.logoKey
        )
        .setOrigin(0.5, 0.5)
        .setDisplaySize(
          calculatePercentage(3, this.match.stadium.stadiumWidth),
          calculatePercentage(3, this.match.stadium.stadiumWidth)
        );
    }

    setTimeout(() => {
      this.shoot(this.horizontalSide === "left" ? "leftSide" : "rightSide");
    }, 2000);
  }

  shoot(side: "leftSide" | "rightSide") {
    if (side === "leftSide") {
      this.match.ball.kick(
        250,
        this.match.stadium.leftGoalPost.getBounds().centerX - 100,
        getRandomNumber(
          this.match.stadium.leftGoalPost.getBounds().centerY - 100,
          this.match.stadium.leftGoalPost.getBounds().centerY + 100
        )
      );
    } else {
      this.match.ball.kick(
        250,
        this.match.stadium.rightGoalPost.getBounds().centerX + 100,
        getRandomNumber(
          this.match.stadium.rightGoalPost.getBounds().centerY - 100,
          this.match.stadium.rightGoalPost.getBounds().centerY + 100
        )
      );
    }

    setTimeout(() => {
      this.checkResult();
    }, 2000);
  }

  checkResult() {
    if (this.isFinishedPenalty) return;
    this.isFinishedPenalty = true;
    this.isNotGoal();
  }

  addCollisions() {
    this.scene.physics.add.overlap(
      this.match.ball,
      this.match.hostTeam.goalKeeper,
      (a, b) => {
        if (this.isFinishedPenalty) return;

        this.match.ball.stop();
        this.match.hostTeam.stopGoalKeeper();
        this.match.guestTeam.stopGoalKeeper();

        setTimeout(() => {
          this.isNotGoal();
        }, 1500);

        this.isFinishedPenalty = true;
      }
    );

    this.scene.physics.add.overlap(
      this.match.ball,
      this.match.guestTeam.goalKeeper,
      (a, b) => {
        if (this.isFinishedPenalty) return;
        this.match.ball.stop();

        this.match.hostTeam.stopGoalKeeper();
        this.match.guestTeam.stopGoalKeeper();

        setTimeout(() => {
          this.isNotGoal();
        }, 1500);

        this.isFinishedPenalty = true;
      }
    );
  }

  addGoalEventListener() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, () => {
      if (this.isFinishedPenalty) return;

      if (
        this.match.ball.getBounds().centerX <
        this.match.stadium.leftGoalPost.getBounds().centerX
      ) {
        this.isGoal();
      }

      if (
        this.match.ball.getBounds().centerX >
        this.match.stadium.rightGoalPost.getBounds().centerX
      ) {
        this.isGoal();
      }
    });
  }

  isGoal() {
    this.match.ball.startBlink();
    this.match.ball.stop();

    this.isFinishedPenalty = true;

    const canvasScene = this.scene.scene.get("CanvasScene") as CavnasScene;

    if (this.firstTeamWhoWillStart === "host") {
      this.match.stadium.stadiumSurrounding.startFansSelebration("host");
      canvasScene.hostScore++;
      canvasScene.setScore(canvasScene.hostScore, canvasScene.guestScore);
      canvasScene.addPenaltiesSign("host", "done");

      this.hostTeamPenaltyScore++;
    }

    if (this.firstTeamWhoWillStart === "guest") {
      this.match.stadium.stadiumSurrounding.startFansSelebration("guest");
      canvasScene.guestScore++;
      canvasScene.setScore(canvasScene.hostScore, canvasScene.guestScore);
      canvasScene.addPenaltiesSign("guest", "done");

      this.guestTeamPenaltyScore++;
    }

    this.match.hostTeam.stopGoalKeeper();
    this.match.guestTeam.stopGoalKeeper();

    setTimeout(() => {
      this.reset();
    }, 2000);
  }

  isNotGoal() {
    this.match.ball.startBlink();
    this.match.ball.stop();

    this.isFinishedPenalty = true;

    const canvasScene = this.scene.scene.get("CanvasScene") as CavnasScene;

    if (this.firstTeamWhoWillStart === "host") {
      canvasScene.addPenaltiesSign("host", "wrong");
    }

    if (this.firstTeamWhoWillStart === "guest") {
      canvasScene.addPenaltiesSign("guest", "wrong");
    }

    this.match.hostTeam.stopGoalKeeper();
    this.match.guestTeam.stopGoalKeeper();

    setTimeout(() => {
      this.reset();
    }, 2000);
  }

  reset() {
    if (this.penaltyStage >= 6 && this.penaltyStage / 2 <= 5) {
      if (this.hostTeamPenaltyScore > this.guestTeamPenaltyScore) {
        const difference =
          this.hostTeamPenaltyScore - this.guestTeamPenaltyScore;
        const leftStages = 5 - this.penaltyStage / 2;

        if (leftStages < difference) {
          this.match.eventEmitter.emit("finishPenalties", "host");
          return;
        }
      }

      if (this.hostTeamPenaltyScore < this.guestTeamPenaltyScore) {
        const difference =
          this.guestTeamPenaltyScore - this.hostTeamPenaltyScore;
        const leftStages = 5 - this.penaltyStage / 2;

        if (leftStages < difference) {
          this.match.eventEmitter.emit("finishPenalties", "guest");
          return;
        }
      }
    }
    if (this.penaltyStage / 2 > 5) {
      if (this.penaltyStage % 2 === 0) {
        if (this.hostTeamPenaltyScore > this.guestTeamPenaltyScore) {
          this.match.eventEmitter.emit("finishPenalties", "host");
          return;
        }
        if (this.hostTeamPenaltyScore < this.guestTeamPenaltyScore) {
          this.match.eventEmitter.emit("finishPenalties", "guest");
          return;
        }
      }
    }

    this.penaltyStage++;

    // Ball reset
    this.match.ball.stopBlink();
    if (this.horizontalSide === "left") {
      this.match.ball.setPosition(
        this.match.stadium.leftGoalPost.getBounds().centerX +
          calculatePercentage(13, this.match.stadium.stadiumWidth),
        this.match.stadium.leftGoalPost.getBounds().centerY
      );
    } else {
      this.match.ball.setPosition(
        this.match.stadium.rightGoalPost.getBounds().centerX -
          calculatePercentage(13, this.match.stadium.stadiumWidth),
        this.match.stadium.rightGoalPost.getBounds().centerY
      );
    }

    this.match.hostTeam.startGoalKeeperMotion();
    this.match.guestTeam.startGoalKeeperMotion();

    this.match.stadium.stadiumSurrounding.stopFansSelebration("host");
    this.match.stadium.stadiumSurrounding.stopFansSelebration("guest");

    this.isFinishedPenalty = false;

    setTimeout(() => {
      this.shoot(this.horizontalSide === "left" ? "leftSide" : "rightSide");
    }, 2000);

    if (this.firstTeamWhoWillStart === "host") {
      this.firstTeamWhoWillStart = "guest";
      this.footballer.setTexture(matchData.guestTeam.logoKey);

      this.match.hostTeam.goalKeeper.setTexture(matchData.hostTeam.logoKey);
      this.match.guestTeam.goalKeeper.setTexture(matchData.hostTeam.logoKey);

      return;
    }
    if (this.firstTeamWhoWillStart === "guest") {
      this.firstTeamWhoWillStart = "host";
      this.footballer.setTexture(matchData.hostTeam.logoKey);

      this.match.hostTeam.goalKeeper.setTexture(matchData.guestTeam.logoKey);
      this.match.guestTeam.goalKeeper.setTexture(matchData.guestTeam.logoKey);
      return;
    }
  }
}
