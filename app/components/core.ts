import { TextAnimationProps } from "../types/component-types";
import { calculatePercentage, getRandomNumber } from "../utils/math";

export default class TextAnimationCore {
  animationDelayTimes: number[] = [];
  randomAnimationTimesMap = new Map();
  colors: string[] = [];

  constructor(public text: string, public options: TextAnimationProps) {
    this.init();
  }

  init() {
    this.generateAnimationDelayTimes();
  }

  getColor() {
    return this.options.colors[
      getRandomNumber(0, this.options.colors.length - 1)
    ];
  }

  getAnimationDelay(animationDelayIndex: number) {
    let animationDelay = 0;
    if (
      this.options.style === "domino" ||
      this.options.style === "dance" ||
      this.options.style === "loading"
    ) {
      animationDelay = this.animationDelayTimes[animationDelayIndex];
    }
    if (this.options.style === "random") {
      let randomNumber = getRandomNumber(
        0,
        this.animationDelayTimes.length - 1
      );
      while (this.randomAnimationTimesMap.has(randomNumber)) {
        randomNumber = getRandomNumber(0, this.animationDelayTimes.length - 1);
      }

      this.randomAnimationTimesMap.set(randomNumber, randomNumber);
      animationDelay = this.animationDelayTimes[randomNumber];
    }

    return animationDelay;
  }

  generateAnimationDelayTimes() {
    let animationDelayTime = 0;

    for (let i = 0; i < this.text.length; i++) {
      if (this.text[i] !== " ") {
        this.options.reverse
          ? this.animationDelayTimes.unshift(animationDelayTime)
          : this.animationDelayTimes.push(animationDelayTime);

        animationDelayTime += calculatePercentage(
          100 - this.options.speed,
          this.options.symbolAnimationTime
        );
      }
    }
  }
}
