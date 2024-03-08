import {
  calculatePercentage,
  clamp,
  isInRange,
  makeNegative,
} from "@/app/utils/math";
import { TeamData } from "../../types/types";

export class Selector extends Phaser.GameObjects.Container {
  forwardArrowButton!: Phaser.GameObjects.Image;
  previousArrowButton!: Phaser.GameObjects.Image;

  activeItemsNumber!: number;
  selectedItem = "";
  selectedTeamData!: TeamData;
  selectedTeamText!: Phaser.GameObjects.Text;

  defaultSpeed = 300;

  arrowClickIsPossible = true;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public items: { image: Phaser.GameObjects.Image; name: string }[],
    public padding: number = 0,
    public direction: "horizontal" | "vertical" = "horizontal"
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.activeItemsNumber =
      Math.floor(this.items.length / 2) <= 5
        ? Math.floor(this.items.length / 2)
        : 5;

    this.activeItemsNumber = 5;
    this.generateStartConditions();
    this.addArrows();
  }

  addArrows() {
    this.forwardArrowButton = this.scene.add
      .image(
        0,
        this.getBounds().centerY -
          this.items[0].image.displayHeight *
            Math.floor((this.activeItemsNumber + 1) / 2),
        "arrow"
      )
      .setAngle(90)
      .setInteractive({ cursor: "pointer" });
    this.add(this.forwardArrowButton);

    this.previousArrowButton = this.scene.add
      .image(
        0,
        this.getBounds().centerY +
          this.items[0].image.displayHeight *
            Math.floor((this.activeItemsNumber + 1) / 2),
        "arrow"
      )
      .setOrigin(1, 0.5)
      .setAngle(-90)
      .setInteractive({ cursor: "pointer" });
    this.add(this.previousArrowButton);
  }

  generateStartConditions() {
    let imagePositionY = this.items[0].image.displayHeight / 2;
    let imagePositionX = this.items[0].image.displayWidth / 2;

    for (const [index, item] of this.items.entries()) {
      item.image.setDisplaySize(
        calculatePercentage(4, this.scene.game.canvas.width),
        calculatePercentage(4, this.scene.game.canvas.width)
      );

      // if the index is in the range of the active items
      if (
        isInRange(
          index,
          Math.floor(this.items.length / 2) -
            Math.floor(this.activeItemsNumber / 2),
          Math.floor(this.items.length / 2) +
            Math.floor(this.activeItemsNumber / 2)
        )
      ) {
        //here we need to calculate the opacity and scale of the image
        const minusOpacity = (Math.floor(this.items.length / 2) - index) / 2.5;
        item.image.setAlpha(1 + makeNegative(minusOpacity));

        const minusScale = (Math.floor(this.items.length / 2) - index) / 5;
        item.image.setScale(1 + makeNegative(minusScale));

        //then make the image visible
        item.image.setVisible(true);
        item.image.setInteractive({ cursor: "pointer" });
      }

      this.direction === "vertical"
        ? item.image.setPosition(this.x, imagePositionY)
        : item.image.setPosition(imagePositionX, this.y);

      // then we need to calculate the position of the next image
      imagePositionY += item.image.displayHeight + this.padding;
      imagePositionX += item.image.displayWidth + this.padding;
      // then we need to add the image to the container
      this.add(item.image);
    }
  }
}
