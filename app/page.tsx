import HomePage from "./homePage/HomePage";

import { Inter, Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={roboto.className}>
      <HomePage />
    </main>
  );
}
