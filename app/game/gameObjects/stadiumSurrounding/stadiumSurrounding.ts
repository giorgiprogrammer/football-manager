import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Stadium } from "../stadium";

export class StadiumSurrounding extends Phaser.GameObjects.Container {
  graphics!: Phaser.GameObjects.Graphics;

  fanLines: SpectatoLine[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public stadium: Stadium,
    public leftFansChance: number,
    public leftFansColor: number,
    public righFanstColor: number
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addStadiumSurrounding();
    this.addSpectators();
  }

  addStadiumSurrounding() {
    const image = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(
        calculatePercentage(125, this.stadium.stadiumWidth),
        calculatePercentage(125, this.stadium.stadiumHeight)
      )
      .setTint(0x062e08)
      .setOrigin(0.5);
    this.add(image);
  }

  addSpectators() {
    const topLineNumber = 5;
    const bottomLineNumber = 5;
    const leftLineNumber = 7;
    const rightLineNumber = 7;

    let backgroundPosYPercent = 64;
    let backgroundWidthPercent = 130;

    //top Lines
    for (let i = 0; i < topLineNumber; i++) {
      const spectators = new SpectatoLine(
        this.scene,
        0,
        -calculatePercentage(backgroundPosYPercent, this.stadium.stadiumHeight),
        calculatePercentage(backgroundWidthPercent, this.stadium.stadiumWidth),
        calculatePercentage(6, this.stadium.stadiumHeight),
        this.stadium,
        "horizontal",
        this.leftFansChance,
        this.leftFansColor,
        this.righFanstColor
      );
      this.add(spectators);

      backgroundWidthPercent += calculatePercentage(
        1,
        this.stadium.stadiumWidth
      );
      backgroundPosYPercent += calculatePercentage(
        1.7,
        this.stadium.stadiumHeight
      );

      this.fanLines.push(spectators);
    }

    backgroundPosYPercent = 64;
    backgroundWidthPercent = 130;
    //bottom Lines
    for (let i = 0; i < bottomLineNumber; i++) {
      const spectators = new SpectatoLine(
        this.scene,
        0,
        calculatePercentage(backgroundPosYPercent, this.stadium.stadiumHeight),
        calculatePercentage(backgroundWidthPercent, this.stadium.stadiumWidth),
        calculatePercentage(6, this.stadium.stadiumHeight),
        this.stadium,
        "horizontal",
        this.leftFansChance,
        this.leftFansColor,
        this.righFanstColor
      );
      this.add(spectators);

      backgroundWidthPercent += calculatePercentage(
        1,
        this.stadium.stadiumWidth
      );
      backgroundPosYPercent += calculatePercentage(
        1.7,
        this.stadium.stadiumHeight
      );

      this.fanLines.push(spectators);
    }

    let backgroundHeightPercent = 118;
    let backgroundPositionXPercent = 64.2;
    //Left Lines
    for (let i = 0; i < leftLineNumber; i++) {
      const spectators = new SpectatoLine(
        this.scene,
        -calculatePercentage(
          backgroundPositionXPercent,
          this.stadium.stadiumWidth
        ),
        0,
        calculatePercentage(6, this.stadium.stadiumHeight),
        calculatePercentage(
          backgroundHeightPercent,
          this.stadium.stadiumHeight
        ),
        this.stadium,
        "vertical",
        this.leftFansChance,
        this.leftFansColor,
        this.righFanstColor
      );
      this.add(spectators);

      backgroundHeightPercent += calculatePercentage(
        2.8,
        this.stadium.stadiumHeight
      );
      backgroundPositionXPercent += calculatePercentage(
        0.4,
        this.stadium.stadiumWidth
      );

      this.fanLines.push(spectators);
    }

    backgroundHeightPercent = 118;
    backgroundPositionXPercent = 64.2;
    //Right Lines
    for (let i = 0; i < rightLineNumber; i++) {
      const spectators = new SpectatoLine(
        this.scene,
        calculatePercentage(
          backgroundPositionXPercent,
          this.stadium.stadiumWidth
        ),
        0,
        calculatePercentage(6, this.stadium.stadiumHeight),
        calculatePercentage(
          backgroundHeightPercent,
          this.stadium.stadiumHeight
        ),
        this.stadium,
        "vertical",
        this.leftFansChance,
        this.leftFansColor,
        this.righFanstColor
      );
      this.add(spectators);

      backgroundHeightPercent += calculatePercentage(
        2.8,
        this.stadium.stadiumHeight
      );
      backgroundPositionXPercent += calculatePercentage(
        0.4,
        this.stadium.stadiumWidth
      );

      this.fanLines.push(spectators);
    }
  }

  stopSelebrating() {
    this.fanLines.forEach((line) => {
      line.stopSelebrating();
    });
  }

