"use client";

import React, { createContext, useState } from "react";

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
