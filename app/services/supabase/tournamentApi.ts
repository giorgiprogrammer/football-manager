import { initialSheduleData } from "@/app/config/initialSheduleData";
import { supabase } from "./config";
import { getRandomNumber } from "@/app/utils/math";
import { fixturesType } from "@/app/core/tournamentsManager/tournametsManager";

export class TournamentAPI {
  async insertInitialData() {
    // clear schedule for fresh start
    const possibleToInitData: any = await this.deleteTournament();
    if (possibleToInitData.error) return possibleToInitData.error;

    const initialTeamsData: any = [];
    // Prepare data for insertion
    Object.keys(initialSheduleData).forEach((division, divisionIndex) => {
      // Iterate over teams in each division
      initialSheduleData[division as keyof typeof initialSheduleData].forEach(
        (team, teamIndex) => {
          initialTeamsData.push({
            division_id: divisionIndex + 1, // Division ID starts from 1
            team_name: team.teamName,
            placement: 0, // Placement starts from 1
            win: team.won,
            draw: team.drawn,
            lost: team.lost,
            played: team.played,
            point: team.points,
            strength: team.strength + getRandomNumber(10, 2000), // just for testing
          });
        }
      );
    });

    try {
      // Insert Teams Data
      const { data: teamsData, error: teamsError } = await supabase
        .from("Schedule")
        .insert(initialTeamsData);

      if (teamsError) throw teamsError;

      // insert tournament info
      const { data: tournamentInfoData, error: tournamentInfoError } =
        await supabase
          .from("TournamentsInfo")
          .insert([{ tournament_name: "Marble League", tour_index: 1 }]);

      if (tournamentInfoError) throw tournamentInfoError;
      // if no error return data
      return { teamsData, tournamentInfoData };
    } catch (error) {
      console.log("Error inserting initial data", error);
      this.deleteTournament();
      return error;
    }
  }

  async deleteTournament() {
    try {
      const { data: scheduleData, error: scheduleError } = await supabase
        .from("Schedule")
        .delete()
        .in("division_id", [1, 2, 3]);

      if (scheduleError) throw scheduleError;

      const { data: tournamenrInfoData, error: tournamentInfoError } =
        await supabase
          .from("TournamentsInfo")
          .delete()
          .in("tournament_name", ["Marble League"]);

      if (tournamentInfoError) throw tournamentInfoError;

      const { data: fixutedData, error: fixturesError } = await supabase
        .from("TournamentFixtures")
        .delete()
        .in("division", [1, 2, 3]);

      if (fixturesError) throw fixturesError;

      // if no error return data
      return { scheduleData, tournamenrInfoData };
    } catch (error) {
      console.log("Error clearing tournament", error);
      return error;
    }
  }

  async getSchedule() {
    return await supabase
      .from("Schedule")
      .select(
        "division_id, team_name, placement, win, draw, lost, played, point, strength"
      );
  }

  async getTourIndex() {
    return await supabase
      .from("TournamentsInfo")
      .select("tour_index")
      .eq("tournament_name", "Marble League");
  }

  async getFixtures(division: number) {
    return await supabase
      .from("TournamentFixtures")
      .select("*")
      .eq("division", division)
      .order("numerator", { ascending: true });
  }

  async insertFixturesData(fixtures: fixturesType) {
    let numerator = 0;

    const fixturesData: {
      hostTeamScore: string;
      guestTeamScore: string;
      hostTeamName: string;
      guestTeamName: string;
      division: number;
      week: number;
      numerator: number;
    }[] = [];

    // Prepare data for insertion
    fixtures.division_1.forEach((fixture, index) => {
      fixture.forEach((match) => {
        fixturesData.push({
          hostTeamScore: "-1",
          guestTeamScore: "-1",
          hostTeamName: match[0],
          guestTeamName: match[1],
          division: 1,
          week: index,
          numerator: numerator++,
        });
      });
    });

    fixtures.division_2.forEach((fixture, index) => {
      fixture.forEach((match) => {
        fixturesData.push({
          hostTeamScore: "-1",
          guestTeamScore: "-1",
          hostTeamName: match[0],
          guestTeamName: match[1],
          division: 2,
          week: index,
          numerator: numerator++,
        });
      });
    });

    fixtures.division_3.forEach((fixture, index) => {
      fixture.forEach((match) => {
        fixturesData.push({
          hostTeamScore: "-1",
          guestTeamScore: "-1",
          hostTeamName: match[0],
          guestTeamName: match[1],
          division: 3,
          week: index,
          numerator: numerator++,
        });
      });
    });

    try {
      const { data, error } = await supabase
        .from("TournamentFixtures")
        .insert(fixturesData);
      if (error) throw error;
      return data;
    } catch (error) {
      console.log("Error inserting fixtures data", error);
      return error;
    }
  }
}

export async function insertMatchResult(
  guestTeam: string,
  hostTeam: string,
  hostTeamScore: number,
  guestTeamScore: number,
  division: number,
  week: number
) {
  const { data: tournamentData, error: tournamentError } = await supabase
    .from("TournamentFixtures")
    .update({
      hostTeamScore: hostTeamScore,
      guestTeamScore: guestTeamScore,
    })
    .eq("hostTeamName", hostTeam)
    .eq("guestTeamName", guestTeam)
    .eq("division", division)
    .eq("week", week);

  console.log("tournamentResponse: ", tournamentData, tournamentError);

  let hostTeamPoints =
    hostTeamScore > guestTeamScore
      ? 3
      : 0 || hostTeamScore === guestTeamScore
      ? 1
      : 0;

  let guestTeamPoints =
    hostTeamScore < guestTeamScore
      ? 3
      : 0 || hostTeamScore === guestTeamScore
      ? 1
      : 0;

  const { data: hostData, error: hostPointError } = await supabase
    .from("Schedule")
    .select("point, played, win, draw, lost")
    .eq("team_name", hostTeam);

  console.log("hostPoint: ", hostData, hostPointError);

  hostTeamPoints += hostData![0].point;

  const { data: hostscheduleData, error: hostscheduleError } = await supabase
    .from("Schedule")
    .update({
      point: hostTeamPoints,
      played: hostData![0].played + 1,
      win: (hostData![0].win += hostTeamScore > guestTeamScore ? 1 : 0),
      draw: (hostData![0].draw += hostTeamScore === guestTeamScore ? 1 : 0),
      lost: (hostData![0].lost += hostTeamScore < guestTeamScore ? 1 : 0),
    })
    .eq("team_name", hostTeam);

  const { data: guestData, error: guestPointError } = await supabase
    .from("Schedule")
    .select("point, played, win, draw, lost")
    .eq("team_name", guestTeam);

  console.log("guestPoint: ", guestData, guestPointError);

  guestTeamPoints += guestData![0].point;

  const { data: guestscheduleData, error: guestscheduleError } = await supabase
    .from("Schedule")
    .update({
      point: guestTeamPoints,
      played: guestData![0].played + 1,
      win: (guestData![0].win += hostTeamScore < guestTeamScore ? 1 : 0),
      draw: (guestData![0].draw += hostTeamScore === guestTeamScore ? 1 : 0),
      lost: (guestData![0].lost += hostTeamScore > guestTeamScore ? 1 : 0),
    })
    .eq("team_name", guestTeam);

  return {
    tournamentData,
    tournamentError,
    hostscheduleData,
    guestscheduleData,
    hostscheduleError,
    guestscheduleError,
  };
}
