import { MenuButton } from "../ui/menuButton";
import { Selector } from "../ui/selector";
import {
  TeamData,
  TeamsData,
  initialTeamsData,
} from "@/app/config/initialTeamsData";
import { calculatePercentage, mapToPercentageInRange } from "@/app/utils/math";
import { SettingsModal } from "../ui/components/menuModal/settingsModal";
import { TacticsModal } from "../ui/components/menuModal/tacticsModal";
import { deepCopy } from "@/app/utils/helperFunctions";
import { matchData } from "@/app/config/matchData";
import { tournamenrDataConfig } from "../config/tournamentDataConfig";
import { gameConfig } from "../config/gameConfig";
import { getStyleConfig } from "../config/styleConfig";

export default class Menu extends Phaser.Scene {
  hostTeamsSelector!: Selector;
  guestTeamsSelector!: Selector;

  leftTournamentSelector!: Selector;
  rightTournamentSelector!: Selector;

  hostTeamText!: Phaser.GameObjects.Text;
  guestTeamText!: Phaser.GameObjects.Text;

  settingsModal!: SettingsModal;
  tacticsModal!: TacticsModal;

  settingsButton!: MenuButton;
  startButton!: MenuButton;
  tacticsButton!: MenuButton;

  selectedHostTeam!: TeamData;
  selectedGuestTeam!: TeamData;

  backgroundAniamtionEffectImage!: Phaser.GameObjects.Image;

  constructor() {
    super("Menu");
  }

  create() {
    // this.scale.on(Phaser.Scale.Events.RESIZE, () => {
    //   this.scale.removeAllListeners();
    //   setTimeout(() => {
    //     this.scale.resize(this.game.canvas.width, this.game.canvas.height);
    //     this.renderer.resize(this.game.canvas.width, this.game.canvas.height);
    //     this.scene.restart();
    //   }, 1000);
    // });

    this.addUI();

    this.updateSelectedTeams();
    this.events.on("rotate", () => {
      this.updateSelectedTeams();
      this.setDefaultParametersforTeams();
    });

    this.addAnimationEffectImage();
    this.setDefaultParametersforTeams();
  }

  setDefaultParametersforTeams() {
    matchData.hostTeam.techniqueProperties.goalKeeperMotionSpeed =
      mapToPercentageInRange(matchData.hostTeam.strength, 800, 2130);
    matchData.hostTeam.techniqueProperties.passAccuracy =
      mapToPercentageInRange(matchData.hostTeam.strength, 800, 2130);
    matchData.hostTeam.techniqueProperties.passSpeeed = mapToPercentageInRange(
      matchData.hostTeam.strength,
      800,
      2130
    );
    matchData.hostTeam.techniqueProperties.shootSpeed = mapToPercentageInRange(
      matchData.hostTeam.strength,
      800,
      2130
    );
    matchData.hostTeam.techniqueProperties.shootAccuracy =
      mapToPercentageInRange(matchData.hostTeam.strength, 800, 2130);

    // for Gues Team
    matchData.guestTeam.techniqueProperties.goalKeeperMotionSpeed =
      mapToPercentageInRange(matchData.guestTeam.strength, 800, 2130);
    matchData.guestTeam.techniqueProperties.passAccuracy =
      mapToPercentageInRange(matchData.guestTeam.strength, 800, 2130);
    matchData.guestTeam.techniqueProperties.passSpeeed = mapToPercentageInRange(
      matchData.guestTeam.strength,
      800,
      2130
    );
    matchData.guestTeam.techniqueProperties.shootSpeed = mapToPercentageInRange(
      matchData.guestTeam.strength,
      800,
      2130
    );
    matchData.guestTeam.techniqueProperties.shootAccuracy =
      mapToPercentageInRange(matchData.guestTeam.strength, 800, 2130);
  }

