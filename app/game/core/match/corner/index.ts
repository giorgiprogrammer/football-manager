import { matchData } from "@/app/config/matchData";
import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Match } from "..";
import { Footballer } from "@/app/game/gameObjects/team/footballer";
import { CornerFootballer } from "./conrcerFootballer";
import { Ball } from "@/app/game/gameObjects/ball";

let defenderFootballer: CornerFootballer;
let attackerFootballer: CornerFootballer;
let cornerFootballer: Phaser.GameObjects.Image;

let defenderFootballerTween: Phaser.Tweens.Tween;
let attackerFootballerTween: Phaser.Tweens.Tween;

let isFinishedCorner = false;

export function makeCornerArrangement(
  horizontalSide: "left" | "right",
  verticalSide: "top" | "bottom",
  scene: Phaser.Scene,
  match: Match
) {
  isFinishedCorner = false;
  if (horizontalSide === "left" && verticalSide === "top") {
    cornerFootballer = scene.add
      .image(match.ball.x - 13, match.ball.y - 13, matchData.guestTeam.logoKey)
      .setOrigin(0.5, 0.5)
      .setDisplaySize(
        calculatePercentage(3, match.stadium.stadiumWidth),
        calculatePercentage(3, match.stadium.stadiumWidth)
      );

    defenderFootballer = new CornerFootballer(
      scene,
      match.stadium.leftGoalPost.getBounds().centerX + 60,
      match.stadium.leftGoalPost.getBounds().centerY - 50,
      matchData.hostTeam.logoKey,
      "defender",
      match.stadium,
      match.ball
    );

    defenderFootballerTween = scene.tweens.add({
      targets: defenderFootballer,
      x: match.stadium.leftGoalPost.getBounds().centerX + 170,
      yoyo: true,
      repeat: -1,
      duration: 800,
    });

    attackerFootballer = new CornerFootballer(
      scene,
      match.stadium.leftGoalPost.getBounds().centerX + 80,
      match.stadium.leftGoalPost.getBounds().centerY,
      matchData.guestTeam.logoKey,
      "attacker",
      match.stadium,
      match.ball
    );

    attackerFootballerTween = scene.tweens.add({
      targets: attackerFootballer,
      x: match.stadium.leftGoalPost.getBounds().centerX + 190,
      yoyo: true,
      repeat: -1,
      duration: 1000,
    });
  }

  if (horizontalSide === "left" && verticalSide === "bottom") {
    cornerFootballer = scene.add
      .image(match.ball.x - 13, match.ball.y + 13, matchData.guestTeam.logoKey)
      .setOrigin(0.5, 0.5)
      .setDisplaySize(
        calculatePercentage(3, match.stadium.stadiumWidth),
        calculatePercentage(3, match.stadium.stadiumWidth)
      );

    defenderFootballer = new CornerFootballer(
      scene,
      match.stadium.leftGoalPost.getBounds().centerX + 60,
      match.stadium.leftGoalPost.getBounds().centerY + 50,
      matchData.hostTeam.logoKey,
      "defender",
      match.stadium,
      match.ball
    );

    defenderFootballerTween = scene.tweens.add({
      targets: defenderFootballer,
      x: match.stadium.leftGoalPost.getBounds().centerX + 170,
      yoyo: true,
      repeat: -1,
      duration: 800,
    });

    attackerFootballer = new CornerFootballer(
      scene,
      match.stadium.leftGoalPost.getBounds().centerX + 80,
      match.stadium.leftGoalPost.getBounds().centerY,
      matchData.guestTeam.logoKey,
      "attacker",
      match.stadium,
      match.ball
    );

    attackerFootballerTween = scene.tweens.add({
      targets: attackerFootballer,
      x: match.stadium.leftGoalPost.getBounds().centerX + 190,
      yoyo: true,
      repeat: -1,
      duration: 1000,
    });
  }

  if (horizontalSide === "right" && verticalSide === "top") {
    cornerFootballer = scene.add
      .image(match.ball.x + 13, match.ball.y - 13, matchData.hostTeam.logoKey)
      .setOrigin(0.5, 0.5)
      .setDisplaySize(
        calculatePercentage(3, match.stadium.stadiumWidth),
        calculatePercentage(3, match.stadium.stadiumWidth)
      );

    defenderFootballer = new CornerFootballer(
      scene,
      match.stadium.rightGoalPost.getBounds().centerX - 60,
      match.stadium.rightGoalPost.getBounds().centerY - 50,
      matchData.guestTeam.logoKey,
      "defender",
      match.stadium,
      match.ball
    );

    defenderFootballerTween = scene.tweens.add({
      targets: defenderFootballer,
      x: match.stadium.rightGoalPost.getBounds().centerX - 170,
      yoyo: true,
      repeat: -1,
      duration: 800,
    });

    attackerFootballer = new CornerFootballer(
      scene,
      match.stadium.rightGoalPost.getBounds().centerX - 80,
      match.stadium.rightGoalPost.getBounds().centerY,
      matchData.hostTeam.logoKey,
      "attacker",
      match.stadium,
      match.ball
    );

    attackerFootballerTween = scene.tweens.add({
      targets: attackerFootballer,
      x: match.stadium.rightGoalPost.getBounds().centerX - 190,
      yoyo: true,
      repeat: -1,
      duration: 1000,
    });
  }

  if (horizontalSide === "right" && verticalSide === "bottom") {
    cornerFootballer = scene.add
      .image(match.ball.x + 13, match.ball.y + 13, matchData.hostTeam.logoKey)
      .setOrigin(0.5, 0.5)
      .setDisplaySize(
        calculatePercentage(3, match.stadium.stadiumWidth),
        calculatePercentage(3, match.stadium.stadiumWidth)
      );

    defenderFootballer = new CornerFootballer(
      scene,
      match.stadium.rightGoalPost.getBounds().centerX - 60,
      match.stadium.rightGoalPost.getBounds().centerY + 50,
      matchData.guestTeam.logoKey,
      "defender",
      match.stadium,
      match.ball
    );

    defenderFootballerTween = scene.tweens.add({
      targets: defenderFootballer,
      x: match.stadium.rightGoalPost.getBounds().centerX - 170,
      yoyo: true,
      repeat: -1,
      duration: 800,
    });

    attackerFootballer = new CornerFootballer(
      scene,
      match.stadium.rightGoalPost.getBounds().centerX - 80,
      match.stadium.rightGoalPost.getBounds().centerY,
      matchData.hostTeam.logoKey,
      "attacker",
      match.stadium,
      match.ball
    );

    attackerFootballerTween = scene.tweens.add({
      targets: attackerFootballer,
      x: match.stadium.rightGoalPost.getBounds().centerX - 190,
      yoyo: true,
      repeat: -1,
      duration: 1000,
    });
  }

  match.hostTeam.startGoalKeeperMotion();
  match.guestTeam.startGoalKeeperMotion();

  setTimeout(() => {
    cornerShoot(match, match.ball, horizontalSide, verticalSide);
  }, 3000);

  addCollisions(scene, match.ball, horizontalSide, verticalSide, match);
  addGoalEventListener(scene, match.ball, match, horizontalSide);
}

