"use client";

import React, { createContext, useState } from "react";

type AppContextProps = {
  gameMode: string;
  setGameMode: React.Dispatch<React.SetStateAction<string>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AppContext = createContext<AppContextProps>({
  gameMode: "",
  setGameMode: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameMode, setGameMode] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AppContext.Provider
      value={{
        gameMode,
        setGameMode,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
