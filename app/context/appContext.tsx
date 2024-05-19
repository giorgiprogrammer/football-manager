"use client";

import React, { createContext, useState } from "react";
import { initialTeamsData } from "../config/initialTeamsData";

type AppContextProps = {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMenuItem: string;
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<string>>;
  openAutorizationModal: boolean;
  setOpenAutorizationModal: React.Dispatch<React.SetStateAction<boolean>>;
  userData: {
    isLogin: boolean;
    username: string;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{
      isLogin: boolean;
      username: string;
    }>
  >;
  userTeams: typeof initialTeamsData;
  setUserTeams: React.Dispatch<React.SetStateAction<typeof initialTeamsData>>;
};

export const AppContext = createContext<AppContextProps>({
  menuIsOpen: false,
  setMenuIsOpen: () => {},
  selectedMenuItem: "",
  setSelectedMenuItem: () => {},
  openAutorizationModal: false,
  setOpenAutorizationModal: () => {},
  userData: {
    isLogin: false,
    username: "",
  },
  setUserData: () => {},
  userTeams: initialTeamsData,
  setUserTeams: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [openAutorizationModal, setOpenAutorizationModal] = useState(false);
  const [userData, setUserData] = useState({
    isLogin: false,
    username: "",
  });
  const [userTeams, setUserTeams] = useState(initialTeamsData);

  return (
    <AppContext.Provider
      value={{
        menuIsOpen,
        setMenuIsOpen,
        selectedMenuItem,
        setSelectedMenuItem,
        openAutorizationModal,
        setOpenAutorizationModal,
        userData,
        setUserData,
        userTeams,
        setUserTeams,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
