"use client";

import React, { createContext, useState } from "react";

type AppContextProps = {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMenuItem: string;
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<string>>;
};
export const AppContext = createContext<AppContextProps>({
  menuIsOpen: false,
  setMenuIsOpen: () => {},
  selectedMenuItem: "",
  setSelectedMenuItem: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  return (
    <AppContext.Provider
      value={{
        menuIsOpen,
        setMenuIsOpen,
        selectedMenuItem,
        setSelectedMenuItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
