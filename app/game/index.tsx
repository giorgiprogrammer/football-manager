"use client";

import dynamic from "next/dynamic";
import style from "./style.module.css";

import { useEffect, useState } from "react";
import Spinner from "../components/spinner/Spinner";

const IonPhaser = dynamic(
  () => import("@ion-phaser/react").then((mod) => mod.IonPhaser),
  {
    ssr: false,
  }
);

const Game = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [state, setState] = useState<any>();

  useEffect(() => {
    import("phaser").then(async (mod) => {
      const Preload = await import("./scenes/preload").then((preload) => {
        return preload.default;
      });

      const state = {
        initialize: true,
        game: {
          width: window.innerWidth,
          height: window.innerHeight,

          backgroundColor: "rgb(238, 255, 236)",
          type: mod.AUTO,
          scene: [Preload],
        },
      };

      setState(state);
      setIsRendered(true);
    });
  }, []);

  return (
    <div className="">
      <div className=" opacity-20"> {<Spinner />}</div>
      {isRendered && (
        <IonPhaser
          className={style.canvasContainer}
          game={state.game}
          initialize={state.initialize}
        />
      )}
    </div>
  );
};

export default Game;
