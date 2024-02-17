"use client";

import React, { createContext, useState } from "react";

type AppContextProps = {};
export const AppContext = createContext<AppContextProps>({});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}
