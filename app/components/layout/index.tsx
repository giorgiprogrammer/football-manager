import Footer from "./footer";
import Header from "./header/header";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative mt-24 min-h-screen mt ">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
