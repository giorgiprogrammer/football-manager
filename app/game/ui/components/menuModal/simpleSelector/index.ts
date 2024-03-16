import { calculatePercentage } from "@/app/utils/math";

export class SimpleSelector extends Phaser.GameObjects.Container {
  valueText!: Phaser.GameObjects.Text;
  valueIndex = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public values: string[]
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addLeftArrow();
    this.addRightArrow();
    this.addValueText();
  }

  addLeftArrow() {
    const leftArrow = this.scene.add
      .image(-calculatePercentage(10, this.scene.game.canvas.width), 0, "arrow")
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.valueIndex =
          (this.valueIndex - 1 + this.values.length) % this.values.length;
        this.valueText.setText(this.values[this.valueIndex]);
      });

    this.add(leftArrow);
  }

  addRightArrow() {
    const rightArrow = this.scene.add
      .image(calculatePercentage(10, this.scene.game.canvas.width), 0, "arrow")
      .setFlipX(true)
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.valueIndex = (this.valueIndex + 1) % this.values.length;
        this.valueText.setText(this.values[this.valueIndex]);
      });

    this.add(rightArrow);
  }

  addValueText() {
    this.valueText = this.scene.add
      .text(0, 0, this.values[this.valueIndex], {
        align: "center",
        color: "#ffffff",
        fontSize: "17px",
        fontFamily: "Rubik Mono One",
      })
      .setOrigin(0.5);

    this.add(this.valueText);
  }
}
