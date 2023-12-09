"use client";

import dynamic from "next/dynamic";
import style from "./style.module.css";

import { useEffect, useRef, useState } from "react";
import Spinner from "../components/spinner/Spinner";

// const IonPhaser = dynamic(
//   () => import("@ion-phaser/react").then((mod) => mod.IonPhaser),
//   {
//     ssr: false,
//   }
// );

const Game = () => {
  const canvasContainer = useRef(null);

  const [isRendered, setIsRendered] = useState(false);
  const [state, setState] = useState<any>();

  useEffect(() => {
    import("phaser").then(async (mod) => {
      const Preload = await import("./scenes/preload").then((preload) => {
        return preload.default;
      });

      if (!canvasContainer.current) return;

      const game = new Phaser.Game({
        dom: { createContainer: true },
        physics: {
          default: "arcade",
          arcade: {
            debug: false,
          },
        },
        parent: canvasContainer.current,
        fullscreenTarget: canvasContainer.current,
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.NONE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 900,
          height: 600,
        },
        backgroundColor: 0x184047,
        scene: [Preload],
      });

      return () => game.destroy(true, false);
    });
  }, []);

  return (
    <div className="">
      <div className=" opacity-20"> {<Spinner />}</div>
      <div ref={canvasContainer} className={style.canvasContainer}></div>
    </div>
  );
};

export default Game;
