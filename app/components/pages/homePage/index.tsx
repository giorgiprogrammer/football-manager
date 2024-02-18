import Schedule from "../../sections/shedule/Schedule";
import Header from "../../layout/header/header";

export default async function HomePage() {
  return (
    <div className="w-screen min-h-screen">
      <Header />
      <div className="px-12 flex justify-center mt-28 flex-col items-center gap-10">
        <Schedule division_id={1} />
        <Schedule division_id={2} />
        <Schedule division_id={3} />
      </div>
    </div>
  );
}