function addGoalEventListener(
  scene: Phaser.Scene,
  ball: Ball,
  match: Match,
  horizontalSide: "left" | "right"
) {
  scene.events.on(Phaser.Scenes.Events.UPDATE, () => {
    if (isFinishedCorner) return;

    if (
      ball.getBounds().centerX < match.stadium.leftGoalPost.getBounds().centerX
    ) {
      ball.stop();
      match.hostTeam.stopGoalKeeper();
      match.guestTeam.stopGoalKeeper();
      defenderFootballerTween.stop();
      attackerFootballerTween.stop();

      match.hostTeam.stopFaulBehaviour();
      match.guestTeam.stopFaulBehaviour();

      finishCorner("guestGoal", horizontalSide, match);
    }

    if (
      ball.getBounds().centerX > match.stadium.rightGoalPost.getBounds().centerX
    ) {
      ball.stop();
      match.hostTeam.stopGoalKeeper();
      match.guestTeam.stopGoalKeeper();
      defenderFootballerTween.stop();
      attackerFootballerTween.stop();

      match.hostTeam.stopFaulBehaviour();
      match.guestTeam.stopFaulBehaviour();

      finishCorner("hostGoal", horizontalSide, match);
    }
  });
}

function addCollisions(
  scene: Phaser.Scene,
  ball: Ball,
  horizontalSide: "left" | "right",
  verticalSide: "top" | "bottom",
  match: Match
) {
  scene.physics.add.overlap(ball, match.hostTeam.goalKeeper, (a, b) => {
    if (isFinishedCorner) return;

    const footballer = b as Footballer;
    defenderFootballerTween.stop();

    finishCorner("noGoal", "left", match);
  });

  scene.physics.add.overlap(ball, match.guestTeam.goalKeeper, (a, b) => {
    if (isFinishedCorner) return;

    const footballer = b as Footballer;
    defenderFootballerTween.stop();

    finishCorner("noGoal", "right", match);
  });

  scene.physics.add.overlap(ball, defenderFootballer, (a, b) => {
    const footballer = b as Footballer;
    defenderFootballerTween.stop();

    ball.stop();
    finishCorner("noGoal", horizontalSide, match);
  });

  scene.physics.add.overlap(ball, attackerFootballer, (a, b) => {
    const footballer = b as Footballer;
    attackerFootballerTween.stop();

    if (horizontalSide === "right" && verticalSide === "top") {
      ball.kick(200, ball.x + 300, getRandomNumber(ball.y - 50, ball.y + 50));
    }

    if (horizontalSide === "right" && verticalSide === "bottom") {
      ball.kick(200, ball.x + 300, getRandomNumber(ball.y - 50, ball.y + 50));
    }

    if (horizontalSide === "left" && verticalSide === "top") {
      ball.kick(200, ball.x - 300, getRandomNumber(ball.y - 50, ball.y + 50));
    }

    if (horizontalSide === "left" && verticalSide === "bottom") {
      ball.kick(200, ball.x - 300, getRandomNumber(ball.y - 50, ball.y + 50));
    }
  });
}

