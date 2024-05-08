"use client";

import style from "./style.module.css";

import { useContext, useEffect } from "react";
import { AppContext } from "@/app/context/appContext";
import { signIn } from "@/app/core/user";

export default function GetUserInformation({
  callBack,
}: {
  callBack: () => void;
}) {
  const appContext = useContext(AppContext);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");

    if (username && password) {
      signIn(username, password).then((response) => {
        console.log(username, password);
        console.log(response);
        if (response.status === "ok") {
          appContext.setUserData({
            isLogin: true,
            username: username,
          });
        }

        setTimeout(() => {
          callBack();
        }, 1000);
      });
    } else {
      setTimeout(() => {
        callBack();
      }, 1000);
    }
  }, []);

  return (
    <div className="w-screen fixed h-screen bg-white flex flex-col justify-center items-center z-[200] ">
      {/* <h2 className="text-black font-bold  custom-font-2 text-2xl fixed bottom-12">
        {" "}
        Login to the system...{" "}
      </h2> */}

      {/* Loading Indicator */}
      <div className={style.loading}></div>
    </div>
  );
}
