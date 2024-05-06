"use client";

import Image from "next/image";
import Hamburger from "hamburger-react";
import style from "./style.module.css";
import React, { useContext, useState } from "react";
import { AppContext } from "@/app/context/appContext";

export default function WebIndicators() {
  const appContext = useContext(AppContext);

  return (
    <div className=" fixed bottom-0 w-[10%] h-14 flex items-end justify-between">
      {/* Background */}
      {/* <div className=" absolute bg-slate-950 opacity-90 w-full h-full"></div> */}

      {/* Menu Button */}
      {appContext.selectedMenuItem === "" ? (
        <div>
          <Hamburger
            color={appContext.menuIsOpen ? "#ffffff" : "#000000"}
            direction="right"
            toggled={appContext.menuIsOpen}
            toggle={appContext.setMenuIsOpen}
          />
        </div>
      ) : (
        <Image
          onClick={() => {
            appContext.setSelectedMenuItem("");
          }}
          className="cursor-pointer absolute -left-1 sm:-left-2 bottom-2 sm:-bottom-1 sm:scale-[0.7]"
          src="/website/images/ui/back-button.png"
          width={60}
          height={60}
          alt="back-button"
        />
      )}
    </div>
  );
}
