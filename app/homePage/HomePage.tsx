import GetSessionData from "../components/getSessionData/GetSessionData";
import AppProvider from "../context/appContext";
import { getSession } from "../services/supabase/user";
import Intro from "./components/intro/Intro";

export default async function HomePage() {
  return (
    <AppProvider>
      <GetSessionData />
      <div className="w-screen">
        <Intro />
      </div>
    </AppProvider>
  );
}
