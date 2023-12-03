"use client";

import dynamic from "next/dynamic";
import "phaser";

import { Preload } from "./scenes/preload";

const IonPhaser = dynamic(
  () => import("@ion-phaser/react").then((mod) => mod.IonPhaser),
  {
    ssr: false,
  }
);

const Game = () => {
  const state = {
    initialize: true,
    game: {
      width: 1000,
      height: 1000,

      backgroundColor: "#4eb3e7",
      type: Phaser.AUTO,
      scene: [Preload],
    },
  };

  return (
    <IonPhaser
      className=" w-screen h-screen"
      game={state.game}
      initialize={state.initialize}
    />
  );
};

export default Game;
