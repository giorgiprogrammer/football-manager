"use client";

import { useContext, useState } from "react";
import Bound from "../../global/bound";
import WebIndicators from "../../global/webIndicators";
import { PageModal } from "../../modal/pageModal";
import { AppContext } from "@/app/context/appContext";
import AuthorizationModal from "../../modal/authorizationModal";
import GetUserInformation from "../../global/getUserInformation";

export default function HomePage() {
  const appContext = useContext(AppContext);

  const [showGetUserInformation, setShowGetUserInformation] = useState(true);

  return (
    <div className="w-screen h-screen">
      {showGetUserInformation && (
        <GetUserInformation
          callBack={() => {
            setShowGetUserInformation(false);
          }}
        />
      )}

      <Bound>
        <h1 className="text-[#4e4e4e] custom-font-2 font-bold text-3xl">
          Football Manager
        </h1>
        <h2 className="custom-font-2 text-lg sm:text-sm sm:leading-5 mt-2">
          This platform caters to both game enthusiasts and football fans. Soon,
          you will be able to enjoy not just private football manager games
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

      {appContext.openAutorizationModal && <AuthorizationModal />}
      <PageModal backgroundColor="#050505" />
      <WebIndicators />
    </div>
  );
}
