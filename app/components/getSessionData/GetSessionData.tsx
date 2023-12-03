"use client";

import useApp from "@/app/hooks/useApp";
import { getSession, getUserData } from "@/app/services/supabase/user";
import { useEffect } from "react";

export default function GetSessionData() {
  const { appContext } = useApp();

  useEffect(() => {
    getSession().then((res) => {
      if (res.data.session === null) {
        appContext.setIsLogin(false);
      } else {
        getUserData(res.data.session.user.email!).then(
          (res: any) => {
            console.log(res.data);
            appContext.setIsLogin(true);
            appContext.setUserData(res.data[0]);
          },
          (err) => console.log(err)
        );
      }
    });
  }, []);

  return <></>;
}
