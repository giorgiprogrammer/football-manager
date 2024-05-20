"use client";

import { useSearchParams } from "next/navigation";
import style from "./style.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { tournamenrDataConfig } from "./config/tournamentDataConfig";
import { matchData } from "../config/matchData";
import GetUserInformation from "../components/global/getUserInformation";
import { AppContext } from "../context/appContext";
import { useRouter } from "next/navigation";
import { gameConfig } from "./config/gameConfig";

let Preload: any;
let Menu: any;
let GamePlay: any;
let CanvasScene: any;

export const Game = () => {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const [showGetUserInformation, setShowGetUserInformation] = useState(true);

  const searchParams = useSearchParams();

  if (searchParams.get("matchMode") === undefined) {
    matchData.matchIsFor = "Quiq Match";
  }

  if (searchParams.get("matchMode") === "league") {
    matchData.matchIsFor = "League";
    tournamenrDataConfig.hostTeam = searchParams.get("h")!;
    tournamenrDataConfig.guestTeam = searchParams.get("g")!;
    tournamenrDataConfig.week = parseInt(searchParams.get("week")!);
    tournamenrDataConfig.division = parseInt(searchParams.get("division")!);
  }

  if (searchParams.get("matchMode") === "cup") {
    matchData.matchIsFor = "Cup";
  }

  const canvasContainer = useRef(null);

  useEffect(() => {
    if (
      Object.keys(gameConfig.menuTeams).length === 0 &&
      matchData.matchIsFor === "Quiq Match"
    ) {
      router.push("/");
    }

    if (!canvasContainer.current) return;

    // Client-side-only code
    if (typeof window !== "undefined") {
      Preload = require("./scenes/preload").default;
      Menu = require("./scenes/menu").default;
      GamePlay = require("./scenes/gameplay").default;
      CanvasScene = require("./scenes/canvasScene").default;
    }

    import("phaser").then((Phaser) => {
      const game = new Phaser.Game({
        dom: { createContainer: true },
        physics: {
          default: "arcade",
          arcade: {
            debug: false,
          },
        },
        parent: canvasContainer.current!,
        fullscreenTarget: canvasContainer.current,
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: window.innerWidth,
          height: window.innerHeight,
        },
        backgroundColor: 0x08170f,
        scene: [Preload, Menu, GamePlay, CanvasScene],
      });
      // return () => game?.destroy(true, false);
    });
  }, []);

  useEffect(() => {
    if (!showGetUserInformation && !appContext.userData.isLogin) {
      router.push("/");
    }
  }, [showGetUserInformation]);

  return (
    <div ref={canvasContainer} className={style.canvasContainer}>
      {showGetUserInformation && (
        <GetUserInformation
          callBack={() => {
            setShowGetUserInformation(false);
          }}
        />
      )}
    </div>
  );
};

export default Game;
