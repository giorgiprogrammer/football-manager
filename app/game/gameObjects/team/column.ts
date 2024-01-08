import { calculatePercentage, interpolate } from "@/app/utils/math";
import { Stadium } from "../stadium";
import { Footballer } from "./footballer";
import { TeamProperties } from "../../types/types";

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
    public footballerKey: string,
    public type: string,
    public side: string,
    public isHost: boolean,
    public properties: TeamProperties,
    public columnPosition: string
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addFootballers();
    this.makeArrangement();
  }

  reset() {
    this.tween?.destroy();
    this.setPosition(this.x, 0);
  }

  addFootballers() {
    const padding = this.stadium.stadiumHeight / (this.quantity + 1);
    let y = -this.stadium.stadiumHeight / 2 + padding;

    for (let i = 0; i < this.quantity; i++) {
      const footballer = new Footballer(
        this.scene,
        0,
        y,
        this.footballerKey,
        this.columnPosition,
        this.isHost,
        this.stadium,
        this.properties
      );
      this.add(footballer);
      this.footballers.push(footballer);
      y += padding;

      if (i === 0) {
        this.motionDistance = padding - footballer.displayHeight / 2;
      }
    }
  }

  makeArrangement() {
    if (this.type === "normal") return;
    if (this.type === "attack") {
      if (this.side === "center") {
        if (this.quantity === 3) {
          this.footballers[1].setPosition(
            this.isHost
              ? this.footballers[1].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[1].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[1].y
          );
        }
        if (this.quantity === 4) {
          this.footballers[1].setPosition(
            this.isHost
              ? this.footballers[1].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[1].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[1].y
          );
          this.footballers[2].setPosition(
            this.isHost
              ? this.footballers[2].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[2].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[2].y
          );
        }
        if (this.quantity === 5) {
          this.footballers[1].setPosition(
            this.isHost
              ? this.footballers[1].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[1].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[1].y
          );
          this.footballers[2].setPosition(
            this.isHost
              ? this.footballers[2].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[2].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[2].y
          );
          this.footballers[3].setPosition(
            this.isHost
              ? this.footballers[3].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[3].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[3].y
          );
        }
      }

      if (this.side === "wide") {
        if (this.quantity === 3) {
          this.footballers[0].setPosition(
            this.isHost
              ? this.footballers[0].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[0].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[0].y
          );

          this.footballers[2].setPosition(
            this.isHost
              ? this.footballers[2].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[2].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[2].y
          );
        }
        if (this.quantity === 4) {
          this.footballers[0].setPosition(
            this.isHost
              ? this.footballers[0].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[0].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[0].y
          );
          this.footballers[3].setPosition(
            this.isHost
              ? this.footballers[3].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[3].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[3].y
          );
        }
        if (this.quantity === 5) {
          this.footballers[0].setPosition(
            this.isHost
              ? this.footballers[0].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[0].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[0].y
          );

          this.footballers[4].setPosition(
            this.isHost
              ? this.footballers[4].x +
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[4].x -
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[4].y
          );
        }
      }
    }

    if (this.type === "defend") {
      if (this.side === "center") {
        if (this.quantity === 3) {
          this.footballers[1].setPosition(
            this.isHost
              ? this.footballers[1].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[1].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[1].y
          );
        }
        if (this.quantity === 4) {
          this.footballers[1].setPosition(
            this.isHost
              ? this.footballers[1].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[1].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[1].y
          );
          this.footballers[2].setPosition(
            this.isHost
              ? this.footballers[2].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[2].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[2].y
          );
        }
        if (this.quantity === 5) {
          this.footballers[1].setPosition(
            this.isHost
              ? this.footballers[1].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[1].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[1].y
          );
          this.footballers[2].setPosition(
            this.isHost
              ? this.footballers[2].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[2].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[2].y
          );
          this.footballers[3].setPosition(
            this.isHost
              ? this.footballers[3].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[3].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[3].y
          );
        }
      }

      if (this.side === "wide") {
        if (this.quantity === 3) {
          this.footballers[0].setPosition(
            this.isHost
              ? this.footballers[0].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[0].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[0].y
          );

          this.footballers[2].setPosition(
            this.isHost
              ? this.footballers[2].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[2].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[2].y
          );
        }
        if (this.quantity === 4) {
          this.footballers[0].setPosition(
            this.isHost
              ? this.footballers[0].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[0].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[0].y
          );

          this.footballers[3].setPosition(
            this.isHost
              ? this.footballers[3].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[3].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[3].y
          );
        }
        if (this.quantity === 5) {
          this.footballers[0].setPosition(
            this.isHost
              ? this.footballers[0].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[0].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[0].y
          );

          this.footballers[4].setPosition(
            this.isHost
              ? this.footballers[4].x -
                  calculatePercentage(4, this.stadium.stadiumWidth)
              : this.footballers[4].x +
                  calculatePercentage(4, this.stadium.stadiumWidth),
            this.footballers[4].y
          );
        }
      }
    }
  }

  startMotion(distance: number) {
    const minSpeed = 1700;
    const maxSpeed = 600;

    const speed = interpolate(this.properties.speed, minSpeed, maxSpeed);

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
        this.tween.seek(500);
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
    this.tween.seek(500);
  }

  stopMotion() {
    if (this.tween?.isDestroyed() !== true) this.tween?.pause();
  }
}
