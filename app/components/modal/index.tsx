import React, { useContext } from "react";
import style from "./style.module.css";
import { AppContext } from "@/app/context/appContext";
import SimulatorPage from "../pages/simulator";
import GamePage from "../pages/game";
import ForInvestors from "../pages/forInvestors";
import clsx from "clsx";

export function Modal({ backgroundColor }: { backgroundColor: string }) {
  const appContext = useContext(AppContext);

  return (
    <div
      className={clsx(
        "w-screen h-screen fixed top-0 left-0 flex justify-center items-center sm:justify-start sm:items-start",
        appContext.menuIsOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div
        style={{
          backgroundColor,
          width: appContext.menuIsOpen ? "100%" : "0%",
          height: appContext.menuIsOpen ? "100%" : "0%",
          opacity: appContext.menuIsOpen ? 1 : 0,
        }}
        className={style.modal}
      ></div>
      <ul
        style={{ display: appContext.menuIsOpen ? "block" : "none" }}
        className=" text-white custom-font-1 w-full p-5 text-4xl"
      >
        <li
          style={{
            marginLeft: appContext.selectedMenuItem === "" ? "0" : "-100vw",
            transitionDuration:
              appContext.selectedMenuItem === "" ? "0.3s" : "0.5s",
            transitionDelay: appContext.selectedMenuItem === "" ? "0s" : "0.1s",
          }}
          onClick={() => {
            appContext.setSelectedMenuItem("Simulator");
          }}
          className="cursor-pointer hover:text-amber-500 transition-all duration-500 w-fit"
        >
          Simulator
        </li>
        <li
          style={{
            marginLeft: appContext.selectedMenuItem === "" ? "0" : "-100vw",
            transitionDuration:
              appContext.selectedMenuItem === "" ? "0.3s" : "0.5s",
            transitionDelay: appContext.selectedMenuItem === "" ? "0s" : "0.3s",
          }}
          onClick={() => {
            appContext.setSelectedMenuItem("Game");
          }}
          className="cursor-pointer hover:text-amber-500 transition-all duration-500 w-fit"
        >
          Game
        </li>
        <li
          style={{
            marginLeft: appContext.selectedMenuItem === "" ? "0" : "-100vw",
            transitionDuration:
              appContext.selectedMenuItem === "" ? "0.3s" : "0.5s",
            transitionDelay: appContext.selectedMenuItem === "" ? "0s" : "0.5s",
          }}
          onClick={() => {
            appContext.setSelectedMenuItem("forInvestors");
          }}
          className="cursor-pointer hover:text-amber-500 transition-all duration-500 w-fit"
        >
          For Investors
        </li>
      </ul>

      {appContext.selectedMenuItem === "Simulator" && <SimulatorPage />}
      {appContext.selectedMenuItem === "Game" && <GamePage />}
      {appContext.selectedMenuItem === "forInvestors" && <ForInvestors />}
    </div>
  );
}
