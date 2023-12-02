import AppProvider from "../context/appContext";
import Intro from "./components/intro/Intro";

export default function HomePage() {
  return (
    <AppProvider>
      <div className="w-screen">
        <Intro />
      </div>
    </AppProvider>
  );
}