  leftFansSelebrate() {
    this.fanLines.forEach((line) => {
      line.leftFansSelebrate();
    });
  }

  rightFansSelebrate() {
    this.fanLines.forEach((line) => {
      line.rightFansSelebrate();
    });
  }
}

class SpectatoLine extends Phaser.GameObjects.Container {
  backgroundImage!: Phaser.GameObjects.Image;

  //   leftFans: Phaser.GameObjects.Image[] = [];
  //   rightFans: Phaser.GameObjects.Image[] = [];
  leftFans: Phaser.GameObjects.Rectangle[] = [];
  rightFans: Phaser.GameObjects.Rectangle[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public backgroundWidth: number,
    public backgroundHeight: number,
    public stadium: Stadium,
    public side: string,
    public leftFansChance: number,
    public leftFansColor: number,
    public rightFansColor: number
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    if (this.side === "horizontal") {
      this.backgroundImage = this.scene.add
        .image(0, 0, "default")
        .setOrigin(0.5)
        .setAlpha(0)
        .setTint(0x03080d)
        .setDisplaySize(this.backgroundWidth, this.backgroundHeight);

      this.add(this.backgroundImage);

      this.addHorizontalLine();
    }
    if (this.side === "vertical") {
      this.backgroundImage = this.scene.add
        .image(0, 0, "default")
        .setOrigin(0.5)
        .setAlpha(0)
        .setTint(0x03080d)
        .setDisplaySize(this.backgroundWidth, this.backgroundHeight);

      this.add(this.backgroundImage);

      this.addVerticalLine();
    }
  }

  addVerticalLine() {
    const padding = 10;
    const posY = -this.backgroundHeight / 2 + padding / 2;
    const spectatorWidth = calculatePercentage(1.2, this.stadium.stadiumWidth);
    const number =
      this.backgroundImage.displayHeight / (spectatorWidth + padding);

    for (let i = 0; i < number; i++) {
      const color =
        getRandomNumber(0, 100) > this.leftFansChance
          ? this.leftFansColor
          : this.rightFansColor;

      //   const spectator = this.scene.add
      //     .image(0, posY + (spectatorWidth + padding) * i, "default")
      //     .setOrigin(0.5)
      //     .setTint(color)
      //     .setDisplaySize(spectatorWidth, spectatorWidth);
      //   this.add(spectator);

      const spectator = this.scene.add
        .rectangle(
          0,
          posY + (spectatorWidth + padding) * i,
          spectatorWidth,
          spectatorWidth,
          color
        )
        .setAlpha(0.4)
        .setOrigin(0.5);
      this.add(spectator);

      if (color === this.leftFansColor) {
        this.leftFans.push(spectator);
      } else {
        this.rightFans.push(spectator);
      }
    }
  }

  addHorizontalLine() {
    const padding = 10;
    const posX = -this.backgroundWidth / 2 + padding / 2;
    const spectatorWidth = calculatePercentage(1.2, this.stadium.stadiumWidth);
    const number =
      this.backgroundImage.displayWidth / (spectatorWidth + padding);

    for (let i = 0; i < number; i++) {
      const color =
        getRandomNumber(0, 100) > this.leftFansChance
          ? this.leftFansColor
          : this.rightFansColor;

      //   const spectator = this.scene.add
      //     .image(posX + (spectatorWidth + padding) * i, 0, "default")
      //     .setOrigin(0.5)
      //     .setTint(color)
      //     .setDisplaySize(spectatorWidth, spectatorWidth);
      //   this.add(spectator);

      const spectator = this.scene.add
        .rectangle(
          posX + (spectatorWidth + padding) * i,
          0,
          spectatorWidth,
          spectatorWidth,
          color
        )
        .setAlpha(0.4)
        .setOrigin(0.5);
      this.add(spectator);

      if (color === this.leftFansColor) {
        this.leftFans.push(spectator);
      } else {
        this.rightFans.push(spectator);
      }
    }
  }

  leftFansSelebrate() {
    this.leftFans.forEach((fan) => {
      this.scene.tweens.add({
        targets: fan,
        alpha: { from: 1, to: 0.3 },
        duration: 100,
        yoyo: true,
        repeat: -1,
      });
    });
  }

  rightFansSelebrate() {
    this.rightFans.forEach((fan) => {
      this.scene.tweens.add({
        targets: fan,
        alpha: { from: 1, to: 0.3 },
        duration: 100,
        yoyo: true,
        repeat: -1,
      });
    });
  }

  stopSelebrating() {
    this.leftFans.forEach((fan) => {
      this.scene.tweens.killTweensOf(fan);
    });
    this.rightFans.forEach((fan) => {
      this.scene.tweens.killTweensOf(fan);
    });
  }
}
