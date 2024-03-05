import { TeamLogos } from "./enums/teamLogos";
import { teamNames } from "./enums/teamNames";

type TeamsData = {
  [name: string]: {
    logoKey: string;
    formation: string;
    formationProperties: FormationProperties;
    teamColor: string;
    teamSecondaryColor: string;
    strength: number;
    goalSoundKey: string;
    coach: {
      name: string;
      image: string;
      happyImage: string;
      sadImage: string;
    };
  };
};

type FormationProperties = {
  defence: "wide-attack" | "normal";
  midfield:
    | "wide-attack"
    | "center-attack"
    | "center-deffence"
    | "wide-deffence"
    | "normal";
  attack: "center-attack" | "normal";
};

export const initialTeamsData: TeamsData = {
  [teamNames.Arsenal]: {
    logoKey: TeamLogos.Arcenal,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 7,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
  },
  [teamNames.AtleticoMadrid]: {
    logoKey: TeamLogos.AtleticoDeMadrid,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 7,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
  },
  [teamNames.Barcelona]: {
    logoKey: TeamLogos.Barselona,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 7,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
  },
  [teamNames.ManchesterUnited]: {
    logoKey: TeamLogos.ManchesterUnited,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 7,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
  },
  [teamNames.RealMadrid]: {
    logoKey: TeamLogos.RealMadrid,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 7,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
  },
  [teamNames.Liverpool]: {
    logoKey: TeamLogos.Liverpool,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 7,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
  },
  [teamNames.Juventus]: {
    logoKey: TeamLogos.Juventus,

    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 7,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
  },
};
