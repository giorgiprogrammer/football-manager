"use client";

import { tournamentManager } from "@/app/core/tournamentsManager/tournametsManager";
import { useState } from "react";

export default function AdminPage() {
  const [apiText, setApiText] = useState("");

  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-screen">
      <h1 className="text-4xl">Admin Page</h1>
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
    </div>
  );
}
