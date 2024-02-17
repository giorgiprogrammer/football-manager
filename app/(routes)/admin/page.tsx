"use client";

import { ScheduleApi } from "@/app/services/supabase/schedule";
import { useState } from "react";

export default function AdminPage() {
  const scheduleAPI = new ScheduleApi();

  const [apiText, setApiText] = useState("");

  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-screen">
      <h1 className="text-4xl">Admin Page</h1>
      <p>{apiText}</p>
      <button
        onClick={() => {
          setApiText("");
          scheduleAPI.insertInitialData().then(
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
        Insert Initial Data
      </button>

      <button
        onClick={() => {
          setApiText("");
          scheduleAPI.clearSchedule().then(
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
        Clear Schedule
      </button>
    </div>
  );
}
