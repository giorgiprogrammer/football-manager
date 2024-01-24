import { clamp, interpolate } from "@/app/utils/math";
import { CameraMotion } from "../core/cameraMotion";
import { CollisionDetections } from "../core/collisionDetections";
import { Match } from "../core/match";
import { matchData } from "../data/matchData";
import { teamsData } from "../data/teamsData";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";

export default class GamePlay extends Phaser.Scene {
  match!: Match;
  constructor() {
    super("GamePlay");
  }

  create() {
    const stadium = new Stadium(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      850,
      400,
      50,
      0xfef9ed,
      0xff1606
    );

    const ball = new Ball(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      stadium
    );

    const cameraMotion = new CameraMotion(this, stadium, ball);

    this.events.on("cameraStartAnimationEnd", () => {
      this.match.openStartText();
    });

    matchData.stadium = stadium;

    this.calculateStartStrength();

    this.match = new Match(this, matchData, cameraMotion, ball);
  }

  calculateStartStrength() {
    matchData.hostTeamData!.properties.goalkeeperSpeed = clamp(
      matchData.hostTeamData!.stength,
      800,
      2300
    );

    matchData.hostTeamData!.properties.passAccuracy = clamp(
      matchData.hostTeamData!.stength,
      800,
      2300
    );

    // matchData.hostTeamData!.properties.passDelay = clamp(
    //   matchData.hostTeamData!.stength,
    //   800,
    //   2300
    // );

    matchData.hostTeamData!.properties.passSpeed = clamp(
      matchData.hostTeamData!.stength,
      800,
      2300
    );

    matchData.hostTeamData!.properties.shootSpeed = clamp(
      matchData.hostTeamData!.stength,
      800,
      2300
    );

    matchData.hostTeamData!.properties.speed = clamp(
      matchData.hostTeamData!.stength,
      800,
      2300
    );

    // Guest Team

    matchData.guestTeamData!.properties.goalkeeperSpeed = clamp(
      matchData.guestTeamData!.stength,
      800,
      2300
    );

    matchData.guestTeamData!.properties.passAccuracy = clamp(
      matchData.guestTeamData!.stength,
      800,
      2300
    );

    // matchData.guestTeamData!.properties.passDelay = clamp(
    //   matchData.guestTeamData!.stength,
    //   800,
    //   2300
    // );

    matchData.guestTeamData!.properties.passSpeed = clamp(
      matchData.guestTeamData!.stength,
      800,
      2300
    );

    matchData.guestTeamData!.properties.shootSpeed = clamp(
      matchData.guestTeamData!.stength,
      800,
      2300
    );

    matchData.guestTeamData!.properties.speed = clamp(
      matchData.guestTeamData!.stength,
      800,
      2300
    );
  }
}
