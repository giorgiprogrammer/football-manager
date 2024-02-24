"use client";

import Link from "next/link";
import Hamburger from "hamburger-react";
import { useState } from "react";
import clsx from "clsx";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="flex z-50 top-0 j justify-between px-4 lg:px-12 items-center fixed w-screen h-20 lg:h-24 bg-slate-100">
      {/* Logo */}
      <Link href={"/"}>
        <h1
          className="custom-font text-[#96919A] border-b-2 w-fit cursor-pointer hover:text-[black] 
        transition ease-in-out duration-[0.5s] text-2xl lg:text-5xl"
        >
          Marble Arena
        </h1>
      </Link>
      <div className="block lg:hidden ">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>

      <nav
        className={clsx(
          "gap-5 transition-all duration-500 text-[gray] fixed lg:relative top-0 bg-slate-100 lg:bg-inherit mt-20 lg:mt-0 w-screen h-screen lg:h-fit text-2xl lg:text-base  lg:w-fit flex flex-col lg:flex-row items-center lg:items-start",
          isOpen
            ? " left-0 opacity-100 "
            : " opacity-0 lg:opacity-100 left-[-100vw] lg:left-[0vw] "
        )}
      >
        {/* What is it */}
        <Link
          className="custom-font-2 cursor-help hover:outline-dotted px-3 py-1 duration-[0.3s] transition-all"
          href={"/#what-is-it"}
        >
          What is it
        </Link>
        {/* Schedule */}
        <Link
          className="custom-font-2 cursor-help hover:outline-dotted px-3 py-1 duration-[0.3s] transition-all"
          href={"/#schedule"}
        >
          Schedule
        </Link>
        {/* Simulator */}
        <Link
          className="custom-font-2 cursor-help hover:outline-dotted px-3 py-1 duration-[0.3s] transition-all"
          href={"/#simulator"}
        >
          Simulator
        </Link>
        {/* Contact Us */}
        <Link
          className="custom-font-2 cursor-help hover:outline-dotted px-3 py-1 duration-[0.3s] transition-all"
          href={"/#contact-us"}
        >
          Contact us
        </Link>
      </nav>
    </header>
  );
}
