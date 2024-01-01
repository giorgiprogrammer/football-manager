"use client";

import useApp from "@/app/hooks/useApp";
import style from "./style.module.css";
import Overlay from "@/app/components/overlay/Overlay";
import Authentication from "@/app/components/authentication/Authentication";
import TatukaButton from "@/app/components/button/TatukaButton";
import TextAnimation from "@/app/components/TextAnimation";

import ReactPlayer from "react-player";
import { useState } from "react";
import clsx from "clsx";
import Game from "@/app/game";

export default function Simulator() {
  const { appContext } = useApp();
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <>
      <Game />
      {/* {showCanvas && <Game />} */}
      <div
      // className={clsx(
      //   style["simulator"],
      //   showCanvas && style["simulutorHidden"]
      // )}
      >
        {/* {appContext.isLogin === false && (
          <>
            <Overlay />
            <Authentication />
          </>
        )} */}

        {/* Video */}
        {/* <ReactPlayer
          playing={true}
          width={"198px"}
          height={"110px"}
          style={{
            opacity: 1,
            filter: "grayScale(100%)",
            position: "absolute",
            right: "24px",
            bottom: "24px",
            zIndex: 10,
            cursor: "pointer",
            boxShadow: "0px 0px 10px 2px #000000",
          }}
          muted={true}
          url="https://www.youtube.com/watch?v=UMg70kgxhCA"
        /> */}

        {/* Back Button */}
        {/* <div className="absolute left-6 top-6 z-50">
          <TatukaButton
            onclick={() => appContext.setGameMode("")}
            text="back"
          />
        </div> */}

        {/* <div className="absolute left-6 top-20">
          <TextAnimation
            customOptions={{
              colors: ["#2D2E2B", "#08081C", "#081B1C"],
              style: "dance",
              speed: 80,
            }}
            text="Simulator"
          />
        </div> */}

        {/* Content */}
        {/* <div className="absolute w-screen h-full flex justify-center items-center">
          <p className="max-w-[50%]">
            in this game mode, you have the freedom to choose any team, set data
            as you please, and then simply sit back to watch and relish the
            unfolding spectacle
            <span className=" ml-3">
              <TatukaButton
                onclick={() => setShowCanvas(true)}
                textColor="#CEFFFF"
                backgroundColor="#18DE36"
                text="Start"
              />
            </span>
          </p>
        </div> */}
      </div>
    </>
  );
}
