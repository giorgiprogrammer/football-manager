"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { TextAnimationCustomProps } from "@/app/types/component-types";
import TextAnimation from "@/app/components/TextAnimation";
import useApp from "@/app/hooks/useApp";
import HomeMenu from "./components/homeMenu/HomeMenu";
import MasterLeague from "../masterLeague/MasterLeague";
import Simulator from "../simulator/Simulator";

const textAnimationProps: TextAnimationCustomProps = {
  speed: 80,
  symbolAnimationTime: 1,
  fontSize: 120,
  spacingWords: 93,
  style: "random",
  colors: ["gray"],
  mirror: true,
};

export default function Intro() {
  const { appContext } = useApp();
  const [completeTitleAnimation, setCompleteTitleAnimation] = useState(false);

  const titleClass = clsx(
    "absolute w-fit h-fit m-auto left-0 right-0 top-0 bottom-20 transition-all duration-300 flex",
    completeTitleAnimation && " scale-[0.35] opacity-0"
  );

  const introClass = clsx(
    "h-screen transition-all duration-300  relative overflow-hidden",
    completeTitleAnimation ? "bg-neutral-950" : "white"
  );

  const TextAnimationMemo = useMemo(() => {
    return (
      <TextAnimation
        onAnimationEnd={() => setCompleteTitleAnimation(true)}
        customOptions={textAnimationProps}
        text="Digital Dribblers"
      />
    );
  }, []);

  return (
    <div className={introClass}>
      {/* <div className={titleClass}>{TextAnimationMemo}</div> */}
      {/* {completeTitleAnimation && appContext.gameMode === "" && <HomeMenu />}
      {appContext.gameMode === "masterLeague" && <MasterLeague />}
      {appContext.gameMode === "simulator" && <Simulator />} */}

      <Simulator />
    </div>
  );
}
