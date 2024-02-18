import Link from "next/link";

export default function Header() {
  return (
    <header className="flex z-50 top-0 justify-between px-12 items-center fixed w-screen h-24 bg-slate-100">
      {/* Logo */}
      <Link href={"/"}>
        <h1 className="custom-font text-[#96919A] border-b-2 w-fit cursor-pointer hover:text-[black] transition  ease-in-out duration-[0.5s] text-5xl ">
          Marble Arena
        </h1>
      </Link>
      <nav className="flex gap-5 text-[gray]">
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
