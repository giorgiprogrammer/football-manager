"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";

const Authentication = () => {
  const formData = useRef({
    email: " ",
    password: "",
  });

  //   const { authentication } = useAuth();
  //   const { warningIsOpen, warninProps } = useWarning();

  const handleSubmit = () => {
    // authentication(formData.current.email, formData.current.password);
  };

  return (
    <form className={style.form}>
      <div className={style.leftCorner}>
        <div></div>
        <div></div>
      </div>
      <h2 className="text-xl font-bold mb-2 text-gray-300">
        Sign up or sign in to play
      </h2>
      <div className="mb-4">
        <label
          className="block text-gray-500 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          readOnly
          onFocus={(e) => (e.currentTarget.readOnly = false)}
          maxLength={20}
          onChange={(e) => (formData.current.email = e.target.value)}
          placeholder="Enter your Username"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-500 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          maxLength={20}
          onChange={(e) => (formData.current.password = e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className=" bg-gray-900 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className={style.rightCorner}>
        <div></div>
        <div></div>
      </div>
    </form>
  );
};

export default Authentication;
