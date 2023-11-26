"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import Card from "./components/card/Card";
import { TextAnimationCustomProps } from "@/app/types/component-types";
import TextAnimation from "@/app/components/TextAnimation";

// import { TextAnimation, TextAnimationCustomProps } from "tatuka-components";

const textAnimationProps: TextAnimationCustomProps = {
  speed: 78,
  symbolAnimationTime: 0.8,
  fontSize: 120,
  spacingWords: 97,
  style: "random",
  colors: ["gray"],
};

export default function Intro() {
  const [completeTitleAnimation, setCompleteTitleAnimation] = useState(false);

  const titleClass = clsx(
    "absolute w-fit h-fit m-auto left-0 right-0 top-0 bottom-20 transition-all duration-300",
    completeTitleAnimation && " scale-[0.35] opacity-0"
  );

  const introClass = clsx(
    "h-screen transition-all duration-300",
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
      <div className={titleClass}>{TextAnimationMemo}</div>
      {completeTitleAnimation && (
        <div className="gap-6 scale-50 flex justify-center w-screen h-screen items-center">
          <Card />
        </div>
      )}
    </div>
  );
}
