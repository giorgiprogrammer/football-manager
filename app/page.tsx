import { Inter, Roboto } from "next/font/google";
import Bound from "./components/global/bound";
import WebIndicators from "./components/global/webIndicators";
import { Modal } from "./components/modal/pageModal";
import HomePage from "./components/pages/homePage";
import AppProvider, { AppContext } from "./context/appContext";
import GetUserInformation from "./components/global/getUserInformation";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={roboto.className}>
      <AppProvider>
        <HomePage />
      </AppProvider>
    </main>
  );
}
