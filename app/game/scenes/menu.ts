import { calculatePercentage } from "@/app/utils/math";
import { TeamsSelector } from "../ui/teamSelector";
import { MenuButton } from "../ui/menuButton";
import { TeamsData, teamsData } from "../data/teamsData";
import { tournamentsData } from "../data/tournamentsData";

export default class Menu extends Phaser.Scene {
  startButton!: MenuButton;

  leftTeamsSelector!: TeamsSelector;
  rightTeamsSelector!: TeamsSelector;

  tournament = "premierLeague";

  leftTournamentSelector!: TeamsSelector;
  rightTournamentSelector!: TeamsSelector;

  constructor() {
    super("Menu");
  }

  create() {
    this.addUI();
  }

  addUI() {
    //Background
    this.add
      .rectangle(
        0,
        0,
        this.game.canvas.width,
        this.game.canvas.height,
        0x201b26
      )
      .setOrigin(0);

    //VS text
    this.add
      .text(this.game.canvas.width / 2, this.game.canvas.height / 2, "VS", {
        fontFamily: "Rubik Mono One",
        fontSize: 88,
        color: "#DAF2E9",
      })
      .setOrigin(0.5);

    this.addTouranmentSelectors();
    this.addTeamsSelectors();

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
      .on(Phaser.Input.Events.POINTER_DOWN, () => {});
  }

  addTouranmentSelectors() {
    this.leftTournamentSelector = new TeamsSelector(
      this,
      0,
      0,
      false,
      calculatePercentage(53, this.game.canvas.height),
      tournamentsData as any,
      this.game.canvas.height / 2 - 100,
      160
    );

    this.leftTournamentSelector.setPosition(
      this.leftTournamentSelector.getBounds().width / 2 +
        calculatePercentage(1.7, this.game.canvas.width),
      this.game.canvas.height / 2
    );

    this.rightTournamentSelector = new TeamsSelector(
      this,
      0,
      0,
      true,
      calculatePercentage(53, this.game.canvas.height),
      tournamentsData as any,
      this.game.canvas.height / 2 - 100,
      160
    );

    this.rightTournamentSelector.setPosition(
      this.game.canvas.width -
        this.rightTournamentSelector.getBounds().width / 2 -
        calculatePercentage(1.7, this.game.canvas.width),
      this.game.canvas.height / 2
    );
  }

  addTeamsSelectors() {
    //Left Selector
    this.leftTeamsSelector = new TeamsSelector(
      this,
      0,
      0,
      false,
      calculatePercentage(60, this.game.canvas.height),
      teamsData.premierLeague.teams,
      this.game.canvas.height / 2,
      160
    );
    this.leftTeamsSelector.setPosition(
      this.leftTeamsSelector.getBounds().width / 2 +
        calculatePercentage(9, this.game.canvas.width),
      this.game.canvas.height / 2
    );

    //Right Selector
    this.rightTeamsSelector = new TeamsSelector(
      this,
      0,
      0,
      true,
      calculatePercentage(60, this.game.canvas.height),
      teamsData.premierLeague.teams,
      this.game.canvas.height / 2,
      160
    );
    this.rightTeamsSelector.setPosition(
      this.game.canvas.width -
        this.rightTeamsSelector.getBounds().width / 2 -
        calculatePercentage(9, this.game.canvas.width),
      this.game.canvas.height / 2
    );
  }
}
