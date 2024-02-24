import { tournamentManager } from "@/app/core/tournamentsManager/tournametsManager";
import Row from "./components/Row";

export default async function Schedule({
  division_id,
}: {
  division_id: number;
}) {
  let division: any[] = [];

  await tournamentManager.init();

  // Depending on division_id, select the appropriate division array
  switch (division_id) {
    case 1:
      division = tournamentManager.division_1;
      break;
    case 2:
      division = tournamentManager.division_2;
      break;
    case 3:
      division = tournamentManager.division_3;
      break;
    default:
      // Handle invalid division_id
      break;
  }

  return (
    <div className="w-[95vw] relative flex flex-col items-center">
      <h1 className="custom-font-2 text-2xl mb-4 font-semibold text-gray-500">
        {division_id === 1 && "Best League"}
        {division_id === 2 && "Good League"}
        {division_id === 3 && "It's ok League"}
      </h1>
      <div className="overflow-x-scroll lg:overflow-hidden w-full">
        {/* Top Indicators */}
        <Row
          teamName="TeamName"
          played={"P"}
          won={"W"}
          drawn={"D"}
          lost={"L"}
          points={"PTS"}
          strength={"Strength"}
          isIndicator={true}
        />
        {division.map((teamData, index) => {
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
              numerator={index + 1}
            />
          );
        })}
      </div>
    </div>
  );
}
