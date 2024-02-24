import { Division } from "./components/Division";

export default function Fixtures() {
  return (
    <>
      <h3 className="text-xl font-semibold underline">Fixtures</h3>
      <Division id={1} />
      <Division id={2} />
      <Division id={3} />
    </>
  );
}
