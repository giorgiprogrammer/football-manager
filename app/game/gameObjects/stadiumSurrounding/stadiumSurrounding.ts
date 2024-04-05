import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Stadium } from "../stadium";
import { SpectatorsLine } from "./components/spectatorsLine/spectatorsLine";
import { Light } from "./components/spectatorsLine/light";

export class StadiumSurrounding extends Phaser.GameObjects.Container {
  topLeftLight!: Light;
  topRightLight!: Light;
  bottomLeftLight!: Light;
  bottomRightLight!: Light;

  hostFans: Phaser.GameObjects.Bob[] = [];
  guestFans: Phaser.GameObjects.Bob[] = [];

  hostFanTweens: Phaser.Tweens.Tween[] = [];
  guestFanTweens: Phaser.Tweens.Tween[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public stadium: Stadium,
    public hostFansChance: number,
    public hostFansColor: number,
    public guestFanstColor: number
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.setDepth(-10);
    this.addSpectators();
    this.addSurrounding();
    this.addLights();
  }

  stopLightAnimations() {
    this.topLeftLight.pauseMotion();
    this.topRightLight.pauseMotion();
    this.bottomLeftLight.pauseMotion();
    this.bottomRightLight.pauseMotion();
  }

  addLights() {
    this.topLeftLight = new Light(
      this.scene,
      -calculatePercentage(50, this.stadium.getBounds().width),
      -calculatePercentage(51, this.stadium.getBounds().height),
      "leftTop"
    );
    this.add(this.topLeftLight);

    this.topRightLight = new Light(
      this.scene,
      calculatePercentage(50, this.stadium.getBounds().width),
      -calculatePercentage(50, this.stadium.getBounds().height),
      "rightTop"
    );
    this.add(this.topRightLight);

    this.bottomLeftLight = new Light(
      this.scene,
      -calculatePercentage(50, this.stadium.getBounds().width),
      calculatePercentage(50, this.stadium.getBounds().height),
      "leftBottom"
    );
    this.add(this.bottomLeftLight);

    this.bottomRightLight = new Light(
      this.scene,
      calculatePercentage(50, this.stadium.getBounds().width),
      calculatePercentage(50, this.stadium.getBounds().height),
      "rightBottom"
    );
    this.add(this.bottomRightLight);
  }

  addSurrounding() {
    // const leftBorder = this.scene.add
    //   .image(
    //     -calculatePercentage(63, this.stadium.getBounds().width),
    //     0,
    //     "roof"
    //   )
    //   .setTint(0x467572)
    //   .setAngle(90)
    //   .setDisplaySize(600, 20);
    // this.add(leftBorder);
    // const rightBorder = this.scene.add
    //   .image(calculatePercentage(63, this.stadium.getBounds().width), 0, "roof")
    //   .setTint(0x467572)
    //   .setAngle(90)
    //   .setDisplaySize(600, 20);
    // this.add(rightBorder);
    // const topBorder = this.scene.add
    //   .image(
    //     0,
    //     -calculatePercentage(75.6, this.stadium.getBounds().height),
    //     "roof"
    //   )
    //   .setTint(0x467572)
    //   .setDisplaySize(1200, 15);
    // this.add(topBorder);
    // const bottomBorder = this.scene.add
    //   .image(
    //     0,
    //     calculatePercentage(75.6, this.stadium.getBounds().height),
    //     "roof"
    //   )
    //   .setTint(0x467572)
    //   .setDisplaySize(1200, 15);
    // this.add(bottomBorder);
    // const leftTopCorner = this.scene.add
    //   .image(
    //     -this.stadium.getBounds().width / 2 -
    //       calculatePercentage(31, this.stadium.getBounds().width),
    //     -calculatePercentage(96, this.stadium.getBounds().height),
    //     "default"
    //   )
    //   .setDisplaySize(
    //     calculatePercentage(14, this.stadium.getBounds().width),
    //     calculatePercentage(37, this.stadium.getBounds().width)
    //   )
    //   .setAngle(-45)
    //   .setOrigin(0)
    //   .setTint(0x467572);
    // this.add(leftTopCorner);
    // const rightTopCorner = this.scene.add
    //   .image(
    //     this.stadium.getBounds().width / 2 +
    //       calculatePercentage(21.5, this.stadium.getBounds().width),
    //     -calculatePercentage(116, this.stadium.getBounds().height),
    //     "default"
    //   )
    //   .setDisplaySize(
    //     calculatePercentage(14, this.stadium.getBounds().width),
    //     calculatePercentage(37, this.stadium.getBounds().width)
    //   )
    //   .setAngle(45)
    //   .setOrigin(0)
    //   .setTint(0x467572);
    // this.add(rightTopCorner);
    // const leftBottomCorner = this.scene.add
    //   .image(
    //     -this.stadium.getBounds().width / 2 -
    //       calculatePercentage(31, this.stadium.getBounds().width),
    //     calculatePercentage(96, this.stadium.getBounds().height),
    //     "default"
    //   )
    //   .setDisplaySize(
    //     calculatePercentage(14, this.stadium.getBounds().width),
    //     calculatePercentage(37, this.stadium.getBounds().width)
    //   )
    //   .setAngle(45)
    //   .setOrigin(0, 1)
    //   .setTint(0x467572);
    // this.add(leftBottomCorner);
    // const rightBottomCorner = this.scene.add
    //   .image(
    //     this.stadium.getBounds().width / 2 +
    //       calculatePercentage(21.5, this.stadium.getBounds().width),
    //     calculatePercentage(116, this.stadium.getBounds().height),
    //     "default"
    //   )
    //   .setDisplaySize(
    //     calculatePercentage(14, this.stadium.getBounds().width),
    //     calculatePercentage(37, this.stadium.getBounds().width)
    //   )
    //   .setAngle(-45)
    //   .setOrigin(0, 1)
    //   .setTint(0x467572);
    // this.add(rightBottomCorner);
  }

