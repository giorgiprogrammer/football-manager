import PageLayout from "./components/layout";
import Header from "./components/layout/header/header";
import HomePage from "./components/pages/homePage";

import { Inter, Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={roboto.className}>
      <PageLayout>
        <HomePage />
      </PageLayout>
    </main>
  );
}
