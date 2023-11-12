import {
  TextAnimationCustomProps,
  TextAnimationProps,
  textAnimationDefaultProps,
} from "../types/component-types";
import { calculatePercentage, getRandomNumber } from "../utils/math";
import Symbol from "./components/Symbol";

export default function TextAnimation({
  text,
  customOptions,
}: {
  text: string;
  customOptions?: TextAnimationCustomProps;
}) {
  const options: TextAnimationProps = {
    ...textAnimationDefaultProps,
    ...customOptions,
  };

  let animationDelayTimes: number[] = [];
  let time = 0;

  //check pharametres validation
  if (options.speed > 100 || options.speed < 0) {
    throw new Error(
      "options Speed pharameter should be only number from 0 to 100"
    );
  }

  function generateAnimationDelayTimes() {
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== " ") {
        options.reverse
          ? animationDelayTimes.unshift(time)
          : animationDelayTimes.push(time);

        time += calculatePercentage(
          100 - options.speed,
          options.symbolAnimationTime
        );
      }
    }
  }

  function generateWords() {
    let animationDelayIndex = -1;
    let randomAnimationTimesMap = new Map();
    generateAnimationDelayTimes();

    return text.split(" ").map((word, index) => (
      <ul key={index} className="symbols-list flex">
        {word.split("").map((character) => {
          const color =
            options.colors[getRandomNumber(0, options.colors.length - 1)];
          animationDelayIndex += 1;
          let animationDelay = 0;
          if (options.style === "domino")
            animationDelay = animationDelayTimes[animationDelayIndex];
          if (options.style === "random") {
            let randomNumber = getRandomNumber(
              0,
              animationDelayTimes.length - 1
            );
            while (randomAnimationTimesMap.has(randomNumber)) {
              randomNumber = getRandomNumber(0, animationDelayTimes.length - 1);
            }

            randomAnimationTimesMap.set(randomNumber, randomNumber);

            animationDelay = animationDelayTimes[randomNumber];
          }
          return (
            <Symbol
              color={color}
              key={index + "_symbol"}
              fontSize={options.fontSize}
              symbol={character}
              animationDelay={animationDelay}
              animationDuration={options.symbolAnimationTime}
            />
          );
        })}
      </ul>
    ));
  }

  return (
    <div style={{ gap: options.spacingWords }} className="flex flex-wrap ">
      {generateWords()}
    </div>
  );
}
