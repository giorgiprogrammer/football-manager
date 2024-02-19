"use client";

import { tournamentManager } from "@/app/core/tournamentsManager/tournametsManager";
import { useState } from "react";

export function Interface() {
  const [apiText, setApiText] = useState("");

  return (
    <>
      <p>{apiText}</p>
      <button
        onClick={() => {
          setApiText("");
          tournamentManager.initTournament().then(
            (res) => {
              setApiText(JSON.stringify(res));
              console.log(res);
            },
            (error) => {
              setApiText(JSON.stringify(error));
              console.log(error);
            }
          );
        }}
        className=" px-3 py-2 bg-slate-800 text-white "
      >
        Start New Tournament
      </button>

      <button
        onClick={() => {
          setApiText("");
          tournamentManager.deleteTournament().then(
            (res) => {
              setApiText(JSON.stringify(res));
              console.log(res);
            },
            (error) => {
              setApiText(JSON.stringify(error));
              console.log(error);
            }
          );
        }}
        className="px-3 py-2 bg-slate-800 text-white "
      >
        Delete Tournament
      </button>
    </>
  );
}
