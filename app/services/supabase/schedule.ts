import { initialSheduleData } from "@/app/config/initialSheduleData";
import { supabase } from "./config";

export class ScheduleApi {
  async insertInitialData() {
    const initialData: any = [];
    // Iterate over each division
    Object.keys(initialSheduleData).forEach((division, divisionIndex) => {
      // Iterate over teams in each division
      initialSheduleData[division as keyof typeof initialSheduleData].forEach(
        (team, teamIndex) => {
          initialData.push({
            division_id: divisionIndex + 1, // Division ID starts from 1
            team_name: team.teamName,
            placement: teamIndex + 1, // Placement starts from 1
            win: team.won,
            draw: team.drawn,
            lost: team.lost,
            played: team.played,
            point: team.points,
            strength: team.strength,
          });
        }
      );
    });

    return await supabase.from("Schedule").insert(initialData);
  }

  async clearSchedule() {
    return await supabase
      .from("Schedule")
      .delete()
      .in("division_id", [1, 2, 3]);
  }

  async getSchedule() {
    return await supabase
      .from("Schedule")
      .select(
        "division_id, team_name, placement, win, draw, lost, played, point, strength"
      );
  }
}
