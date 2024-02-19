import { tournamentManager } from "@/app/core/tournamentsManager/tournametsManager";
import { Fragment } from "react";

export async function Division({ id }: { id: number }) {
  const fixtures = (await tournamentManager.api.getFixtures(id)).data;

  return (
    <>
      <h4 className="text-xl font-semibold "> Division {id} </h4>

      {fixtures
        ? [...Array(9)].map((_, week) => (
            <Fragment key={`week_${week}`}>
              <h3 className="text-lg font-semibold  "> Week {week + 1} </h3>
              {fixtures
                .filter((fixture) => fixture.week === week)
                .map((fixture, index) => (
                  <Fragment key={`fixture_week_${week}_${index}`}>
                    <ul className="w-90vw relative">
                      <li className="flex justify-center gap-3 border px-4 py-2 items-center ">
                        <p>
                          {fixture.hostTeamScore === -1
                            ? "?"
                            : fixture.hostTeamScore}
                        </p>
                        <p>-</p>
                        <p>
                          {fixture.guestTeamScore === -1
                            ? "?"
                            : fixture.guestTeamScore}
                        </p>
                        <p>{fixture.hostTeamName}</p>
                        <b>VS</b>
                        <p>{fixture.guestTeamName}</p>
                        <button className=" bg-orange-700 px-5 py-2 hover:bg-black hover:text-white ">
                          Play
                        </button>
                      </li>
                    </ul>
                  </Fragment>
                ))}
            </Fragment>
          ))
        : null}
    </>
  );
}
