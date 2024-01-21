import { calculatePercentage } from "@/app/utils/math";
import { MenuButton } from "./menuButton";
import { TeamData } from "../types/types";
import { tournamentsData } from "../data/tournamentsData";
import { OptionsBar } from "./components/optionsBar";
import SelectorBar from "./components/selectorBar";
import { matchData } from "../data/matchData";

export class TacticsModal extends Phaser.GameObjects.Container {
  leftTeamData!: TeamData;
  rightTeamData!: TeamData;

  leftformationVisualizeContainer!: Phaser.GameObjects.Container;
  rightformationVisualizeContainer!: Phaser.GameObjects.Container;

  leftFormationVisualText!: Phaser.GameObjects.Text;
  rightFormationVisualText!: Phaser.GameObjects.Text;

  possibleFormations = [
    [4, 3, 3],
    [4, 4, 2],
    [5, 3, 2],
    [4, 3, 3],
    [3, 5, 2],
    [3, 4, 3],
  ];

  leftFormationIndex = 0;
  rightFormationIndex = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public leftTeamName: string,
    public rightTeamName: string,
    public leftTournamentName: string,
    public rightTournamentName: string
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.leftTournamentName = this.leftTournamentName.toLocaleLowerCase();
    this.leftTournamentName = this.leftTournamentName.replaceAll(" ", "");

    this.rightTournamentName = this.rightTournamentName.toLocaleLowerCase();
    this.rightTournamentName = this.rightTournamentName.replaceAll(" ", "");

    //@ts-ignore
    tournamentsData[this.leftTournamentName].teams.forEach((team) => {
      if (team.name === this.leftTeamName) {
        this.leftTeamData = team;
      }
    });
    //@ts-ignore
    tournamentsData[this.rightTournamentName].teams.forEach((team) => {
      if (team.name === this.rightTeamName) {
        this.rightTeamData = team;
      }
    });

    this.setDepth(100);
    this.addBackground();
    this.addCenterLine();

    this.addBackButton();
    this.addLeftTeamInitials();
    this.addRightTeamInitials();

    this.calculateFormationIndex();

    this.addLeftOptionsBars();
    this.addRightOptionsBars();

