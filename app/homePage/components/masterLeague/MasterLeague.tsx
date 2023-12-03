import useApp from "@/app/hooks/useApp";
import style from "./style.module.css";
import TatukaButton from "@/app/components/button/TatukaButton";
import TextAnimation from "@/app/components/TextAnimation";
import Overlay from "@/app/components/overlay/Overlay";
import Authentication from "@/app/components/authentication/Authentication";

export default function MasterLeague() {
  const { appContext } = useApp();

  return (
    <div className={style.masterLeague}>
      {appContext.isLogin === false && (
        <>
          <Overlay />
          <Authentication />
        </>
      )}

      <div className="absolute left-6 top-6 z-50">
        <TatukaButton onclick={() => appContext.setGameMode("")} text="back" />
      </div>

      <div className="absolute left-6 top-20">
        <TextAnimation
          customOptions={{
            colors: ["#2D2E2B", "#08081C", "#081B1C"],
            style: "dance",
            speed: 80,
          }}
          text="Master League"
        />
      </div>
    </div>
  );
}
