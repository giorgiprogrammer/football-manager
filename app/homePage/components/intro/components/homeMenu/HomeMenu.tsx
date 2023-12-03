import TextAnimation from "@/app/components/TextAnimation";
import Card from "../card/Card";
import useApp from "@/app/hooks/useApp";
import TatukaButton from "@/app/components/button/TatukaButton";
import UserInterface from "./components/userInterface/UserInterface";

export default function HomeMenu() {
  const { appContext } = useApp();

  return (
    <>
      {appContext.isLogin && (
        <>
          <UserInterface />
        </>
      )}
      <div className="w-screen absolute mt-8 flex justify-center opacity-80">
        <TextAnimation
          customOptions={{
            fontSize: 40,
            style: "loading",
            speed: 96,
            symbolAnimationTime: 3,
            colors: ["#DED4E4"],
            mirror: true,
          }}
          text="Select your desired game mode"
        />
      </div>
      <div className="gap-48 scale-50 flex justify-center w-screen h-screen items-center">
        <Card
          onClick={() => appContext.setGameMode("masterLeague")}
          mode="masterLeague"
          animationDelay={0.5}
        />
        <Card
          onClick={() => appContext.setGameMode("versus")}
          mode="versus"
          animationDelay={1}
        />
        <Card
          onClick={() => appContext.setGameMode("simulator")}
          mode="simulator"
          animationDelay={1.5}
        />
      </div>
    </>
  );
}
