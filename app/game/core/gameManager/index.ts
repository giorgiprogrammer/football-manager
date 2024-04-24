import CavnasScene from "../../scenes/canvasScene";
import GamePlay from "../../scenes/gameplay";
import { Match } from "../match";

export class GameManager {
  halfTimerIsPassed = false;

  constructor(
    public gamePlayScene: GamePlay,
    public canvasScene: CavnasScene,
    public match: Match
  ) {
    this.init();
  }

  init() {
    this.gamePlayScene.events.on("cameraStartAnimationEnd", () => {
      this.canvasScene.startButton.setVisible(true);

      this.canvasScene.startButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.startMatch();
      });
    });

    this.addMatchTimer();
    this.addEventListeners();
  }

  addEventListeners() {
    let teamWhoScored: "host" | "guest";

    this.match.onGoal((team) => {
      this.canvasScene.timerIsOnn = false;
      teamWhoScored = team;
      if (team === "host") {
        this.canvasScene.hostScore++;
        this.canvasScene.setScore(
          this.canvasScene.hostScore,
          this.canvasScene.guestScore
        );
      } else {
        this.canvasScene.guestScore++;
        this.canvasScene.setScore(
          this.canvasScene.hostScore,
          this.canvasScene.guestScore
        );
      }
    });

    this.match.ball.onFinishGoalAnimation(() => {
      this.match.isPlaying = true;
      this.match.resumeMatch(teamWhoScored === "guest" ? "host" : "guest");

      setTimeout(() => {
        this.canvasScene.timerIsOnn = true;
      }, 3000);
    });

    this.match.onCorner(() => {
      this.canvasScene.timerIsOnn = false;
      setTimeout(() => {
        this.canvasScene.showMatchActionTransition("Corner", "Kick!");
      }, 300);
    });

    this.match.onFinishCorner(() => {
      this.canvasScene.timerIsOnn = true;
    });

    this.match.onFinishFaul(() => {
      this.canvasScene.timerIsOnn = true;
    });

    this.match.onFaul(() => {
      this.canvasScene.timerIsOnn = false;
      this.canvasScene.showMatchActionTransition("Free", "Kick!");
    });

    this.match.onPenalty(() => {
      this.canvasScene.timerIsOnn = false;
      this.canvasScene.showMatchActionTransition("Penalty", "Kick!");
    });
  }

  addMatchTimer() {
    this.gamePlayScene.time.addEvent({
      delay: 1200,
      callback: () => {
        if (!this.canvasScene.timerIsOnn) return;

        if (this.canvasScene.timer >= 45 && this.halfTimerIsPassed === false) {
          if (this.match.footballerWithBall.controllBall) {
            this.halfTimeEnd();
            return;
          }
        }

        this.canvasScene.timer++;
        this.canvasScene.setTimerText(this.canvasScene.timer);
      },
      loop: true,
    });
  }

  startMatch() {
    this.canvasScene.startModal.setVisible(false);
    this.canvasScene.topIndicators.setVisible(true);
    this.canvasScene.timerIsOnn = true;

    setTimeout(() => {
      this.gamePlayScene.match.startMatch();
    }, 1000);
  }

  halfTimeEnd() {
    this.canvasScene.timerIsOnn = false;
    this.canvasScene.timer = 45;
    this.canvasScene.setTimerText(45);

    this.canvasScene.openMatchStatsModal({
      hostTeamStats: {
        shoots: 0,
        shotsOnTarget: 0,
        ballPossession: 0,
        corners: 0,
        fouls: 0,
        score: 0,
      },
      guesTeamStats: {
        shoots: 0,
        shotsOnTarget: 0,
        ballPossession: 0,
        corners: 0,
        fouls: 0,
        score: 0,
      },
    });
    this.halfTimerIsPassed = true;

    this.match.isPlaying = false;
    this.match.resetMatch();
  }

  fullTimeEnd() {}

  extraTimeEnd() {}

  startSecondHalf() {
    this.canvasScene.timerIsOnn = true;
    this.canvasScene.matchStatsModal.destroy(true);
    this.match.matchStatus = "secondHalf";

    this.match.isPlaying = true;
  }
}
