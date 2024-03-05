import { calculatePercentage } from "@/app/utils/math";
import { TeamData } from "../../types/types";

export class Selector extends Phaser.GameObjects.Container {
  forwardArrowButton!: Phaser.GameObjects.Image;
  previousArrowButton!: Phaser.GameObjects.Image;

  activeItemsNumber = 5;
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
    public padding?: number
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    console.log("items : ", this.items);

    this.scene.add.existing(this.items[0].image.setVisible(true));
  }

  generateStartPosition() {}
}