function cornerShoot(
  match: Match,
  ball: Ball,
  horizontalSide: "left" | "right",
  verticalSide: "top" | "bottom"
) {
  setTimeout(() => {
    if (isFinishedCorner) return;
    finishCorner("noGoal", horizontalSide, match);
  }, 2000);

  if (horizontalSide === "left" && verticalSide === "top") {
    console.log("left top");
    ball.kick(
      200,
      getRandomNumber(
        match.stadium.leftGoalPost.getBounds().centerX + 50,
        match.stadium.leftGoalPost.getBounds().centerX + 250
      ),
      ball.y + match.stadium.stadiumHeight
    );
  }

  if (horizontalSide === "left" && verticalSide === "bottom") {
    console.log("left bottom");
    ball.kick(
      200,
      getRandomNumber(
        match.stadium.leftGoalPost.getBounds().centerX + 50,
        match.stadium.leftGoalPost.getBounds().centerX + 250
      ),
      ball.y - match.stadium.stadiumHeight
    );
  }

  if (horizontalSide === "right" && verticalSide === "top") {
    console.log("right top");
    ball.kick(
      200,
      getRandomNumber(
        match.stadium.rightGoalPost.getBounds().centerX - 250,
        match.stadium.rightGoalPost.getBounds().centerX - 50
      ),
      ball.y + match.stadium.stadiumHeight
    );
  }

  if (horizontalSide === "right" && verticalSide === "bottom") {
    console.log("right bottom");
    ball.kick(
      200,
      getRandomNumber(
        match.stadium.rightGoalPost.getBounds().centerX - 250,
        match.stadium.rightGoalPost.getBounds().centerX - 50
      ),
      ball.y - match.stadium.stadiumHeight
    );
  }
}

function finishCorner(
  result: "hostGoal" | "guestGoal" | "noGoal",
  horizontalSide: "left" | "right",
  match: Match
) {
  isFinishedCorner = true;

  if (result === "hostGoal") {
    defenderFootballer.destroy(true);
    attackerFootballer.destroy(true);
    cornerFootballer.destroy(true);
    match.isPlaying = true;

    match.eventEmitter.emit("finishCorner");
  }
  if (result === "guestGoal") {
    defenderFootballer.destroy(true);
    attackerFootballer.destroy(true);
    cornerFootballer.destroy(true);
    match.isPlaying = true;

    match.eventEmitter.emit("finishCorner");
  }

  if (result === "noGoal") {
    defenderFootballerTween.stop();
    attackerFootballerTween.stop();
    match.hostTeam.goalKeeperTween.pause();
    match.guestTeam.goalKeeperTween.pause();

    match.ball.stop();

    setTimeout(() => {
      match.hostTeam.showFootballers();
      match.guestTeam.showFootballers();

      match.hostTeam.reset();
      match.guestTeam.reset();

      defenderFootballer.destroy(true);
      attackerFootballer.destroy(true);
      cornerFootballer.destroy(true);

      if (horizontalSide === "left") {
        match.hostTeam.resetGoalKeeper();
        match.guestTeam.resetGoalKeeper();

        match.ball.setPosition(
          match.hostTeam.goalKeeper.getBounds().centerX,
          match.hostTeam.goalKeeper.getBounds().centerY
        );
        setTimeout(() => {
          match.isPlaying = true;

          match.hostTeam.goalKeeper.setBall(match.ball);
          match.catchBall("host", match.hostTeam.goalKeeper);
          match.guestTeam.startMotion();

          match.hostTeam.goalKeeperTween.resume();
          match.guestTeam.goalKeeperTween.resume();

          match.hostTeam.stopFaulBehaviour();
          match.guestTeam.stopFaulBehaviour();

          match.eventEmitter.emit("finishCorner");
        }, 2000);
      }
      if (horizontalSide === "right") {
        match.hostTeam.resetGoalKeeper();
        match.guestTeam.resetGoalKeeper();

        match.ball.setPosition(
          match.guestTeam.goalKeeper.getBounds().centerX,
          match.guestTeam.goalKeeper.getBounds().centerY
        );

        setTimeout(() => {
          match.isPlaying = true;

          match.guestTeam.goalKeeper.setBall(match.ball);
          match.catchBall("guest", match.guestTeam.goalKeeper);
          match.hostTeam.startMotion();

          match.guestTeam.goalKeeperTween.resume();
          match.hostTeam.goalKeeperTween.resume();

          match.hostTeam.stopFaulBehaviour();
          match.guestTeam.stopFaulBehaviour();

          match.eventEmitter.emit("finishCorner");
        }, 2000);
      }
    }, 2000);
  }
}
