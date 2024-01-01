"use client";

import style from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import Spinner from "../components/spinner/Spinner";

const Game = () => {
  const canvasContainer = useRef(null);

  useEffect(() => {
    import("phaser").then(async (mod) => {
      const Preload = await import("./scenes/preload").then((preload) => {
        return preload.default;
      });
      const Menu = await import("./scenes/menu").then((menu) => {
        return menu.default;
      });
      const GamePlay = await import("./scenes/gameplay").then((gamePlay) => {
        return gamePlay.default;
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
          width: window.innerWidth,
          height: window.innerHeight,
        },
        backgroundColor: 0x39383d,
        // scene: [Preload, Menu, GamePlay],
        scene: [Preload, GamePlay],
      });

      return () => game.destroy(true, false);
    });
  }, []);

  return (
    <div>
      {/* <div className="opacity-20"> {<Spinner />}</div> */}
      <div ref={canvasContainer} className={style.canvasContainer}></div>
    </div>
  );
};

export default Game;
