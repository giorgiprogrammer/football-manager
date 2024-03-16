export class MenuButton extends Phaser.GameObjects.Container {
  backgroundImage!: Phaser.GameObjects.Image;
  innerText!: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public width: number,
    public height: number,
    public text: string,
    public backgroundColor: number,
    public textColor: string,
    public fontSize: number = 25
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
    this.backgroundImage = this.scene.add
      .image(0, 0, "default")
      .setOrigin(0.5)
      .setTint(this.backgroundColor)
      .setDisplaySize(this.width, 2);
    this.add(this.backgroundImage);
  }

  addText() {
    this.innerText = this.scene.add
      .text(0, -25, this.text, {
        fontFamily: "Rubik Mono One",
        fontSize: this.fontSize,
        color: this.textColor,
        align: "center",
      })
      .setOrigin(0.5);
    this.add(this.innerText);
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
      this.backgroundImage.setTint(0x2c1042);
      this.innerText.setColor("#2C1042");
    });
    this.on(Phaser.Input.Events.POINTER_OUT, () => {
      this.backgroundImage.setTint(this.backgroundColor);
      this.innerText.setColor(this.textColor);
    });
    this.input!.cursor = "pointer";
  }
}
