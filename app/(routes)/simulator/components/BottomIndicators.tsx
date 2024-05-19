"use client";

import { useRouter } from "next/navigation";
import TeamSettingsModal from "./TeamSettingsModal/teamSettingsModal";
import { useContext, useState } from "react";
import { AppContext } from "@/app/context/appContext";

export default function BottomIndicators() {
  const router = useRouter();

  const appContext = useContext(AppContext);

  const [showTeamSettings, setShowTeamSettings] = useState(false);

  return (
    <div className="ml-2 left-0 gap-2 bottom-0 fixed w-screen h-[20vh] flex  items-center">
      <button
        onClick={() => {
          const selectedTeamNumber = Object.keys(appContext.userTeams).filter(
            (team) => appContext.userTeams[team].selectedForMenu
          ).length;

          if (selectedTeamNumber !== 10) {
            alert(
              "Please select 10 teams, currently selected " + selectedTeamNumber
            );
            return;
          }

          router.push("/game");
        }}
        className="bg-green-500 border-2 border-white mt-2 py-2 px-1 text-gray-800 custom-font-2 font-bold transition-all duration-300 hover:bg-white hover:text-black  "
      >
        Quiq Match
      </button>
      <button
        onClick={() => {
          setShowTeamSettings(true);
        }}
        className="border-2 border-white mt-2 py-2 px-1 text-white custom-font-2 font-bold transition-all duration-300 hover:bg-white hover:text-black  "
      >
        Team Settings
      </button>

      {/* Team Settings Modal */}
      {showTeamSettings && (
        <TeamSettingsModal setShowTeamSettingsModal={setShowTeamSettings} />
      )}
    </div>
  );
}
