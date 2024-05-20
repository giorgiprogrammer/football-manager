import { TeamsData } from "@/app/config/initialTeamsData";

export const gameConfig = {
  menuTeams: {},
  formations: ["4-4-2", "5-4-1", "5-3-2", "3-3-4", "4-3-3", "3-4-3", "3-5-2"],
  formationProperties: {
    defence: ["wide-attack", "normal"],
    midfield: [
      "wide-attack",
      "center-attack",
      "center-deffence",
      "wide-deffence",
      "normal",
    ],
    attack: ["center-attack", "normal"],
  },
};

type gameConfig = {
  menuTeams: TeamsData;
  formationProperties: {
    defence: string[];
    midfield: string[];
    attack: string[];
  };
};

// type GameConfig = {
//   formations: string[];
//   formationProperties: {
//     defence: string[];
//     midfield: string[];
//     attack: string[];
//   };
// };
