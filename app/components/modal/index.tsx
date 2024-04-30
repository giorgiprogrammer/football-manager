import React, { useContext } from "react";
import style from "./style.module.css";
import { AppContext } from "@/app/context/appContext";
import SimulatorPage from "../pages/simulator";

export function Modal({ backgroundColor }: { backgroundColor: string }) {
  const appContext = useContext(AppContext);

  return (
    <div
      style={{
        backgroundColor,
        width: appContext.menuIsOpen ? "100%" : "0%",
        height: appContext.menuIsOpen ? "100%" : "0%",
        opacity: appContext.menuIsOpen ? 1 : 0,
      }}
      className={style.modal}
    >
      <ul
        style={{ display: appContext.menuIsOpen ? "block" : "none" }}
        className=" text-white custom-font-1 w-full p-5 text-4xl"
      >
        <li
          style={{
            marginLeft: appContext.selectedMenuItem === "" ? "0" : "-30vw",
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
            marginLeft: appContext.selectedMenuItem === "" ? "0" : "-30vw",
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
            marginLeft: appContext.selectedMenuItem === "" ? "0" : "-30vw",
            transitionDuration:
              appContext.selectedMenuItem === "" ? "0.3s" : "0.5s",
            transitionDelay: appContext.selectedMenuItem === "" ? "0s" : "0.5s",
          }}
          onClick={() => {
            appContext.setSelectedMenuItem("Investors");
          }}
          className="cursor-pointer hover:text-amber-500 transition-all duration-500 w-fit"
        >
          For Investors
        </li>
        <li
          style={{
            marginLeft: appContext.selectedMenuItem === "" ? "0" : "-30vw",
            transitionDuration:
              appContext.selectedMenuItem === "" ? "0.3s" : "0.5s",
            transitionDelay: appContext.selectedMenuItem === "" ? "0s" : "0.7s",
          }}
          onClick={() => {
            appContext.setSelectedMenuItem("Gambling");
          }}
          className="cursor-pointer hover:text-amber-500 transition-all duration-500 w-fit"
        >
          For online casinos
        </li>
      </ul>

      {appContext.selectedMenuItem === "Simulator" && <SimulatorPage />}
    </div>
  );
}
