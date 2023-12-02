"use client";

import { useContext } from "react";
import { AppContext } from "../context/appContext";

const useApp = () => {
  const appContext = useContext(AppContext);

  return { appContext };
};

export default useApp;
