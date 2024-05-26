import { matchData, matchStats } from "@/app/config/matchData";
import { Match } from "..";
import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Ball } from "@/app/game/gameObjects/ball";

export class Foul {
  footballer!: Phaser.GameObjects.Image;

  isFinishedFoul = false;

  constructor(
    public scene: Phaser.Scene,
    public match: Match,
    public whoFouled: "host" | "guest"
  ) {
    this.init();
  }

  init() {
    this.match.ball.startBlink();
    this.addGoalEventListener(this.scene, this.match.ball, this.match);
    this.addCollisions();

    this.whoFouled === "host"
      ? matchStats.hostTeamStats.fouls++
      : matchStats.guesTeamStats.fouls++;

    setTimeout(() => {
      this.makeFoul();
    }, 1500);
  }

  makeFoul() {
    this.match.hostTeam.stopFaulBehaviour();
    this.match.guestTeam.stopFaulBehaviour();

    this.match.ball.stopBlink();

    this.match.hostTeam.hideFootballers();
    this.match.guestTeam.hideFootballers();

    this.match.eventEmitter.emit("faul");

    this.makeArrangement();
  }

  makeArrangement() {
    if (this.whoFouled === "host") {
      this.match.hostTeam.startGoalKeeperMotion();
      this.match.hostTeam.goalKeeper.setVisible(true);

      this.footballer = this.scene.add
        .image(
          this.match.ball.x + 20,
          this.match.ball.getBounds().centerY,
          matchData.guestTeam.name
        )
        .setOrigin(0.5, 0.5)
        .setDisplaySize(
          calculatePercentage(3, this.match.stadium.stadiumWidth),
          calculatePercentage(3, this.match.stadium.stadiumWidth)
        );
      // Add Mask
      const circle = this.scene.add
        .graphics()
        .setPosition(
          this.footballer.getBounds().centerX,
          this.footballer.getBounds().centerY
        )
        .fillCircle(0, 0, 13);
      this.footballer.setMask(circle.createGeometryMask());

      setTimeout(() => {
        this.shoot("leftSide");
      }, 4000);
    } else {
      this.match.guestTeam.startGoalKeeperMotion();
      this.match.guestTeam.goalKeeper.setVisible(true);

      this.footballer = this.scene.add
        .image(
          this.match.ball.x - 20,
          this.match.ball.getBounds().centerY,
          matchData.hostTeam.name
        )
        .setOrigin(0.5, 0.5)
        .setDisplaySize(
          calculatePercentage(3, this.match.stadium.stadiumWidth),
          calculatePercentage(3, this.match.stadium.stadiumWidth)
        );
      // Add Mask
      const circle = this.scene.add
        .graphics()
        .setPosition(
          this.footballer.getBounds().centerX,
          this.footballer.getBounds().centerY
        )
        .fillCircle(0, 0, 13);
      this.footballer.setMask(circle.createGeometryMask());

      setTimeout(() => {
        this.shoot("rightSide");
      }, 4000);
    }
  }

  shoot(side: "leftSide" | "rightSide") {
    this.match.soundManager.playShootSound();

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
      if (this.isFinishedFoul) return;
      this.finishFaul();
    }, 3000);
  }

  finishFaul() {
    this.isFinishedFoul = true;

    this.match.ball.stop();
    this.match.hostTeam.stopGoalKeeper();
    this.match.guestTeam.stopGoalKeeper();

    this.footballer.destroy(true);

    setTimeout(() => {
      this.match.hostTeam.reset();
      this.match.guestTeam.reset();

      if (this.whoFouled === "host") {
        this.match.ball.setPosition(
          this.match.hostTeam.goalKeeper.getBounds().centerX,
          this.match.hostTeam.goalKeeper.getBounds().centerY
        );

        setTimeout(() => {
          this.match.isPlaying = true;

          this.match.hostTeam.stopFaulBehaviour();
          this.match.guestTeam.stopFaulBehaviour();

          this.match.hostTeam.goalKeeper.setBall(this.match.ball);
          this.match.catchBall("host", this.match.hostTeam.goalKeeper);
          this.match.guestTeam.startMotion();

          this.match.hostTeam.goalKeeperTween.resume();
          this.match.guestTeam.goalKeeperTween.resume();

          this.match.eventEmitter.emit("finishFaul");
        }, 1000);
      } else {
        this.match.ball.setPosition(
          this.match.guestTeam.goalKeeper.getBounds().centerX,
          this.match.guestTeam.goalKeeper.getBounds().centerY
        );

        setTimeout(() => {
          this.match.isPlaying = true;

          this.match.hostTeam.stopFaulBehaviour();
          this.match.guestTeam.stopFaulBehaviour();

          this.match.guestTeam.goalKeeper.setBall(this.match.ball);
          this.match.catchBall("host", this.match.guestTeam.goalKeeper);
          this.match.guestTeam.startMotion();

          this.match.hostTeam.goalKeeperTween.resume();
          this.match.guestTeam.goalKeeperTween.resume();

          this.match.eventEmitter.emit("finishFaul");
        }, 1000);
      }
    }, 1500);
  }

  addCollisions() {
    this.scene.physics.add.overlap(
      this.match.ball,
      this.match.hostTeam.goalKeeper,
      (a, b) => {
        if (this.isFinishedFoul) return;

        this.match.ball.stop();
        this.match.hostTeam.stopGoalKeeper();
        this.match.guestTeam.stopGoalKeeper();

        setTimeout(() => {
          this.finishFaul();
        }, 1500);

        this.isFinishedFoul = true;
      }
    );

    this.scene.physics.add.overlap(
      this.match.ball,
      this.match.guestTeam.goalKeeper,
      (a, b) => {
        if (this.isFinishedFoul) return;
        this.match.ball.stop();

        this.match.hostTeam.stopGoalKeeper();
        this.match.guestTeam.stopGoalKeeper();

        setTimeout(() => {
          this.finishFaul();
        }, 1500);

        this.isFinishedFoul = true;
      }
    );
  }

  addGoalEventListener(scene: Phaser.Scene, ball: Ball, match: Match) {
    scene.events.on(Phaser.Scenes.Events.UPDATE, () => {
      if (this.isFinishedFoul) return;

      if (
        ball.getBounds().centerX <
        match.stadium.leftGoalPost.getBounds().centerX
      ) {
        ball.stop();
        match.hostTeam.stopGoalKeeper();
        match.guestTeam.stopGoalKeeper();

        this.footballer.destroy(true);
        match.isPlaying = true;
        this.isFinishedFoul = true;
      }

      if (
        ball.getBounds().centerX >
        match.stadium.rightGoalPost.getBounds().centerX
      ) {
        ball.stop();
        match.hostTeam.stopGoalKeeper();
        match.guestTeam.stopGoalKeeper();

        this.footballer.destroy(true);
        match.isPlaying = true;
        this.isFinishedFoul = true;
      }
    });
  }
}
