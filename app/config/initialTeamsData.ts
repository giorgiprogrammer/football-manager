import { TeamLogos } from "./enums/teamLogos";
import { teamNames } from "./enums/teamNames";

export type TeamsData = {
  [name: string]: TeamData;
};

export type TeamData = {
  name: string;
  logoKey: string;
  formation: string;
  formationProperties: FormationProperties;
  techniqueProperties: TeamTechniqueProperties;
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
  selectedForMenu?: boolean;
};

export type TeamTechniqueProperties = {
  goalKeeperMotionSpeed: number;
  goalKeeperPassSpeed: number;
  passSpeeed: number;
  passAccuracy: number;
  shootSpeed: number;
  shootAccuracy: number;
  longPassChance: number;
  shortPassChance: number;
  passDelay: number;
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
    name: teamNames.Arsenal,
    logoKey: TeamLogos.Arsenal,
    formation: "4-3-3",
    formationProperties: {
      defence: "wide-attack",
      midfield: "normal",
      attack: "center-attack",
    },
    techniqueProperties: {
      goalKeeperMotionSpeed: 50,
      goalKeeperPassSpeed: 50,
      passSpeeed: 50,
      passAccuracy: 50,
      shootSpeed: 50,
      shootAccuracy: 50,
      longPassChance: 50,
      shortPassChance: 50,
      passDelay: 20,
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 1400,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
    selectedForMenu: true,
  },
  [teamNames.AtleticoMadrid]: {
    name: teamNames.AtleticoMadrid,
    logoKey: TeamLogos.AtleticoDeMadrid,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    techniqueProperties: {
      goalKeeperMotionSpeed: 50,
      goalKeeperPassSpeed: 50,
      passSpeeed: 50,
      passAccuracy: 50,
      shootSpeed: 50,
      shootAccuracy: 50,
      longPassChance: 50,
      shortPassChance: 50,
      passDelay: 20,
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 1400,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
    selectedForMenu: true,
  },
  [teamNames.Barcelona]: {
    name: teamNames.Barcelona,
    logoKey: TeamLogos.Barselona,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "normal",
    },
    techniqueProperties: {
      goalKeeperMotionSpeed: 50,
      goalKeeperPassSpeed: 50,
      passSpeeed: 50,
      passAccuracy: 50,
      shootSpeed: 50,
      shootAccuracy: 50,
      longPassChance: 50,
      shortPassChance: 50,
      passDelay: 20,
    },
    teamColor: "0xE833A0",
    teamSecondaryColor: "0x000000",
    strength: 900,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
    selectedForMenu: true,
  },
  [teamNames.ManchesterUnited]: {
    name: teamNames.ManchesterUnited,
    logoKey: TeamLogos.ManchesterUnited,
    formation: "5-3-2",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    techniqueProperties: {
      goalKeeperMotionSpeed: 50,
      goalKeeperPassSpeed: 50,
      passSpeeed: 50,
      passAccuracy: 50,
      shootSpeed: 50,
      shootAccuracy: 50,
      longPassChance: 50,
      shortPassChance: 50,
      passDelay: 20,
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 1400,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
    selectedForMenu: true,
  },
  [teamNames.RealMadrid]: {
    name: teamNames.RealMadrid,
    logoKey: TeamLogos.RealMadrid,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    techniqueProperties: {
      goalKeeperMotionSpeed: 50,
      goalKeeperPassSpeed: 50,
      passSpeeed: 50,
      passAccuracy: 50,
      shootSpeed: 50,
      shootAccuracy: 50,
      longPassChance: 50,
      shortPassChance: 50,
      passDelay: 20,
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 1400,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
    selectedForMenu: true,
  },
  [teamNames.Liverpool]: {
    name: teamNames.Liverpool,
    logoKey: TeamLogos.Liverpool,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    techniqueProperties: {
      goalKeeperMotionSpeed: 50,
      goalKeeperPassSpeed: 50,
      passSpeeed: 50,
      passAccuracy: 50,
      shootSpeed: 50,
      shootAccuracy: 50,
      longPassChance: 50,
      shortPassChance: 50,
      passDelay: 20,
    },
    teamColor: "0x9C824A",
    teamSecondaryColor: "0x000000",
    strength: 1400,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
    selectedForMenu: true,
  },
  [teamNames.Juventus]: {
    name: teamNames.Juventus,
    logoKey: TeamLogos.Juventus,
    formation: "4-4-2",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    techniqueProperties: {
      goalKeeperMotionSpeed: 50,
      goalKeeperPassSpeed: 50,
      passSpeeed: 50,
      passAccuracy: 50,
      shootSpeed: 50,
      shootAccuracy: 50,
      longPassChance: 50,
      shortPassChance: 50,
      passDelay: 20,
    },
    teamColor: "0xFFF7FF",
    teamSecondaryColor: "0x000000",
    strength: 1809,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
    selectedForMenu: true,
  },
  [teamNames.BayernMunich]: {
    name: teamNames.BayernMunich,
    logoKey: TeamLogos.BayernMunich,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    techniqueProperties: {
      goalKeeperMotionSpeed: 50,
      goalKeeperPassSpeed: 50,
      passSpeeed: 50,
      passAccuracy: 50,
      shootSpeed: 50,
      shootAccuracy: 50,
      longPassChance: 50,
      shortPassChance: 50,
      passDelay: 20,
    },
    teamColor: "0xFFF7FF",
    teamSecondaryColor: "0x000000",
    strength: 1809,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
    selectedForMenu: true,
  },
  [teamNames.Chelsea]: {
    name: teamNames.Chelsea,
    logoKey: TeamLogos.Chelsea,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    techniqueProperties: {
      goalKeeperMotionSpeed: 50,
      goalKeeperPassSpeed: 50,
      passSpeeed: 50,
      passAccuracy: 50,
      shootSpeed: 50,
      shootAccuracy: 50,
      longPassChance: 50,
      shortPassChance: 50,
      passDelay: 20,
    },
    teamColor: "0xFFF7FF",
    teamSecondaryColor: "0x000000",
    strength: 1809,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
    selectedForMenu: true,
  },
  [teamNames.ManchesterCity]: {
    name: teamNames.ManchesterCity,
    logoKey: TeamLogos.ManchesterCity,
    formation: "4-3-3",
    formationProperties: {
      defence: "normal",
      midfield: "center-attack",
      attack: "center-attack",
    },
    techniqueProperties: {
      goalKeeperMotionSpeed: 50,
      goalKeeperPassSpeed: 50,
      passSpeeed: 50,
      passAccuracy: 50,
      shootSpeed: 50,
      shootAccuracy: 50,
      longPassChance: 50,
      shortPassChance: 50,
      passDelay: 20,
    },
    teamColor: "0xFFF7FF",
    teamSecondaryColor: "0x000000",
    strength: 1809,
    goalSoundKey: "arsenal_goal_sound",
    coach: {
      name: "Mikel Arteta",
      image: "mikel_arteta",
      happyImage: "mikel_arteta_happy",
      sadImage: "mikel_arteta_sad",
    },
    selectedForMenu: true,
  },
};
