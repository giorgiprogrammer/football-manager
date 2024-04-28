import { Team } from "../../gameObjects/team/team";
import { CollisionDetections } from "../collisionDetections";
import { Footballer } from "../../gameObjects/team/footballer";
import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { MatchData } from "@/app/config/matchData";
import { Stadium } from "../../gameObjects/stadium";
import { Ball } from "../../gameObjects/ball";
import { CameraMotion } from "../cameraMotion";
import EventEmitter from "events";
import { makeCornerArrangement } from "./corner";
import { Foul } from "./foul";
import { Penalty } from "./penalty";
import { Penalties } from "./penalties";

export class Match {
  eventEmitter: EventEmitter = new EventEmitter();

  startText!: Phaser.GameObjects.Text;
  hostTeam!: Team;
  guestTeam!: Team;

  stadium!: Stadium;

  ball!: Ball;

  interval!: NodeJS.Timeout;

  isPlaying = false;

  collisionDetections!: CollisionDetections;

  footballerWithBall!: Footballer;

  timer = 0;

  ballGoesToCorner = false;

  passSound!: Phaser.Sound.BaseSound;
  goalSelebration!: Phaser.Sound.BaseSound;
  refereeSound!: Phaser.Sound.BaseSound;
  fansSound!: Phaser.Sound.BaseSound;

  cameraMotion!: CameraMotion;

  foul!: Foul;

  matchStatus:
    | "firtHalf"
    | "secondHalf"
    | "extraFirstHalf"
    | "extraSecondHalf"
    | "penalty" = "firtHalf";

  constructor(public scene: Phaser.Scene, public matchData: MatchData) {
    this.init();
  }

  init() {
    this.matchStatus = "firtHalf";

    this.addStadium();
    this.addBall();
    this.addGoalEventListener();
    this.addTeams();
    this.createCollisionDetections();
    this.addSounds();

    this.addCamera();

    this.fansSound.play();
  }

  addCamera() {
    this.cameraMotion = new CameraMotion(
      this.scene,
      this.stadium,
      this.ball,
      this
    );
  }

