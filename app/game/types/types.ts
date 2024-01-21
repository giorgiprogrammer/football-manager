import { Stadium } from "../gameObjects/stadium";
import { Team } from "../gameObjects/team/team";

export type MatchData = {
  stadium: Stadium | null;
  hostTeamData: TeamData | null;
  guestTeamData: TeamData | null;
};

export type TeamData = {
  name: string;
  key: string;
  properties: TeamProperties;
  stength: number;
  tactics: {
    defence: {
      type: string;
      side: string;
      quntity: number;
    };
    midfielder: {
      type: string;
      side: string;
      quntity: number;
    };
    attacker: {
      type: string;
      side: string;
      quntity: number;
    };
  };
};

export type TeamProperties = {
  speed: number;
  goalkeeperSpeed: number;
  passDelay: number;
  passingStyle: string;
  passAccuracy: number;
  passSpeed: number;
  shootSpeed: number;
};
