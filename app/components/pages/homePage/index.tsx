import Schedule from "../../sections/shedule/Schedule";
import Header from "../../layout/header/header";
import Hero from "../../sections/hero";

export default async function HomePage() {
  return (
    <div className="w-screen min-h-screen">
      {/* Hero */}
      <Hero />
      {/* Schedules */}
      <h1
        id="schedule"
        className=" font-bold text-center text-slate-600 text-4xl underline mt-16 "
      >
        Schedules
      </h1>
      <div className="px-12 flex justify-center mt-4 flex-col items-center gap-10">
        <Schedule division_id={1} />
        <Schedule division_id={2} />
        <Schedule division_id={3} />
      </div>
    </div>
  );
}
