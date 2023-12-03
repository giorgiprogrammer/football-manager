"use client";

import React, { createContext, useState } from "react";

type UserData = {
  email: string;
  username: string;
};

type AppContextProps = {
  gameMode: string;
  setGameMode: React.Dispatch<React.SetStateAction<string>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData | undefined;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
};
export const AppContext = createContext<AppContextProps>({
  gameMode: "",
  setGameMode: () => {},
  isLogin: false,
  setIsLogin: () => {},
  userData: undefined,
  setUserData: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameMode, setGameMode] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(undefined);

  return (
    <AppContext.Provider
      value={{
        gameMode,
        setGameMode,
        isLogin,
        setIsLogin,
        userData,
        setUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