  addSpectators() {
    this.addTopSpectatorLines(9);
    this.addBottomLineSpectators(9);
    this.addLeftSpectatorLines(9);
    this.addRightSpectatorLines(9);
  }

  addRightSpectatorLines(quantity: number) {
    let posX = calculatePercentage(50, this.stadium.getBounds().width);
    let posY = -this.stadium.getBounds().height / 2;

    let spectatorsQuanitity = Math.floor(
      this.stadium.getBounds().height /
        calculatePercentage(2, this.stadium.getBounds().width)
    );

    for (let i = 0; i < quantity; i++) {
      const spectatorsLine = new SpectatorsLine(
        this.scene,
        posX,
        posY,
        {
          hostFansColor: this.hostFansColor,
          guestFanstColor: this.guestFanstColor,
          hostFansChance: this.hostFansChance,
        },
        this.stadium,
        "rightLine",
        spectatorsQuanitity
      );
      this.add(spectatorsLine);
      this.hostFans.push(...spectatorsLine.hostFans);
      this.guestFans.push(...spectatorsLine.guestFans);

      posX += calculatePercentage(4.2, this.stadium.getBounds().height);
      posY -= calculatePercentage(1, this.stadium.getBounds().width);

      spectatorsQuanitity += 1;
    }
  }

  addLeftSpectatorLines(quantity: number) {
    let posX =
      -calculatePercentage(50, this.stadium.getBounds().width) +
      -calculatePercentage(2, this.stadium.getBounds().width);
    let posY = -this.stadium.getBounds().height / 2;

    let spectatorsQuanitity = Math.floor(
      this.stadium.getBounds().height /
        calculatePercentage(2, this.stadium.getBounds().width)
    );

    for (let i = 0; i < quantity; i++) {
      const spectatorsLine = new SpectatorsLine(
        this.scene,
        posX,
        posY,
        {
          hostFansColor: this.hostFansColor,
          guestFanstColor: this.guestFanstColor,
          hostFansChance: this.hostFansChance,
        },
        this.stadium,
        "leftLine",
        spectatorsQuanitity
      );
      this.add(spectatorsLine);

      this.hostFans.push(...spectatorsLine.hostFans);
      this.guestFans.push(...spectatorsLine.guestFans);

      posX -= calculatePercentage(4.2, this.stadium.getBounds().height);
      posY -= calculatePercentage(1, this.stadium.getBounds().width);

      spectatorsQuanitity += 1;
    }
  }