    matchData.hostTeamData = this.leftTeamData;
    matchData.guestTeamData = this.rightTeamData;
  }

  addLeftOptionsBars() {
    const optionsBar = new OptionsBar(
      this.scene,
      -calculatePercentage(48, this.scene.game.canvas.width),
      -calculatePercentage(23, this.scene.game.canvas.height),
      400,
      "strength",
      this.leftTeamData
    );
    this.add(optionsBar);
  }

  addRightOptionsBars() {
    const optionsBar = new OptionsBar(
      this.scene,
      calculatePercentage(18, this.scene.game.canvas.width),
      calculatePercentage(27, this.scene.game.canvas.height),
      400,
      "strength",
      this.rightTeamData
    );
    this.add(optionsBar);
  }

  calculateFormationIndex() {
    const leftTeamDefence = this.leftTeamData.tactics.defence.quntity;
    const leftTeamMidfielder = this.leftTeamData.tactics.midfielder.quntity;
    const leftTeamAttacker = this.leftTeamData.tactics.attacker.quntity;

    this.possibleFormations.forEach((formation, index) => {
      if (
        formation[0] === leftTeamDefence &&
        formation[1] === leftTeamMidfielder &&
        formation[2] === leftTeamAttacker
      ) {
        this.leftFormationIndex = index;
      }
    });

    const rightTeamDefence = this.rightTeamData.tactics.defence.quntity;
    const rightTeamMidfielder = this.rightTeamData.tactics.midfielder.quntity;
    const rightTeamAttacker = this.rightTeamData.tactics.attacker.quntity;

    this.possibleFormations.forEach((formation, index) => {
      if (
        formation[0] === rightTeamDefence &&
        formation[1] === rightTeamMidfielder &&
        formation[2] === rightTeamAttacker
      ) {
        this.rightFormationIndex = index;
      }
    });
  }

  addBackButton() {
    const backButton = new MenuButton(this.scene, 0, 0, 300, 90, "back to menu")
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.destroy();
      });

    this.add(backButton);
  }

  addBackground() {
    const background = this.scene.add
      .image(0, 0, "default")
      .setOrigin(0.5)
      .setDisplaySize(
        this.scene.game.canvas.width,
        this.scene.game.canvas.height
      );

    this.add(background);
  }

  addCenterLine() {
    const centerLine = this.scene.add
      .image(0, 0, "default")
      .setTint(0x464547)
      .setDisplaySize(this.scene.game.canvas.width, 5);

    this.add(centerLine);
  }

  addRightTeamInitials() {
    const teamName = this.scene.add
      .text(
        calculatePercentage(44, this.scene.game.canvas.width),
        calculatePercentage(5, this.scene.game.canvas.height),
        this.rightTeamData.name,
        {
          fontFamily: "Rubik Mono One",
          fontSize: 25,
          color: "#260536",
          align: "center",
        }
      )
      .setOrigin(1, 0.5);

    this.add(teamName);

    const teamLogo = this.scene.add
      .image(
        calculatePercentage(48, this.scene.game.canvas.width),
        calculatePercentage(5, this.scene.game.canvas.height),
        this.rightTeamData.key
      )
      .setOrigin(1, 0.5);

    this.add(teamLogo);

    this.rightFormationVisualText = this.scene.add
      .text(
        calculatePercentage(-28, this.scene.game.canvas.width),
        calculatePercentage(13, this.scene.game.canvas.height),
        `${this.rightTeamData.tactics.defence.quntity}-${this.rightTeamData.tactics.midfielder.quntity}-${this.rightTeamData.tactics.attacker.quntity}`,
        {
          fontFamily: "Rubik Mono One",
          fontSize: 26,
          color: "#260536",
          align: "center",
        }
      )
      .setAlpha(0.7)
      .setOrigin(0.5);

    this.add(this.rightFormationVisualText);

    const formationText = this.scene.add
      .text(
        -calculatePercentage(28, this.scene.game.canvas.width),
        calculatePercentage(5, this.scene.game.canvas.height),
        "Formation",
        {
          fontFamily: "Rubik Mono One",
          fontSize: 18,
          color: "#260536",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);

    this.add(formationText);

    const rightArrowForFormation = this.scene.add
      .image(
        calculatePercentage(-18, this.scene.game.canvas.width),
        calculatePercentage(13, this.scene.game.canvas.height),
        "neon-arrow"
      )
      .setTint(0x260536)
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        rightArrowForFormation.setTint(0xd9cc16);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        rightArrowForFormation.setTint(0x260536);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.changeRightTeamFormation("right");
      });
    this.add(rightArrowForFormation);

    const leftArrowForFormation = this.scene.add
      .image(
        -calculatePercentage(38, this.scene.game.canvas.width),
        calculatePercentage(13, this.scene.game.canvas.height),
        "neon-arrow"
      )
      .setFlipX(true)
      .setTint(0x260536)
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        leftArrowForFormation.setTint(0xd9cc16);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        leftArrowForFormation.setTint(0x260536);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.changeRightTeamFormation("left");
      });
    this.add(leftArrowForFormation);

    this.makeRightFootballersArrangement();
    this.addRightColumnsTactics();
  }

  //comment for different left and right teams Initials

  addLeftTeamInitials() {
    const teamName = this.scene.add
      .text(
        -calculatePercentage(44, this.scene.game.canvas.width),
        -calculatePercentage(45, this.scene.game.canvas.height),
        this.leftTeamData.name,
        {
          fontFamily: "Rubik Mono One",
          fontSize: 25,
          color: "#260536",
          align: "center",
        }
      )
      .setOrigin(0, 0.5);

    this.add(teamName);

    const teamLogo = this.scene.add
      .image(
        -calculatePercentage(48, this.scene.game.canvas.width),
        -calculatePercentage(45, this.scene.game.canvas.height),
        this.leftTeamData.key
      )
      .setOrigin(0, 0.5);

    this.add(teamLogo);

    this.leftFormationVisualText = this.scene.add
      .text(
        calculatePercentage(28, this.scene.game.canvas.width),
        -calculatePercentage(37, this.scene.game.canvas.height),
        `${this.leftTeamData.tactics.defence.quntity}-${this.leftTeamData.tactics.midfielder.quntity}-${this.leftTeamData.tactics.attacker.quntity}`,
        {
          fontFamily: "Rubik Mono One",
          fontSize: 26,
          color: "#260536",
          align: "center",
        }
      )
      .setAlpha(0.7)
      .setOrigin(0.5);

    this.add(this.leftFormationVisualText);

    const formationText = this.scene.add
      .text(
        +calculatePercentage(28, this.scene.game.canvas.width),
        -calculatePercentage(45, this.scene.game.canvas.height),
        "Formation",
        {
          fontFamily: "Rubik Mono One",
          fontSize: 18,
          color: "#260536",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);

    this.add(formationText);

    const rightArrowForFormation = this.scene.add
      .image(
        calculatePercentage(38, this.scene.game.canvas.width),
        -calculatePercentage(37, this.scene.game.canvas.height),
        "neon-arrow"
      )
      .setTint(0x260536)
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        rightArrowForFormation.setTint(0xd9cc16);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        rightArrowForFormation.setTint(0x260536);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.changeLeftTeamFormation("right");
      });
    this.add(rightArrowForFormation);

    const leftArrowForFormation = this.scene.add
      .image(
        calculatePercentage(18, this.scene.game.canvas.width),
        -calculatePercentage(37, this.scene.game.canvas.height),
        "neon-arrow"
      )
      .setFlipX(true)
      .setTint(0x260536)
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        leftArrowForFormation.setTint(0xd9cc16);
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        leftArrowForFormation.setTint(0x260536);
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.changeLeftTeamFormation("left");
      });
    this.add(leftArrowForFormation);

    this.makeLeftFootballersArrangement();
    this.addLeftColumnsTactics();
  }

  addLeftColumnsTactics() {
    const defencColumn = new SelectorBar(
      this.scene,
      calculatePercentage(5, this.scene.game.canvas.width),
      -calculatePercentage(37, this.scene.game.canvas.height),
      calculatePercentage(15, this.scene.game.canvas.width),
      "Defence Column",
      this.leftTeamData
    );

    this.add(defencColumn);

    const middfielderColumn = new SelectorBar(
      this.scene,
      calculatePercentage(5, this.scene.game.canvas.width),
      -calculatePercentage(23, this.scene.game.canvas.height),
      calculatePercentage(15, this.scene.game.canvas.width),
      "Middfielder Column",
      this.leftTeamData
    );

    this.add(middfielderColumn);
  }

  addRightColumnsTactics() {
    const defencColumn = new SelectorBar(
      this.scene,
      -calculatePercentage(5, this.scene.game.canvas.width),
      calculatePercentage(13, this.scene.game.canvas.height),
      calculatePercentage(15, this.scene.game.canvas.width),
      "Defence Column",
      this.rightTeamData
    );

    this.add(defencColumn);

    const middfielderColumn = new SelectorBar(
      this.scene,
      -calculatePercentage(5, this.scene.game.canvas.width),
      calculatePercentage(27, this.scene.game.canvas.height),
      calculatePercentage(15, this.scene.game.canvas.width),
      "Middfielder Column",
      this.rightTeamData
    );

    this.add(middfielderColumn);
  }

  makeLeftFootballersArrangement() {
    this.leftformationVisualizeContainer = this.scene.add.container();
    this.add(this.leftformationVisualizeContainer);

    const fitch = this.scene.add
      .image(
        calculatePercentage(28, this.scene.game.canvas.width),
        -calculatePercentage(18, this.scene.game.canvas.height),
        "stadiumFitch"
      )
      .setAlpha(0.2)
      .setOrigin(0.5)
      .setScale(2);
    this.leftformationVisualizeContainer.add(fitch);

    //defence
    let padding =
      calculatePercentage(60, fitch.displayHeight) /
      (this.leftTeamData.tactics.defence.quntity + 1);
    let posY =
      fitch.y - calculatePercentage(60, fitch.displayHeight) / 2 + padding;

    for (let i = 0; i < this.leftTeamData.tactics.defence.quntity; i++) {
      const circle = this.scene.add
        .image(
          fitch.x - calculatePercentage(30, fitch.displayWidth),
          posY,
          "circle"
        )
        .setAlpha(0.8)
        .setTint(0x000000)
        .setOrigin(0.5)
        .setScale(0.2);

      posY += padding;

      this.leftformationVisualizeContainer.add(circle);
    }

    // middfielder
    padding =
      calculatePercentage(60, fitch.displayHeight) /
      (this.leftTeamData.tactics.midfielder.quntity + 1);
    posY = fitch.y - calculatePercentage(60, fitch.displayHeight) / 2 + padding;

    for (let i = 0; i < this.leftTeamData.tactics.midfielder.quntity; i++) {
      const circle = this.scene.add
        .image(
          fitch.x - calculatePercentage(0, fitch.displayWidth),
          posY,
          "circle"
        )
        .setAlpha(0.8)
        .setTint(0x000000)
        .setOrigin(0.5)
        .setScale(0.2);

      posY += padding;

      this.leftformationVisualizeContainer.add(circle);
    }

    // attack
    padding =
      calculatePercentage(60, fitch.displayHeight) /
      (this.leftTeamData.tactics.attacker.quntity + 1);
    posY = fitch.y - calculatePercentage(60, fitch.displayHeight) / 2 + padding;

    for (let i = 0; i < this.leftTeamData.tactics.attacker.quntity; i++) {
      const circle = this.scene.add
        .image(
          fitch.x + calculatePercentage(30, fitch.displayWidth),
          posY,
          "circle"
        )
        .setAlpha(0.8)
        .setTint(0x000000)
        .setOrigin(0.5)
        .setScale(0.2);

      posY += padding;

      this.leftformationVisualizeContainer.add(circle);
    }
  }

  makeRightFootballersArrangement() {
    this.rightformationVisualizeContainer = this.scene.add.container();
    this.add(this.rightformationVisualizeContainer);

    const fitch = this.scene.add
      .image(
        -calculatePercentage(28, this.scene.game.canvas.width),
        calculatePercentage(32, this.scene.game.canvas.height),
        "stadiumFitch"
      )
      .setAlpha(0.2)
      .setOrigin(0.5)
      .setScale(2);
    this.rightformationVisualizeContainer.add(fitch);

    //defence
    let padding =
      calculatePercentage(60, fitch.displayHeight) /
      (this.rightTeamData.tactics.defence.quntity + 1);
    let posY =
      fitch.y - calculatePercentage(60, fitch.displayHeight) / 2 + padding;

    for (let i = 0; i < this.rightTeamData.tactics.defence.quntity; i++) {
      const circle = this.scene.add
        .image(
          fitch.x - calculatePercentage(30, fitch.displayWidth),
          posY,
          "circle"
        )
        .setAlpha(0.8)
        .setTint(0x000000)
        .setOrigin(0.5)
        .setScale(0.2);

      posY += padding;

      this.rightformationVisualizeContainer.add(circle);
    }

    // middfielder
    padding =
      calculatePercentage(60, fitch.displayHeight) /
      (this.rightTeamData.tactics.midfielder.quntity + 1);
    posY = fitch.y - calculatePercentage(60, fitch.displayHeight) / 2 + padding;

    for (let i = 0; i < this.rightTeamData.tactics.midfielder.quntity; i++) {
      const circle = this.scene.add
        .image(
          fitch.x - calculatePercentage(0, fitch.displayWidth),
          posY,
          "circle"
        )
        .setAlpha(0.8)
        .setTint(0x000000)
        .setOrigin(0.5)
        .setScale(0.2);

      posY += padding;

      this.rightformationVisualizeContainer.add(circle);
    }

    // attack
    padding =
      calculatePercentage(60, fitch.displayHeight) /
      (this.rightTeamData.tactics.attacker.quntity + 1);
    posY = fitch.y - calculatePercentage(60, fitch.displayHeight) / 2 + padding;

    for (let i = 0; i < this.rightTeamData.tactics.attacker.quntity; i++) {
      const circle = this.scene.add
        .image(
          fitch.x + calculatePercentage(30, fitch.displayWidth),
          posY,
          "circle"
        )
        .setAlpha(0.8)
        .setTint(0x000000)
        .setOrigin(0.5)
        .setScale(0.2);

      posY += padding;

      this.rightformationVisualizeContainer.add(circle);
    }
  }

  changeLeftTeamFormation(direction: string) {
    this.leftformationVisualizeContainer.destroy();
    if (direction === "left") {
      this.leftFormationIndex =
        (this.leftFormationIndex + 1) % this.possibleFormations.length;
    } else {
      this.leftFormationIndex =
        (this.leftFormationIndex - 1 + this.possibleFormations.length) %
        this.possibleFormations.length;
    }

    this.leftTeamData.tactics.defence.quntity =
      this.possibleFormations[this.leftFormationIndex][0];
    this.leftTeamData.tactics.midfielder.quntity =
      this.possibleFormations[this.leftFormationIndex][1];
    this.leftTeamData.tactics.attacker.quntity =
      this.possibleFormations[this.leftFormationIndex][2];

    this.leftFormationVisualText.setText(
      `${this.leftTeamData.tactics.defence.quntity}-${this.leftTeamData.tactics.midfielder.quntity}-${this.leftTeamData.tactics.attacker.quntity}`
    );

    this.makeLeftFootballersArrangement();
  }

  changeRightTeamFormation(direction: string) {
    this.rightformationVisualizeContainer.destroy();
    if (direction === "left") {
      this.rightFormationIndex =
        (this.rightFormationIndex + 1) % this.possibleFormations.length;
    } else {
      this.rightFormationIndex =
        (this.rightFormationIndex - 1 + this.possibleFormations.length) %
        this.possibleFormations.length;
    }

    this.rightTeamData.tactics.defence.quntity =
      this.possibleFormations[this.rightFormationIndex][0];
    this.rightTeamData.tactics.midfielder.quntity =
      this.possibleFormations[this.rightFormationIndex][1];
    this.rightTeamData.tactics.attacker.quntity =
      this.possibleFormations[this.rightFormationIndex][2];

    this.rightFormationVisualText.setText(
      `${this.rightTeamData.tactics.defence.quntity}-${this.rightTeamData.tactics.midfielder.quntity}-${this.rightTeamData.tactics.attacker.quntity}`
    );

    this.makeRightFootballersArrangement();
  }
}
