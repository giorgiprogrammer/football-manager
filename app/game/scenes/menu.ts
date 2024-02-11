import { calculatePercentage } from "@/app/utils/math";
import { TeamsSelector } from "../ui/teamSelector";
import { MenuButton } from "../ui/menuButton";
import { TeamsData, teamsData } from "../data/teamsData";
import { tournamentsData } from "../data/tournamentsData";
import { TeamData } from "../types/types";
import { TacticsModal } from "../ui/tacticsModal";
import { matchData } from "../data/matchData";

export default class Menu extends Phaser.Scene {
  startButton!: MenuButton;

  leftTeamsSelector!: TeamsSelector;
  rightTeamsSelector!: TeamsSelector;

  tacticsModal!: TacticsModal;

  tournament = "premierLeague";

  leftTournamentSelector!: TeamsSelector;
  rightTournamentSelector!: TeamsSelector;

  leftSelectorTeams = teamsData.otherEuropeans.teams;
  rightSelectorTeams = teamsData.otherEuropeans.teams;

  constructor() {
    super("Menu");
  }

  create() {
    this.addUI();
    this.addEventListeners();
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

  addEventListeners() {
    this.events.on("leftTournamentChanged", (team: string) => {
      this.leftTeamsSelector.destroy();

      // console.log("team name : " + team);

      this.leftTeamsSelector.selectedTeamText.destroy();
      if (team === "Nations") {
        this.leftSelectorTeams = tournamentsData.nations.teams;
      }
      if (team === "Other Nations") {
        this.leftSelectorTeams = tournamentsData.othernations.teams;
      }
      if (team === "Other European") {
        this.leftSelectorTeams = tournamentsData.othereuropean.teams;
      }
      if (team === "Rest Of The World") {
        this.leftSelectorTeams = tournamentsData.restoftheworld.teams;
      }
      if (team === "Georgian Liga") {
        this.leftSelectorTeams = tournamentsData.georgianliga.teams;
      }
      if (team === "Premier League") {
        this.leftSelectorTeams = tournamentsData.premierleague.teams;
      }
      if (team === "Seria A") {
        this.leftSelectorTeams = tournamentsData.seriaa.teams;
      }
      if (team === "La Liga") {
        this.leftSelectorTeams = tournamentsData.laliga.teams;
      }

      this.addLeftTeamSelector();
    });

    this.events.on("rightTournamentChanged", (team: string) => {
      this.rightTeamsSelector.destroy();

      this.rightTeamsSelector.selectedTeamText.destroy();
      if (team === "Nations") {
        this.rightSelectorTeams = tournamentsData.nations.teams;
      }
      if (team === "Other Nations") {
        this.rightSelectorTeams = tournamentsData.othernations.teams;
      }
      if (team === "Other European") {
        this.rightSelectorTeams = tournamentsData.othereuropean.teams;
      }
      if (team === "Rest Of The World") {
        this.rightSelectorTeams = tournamentsData.restoftheworld.teams;
      }
      if (team === "Georgian Liga") {
        this.rightSelectorTeams = tournamentsData.georgianliga.teams;
      }
      if (team === "Premier League") {
        this.rightSelectorTeams = tournamentsData.premierleague.teams;
      }
      if (team === "Seria A") {
        this.rightSelectorTeams = tournamentsData.seriaa.teams;
      }
      if (team === "La Liga") {
        this.rightSelectorTeams = tournamentsData.laliga.teams;
      }

      this.addRightTeamSelector();
    });
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
    this.addRightTeamSelector();
    this.addLeftTeamSelector();

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

  addTouranmentSelectors() {
    this.leftTournamentSelector = new TeamsSelector(
      this,
      0,
      0,
      false,
      calculatePercentage(53, this.game.canvas.height),
      tournamentsData as any,
      this.game.canvas.height / 2 - 100,
      false,
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
      false,
      160
    );

    this.rightTournamentSelector.setPosition(
      this.game.canvas.width -
        this.rightTournamentSelector.getBounds().width / 2 -
        calculatePercentage(1.7, this.game.canvas.width),
      this.game.canvas.height / 2
    );
  }

  addLeftTeamSelector() {
    this.leftTeamsSelector = new TeamsSelector(
      this,
      0,
      0,
      false,
      calculatePercentage(60, this.game.canvas.height),
      this.leftSelectorTeams,
      this.game.canvas.height / 2,
      true,
      160
    );
    this.leftTeamsSelector.setPosition(
      this.leftTeamsSelector.getBounds().width / 2 +
        calculatePercentage(9, this.game.canvas.width),
      this.game.canvas.height / 2
    );
  }

  addRightTeamSelector() {
    this.rightTeamsSelector = new TeamsSelector(
      this,
      0,
      0,
      true,
      calculatePercentage(60, this.game.canvas.height),
      this.rightSelectorTeams,
      this.game.canvas.height / 2,
      true,
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
