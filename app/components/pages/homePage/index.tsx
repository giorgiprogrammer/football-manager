"use client";

import Bound from "../../global/bound";
import WebIndicators from "../../global/webIndicators";
import { Modal } from "../../modal";

export default function HomePage() {
  return (
    <div className="w-screen h-screen">
      <Bound>
        <h1 className="text-[#4e4e4e] custom-font-2 font-bold text-3xl">
          Football Manager
        </h1>
        <h2 className="custom-font-2 text-sm leading-5 mt-2">
          This platform caters to both game enthusiasts and football fans. Soon,
          you'll be able to enjoy not just private football manager games
          against the computer, but also engage in online multiplayer matches.{" "}
          <br></br> <br></br> Currently, we offer a simulator where you can
          select teams, adjust parameters, and watch the games unfold, seeing
          the results in real-time. Our project is open to contributors.{" "}
          <br></br> <br></br>
          <span className=" text-[#323438] font-bold text-xl cursor-pointer">
            Here
          </span>
          , you can explore the complete concept and documentation.
        </h2>
      </Bound>
      <Modal backgroundColor="#050505" />
      <WebIndicators />
    </div>
  );
}