  addGoalEventListener() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, () => {
      if (!this.isPlaying) return;

      if (
        this.ball.getBounds().centerX <
        this.stadium.leftGoalPost.getBounds().centerX
      ) {
        this.isGoal("guest");
      }

      if (
        this.ball.getBounds().centerX >
        this.stadium.rightGoalPost.getBounds().centerX
      ) {
        this.isGoal("host");
      }
    });
  }

  isGoal(team: "host" | "guest") {
    this.isPlaying = false;
    this.ball.isGoal();

    this.hostTeam.stopMotion();
    this.guestTeam.stopMotion();
    this.hostTeam.stopGoalKeeper();
    this.guestTeam.stopGoalKeeper();

    this.hostTeam.stopFaulBehaviour();
    this.guestTeam.stopFaulBehaviour();

    if (team === "host") {
      this.eventEmitter.emit("goal", "host");
      this.stadium.stadiumSurrounding.startFansSelebration("host");
    } else {
      this.eventEmitter.emit("goal", "guest");
      this.stadium.stadiumSurrounding.startFansSelebration("guest");
    }
  }

  startPlay(teamWithBall: "host" | "guest") {
    this.refereeSound.play();
    this.stadium.stopLightAnimations();
    this.startBallMotion(teamWithBall);
    this.hostTeam.startGoalKeeperMotion();
    this.guestTeam.startGoalKeeperMotion();

    if (teamWithBall === "host") {
      this.hostTeam.hasBall = true;
    } else {
      this.guestTeam.hasBall = true;
    }

    this.isPlaying = true;
  }

  startBallMotion(ballOwnerTeam: "host" | "guest") {
    const firstRandomFootballer =
      ballOwnerTeam === "host"
        ? this.hostTeam.midfielderColumn.footballers[
            getRandomNumber(
              0,
              this.hostTeam.midfielderColumn.footballers.length - 1
            )
          ]
        : this.guestTeam.midfielderColumn.footballers[
            getRandomNumber(
              0,
              this.guestTeam.midfielderColumn.footballers.length - 1
            )
          ];

    this.ball.firstKick(
      firstRandomFootballer.getBounds().centerX,
      firstRandomFootballer.getBounds().centerY
    );
  }

  // use this method to resume match after goal
  resumeMatch(ballOwnerTeam: "host" | "guest") {
    this.hostTeam.reset();
    this.guestTeam.reset();
    this.hostTeam.resetGoalKeeper();
    this.guestTeam.resetGoalKeeper();

    this.hostTeam.stopFaulBehaviour();
    this.guestTeam.stopFaulBehaviour();

    if (ballOwnerTeam === "host") {
      this.hostTeam.hasBall = true;
    } else {
      this.guestTeam.hasBall = true;
    }

    this.ball.reset();

    setTimeout(() => {
      this.startBallMotion(ballOwnerTeam);
      this.hostTeam.startGoalKeeperMotion();
      this.guestTeam.startGoalKeeperMotion();
      this.stadium.stadiumSurrounding.stopFansSelebration(
        ballOwnerTeam === "host" ? "guest" : "host"
      );
    }, 3000);
  }

  addSounds() {
    this.passSound = this.scene.sound.add("passSound", {
      volume: 1,
      loop: false,
    });
    this.goalSelebration = this.scene.sound.add("goalSelebrationSound", {
      volume: 1,
      loop: false,
    });
    this.refereeSound = this.scene.sound.add("refereeSound", {
      volume: 1,
      loop: false,
    });
    this.fansSound = this.scene.sound.add("fansSound", {
      volume: 0.08,
      loop: true,
    });
  }

  addBall() {
    this.ball = new Ball(
      this.scene,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      this.stadium
    );
  }

  addStadium() {
    this.stadium = new Stadium(
      this.scene,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      850,
      400,
      50,
      Number(this.matchData.hostTeam.teamColor),
      Number(this.matchData.guestTeam.teamColor)
    );
  }

  resetMatch() {
    this.ball.reset();
    this.isPlaying = false;

    this.hostTeam.stopMotion();
    this.guestTeam.stopMotion();

    this.hostTeam.stopGoalKeeper();
    this.guestTeam.stopGoalKeeper();

    this.hostTeam.stopFaulBehaviour();
    this.guestTeam.stopFaulBehaviour();

    this.hostTeam.reset();
    this.guestTeam.reset();

    this.hostTeam.hasBall = false;
    this.guestTeam.hasBall = false;
  }

  createCollisionDetections() {
    this.collisionDetections = new CollisionDetections(
      this.scene,
      this.ball,
      this.stadium,
      this
    );

    this.collisionDetections.addFootballersAndBallCollision(
      this.hostTeam.footballers,
      this.guestTeam.footballers
    );
  }

  addTeams() {
    this.hostTeam = new Team(
      this.scene,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      this.stadium,
      true,
      this.matchData.hostTeam,
      this.ball,
      this
    );
    this.guestTeam = new Team(
      this.scene,
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      this.stadium,
      false,
      this.matchData.guestTeam,
      this.ball,
      this
    );
  }

  finishMatch() {
    // stop ufter 5 seconds
    setTimeout(() => {
      this.fansSound.stop();
    }, 5000);

    this.refereeSound.play();
    this.ball.reset();
    this.hostTeam.reset();
    this.guestTeam.reset();
    this.hostTeam.goalKeeperTween?.stop();
    this.guestTeam.goalKeeperTween?.stop();

    this.isPlaying = false;
  }

  checkCornerPosibbility(
    teamWithBall: "host" | "guest",
    footballer: Footballer
  ) {
    if (footballer.type === "defender") {
      // if ball touch defender from behind don't go to corner
      if (teamWithBall === "host") {
        if (footballer.getBounds().centerX > this.ball.getBounds().centerX)
          return false;
      }
      if (teamWithBall === "guest") {
        if (footballer.getBounds().centerX < this.ball.getBounds().centerX)
          return false;
      }

      const random = getRandomNumber(1, 100);
      if (random > 70) {
        const side =
          footballer.getBounds().x < this.stadium.getBounds().centerX
            ? "left"
            : "right";
        this.ball.goToCorner(side, footballer);

        return true;
      }
    }

    return false;
  }

  startFaulPreperation(whoIsFaul: "host" | "guest") {
    this.isPlaying = false;
    this.ball.stop();

    this.hostTeam.stopMotion();
    this.guestTeam.stopMotion();

    this.hostTeam.stopGoalKeeper();
    this.guestTeam.stopGoalKeeper();

    this.foul = new Foul(this.scene, this, whoIsFaul);
  }

  startPenaltyPreperation(whoIsFaul: "host" | "guest") {
    this.isPlaying = false;
    this.ball.stop();

    this.hostTeam.stopMotion();
    this.guestTeam.stopMotion();

    this.hostTeam.stopGoalKeeper();
    this.guestTeam.stopGoalKeeper();

    new Penalty(this.scene, this, whoIsFaul);
  }

  catchBall(team: "host" | "guest", footballer: Footballer) {
    this.footballerWithBall = footballer;

    if (footballer.controllBall) return;
    if (!this.isPlaying) return;

    //check penaly
    if (footballer.isPenalty) {
      this.startPenaltyPreperation(team);
      return;
    }

    // check faul
    if (footballer.isFaul) {
      this.startFaulPreperation(team);
      return;
    }

    // check corner
    this.ballGoesToCorner = this.checkCornerPosibbility(team, footballer);

    if (team === "host") {
      // for experimental mode
      this.hostTeam.hasBall = true;
      this.guestTeam.hasBall = false;

      // for classic mode
      this.hostTeam.stopMotion();
      this.hostTeam.stopFaulBehaviour();
      this.guestTeam.startMotion();
    } else {
      // for experimental mode
      this.hostTeam.hasBall = false;
      this.guestTeam.hasBall = true;

      // for classic mode
      this.hostTeam.startMotion();
      this.guestTeam.stopMotion();
      this.guestTeam.stopFaulBehaviour();
    }

    if (this.ballGoesToCorner) return;
    this.nextOperation(team);
  }

  nextOperation(team: string) {
    const shortVariants: Array<Footballer> = [];
    const longVariants: Array<Footballer> = [];

    if (this.footballerWithBall.type === "goalkeeper") {
      if (team === "host") {
        shortVariants.push(...this.hostTeam.defenceColumn.footballers);
        longVariants.push(...this.hostTeam.midfielderColumn.footballers);
      } else {
        shortVariants.push(...this.guestTeam.defenceColumn.footballers);
        longVariants.push(...this.guestTeam.midfielderColumn.footballers);
      }
    }
    if (this.footballerWithBall.type === "defender") {
      if (team === "host") {
        shortVariants.push(...this.hostTeam.midfielderColumn.footballers);
        longVariants.push(...this.hostTeam.attackerColumn.footballers);
      } else {
        shortVariants.push(...this.guestTeam.midfielderColumn.footballers);
        longVariants.push(...this.guestTeam.attackerColumn.footballers);
      }
    }
    if (this.footballerWithBall.type === "midfielder") {
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

  isCornerEvent(
    horizontalSide: "left" | "right",
    verticalSide: "top" | "bottom"
  ) {
    if (!this.isPlaying) return;

    this.hostTeam.stopMotion();
    this.hostTeam.stopGoalKeeper();
    this.guestTeam.stopMotion();
    this.guestTeam.stopGoalKeeper();

    this.hostTeam.stopFaulBehaviour();
    this.guestTeam.stopFaulBehaviour();

    this.ball.stopOnCorner();
    this.eventEmitter.emit("corner");

    this.isPlaying = false;

    setTimeout(() => {
      this.makeCorner(horizontalSide, verticalSide);
    }, 2000);
  }

  makeCorner(horizontalSide: "left" | "right", verticalSide: "top" | "bottom") {
    this.hostTeam.hideFootballers();
    this.guestTeam.hideFootballers();

    this.hostTeam.goalKeeper.setVisible(true);
    this.guestTeam.goalKeeper.setVisible(true);

    if (horizontalSide === "left" && verticalSide === "top") {
      this.ball.setPosition(
        this.stadium.leftTopLine.getBounds().centerX,
        this.stadium.leftTopLine.getBounds().y
      );
    }

    if (horizontalSide === "right" && verticalSide === "top") {
      this.ball.setPosition(
        this.stadium.rightTopLine.getBounds().centerX,
        this.stadium.rightTopLine.getBounds().y
      );
    }

    if (horizontalSide === "left" && verticalSide === "bottom") {
      this.ball.setPosition(
        this.stadium.leftTopLine.getBounds().centerX,
        this.stadium.leftBottomLine.getBounds().bottom
      );
    }

    if (horizontalSide === "right" && verticalSide === "bottom") {
      this.ball.setPosition(
        this.stadium.rightTopLine.getBounds().centerX,
        this.stadium.rightBottomLine.getBounds().bottom
      );
    }

    this.cameraMotion.isCorner = true;

    makeCornerArrangement(horizontalSide, verticalSide, this.scene, this);
  }

  // Create Event Listeners
  onGoal(callback: (team: "host" | "guest") => void) {
    this.eventEmitter.on("goal", callback);
  }

  onCorner(callback: () => void) {
    this.eventEmitter.on("corner", callback);
  }

  onFinishCorner(callback: () => void) {
    this.eventEmitter.on("finishCorner", callback);
  }

  onFinishFaul(callback: () => void) {
    this.eventEmitter.on("finishFaul", callback);
  }

  onFaul(callback: () => void) {
    this.eventEmitter.on("faul", callback);
  }

  onPenalty(callback: () => void) {
    this.eventEmitter.on("penalty", callback);
  }

  onFinishPenalties(callback: (winnerTeam: "host" | "guest") => void) {
    this.eventEmitter.on("finishPenalties", callback);
  }

  startPenalties() {
    this.hostTeam.hideFootballers();
    this.guestTeam.hideFootballers();

    new Penalties(this.scene, this);
  }
}
