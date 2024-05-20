// import { tournamentManager } from "@/app/core/tournamentsManager/tournametsManager";
import Fixtures from "./components/fixtures";
import { Interface } from "./components/interface";

export default function AdminPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-screen">
      <h1 className="text-4xl">Admin Page</h1>
      <Interface />
      <Fixtures />
    </div>
  );
}
