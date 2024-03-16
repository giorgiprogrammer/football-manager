import { MenuButton } from "../ui/menuButton";
import { Selector } from "../ui/selector";
import { TeamData, initialTeamsData } from "@/app/config/initialTeamsData";
import { calculatePercentage } from "@/app/utils/math";
import { SettingsModal } from "../ui/components/menuModal/settingsModal";
import { TacticsModal } from "../ui/components/menuModal/tacticsModal";

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

  constructor() {
    super("Menu");
  }

  create() {
    this.addUI();
    this.updateSelectedTeams();

    this.events.on("rotate", () => {
      this.updateSelectedTeams();
    });
  }

  updateSelectedTeams() {
    this.selectedHostTeam =
      initialTeamsData[this.hostTeamsSelector.selectedItem.name];
    this.selectedGuestTeam =
      initialTeamsData[this.guestTeamsSelector.selectedItem.name];

    this.updateTeams(
      this.hostTeamsSelector.selectedItem.name,
      this.guestTeamsSelector.selectedItem.name
    );
  }

  addUI() {
    this.addBackground();
    this.addTexts();
    this.addChoachImages();
    this.addButtons();
    this.addTeamSelectors();

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

  addTeamSelectors() {
    // Prepare Data
    const leftTeamLogos = this.add.group();
    const leftTeamsSelectorData = Object.entries(initialTeamsData).map(
      ([name, data]) => {
        return {
          image: leftTeamLogos.get(0, 0, data.logoKey, undefined, false),
          name: name,
        };
      }
    );
    const rightTeamLogos = this.add.group();
    const rightTeamsSelectorData = Object.entries(initialTeamsData).map(
      ([name, data]) => {
        return {
          image: rightTeamLogos.get(0, 0, data.logoKey, undefined, false),
          name: name,
        };
      }
    );
    // Host Teams Selector
    this.hostTeamsSelector = new Selector(
      this,
      0,
      0,
      leftTeamsSelectorData,
      15,
      "vertical",
      "Juventus"
    );

    this.hostTeamsSelector.setPosition(
      60,
      this.game.canvas.height / 2 -
        this.hostTeamsSelector.getBounds().height / 1.3
    );

    // Right Teams Selector
    this.guestTeamsSelector = new Selector(
      this,
      0,
      0,
      rightTeamsSelectorData,
      15,
      "vertical",
      "Liverpool"
    );

    this.guestTeamsSelector.setPosition(
      this.game.canvas.width - 60,
      this.game.canvas.height / 2 -
        this.guestTeamsSelector.getBounds().height / 1.3
    );
  }

  addBackground() {
    this.add
      .rectangle(
        0,
        0,
        this.game.canvas.width,
        this.game.canvas.height,
        0xffffff
      )
      .setOrigin(0);
  }

  addChoachImages() {
    const hostTeamCoach = this.add
      .image(
        this.game.canvas.width / 2 -
          calculatePercentage(4, this.game.canvas.width),
        this.game.canvas.height / 2 +
          calculatePercentage(17, this.game.canvas.height),
        "guardiola-default"
      )
      .setDisplaySize(
        calculatePercentage(11, this.game.canvas.width),
        calculatePercentage(11, this.game.canvas.width)
      )
      .setTint(0xb3b0aa)
      .setOrigin(1, 0.5);

    const guestTeamCoach = this.add
      .image(
        this.game.canvas.width / 2 +
          calculatePercentage(4, this.game.canvas.width),
        this.game.canvas.height / 2 -
          calculatePercentage(17, this.game.canvas.height),
        "mourinho-default"
      )
      .setDisplaySize(
        calculatePercentage(11, this.game.canvas.width),
        calculatePercentage(11, this.game.canvas.width)
      )
      .setTint(0xb3b0aa)
      .setOrigin(0, 0.5);
  }

  updateTeams(hostTeamName: string, guestTeamName: string) {
    this.hostTeamText.setText(hostTeamName);
    this.guestTeamText.setText(guestTeamName);
  }

  addTexts() {
    // VS text
    this.add
      .text(this.game.canvas.width / 2, this.game.canvas.height / 2, "VS", {
        fontFamily: "Rubik Mono One",
        fontSize: 40,
        color: "#B5B2AC",
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
          fontFamily: "Rubik Mono One",
          fontSize: 20,
          color: "#878580",
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
          fontFamily: "Rubik Mono One",
          fontSize: 20,
          color: "#878580",
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
      260,
      70,
      "Start Match",
      0x878580,
      "#878580",
      24
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {});

    // Tactic Button
    this.tacticsButton = new MenuButton(
      this,
      this.game.canvas.width / 2 -
        calculatePercentage(12, this.game.canvas.width),
      this.game.canvas.height - 30,
      170,
      70,
      "Tactics",
      0x878580,
      "#878580",
      21
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
      170,
      70,
      "Settings",
      0x878580,
      "#878580",
      21
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
