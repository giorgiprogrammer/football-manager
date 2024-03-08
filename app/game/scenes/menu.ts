import { MenuButton } from "../ui/menuButton";
import { teamsData } from "../data/teamsData";
import { TacticsModal } from "../ui/tacticsModal";
import { matchData } from "../data/matchData";
import { Selector } from "../ui/selector";
import { initialTeamsData } from "@/app/config/initialTeamsData";

export default class Menu extends Phaser.Scene {
  startButton!: MenuButton;

  leftTeamsSelector!: Selector;
  rightTeamsSelector!: Selector;

  tacticsModal!: TacticsModal;

  tournament = "premierLeague";

  leftTournamentSelector!: Selector;
  rightTournamentSelector!: Selector;

  leftSelectorTeams = teamsData.otherEuropeans.teams;
  rightSelectorTeams = teamsData.otherEuropeans.teams;

  constructor() {
    super("Menu");
  }

  create() {
    this.addUI();
  }

  openTacticModals() {
    this.tacticsModal = new TacticsModal(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      this.leftTeamsSelector.selectedTeamText.text,
      this.rightTeamsSelector.selectedTeamText.text,
      this.leftTournamentSelector.selectedTeamText.text,
      this.rightTournamentSelector.selectedTeamText.text
    );
  }

  addUI() {
    this.addBackground();
    this.addTexts();
    // this.addButtons();
    this.addTeamSelectors();
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
    // Left Teams Selector
    this.leftTeamsSelector = new Selector(
      this,
      0,
      0,
      leftTeamsSelectorData,
      15,
      "vertical"
    );

    this.leftTeamsSelector.setPosition(
      60,
      this.game.canvas.height / 2 -
        this.leftTeamsSelector.getBounds().height / 2
    );

    // Right Teams Selector
    this.rightTeamsSelector = new Selector(
      this,
      0,
      0,
      rightTeamsSelectorData,
      15,
      "vertical"
    );
    this.rightTeamsSelector.setPosition(
      this.game.canvas.width - 60,
      this.game.canvas.height / 2 -
        this.leftTeamsSelector.getBounds().height / 2
    );
  }

  addBackground() {
    this.add
      .rectangle(
        0,
        0,
        this.game.canvas.width,
        this.game.canvas.height,
        0x140a1f
      )
      .setOrigin(0);
  }

  addTexts() {
    // VS text
    this.add
      .text(this.game.canvas.width / 2, this.game.canvas.height / 2, "VS", {
        fontFamily: "Rubik Mono One",
        fontSize: 50,
        color: "#DAF2E9",
      })
      .setOrigin(0.5);
  }

  addButtons() {
    // Start Button
    this.startButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height - 60,
      280,
      75,
      "Start Match"
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        matchData.hostTeamData = this.leftTeamsSelector.selectedTeamData;
        matchData.guestTeamData = this.rightTeamsSelector.selectedTeamData;
        this.scene.start("GamePlay");
      });

    //Tactics Button
    this.startButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height - 130,
      200,
      75,
      "Tactics"
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.openTacticModals();
      });
  }
}
