// Text Animation Component
export const textAnimationDefaultProps: TextAnimationProps = {
  symbolAnimationTime: 0.7,
  speed: 50,
  style: "domino",
  reverse: false,
  fontSize: 20,
  spacingWords: 15,
  colors: ["white"],
};

export type TextAnimationProps = {
  symbolAnimationTime: number;
  speed: number;
  style: "domino" | "random";
  reverse: boolean;
  fontSize: number;
  spacingWords: number;
  colors: Array<string>;
};

export type TextAnimationCustomProps = {
  symbolAnimationTime?: number;
  speed?: number;
  style?: "domino" | "random";
  reverse?: boolean;
  fontSize?: number;
  spacingWords?: number;
  colors?: Array<string>;
};
