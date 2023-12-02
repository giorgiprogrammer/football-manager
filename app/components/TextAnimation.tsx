"use client";

import { useEffect, useState } from "react";
import {
  TextAnimationCustomProps,
  TextAnimationProps,
  textAnimationDefaultProps,
} from "../types/component-types";
import Symbol from "./components/Symbol";
import React from "react";
import TextAnimationCore from "./core";
import "./style.css";
import clsx from "clsx";

function TextAnimation({
  text,
  customOptions,
  onAnimationEnd,
}: {
  text: string;
  customOptions?: TextAnimationCustomProps;
  onAnimationEnd?: () => void;
}) {
  const options: TextAnimationProps = {
    ...textAnimationDefaultProps,
    ...customOptions,
  };

  const animationNames = {
    domino: "circle",
    dance: "dance",
    random: "circle",
    loading: "loading",
  };

  //check pharametres validation
  if (options.speed > 100 || options.speed < 0) {
    throw new Error(
      "options Speed pharameter should be only number from 0 to 100"
    );
  }

  const textAnimationCore = new TextAnimationCore(text, options);

  function generateWords() {
    let animationDelayIndex = 0;

    return text.split(" ").map((word, index) => (
      <ul
        key={index}
        className={clsx("text-animation ", options.mirror && "mirror")}
      >
        {word.split("").map((character) => {
          if (typeof window === "undefined") {
            return null;
          }

          const color = textAnimationCore.getColor();
          const animationDelay =
            textAnimationCore.getAnimationDelay(animationDelayIndex);
          animationDelayIndex++;

          return (
            <Symbol
              onAnimationEnd={(anim) => {
                if (
                  Number(
                    anim.currentTarget.style.animationDelay.replace("s", "")
                  ).toFixed(2) ===
                  Math.max(...textAnimationCore.animationDelayTimes).toFixed(2)
                ) {
                  if (typeof onAnimationEnd === "function") {
                    onAnimationEnd();
                  }
                }
              }}
              color={color}
              key={`${index}_symbol_${animationDelay}_${String(Math.random())}`}
              fontSize={options.fontSize}
              symbol={character}
              animationName={
                animationNames[options.style as keyof typeof animationNames]
              }
              animationDelay={animationDelay}
              animationDuration={options.symbolAnimationTime}
            />
          );
        })}
      </ul>
    ));
  }

  const [isRendered, setIsRendered] = useState(Boolean);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <div style={{ gap: options.spacingWords }} className="flex flex-wrap ">
      {isRendered && generateWords()}
    </div>
  );
}

export default React.memo(TextAnimation);
