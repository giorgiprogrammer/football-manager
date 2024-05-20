import AppProvider from "@/app/context/appContext";
import Game from "@/app/game";

export default function GamePage() {
  return (
    <AppProvider>
      <Game />
    </AppProvider>
  );
}
