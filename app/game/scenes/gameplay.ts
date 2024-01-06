import { CameraMotion } from "../core/cameraMotion";
import { CollisionDetections } from "../core/collisionDetections";
import { Match } from "../core/match";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";

export default class GamePlay extends Phaser.Scene {
  match!: Match;
  constructor() {
    super("GamePlay");
  }

  create() {
    this.addStadium();
  }

  addStadium() {
    const stadium = new Stadium(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      850,
      400,
      80,
      0xf82116,
      0x02dc0d
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

    const hostTeamData = {
      name: "Arsenal",
      key: "arsenal",
      properties: {
        speed: 50,
        goalkeeperSpeed: 50,
      },
      tactics: {
        defence: {
          type: "attack",
          side: "wide",
          quntity: 3,
        },
        midfielder: {
          type: "defend",
          side: "center",
          quntity: 3,
        },
        attacker: {
          type: "normal",
          side: "center",
          quntity: 3,
        },
      },
    };

    const guestTeamData = {
      name: "Everton",
      key: "everton",
      properties: {
        speed: 80,
        goalkeeperSpeed: 50,
      },
      tactics: {
        defence: {
          type: "normal",
          side: "center",
          quntity: 4,
        },
        midfielder: {
          type: "normal",
          side: "center",
          quntity: 4,
        },
        attacker: {
          type: "defend",
          side: "center",
          quntity: 2,
        },
      },
    };

    this.match = new Match(
      this,
      {
        stadium: stadium,
        hostTeamData: hostTeamData,
        guestTeamData: guestTeamData,
      },
      cameraMotion,
      ball
    );
  }
}
