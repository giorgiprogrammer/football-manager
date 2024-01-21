import { calculatePercentage, clamp, interpolate } from "@/app/utils/math";
import { TeamData } from "../../types/types";

export class OptionsBar extends Phaser.GameObjects.Container {
  indicator!: Phaser.GameObjects.Image;

  indicatorTextObject!: Phaser.GameObjects.Text;
  indicatorValue = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public width: number,
    public opttionName: string,
    public team: TeamData
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.calculateStength();
    this.addBackground();
    this.addIndicator();
    this.addTexts();
  }

  calculateStength() {
    this.indicatorValue = clamp(this.team.stength, 800, 2300);
  }

  setChangedParameters() {
    this.team.stength = interpolate(this.indicatorValue, 800, 2300);
  }

  addTexts() {
    this.indicatorTextObject = this.scene.add
      .text(this.getBounds().width / 2, -70, this.indicatorValue.toString(), {
        align: "ceter",
        color: "#A00CF0",
        fontSize: "30px",
        fontFamily: "Rubik Mono One",
      })
      .setOrigin(0.5);

    this.add(this.indicatorTextObject);

    const optionText = this.scene.add
      .text(this.getBounds().width / 2, -40, this.opttionName, {
        align: "left",
        color: "#A00CF0",
        fontSize: "20px",
        fontFamily: "Rubik Mono One",
      })
      .setOrigin(0.5);

    this.add(optionText);
  }

  addBackground() {
    const background = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(
        this.width,
        calculatePercentage(4, this.scene.game.canvas.height)
      )
      .setOrigin(0, 0.5)
      .setTint(0x292929);
    this.add(background);
  }

  addIndicator() {
    this.indicator = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(
        calculatePercentage(8, this.scene.game.canvas.height),
        calculatePercentage(8, this.scene.game.canvas.height)
      )
      .setTint(0xa00cf0)
      .setOrigin(0.5)
      .setInteractive({ draggable: true });

    this.scene.input.on(
      "drag",
      (pointer: any, gameObject: any, dragX: any, dragY: any) => {
        // Calculate the boundaries for the indicator's motion

        //for typescrippt error
        if (1 > 100) {
          console.log(pointer);
          console.log(dragY);
        }

        if (gameObject !== this.indicator) return;
        const minX = 0;
        const maxX = this.width;

        // Limit the indicator's position within the calculated boundaries
        const clampedX = Phaser.Math.Clamp(dragX, minX, maxX);

        // Update the indicator's position
        gameObject.setPosition(clampedX, gameObject.y);

        // Update your logic here based on the new position (e.g., indicatorValue)
        this.indicatorValue = Math.floor(
          ((clampedX - minX) / (maxX - minX)) * 100
        );
        this.indicatorTextObject.setText(this.indicatorValue.toString());
        this.setChangedParameters();
      }
    );

    this.indicator.setPosition(
      calculatePercentage(this.indicatorValue, this.width),
      0
    );

    this.add(this.indicator);
  }
}
