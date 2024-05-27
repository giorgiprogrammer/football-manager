import { Stadium } from "../game/gameObjects/stadium";
import { TeamData, initialTeamsData } from "./initialTeamsData";

export const matchData: MatchData = {
  hostTeam: initialTeamsData.Arsenal,
  guestTeam: initialTeamsData.Arsenal,
  matchTime: 2,
  mathMode: "experimental",
  stadiumSize: "small",
  isExtraTimes: false,
  matchIsFor: "Quiq Match",
};

export const matchStats = {
  hostTeamStats: {
    shoots: 0,
    passes: 0,
    ballPossession: 0,
    corners: 0,
    fouls: 0,
    score: 0,
  },
  guesTeamStats: {
    shoots: 0,
    passes: 0,
    ballPossession: 0,
    corners: 0,
    fouls: 0,
    score: 0,
  },
};

export type matchStatsProps = {
  hostTeamStats: {
    shoots: number;
    passes: number;
    ballPossession: number;
    corners: number;
    fouls: number;
    score: number;
  };
  guesTeamStats: {
    shoots: number;
    passes: number;
    ballPossession: number;
    corners: number;
    fouls: number;
    score: number;
  };
};

export type MatchData = {
  hostTeam: TeamData;
  guestTeam: TeamData;
  matchTime: number;
  mathMode: "classic" | "experimental";
  stadiumSize: "small" | "normal" | "big" | "Mega";
  isExtraTimes: boolean;
  matchIsFor: "Quiq Match" | "League" | "Cup";
};
