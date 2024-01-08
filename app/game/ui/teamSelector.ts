import { calculatePercentage } from "@/app/utils/math";
import { TeamData } from "../types/types";
// import { teamsData } from "../data/teamsData";

export class TeamsSelector extends Phaser.GameObjects.Container {
  topArrowButton!: Phaser.GameObjects.Image;
  bottomArrowButton!: Phaser.GameObjects.Image;

  activeTeamsNumber = 5;
  selectedTeam = "";
  selectedTeamText!: Phaser.GameObjects.Text;
  posy = 0;
  padding = 0;
  defaultSpeed = 300;

  arrowClickIsPossible = true;

  teamsLogos: Phaser.GameObjects.Image[] = [];
  teamsState: Array<{
    scale: number;
    teamLogo: Phaser.GameObjects.Image;
    y: number;
  }> = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public textToRight: boolean,
    public height: number,
    public teamsData: Array<TeamData>,
    public textYPosition: number,
    public speed?: number
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addTopArrowButton();
    this.addBottomArrowButton();

    this.calculatePharameters();
    this.addTeamLogos();
    this.addSelctedTeamText();
  }

  addSelctedTeamText() {
    if (this.textToRight) {
      this.selectedTeamText = this.scene.add
        .text(0, this.scene.game.canvas.height / 2, this.selectedTeam, {
          fontFamily: "Rubik Mono One",
          fontSize: 25,
          color: "#F2F2FF",
          align: "center",
        })
        .setOrigin(0, 0.5);

      this.selectedTeamText.setPosition(
        this.scene.game.canvas.width / 2 +
          calculatePercentage(7, this.scene.game.canvas.width),
        this.textYPosition
      );
    } else {
      this.selectedTeamText = this.scene.add
        .text(0, this.scene.game.canvas.height / 2, this.selectedTeam, {
          fontFamily: "Rubik Mono One",
          fontSize: 25,
          color: "#F2F2FF",
          align: "center",
        })
        .setOrigin(1, 0.5);

      this.selectedTeamText.setPosition(
        this.scene.game.canvas.width / 2 -
          calculatePercentage(7, this.scene.game.canvas.width),
        this.textYPosition
      );
    }
  }

  addTopArrowButton() {
    this.topArrowButton = this.scene.add
      .image(0, -this.height / 2, "neon-arrow")
      .setOrigin(0.5)
      .setAngle(-90)
      .setScale(1)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        this.topArrowButton.setTint(0x9d31f5);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        this.topArrowButton.setTint(0xffffff);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.clickUp();
      });

    this.add(this.topArrowButton);
  }

  addBottomArrowButton() {
    this.bottomArrowButton = this.scene.add
      .image(0, this.height / 2, "neon-arrow")
      .setOrigin(0.5)
      .setScale(1)
      .setAngle(90)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        this.bottomArrowButton.setTint(0x9d31f5);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        this.bottomArrowButton.setTint(0xffffff);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.clickDown();
      });

    this.add(this.bottomArrowButton);
  }

  calculatePharameters() {
    const verticalDistance =
      (this.height / 2 - this.topArrowButton.getBounds().height / 2) * 2;

    this.posy =
      -this.height / 2 +
      this.topArrowButton.getBounds().height / 2 -
      this.padding / 2;
    this.padding = verticalDistance / (this.activeTeamsNumber - 1);
  }

  addTeamLogos() {
    let scale = 0.15;

    Object.values(this.teamsData).forEach((team, index) => {
      if (index === 0) {
        const teamLogo = this.scene.add
          .image(
            0,
            -this.height / 2 +
              this.topArrowButton.getBounds().height / 2 -
              this.padding / 2,
            team.key
          )
          .setOrigin(0.5)
          .setScale(0);
        this.add(teamLogo);
        this.teamsLogos.push(teamLogo);
        this.teamsState.push({
          teamLogo: teamLogo,
          y: teamLogo.y,
          scale: teamLogo.scale,
        });
        return;
      }
      if (index < this.activeTeamsNumber + 1) {
        if (Math.floor(this.activeTeamsNumber / 2) + 2 > index) {
          scale += 0.35;
        } else {
          scale -= 0.35;
        }

        if (Math.floor(this.activeTeamsNumber / 2) + 1 === index) {
          this.selectedTeam = team.name;
        }

        const teamLogo = this.scene.add
          .image(0, this.posy, team.key)
          .setOrigin(0.5)
          .setScale(scale);
        this.add(teamLogo);
        this.teamsLogos.push(teamLogo);
        this.teamsState.push({
          teamLogo: teamLogo,
          y: teamLogo.y,
          scale: teamLogo.scale,
        });
        this.posy += this.padding;
      } else {
        const teamLogo = this.scene.add
          .image(0, this.posy - this.padding / 2, team.key)
          .setOrigin(0.5)
          .setScale(0);
        this.add(teamLogo);
        this.teamsLogos.push(teamLogo);
        this.teamsState.push({
          teamLogo: teamLogo,
          y: teamLogo.y,
          scale: teamLogo.scale,
        });
      }
    });
  }

  clickUp() {
    if (this.arrowClickIsPossible === false) return;

    for (let i = 0; i < this.teamsState.length; i++) {
      if (i > 0) {
        this.scene.tweens.add({
          targets: this.teamsState[i].teamLogo,
          y: this.teamsState[i - 1].teamLogo.y,
          scale: this.teamsState[i - 1].teamLogo.scale,
          duration: this.speed || this.defaultSpeed,
          onComplete: () => (this.arrowClickIsPossible = true),
        });
      }
    }
    this.arrayRotate(this.teamsState);
    this.arrowClickIsPossible = false;

    this.selectedTeam =
      this.teamsState[
        Math.floor(this.activeTeamsNumber / 2) + 1
      ].teamLogo.texture.key;
    this.selectedTeamText.setText(this.selectedTeam);
  }

  clickDown() {
    if (this.arrowClickIsPossible === false) return;

    for (let i = 0; i < this.teamsState.length; i++) {
      if (i < this.teamsState.length - 1) {
        this.scene.tweens.add({
          targets: this.teamsState[i].teamLogo,
          y: this.teamsState[i + 1].teamLogo.y,
          scale: this.teamsState[i + 1].teamLogo.scale,
          duration: this.speed || this.defaultSpeed,
          onComplete: () => (this.arrowClickIsPossible = true),
        });
      } else {
        this.teamsState[i].teamLogo.setPosition(
          this.teamsState[i].teamLogo.x,
          -this.height / 2 +
            this.topArrowButton.getBounds().height / 2 -
            this.padding / 2
        );
        this.teamsState[i].teamLogo.setScale(0);
      }
    }
    this.arrayRotate(this.teamsState, true);
    this.arrowClickIsPossible = false;

    this.selectedTeam =
      this.teamsState[
        Math.floor(this.activeTeamsNumber / 2) + 1
      ].teamLogo.texture.key;
    const teamName = this.selectedTeam.replace("-", " ");
    this.selectedTeamText.setText(teamName);
  }

  arrayRotate(arr: any, reverse?: boolean) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
  }
}