  addAnimationEffectImage() {
    this.backgroundAniamtionEffectImage = this.add
      .image(0, 0, "default")
      .setTint(0x000000)
      .setOrigin(0)
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height)
      .setVisible(false)
      .setAlpha(0)
      .setDepth(100);
  }

  updateSelectedTeams() {
    const menuTeams = gameConfig.menuTeams as TeamsData;

    this.selectedHostTeam = Object.values(menuTeams).find(
      (team) => team.name === this.hostTeamsSelector.selectedItem.name
    )!;

    this.selectedGuestTeam = Object.values(menuTeams).find(
      (team) => team.name === this.guestTeamsSelector.selectedItem.name
    )!;

    matchData.hostTeam = deepCopy<TeamData>(this.selectedHostTeam);
    matchData.guestTeam = deepCopy<TeamData>(this.selectedGuestTeam);

    this.updateTeams(
      this.hostTeamsSelector.selectedItem.name,
      this.guestTeamsSelector.selectedItem.name
    );
  }

  addUI() {
    this.addBackground();
    this.addTexts();
    this.addButtons();
    this.addTeamSelectors();
    this.addMatchModeText();

    this.settingsModal = new SettingsModal(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    )
      .setDepth(10)
      .setVisible(false);

    this.tacticsModal = new TacticsModal(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    )
      .setDepth(10)
      .setVisible(false);
  }

  addMatchModeText() {
    this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(5, this.game.canvas.height),
        matchData.matchIsFor,
        {
          fontSize: calculatePercentage(3, this.game.canvas.width),
          color: "#E62F0B",
          align: "center",
        }
      )
      .setOrigin(0.5);
  }

  addTeamSelectors() {
    // Host Teams Selector
    const leftTeamsSelectorData = Object.entries(
      gameConfig.menuTeams as TeamsData
    ).map(([name, data]) => {
      const image = this.add
        .image(0, 0, data.name)
        .setDisplaySize(
          calculatePercentage(3.5, this.game.canvas.width),
          calculatePercentage(3.5, this.game.canvas.width)
        );

      return {
        image: image,
        name: data.name,
      };
    });

    this.hostTeamsSelector = new Selector(
      this,
      0,
      0,
      leftTeamsSelectorData,
      calculatePercentage(5, this.game.canvas.height),
      "vertical",
      tournamenrDataConfig.hostTeam
    );
    matchData.hostTeam = deepCopy<TeamData>(initialTeamsData["Juventus"]);

    this.hostTeamsSelector.setPosition(
      60,
      -calculatePercentage(
        getStyleConfig().menuScene.sleectorsPercentY,
        this.hostTeamsSelector.getBounds().height
      )
    );
    // Host Teams Selector
    const rightTeamsSelectorData = Object.entries(
      gameConfig.menuTeams as TeamsData
    ).map(([name, data]) => {
      const image = this.add
        .image(0, 0, data.name)
        .setDisplaySize(
          calculatePercentage(3.5, this.game.canvas.width),
          calculatePercentage(3.5, this.game.canvas.width)
        );
      return {
        image: image,
        name: data.name,
      };
    });

    // Right Teams Selector
    this.guestTeamsSelector = new Selector(
      this,
      0,
      0,
      rightTeamsSelectorData,
      calculatePercentage(5, this.game.canvas.height),
      "vertical",
      tournamenrDataConfig.guestTeam
    );
    matchData.guestTeam = deepCopy<TeamData>(initialTeamsData["Liverpool"]);

    this.guestTeamsSelector.setPosition(
      this.game.canvas.width - 60,
      -calculatePercentage(
        getStyleConfig().menuScene.sleectorsPercentY,
        this.game.canvas.height
      )
    );
  }

  addBackground() {
    this.add
      .rectangle(
        0,
        0,
        this.game.canvas.width,
        this.game.canvas.height,
        0x08170f
      )
      .setOrigin(0);
  }

  updateTeams(hostTeamName: string, guestTeamName: string) {
    this.hostTeamText.setText(hostTeamName);
    this.guestTeamText.setText(guestTeamName);
  }

  addTexts() {
    // VS text
    this.add
      .text(this.game.canvas.width / 2, this.game.canvas.height / 2, "VS", {
        fontFamily: "Silkscreen",
        fontSize: calculatePercentage(2.5, this.game.canvas.width),
        color: "#6CFFFA",
      })
      .setOrigin(0.5);

    //Host team name
    this.hostTeamText = this.add
      .text(
        this.game.canvas.width / 2 -
          calculatePercentage(4, this.game.canvas.width),
        this.game.canvas.height / 2,
        "",
        {
          fontFamily: "Silkscreen",
          fontSize: calculatePercentage(1.6, this.game.canvas.width),
          color: "#C0FFFA",
        }
      )
      .setOrigin(1, 0.5);

    //Guest team name
    this.guestTeamText = this.add
      .text(
        this.game.canvas.width / 2 +
          calculatePercentage(4, this.game.canvas.width),
        this.game.canvas.height / 2,
        "",
        {
          fontFamily: "Silkscreen",
          fontSize: calculatePercentage(1.6, this.game.canvas.width),
          color: "#C0FFFA",
        }
      )
      .setOrigin(0, 0.5);
  }

  addButtons() {
    // Start Button
    this.startButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height - 30,
      calculatePercentage(20, this.game.canvas.width),

      "Start Match",
      0x6cff81,
      "#6CFF81",
      calculatePercentage(2.2, this.game.canvas.width)
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.backgroundAniamtionEffectImage.setVisible(true);
        this.tacticsButton.setVisible(false);
        this.settingsButton.setVisible(false);
        this.startButton.setVisible(false);

        this.add.tween({
          targets: this.backgroundAniamtionEffectImage,
          alpha: 1,
          duration: 1600,
          onComplete: () => {
            this.scene.start("GamePlay");
          },
        });
      });

    // Tactic Button
    this.tacticsButton = new MenuButton(
      this,
      this.game.canvas.width / 2 -
        calculatePercentage(12, this.game.canvas.width),
      this.game.canvas.height - 30,
      calculatePercentage(10, this.game.canvas.width),
      "Tactics",
      0xc0fffa,
      "#C0FFFA",
      calculatePercentage(1.8, this.game.canvas.width)
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.tacticsModal.setVisible(true);
        this.tacticsModal.setTeams(
          this.selectedHostTeam,
          this.selectedGuestTeam
        );

        this.settingsButton.setVisible(false);
        this.startButton.setVisible(false);
        this.tacticsButton.setVisible(false);
      });

    //Settings Button
    this.settingsButton = new MenuButton(
      this,
      this.game.canvas.width / 2 +
        calculatePercentage(12, this.game.canvas.width),
      this.game.canvas.height - 30,
      calculatePercentage(10, this.game.canvas.width),
      "Settings",
      0xc0fffa,
      "#C0FFFA",
      calculatePercentage(1.8, this.game.canvas.width)
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.settingsModal.setVisible(true);
        this.settingsButton.setVisible(false);
        this.startButton.setVisible(false);
        this.tacticsButton.setVisible(false);
      });
  }
}
