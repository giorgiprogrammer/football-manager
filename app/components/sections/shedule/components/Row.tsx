export type RowProps = {
  teamName: string;
  played: number | string;
  won: number | string;
  drawn: number | string;
  lost: number | string;
  points: number | string;
  strength: number | string;
};

export default function Row(rowProps: RowProps) {
  return (
    <ul className="h-12 w-full flex justify-center font-semibold text-slate-500 ">
      <li className="border-[2px] w-[20%] h-full flex justify-center items-center border-gray-300">
        {rowProps.teamName}
      </li>
      <li className="border-[2px] border-x-0 w-[5%] justify-center h-full flex items-center border-gray-300">
        {rowProps.played}
      </li>
      <li className="border-[2px] w-[5%] justify-center h-full flex items-center border-gray-300">
        {rowProps.won}
      </li>
      <li className="border-[2px] border-x-0 w-[5%] justify-center h-full flex items-center border-gray-300">
        {rowProps.drawn}
      </li>
      <li className="border-[2px]  w-[5%] justify-center h-full flex items-center border-gray-300">
        {rowProps.lost}
      </li>
      <li className="border-[2px] border-l-0 w-[7%] justify-center h-full flex items-center border-gray-300">
        {rowProps.points}
      </li>
      <li className="border-[2px] border-l-0 w-[9%] justify-center h-full flex items-center border-gray-300">
        {rowProps.strength}
      </li>
    </ul>
  );
}
