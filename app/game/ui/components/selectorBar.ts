import { calculatePercentage } from "@/app/utils/math";
import { TeamData } from "../../types/types";

export default class SelectorBar extends Phaser.GameObjects.Container {
  leftArrow!: Phaser.GameObjects.Image;
  rightArrow!: Phaser.GameObjects.Image;

  optionValueText!: Phaser.GameObjects.Text;

  opttionValues = [
    { type: "attack", side: "wide" },
    { type: "attack", side: "center" },
    { type: "normal", side: "center" },
    { type: "defend", side: "wide" },
    { type: "defend", side: "center" },
  ];

  optionValueIndex = 0;

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
    this.addButtons();
    this.addTitle();
    this.calculateDefaultOptionValue();
    this.addOptionValueText();
  }

  calculateDefaultOptionValue() {
    if (this.opttionName === "Defence Column") {
      this.team.tactics.defence.side === "wide" &&
        this.team.tactics.defence.type === "attack" &&
        (this.optionValueIndex = 0);

      this.team.tactics.defence.side === "center" &&
        this.team.tactics.defence.type === "attack" &&
        (this.optionValueIndex = 1);

      this.team.tactics.defence.side === "center" &&
        this.team.tactics.defence.type === "normal" &&
        (this.optionValueIndex = 2);

      this.team.tactics.defence.side === "wide" &&
        this.team.tactics.defence.type === "defend" &&
        (this.optionValueIndex = 3);

      this.team.tactics.defence.side === "center" &&
        this.team.tactics.defence.type === "defend" &&
        (this.optionValueIndex = 4);
    }

    if (this.opttionName === "Middfielder Column") {
      this.team.tactics.midfielder.side === "wide" &&
        this.team.tactics.midfielder.type === "attack" &&
        (this.optionValueIndex = 0);

      this.team.tactics.midfielder.side === "center" &&
        this.team.tactics.midfielder.type === "attack" &&
        (this.optionValueIndex = 1);

      this.team.tactics.midfielder.side === "center" &&
        this.team.tactics.midfielder.type === "normal" &&
        (this.optionValueIndex = 2);

      this.team.tactics.midfielder.side === "wide" &&
        this.team.tactics.defence.type === "defend" &&
        (this.optionValueIndex = 3);

      this.team.tactics.midfielder.side === "center" &&
        this.team.tactics.defence.type === "defend" &&
        (this.optionValueIndex = 4);
    }
  }

  addOptionValueText() {
    this.optionValueText = this.scene.add
      .text(
        0,
        0,
        `${this.opttionValues[this.optionValueIndex].side} ${
          this.opttionValues[this.optionValueIndex].type
        }`,
        {
          align: "center",
          color: "black",
          fontSize: "17px",
          fontFamily: "Rubik Mono One",
        }
      )
      .setOrigin(0.5);

    this.add(this.optionValueText);
  }

  addTitle() {
    const title = this.scene.add
      .text(0, -33, this.opttionName, {
        align: "center",
        color: "gray",
        fontSize: "15px",
        fontFamily: "Rubik Mono One",
      })
      .setOrigin(0.5);

    this.add(title);
  }

  addButtons() {
    this.leftArrow = this.scene.add
      .image(-this.width / 2, 0, "neon-arrow")
      .setOrigin(1, 0.5)
      .setScale(0.5)
      .setFlipX(true)
      .setTint(0x292929)
      .setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.optionValueIndex =
          (this.optionValueIndex - 1 + this.opttionValues.length) %
          this.opttionValues.length;
        this.optionValueText.setText(
          `${this.opttionValues[this.optionValueIndex].side} ${
            this.opttionValues[this.optionValueIndex].type
          }`
        );

        if (this.opttionName === "Defence Column") {
          this.team.tactics.defence.side =
            this.opttionValues[this.optionValueIndex].side;
          this.team.tactics.defence.type =
            this.opttionValues[this.optionValueIndex].type;
        }

        if (this.opttionName === "Middfielder Column") {
          this.team.tactics.midfielder.side =
            this.opttionValues[this.optionValueIndex].side;
          this.team.tactics.midfielder.type =
            this.opttionValues[this.optionValueIndex].type;
        }
      });

    this.add(this.leftArrow);

    this.rightArrow = this.scene.add
      .image(this.width / 2, 0, "neon-arrow")
      .setOrigin(0, 0.5)
      .setScale(0.5)
      .setTint(0x292929)
      .setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.optionValueIndex =
          (this.optionValueIndex + 1) % this.opttionValues.length;
        this.optionValueText.setText(
          ` ${this.opttionValues[this.optionValueIndex].side} ${
            this.opttionValues[this.optionValueIndex].type
          }`
        );

        if (this.opttionName === "Defence Column") {
          this.team.tactics.defence.side =
            this.opttionValues[this.optionValueIndex].side;
          this.team.tactics.defence.type =
            this.opttionValues[this.optionValueIndex].type;
        }

        if (this.opttionName === "Middfielder Column") {
          this.team.tactics.midfielder.side =
            this.opttionValues[this.optionValueIndex].side;
          this.team.tactics.midfielder.type =
            this.opttionValues[this.optionValueIndex].type;
        }
      });

    this.add(this.rightArrow);
  }
}
