import AppProvider, { AppContext } from "@/app/context/appContext";
import SimulatorPage from "./components/simulatorPage";

export default function Page() {
  return (
    <AppProvider>
      <SimulatorPage />
    </AppProvider>
  );
}
