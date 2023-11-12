import TextAnimation from "@/app/components/TextAnimation";
import {
  TextAnimationCustomProps,
  TextAnimationProps,
  textAnimationDefaultProps,
} from "@/app/types/component-types";

const textAnimationProps: TextAnimationCustomProps = {
  speed: 70,
  symbolAnimationTime: 1.5,
  fontSize: 92,
  spacingWords: 40,
  style: "random",
  colors: ["#A975F0", "#75B7F0", "#0CEF7B", "#F3CDCD", "#F5D390", "#F55484"],
};

export default function Intro() {
  return (
    <div className="bg-slate-800 h-screen">
      <div className="absolute w-fit h-fit m-auto left-0 right-0 top-0 bottom-24">
        <TextAnimation
          customOptions={textAnimationProps}
          text="Digital Dribblers"
        />
      </div>
    </div>
  );
}
