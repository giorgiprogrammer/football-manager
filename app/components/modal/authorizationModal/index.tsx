"use client";

import { useContext, useState } from "react";
import style from "./style.module.css";
import { AppContext } from "@/app/context/appContext";
import CtaButton from "../../buttons/ctaButton";
import { signIn, signUp } from "@/app/core/user";
import GetUserInformation from "../../global/getUserInformation";

export default function AuthorizationModal() {
  const appContext = useContext(AppContext);

  const [userData, setUserData] = useState({
    regUsername: "",
    regPassword: "",
    logUsername: "",
    logPassword: "",
  });

  const [isWait, setIsWait] = useState(false);
  const [response, setResponse] = useState("");
  const [showSystemLogin, setShowSystemLogin] = useState(false);

  return (
    <div className={style.authorizationModal}>
      <div
        onClick={() => {
          !isWait && appContext.setOpenAutorizationModal(false);
        }}
        className="fixed left-0 top-0 w-full h-full bg-black opacity-70 "
      ></div>
      {/* loading shadow*/}
      {isWait && (
        <div className="left-0 top-0 fixed z-40 w-screen h-screen bg-black opacity-70 "></div>
      )}

      <div className="flex flex-col lg:flex-row gap-3">
        {/* For Sign Up */}
        <div className=" rounded-lg  p-3 flex flex-col justify-center items-center z-20 bg-white ">
          <h2 className=" custom-font-2 text-4xl lg:text-3xl font-bold">
            Sign Up
          </h2>
          {/* Username */}
          <input
            onChange={(event) => {
              setResponse("");
              setUserData({ ...userData, regUsername: event.target.value });
            }}
            className="border text-xl lg:text-lg px-2 py-1 mt-4 custom-font-2"
            placeholder="Username: "
            maxLength={20}
          ></input>
          {/* Password */}
          <input
            onChange={(event) => {
              setResponse("");
              setUserData({ ...userData, regPassword: event.target.value });
            }}
            type="password"
            className=" border text-xl lg:text-lg px-2 py-1 mt-4 custom-font-2"
            placeholder="Password: "
            maxLength={20}
          ></input>
          {/* Submit */}
          <div className="w-full mt-5">
            <CtaButton
              className=" ml-1 font-bold "
              onClick={() => {
                setIsWait(true);
                signUp(userData.regUsername, userData.regPassword).then(
                  (response) => {
                    setIsWait(false);
                    setResponse(response.message);

                    if (response.status === "ok") {
                      setShowSystemLogin(true);
                    }
                  }
                );
              }}
              label="Sign Up"
            ></CtaButton>
          </div>
        </div>

        {/* For Sign In */}
        <div className=" rounded-lg  p-3 flex flex-col justify-center items-center z-20 bg-white ">
          <h2 className=" custom-font-2 text-4xl lg:text-3xl font-bold">
            Sign In
          </h2>
          {/* Username */}
          <input
            onChange={(event) => {
              setResponse("");
              setUserData({ ...userData, logUsername: event.target.value });
            }}
            className=" border text-xl lg:text-lg px-2 py-1 mt-4 custom-font-2"
            placeholder="Username: "
            maxLength={20}
          ></input>
          {/* Password */}
          <input
            onChange={(event) => {
              setResponse("");
              setUserData({ ...userData, logPassword: event.target.value });
            }}
            type="password"
            className="border text-xl lg:text-lg px-2 py-1 mt-4 custom-font-2"
            placeholder="Password: "
            maxLength={20}
          ></input>
          {/* Submit */}
          <div className="w-full mt-5">
            <CtaButton
              className="ml-1 font-bold "
              onClick={() => {
                setIsWait(true);
                signIn(userData.logUsername, userData.logPassword).then(
                  (response) => {
                    setIsWait(false);
                    setResponse(response.message);

                    if (response.status === "ok") {
                      setShowSystemLogin(true);
                    }
                  }
                );
              }}
              label="Sing In"
            ></CtaButton>
          </div>
        </div>
      </div>
      <h2 className="text-center font-semibold custom-font-2 fixed bottom-12 z-50 text-rose-600 bg-black ">
        {response}
      </h2>
      {showSystemLogin && (
        <GetUserInformation
          callBack={() => {
            setShowSystemLogin(false);
            appContext.setOpenAutorizationModal(false);
          }}
        />
      )}
    </div>
  );
}
