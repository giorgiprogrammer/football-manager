import { ScheduleApi } from "@/app/services/supabase/schedule";
import Row from "./components/Row";

export default async function Schedule({
  division_id,
}: {
  division_id: number;
}) {
  const scheduleAPI = new ScheduleApi();
  const response = await scheduleAPI.getSchedule();

  // @ts-ignore
  const scheduleData: {
    division_id: number;
    team_name: string;
    placement: number;
    win: number;
    draw: number;
    lost: number;
    played: number;
    point: number;
    strength: number;
  }[] = response.data;

  return (
    <div className="w-[90vw] relative flex flex-col items-center">
      <h1 className="custom-font-2 mb-4 font-semibold text-gray-500">
        Division {division_id} Schedule
      </h1>
      {/* Top Indicators */}
      <Row
        teamName="TeamName"
        played={"Played"}
        won={"W"}
        drawn={"D"}
        lost={"L"}
        points={"Pnts"}
        strength={"Strength"}
      />
      {
        // Schedule Data
        scheduleData?.map((teamData, index) => {
          if (teamData.division_id !== division_id) return null;
          return (
            <Row
              key={index}
              teamName={teamData.team_name}
              played={teamData.played}
              won={teamData.win}
              drawn={teamData.draw}
              lost={teamData.lost}
              points={teamData.point}
              strength={teamData.strength}
            />
          );
        })
      }
    </div>
  );
}
