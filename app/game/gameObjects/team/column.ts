import {
  calculatePercentage,
  clamp,
  getRandomNumber,
  interpolate,
  mapToPercentageInRange,
} from "@/app/utils/math";
import { Stadium } from "../stadium";
import { Footballer } from "./footballer";
import { TeamProperties } from "../../types/types";
import { TeamData } from "@/app/config/initialTeamsData";
import { matchData } from "@/app/config/matchData";
import { Match } from "../../core/match";

export class Column extends Phaser.GameObjects.Container {
  footballers: Footballer[] = [];
  motionDistance!: number;

  tween!: Phaser.Tweens.Tween;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public quantity: number,
    public stadium: Stadium,
    public team: TeamData,
    public isHost: boolean,
    public type: string
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addFootballers();

    // let postFxPlugin = this.scene.plugins.get("rexglowfilter2pipelineplugin")!;
    // @ts-ignore
    // this.shadow = postFxPlugin.add(this, {
    //   distance: 5,
    //   outerStrength: 5,
    //   innerStrength: 0,
    //   glowColor: Number(
    //     this.isHost
    //       ? matchData.hostTeam.teamColor
    //       : matchData.guestTeam.teamColor
    //   ),
    // });
  }

  reset() {
    this.tween?.destroy();
    this.setPosition(this.x, 0);
  }

  addFootballers() {
    const padding = this.stadium.stadiumHeight / (this.quantity + 1);
    let y = -this.stadium.stadiumHeight / 2 + padding;

    for (let i = 0; i < this.quantity; i++) {
      let posX = 0;
      if (this.type === "defender") {
        if (this.team.formationProperties.defence === "wide-attack") {
          if (i === 0 || i === this.quantity - 1) {
            posX = calculatePercentage(2.8, this.stadium.stadiumWidth);
          }
        }
      }
      if (this.type === "midfielder") {
        if (this.team.formationProperties.midfield === "wide-attack") {
          if (i === 0 || i === this.quantity - 1) {
            posX = calculatePercentage(2.8, this.stadium.stadiumWidth);
          }
        }
        if (this.team.formationProperties.midfield === "center-attack") {
          if (i !== 0 && i !== this.quantity - 1) {
            posX = calculatePercentage(2.8, this.stadium.stadiumWidth);
          }
        }
        if (this.team.formationProperties.midfield === "center-deffence") {
          if (i !== 0 && i !== this.quantity - 1) {
            posX = -calculatePercentage(2.8, this.stadium.stadiumWidth);
          }
        }
        if (this.team.formationProperties.midfield === "wide-deffence") {
          if (i === 0 || i === this.quantity - 1) {
            posX = -calculatePercentage(2.8, this.stadium.stadiumWidth);
          }
        }
      }
      if (this.type === "attacker") {
        if (this.team.formationProperties.attack === "center-attack") {
          if (i !== 0 && i !== this.quantity - 1) {
            posX = calculatePercentage(2.8, this.stadium.stadiumWidth);
          }
        }
      }

      const footballer = new Footballer(
        this.scene,
        posX,
        y,
        this.team.logoKey,
        this.type,
        this.isHost,
        this.stadium,
        this.team.techniqueProperties
      );
      this.add(footballer);
      this.footballers.push(footballer);
      y += padding;

      if (i === 0) {
        this.motionDistance = padding - footballer.displayHeight / 2;
      }
    }
  }

  startMotion(distance: number) {
    if (this.type === "midfielder") {
      const foulChance = getRandomNumber(0, 100);
      if (foulChance > 80) {
        this.footballers[
          getRandomNumber(0, this.footballers.length - 1)
        ].startFaulBehaviour();
      }
    }

    if (this.type === "defender") {
      const penaltyChange = getRandomNumber(0, 100);
      if (penaltyChange > 90) {
        if (this.footballers.length > 3) {
          this.footballers[
            getRandomNumber(
              Math.floor((this.footballers.length - 1) / 2),
              Math.floor((this.footballers.length - 1) / 2 + 1)
            )
          ].startPenaltyBehaviour();
        } else {
          this.footballers[1].startPenaltyBehaviour();
        }
      }
    }

    const speed = interpolate(
      mapToPercentageInRange(this.team.strength, 800, 2130) + 1,
      1800,
      550
    );

    if (this.tween) {
      if (this.tween.isDestroyed()) {
        this.tween = this.scene.add.tween({
          targets: this,
          yoyo: true,
          repeat: -1,
          y: {
            from: -distance,
            to: +distance,
          },
          duration: speed,
        });
        this.tween.seek(calculatePercentage(50, speed));
        return;
      } else {
        this.tween.resume();
        return;
      }
    }

    this.tween = this.scene.add.tween({
      targets: this,
      yoyo: true,
      repeat: -1,
      y: {
        from: -distance,
        to: +distance,
      },
      duration: speed,
    });
    this.tween.seek(calculatePercentage(50, speed));
  }

  stopMotion() {
    if (this.tween?.isDestroyed() !== true) this.tween?.pause();
  }

  stopFaulBehaviour() {
    this.footballers.forEach((footballer) => {
      footballer.stopFaulBehaviour();
      footballer.stopPenaltyBehaviour();
    });
  }
}
