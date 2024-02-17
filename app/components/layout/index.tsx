import Header from "./header/header";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen ">
      <Header />
      {children}
    </div>
  );
}
