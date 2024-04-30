import CtaButton from "../../buttons/ctaButton";
import TextAnimation from "../../tatukaComponents/textAnimation/TextAnimation";
import style from "./style.module.css";

export default function SimulatorPage() {
  return (
    <div className={style.simulatorPage}>
      {/* Right Menu */}
      <div
        className={
          "w-[25vw] h-screen fixed right-0 flex justify-center items-center "
        }
      >
        <CtaButton
          className="custom-font-2 font-bold"
          onClick={() => {}}
          label="Start Game"
        />
      </div>
      {/* Left Menu */}
      <div
        className={
          "w-[25vw] h-screen fixed left-0 flex justify-center items-center "
        }
      >
        <CtaButton
          className="custom-font-2 font-bold"
          onClick={() => {}}
          label="Tutorial"
        />
      </div>
      {/* Feed */}
      <div className={style.feed}>
        {/* Title */}
        <div className="w-full mt-4 flex justify-center ">
          <TextAnimation
            customOptions={{
              symbolAnimationTime: 3,
              fontSize: 30,
              speed: 95,
              mirror: true,
              style: "loading",
              colors: ["#FFA700"],
            }}
            text="Simulator"
          />
        </div>
        {/* Text */}
        <h3 className="custom-font-2 mt-4 text-sm">
          this is the simulator page, where you can select teams, adjust
          parameters, and watch the games unfold, seeing the results in
          real-time.
        </h3>
      </div>
    </div>
  );
}
