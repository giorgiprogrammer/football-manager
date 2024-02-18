import { TournamentAPI } from "@/app/services/supabase/tournamentApi";

export class TournamenrsManager {
  api: TournamentAPI = new TournamentAPI();
  tour_index!: number;

  async initTournament() {
    return this.api.insertInitialData();
  }

  async deleteTournament() {
    return this.api.deleteTournament();
  }

  getTourIndex() {}

  calculateNextFixtures() {}
}