  addBottomLineSpectators(quantity: number) {
    let posX = -this.stadium.getBounds().width / 2;
    let posY = calculatePercentage(50, this.stadium.getBounds().height);

    let spectatorsQuanitity = Math.floor(
      this.stadium.getBounds().width /
        calculatePercentage(2, this.stadium.getBounds().width) +
        1
    );

    for (let i = 0; i < quantity; i++) {
      const spectatorsLine = new SpectatorsLine(
        this.scene,
        posX,
        posY,
        {
          hostFansColor: this.hostFansColor,
          guestFanstColor: this.guestFanstColor,
          hostFansChance: this.hostFansChance,
        },
        this.stadium,
        "bottomLine",
        spectatorsQuanitity
      );
      this.add(spectatorsLine);

      this.hostFans.push(...spectatorsLine.hostFans);
      this.guestFans.push(...spectatorsLine.guestFans);

      posY += calculatePercentage(3, this.stadium.getBounds().height);
      posX -= calculatePercentage(2, this.stadium.getBounds().width);

      spectatorsQuanitity += 2;
    }
  }

  addTopSpectatorLines(quantity: number) {
    let posX = -this.stadium.getBounds().width / 2;
    let posY =
      -calculatePercentage(50, this.stadium.getBounds().height) +
      -calculatePercentage(2, this.stadium.getBounds().width);

    let spectatorsQuanitity = Math.floor(
      this.stadium.getBounds().width /
        calculatePercentage(2, this.stadium.getBounds().width) +
        1
    );

    for (let i = 0; i < quantity; i++) {
      const spectatorsLine = new SpectatorsLine(
        this.scene,
        posX,
        posY,
        {
          hostFansColor: this.hostFansColor,
          guestFanstColor: this.guestFanstColor,
          hostFansChance: this.hostFansChance,
        },
        this.stadium,
        "topLine",
        spectatorsQuanitity
      );
      this.add(spectatorsLine);

      this.hostFans.push(...spectatorsLine.hostFans);
      this.guestFans.push(...spectatorsLine.guestFans);

      posY -= calculatePercentage(3, this.stadium.getBounds().height);
      posX -= calculatePercentage(2, this.stadium.getBounds().width);

      spectatorsQuanitity += 2;
    }
  }

  startFansSelebration(fans: "host" | "guest") {
    let tween: Phaser.Tweens.Tween;

    this.topLeftLight.resumeMotion();
    this.topRightLight.resumeMotion();
    this.bottomLeftLight.resumeMotion();
    this.bottomRightLight.resumeMotion();

    if (fans === "host") {
      if (this.hostFanTweens.length > 0) {
        this.hostFanTweens.forEach((tween) => {
          tween.resume();
        });
      }

      this.hostFans.forEach((fan) => {
        tween = this.scene.add.tween({
          targets: fan,
          alpha: 0.2,
          duration: 100,
          repeat: -1,
          yoyo: true,
        });

        this.hostFanTweens.push(tween);
      });
    } else {
      if (this.guestFanTweens.length > 0) {
        this.guestFanTweens.forEach((tween) => {
          tween.resume();
        });
      }

      this.guestFans.forEach((fan) => {
        tween = this.scene.add.tween({
          targets: fan,
          alpha: 0.2,
          duration: 100,
          repeat: -1,
          yoyo: true,
        });

        this.guestFanTweens.push(tween);
      });
    }
  }

  stopFansSelebration(fans: "host" | "guest") {
    this.topLeftLight.pauseMotion();
    this.topRightLight.pauseMotion();
    this.bottomLeftLight.pauseMotion();
    this.bottomRightLight.pauseMotion();

    if (fans === "host") {
      this.hostFanTweens.forEach((tween) => {
        tween.pause();
      });

      this.hostFans.forEach((fan) => {
        fan.setAlpha(1);
      });
    } else {
      this.guestFanTweens.forEach((tween) => {
        tween.pause();
      });

      this.guestFans.forEach((fan) => {
        fan.setAlpha(1);
      });
    }
  }
}
