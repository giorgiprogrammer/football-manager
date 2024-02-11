import { teamsData } from "./teamsData";

export const tournamentsData = {
  premierleague: {
    key: "premier-league",
    name: "Premier League",
    teams: teamsData.premierLeague.teams,
  },
  seriaa: {
    key: "seria-A",
    name: "Seria A",
    teams: teamsData.seriaA.teams,
  },
  laliga: {
    key: "la-liga",
    name: "La Liga",
    teams: teamsData.laLiga.teams,
  },
  othereuropean: {
    key: "other-european",
    name: "Other European",
    teams: teamsData.otherEuropeans.teams,
  },
  restoftheworld: {
    key: "rest-of-the-world",
    name: "Rest Of The World",
    teams: teamsData.restOfTheWorld.teams,
  },
  nations: {
    key: "arsenal",
    name: "Nations",
    teams: teamsData.europeanNations.teams,
  },
  othernations: {
    key: "arsenal",
    name: "Other Nations",
    teams: teamsData.nations.teams,
  },
  georgianliga: {
    key: "georgian-league",
    name: "Georgian Liga",
    teams: teamsData.erovnuliLiga.teams,
  },
};
