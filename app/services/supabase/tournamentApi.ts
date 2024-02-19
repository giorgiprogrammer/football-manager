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
            point: team.points + getRandomNumber(10, 20), // just for testing,
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
      .eq("division", division);
  }

  async insertFixturesData(fixtures: fixturesType) {
    const fixturesData: {
      hostTeamScore: string;
      guestTeamScore: string;
      hostTeamName: string;
      guestTeamName: string;
      division: number;
      week: number;
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
