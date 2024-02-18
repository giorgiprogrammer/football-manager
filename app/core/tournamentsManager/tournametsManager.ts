import { TournamentAPI } from "@/app/services/supabase/tournamentApi";
import { filterDivisionData } from "@/app/utils/helperFunctions";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { error } from "console";

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

  constructor() {
    this.init();
  }

  async init() {
    // get tour index
    const { data, error } = await this.api.getTourIndex();
    if (error) throw error;
    this.tour_index = data[0].tour_index;

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
    return this.api.insertInitialData();
  }

  async deleteTournament() {
    return this.api.deleteTournament();
  }

  getTourIndex() {
    this.api.getTourIndex();
  }

  calculateNextFixtures() {}
}

export const tournamentManager = new TournamentManager();
