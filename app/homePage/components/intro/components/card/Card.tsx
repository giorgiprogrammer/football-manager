import style from "./style.module.css";

import messiImage from "../../../../../assets/images/messi.jpg";
import versusImage from "../../../../../assets/images/versus.jpg";
import simulatorImage from "../../../../../assets/images/simulator.jpg";

import Image from "next/image";
import Link from "next/link";

const cardOptions = {
  masterLeague: {
    backgroundImage: messiImage,
    title: "Master League",
  },
  versus: {
    backgroundImage: versusImage,
    title: "Versus",
  },
  simulator: {
    backgroundImage: simulatorImage,
    title: "Simulator",
  },
};

export default function Card({
  mode,
  animationDelay,
  onClick,
}: {
  animationDelay?: number;
  mode: "masterLeague" | "versus" | "simulator";
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className=" cursor-pointer">
      <div
        style={{ animationDelay: `${animationDelay}s` }}
        className={style.card}
      >
        <Image
          className={style.wrapper}
          alt=""
          src={cardOptions[mode].backgroundImage}
          width={0}
          height={0}
        />
        <img
          src="https://support-leagueoflegends.riotgames.com/hc/article_attachments/4415908615571"
          className={style.character}
        />
        <h2 className={style.title}> {cardOptions[mode].title}</h2>
      </div>
    </div>
  );
}
