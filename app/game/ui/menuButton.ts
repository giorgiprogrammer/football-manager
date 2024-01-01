export class MenuButton extends Phaser.GameObjects.Container {
  backgroundImage!: Phaser.GameObjects.Image;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public width: number,
    public height: number,
    public text: string
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addBackground();
    this.addText();
    this.makeInteractive();

    this.setScale(0.7);
  }

  addBackground() {
    const border = this.scene.add
      .image(0, 0, "menu-button")
      .setOrigin(0.5)
      .setTint(0x302e36)
      .setDisplaySize(this.width, this.height);
    this.add(border);

    this.backgroundImage = this.scene.add
      .image(0, 0, "menu-button")
      .setTint(0xb2a9c4)
      .setDisplaySize(this.width - 10, this.height - 10)
      .setOrigin(0.5);
    this.add(this.backgroundImage);
  }

  addText() {
    const text = this.scene.add
      .text(0, 0, this.text, {
        fontFamily: "Rubik Mono One",
        fontSize: 25,
        color: "#111717",
        align: "center",
      })
      .setOrigin(0.5);
    this.add(text);
  }

  makeInteractive() {
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        0,
        0,
        this.getBounds().width,
        this.getBounds().height
      ),
      Phaser.Geom.Rectangle.Contains
    );
    this.on(Phaser.Input.Events.POINTER_OVER, () => {
      this.backgroundImage.setTint(0xc987de);
    });
    this.on(Phaser.Input.Events.POINTER_OUT, () => {
      this.backgroundImage.setTint(0xb2a9c4);
    });
    this.input!.cursor = "pointer";
  }
}
