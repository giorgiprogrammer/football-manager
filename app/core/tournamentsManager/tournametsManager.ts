import { TournamentAPI } from "@/app/services/supabase/tournamentApi";
import {
  filterDivisionData,
  generateMatchSchedule,
} from "@/app/utils/helperFunctions";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type fixturesType = {
  division_1: string[][][];
  division_2: string[][][];
  division_3: string[][][];
};

export class TournamentManager {
  api: TournamentAPI = new TournamentAPI();
  tour_index!: number;
  scheduleData!: PostgrestSingleResponse<
    {
      division_id: any;
      team_name: any;
      placement: any;
      win: any;
      draw: any;
      lost: any;
      played: any;
      point: any;
      strength: any;
    }[]
  >;

  division_1: any[] = [];
  division_2: any[] = [];
  division_3: any[] = [];

  fixtures: fixturesType = {
    division_1: [],
    division_2: [],
    division_3: [],
  };

  constructor() {
    this.init();
  }

  async init() {
    // get tour index
    const { data, error } = await this.api.getTourIndex();
    if (error) throw error;
    this.tour_index = data[0]?.tour_index;

    this.scheduleData = await this.api.getSchedule();
    if (this.scheduleData.error) throw this.scheduleData.error;

    this.makeTableArrange();
  }

  makeTableArrange() {
    this.division_1 = filterDivisionData(
      this.scheduleData.data!.filter((team) => team.division_id === 1)
    );
    this.division_2 = filterDivisionData(
      this.scheduleData.data!.filter((team) => team.division_id === 2)
    );
    this.division_3 = filterDivisionData(
      this.scheduleData.data!.filter((team) => team.division_id === 3)
    );
  }

  async initTournament() {
    const response = await this.api.insertInitialData();
    await this.init();
    this.makeFixtures();
    this.insertFixturesToDatabase();
    return response;
  }

  insertFixturesToDatabase() {
    return this.api.insertFixturesData(this.fixtures);
  }

  deleteTournament() {
    return this.api.deleteTournament();
  }

  getTourIndex() {
    this.api.getTourIndex();
  }

  makeFixtures() {
    const division_1_teams = this.division_1.map((team) => team.team_name);
    const division_1_fixtures = generateMatchSchedule(division_1_teams);
    this.fixtures.division_1 = division_1_fixtures;

    const division_2_teams = this.division_2.map((team) => team.team_name);
    const division_2_fixtures = generateMatchSchedule(division_2_teams);
    this.fixtures.division_2 = division_2_fixtures;

    const division_3_teams = this.division_3.map((team) => team.team_name);
    const division_3_fixtures = generateMatchSchedule(division_3_teams);
    this.fixtures.division_3 = division_3_fixtures;
  }

  calculateNextFixtures() {}
}

// export const tournamentManager = new TournamentManager();
