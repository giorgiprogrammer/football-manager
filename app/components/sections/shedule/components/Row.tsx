import clsx from "clsx";
import Image from "next/image";

export type RowProps = {
  teamName: string;
  played: number | string;
  won: number | string;
  drawn: number | string;
  lost: number | string;
  points: number | string;
  strength: number | string;
  isIndicator?: boolean;
  numerator?: number;
};

const teamLogos = {
  "Real Madrid": "/game/assets/image/teamLogos/laLiga/Real-Madrid.png",
  Liverpool: "/game/assets/image/teamLogos/premierLeague/Liverpool.png",
  Milan: "/game/assets/image/teamLogos/seriaA/Milan.png",
  "Manchester City":
    "/game/assets/image/teamLogos/premierLeague/Manchester-City.png",
  "Inter Milan": "/game/assets/image/teamLogos/seriaA/Inter.png",
  Barselona: "/game/assets/image/teamLogos/laLiga/Barcelona.png",
  Juventus: "/game/assets/image/teamLogos/seriaA/Juventus.png",
  "Manchester United":
    "/game/assets/image/teamLogos/premierLeague/Manchester-United.png",
  PSG: "/game/assets/image/teamLogos/otherEuropeans/PSG.png",
  "Bayern Munich":
    "/game/assets/image/teamLogos/otherEuropeans/Bayern-Munich.png",
};

export default function Row(rowProps: RowProps) {
  return (
    <ul className="h-10 w-fit lg:w-full flex justify-center font-semibold text-slate-500 ">
      <li
        className={clsx(
          "border-[1px] w-[300px] lg:w-[20%] h-full flex items-center border-gray-300)",
          rowProps.isIndicator ? "justify-center" : "justify-start",
          rowProps.numerator === 1 && "bg-[#489f48] text-white",
          rowProps.numerator === 9 && "bg-[#f1511b] text-white",
          rowProps.numerator === 10 && "bg-[#f1511b] text-white"
        )}
      >
        {!rowProps.isIndicator && (
          <span className="text-right w-8">{rowProps.numerator}</span>
        )}
        {!rowProps.isIndicator && (
          <Image
            className=" w-6 h-6  ml-2 "
            src={teamLogos[rowProps.teamName as keyof typeof teamLogos]}
            alt=""
            width={40}
            height={40}
          />
        )}
        &nbsp; {rowProps.teamName}
      </li>
      <li
        className={clsx(
          "border-[1px] border-x-0 w-[60px] lg:w-[5%] justify-center h-full flex items-center border-gray-300",
          rowProps.numerator === 1 && "bg-[#489f48] text-white",
          rowProps.numerator === 9 && "bg-[#f1511b] text-white",
          rowProps.numerator === 10 && "bg-[#f1511b] text-white"
        )}
      >
        {rowProps.played}
      </li>
      <li
        className={clsx(
          "border-[1px] w-[60px] lg:w-[5%] justify-center h-full flex items-center border-gray-300",
          rowProps.numerator === 1 && "bg-[#489f48] text-white",
          rowProps.numerator === 9 && "bg-[#f1511b] text-white",
          rowProps.numerator === 10 && "bg-[#f1511b] text-white"
        )}
      >
        {rowProps.won}
      </li>
      <li
        className={clsx(
          "border-[1px] border-x-0 w-[60px] lg:w-[5%] justify-center h-full flex items-center border-gray-300",
          rowProps.numerator === 1 && "bg-[#489f48] text-white",
          rowProps.numerator === 9 && "bg-[#f1511b] text-white",
          rowProps.numerator === 10 && "bg-[#f1511b] text-white"
        )}
      >
        {rowProps.drawn}
      </li>
      <li
        className={clsx(
          "border-[1px] w-[60px] lg:w-[5%] justify-center h-full flex items-center border-gray-300",
          rowProps.numerator === 1 && "bg-[#489f48] text-white",
          rowProps.numerator === 9 && "bg-[#f1511b] text-white",
          rowProps.numerator === 10 && "bg-[#f1511b] text-white"
        )}
      >
        {rowProps.lost}
      </li>
      <li
        className={clsx(
          "border-[1px]  border-l-0 w-[120px] lg:w-[7%] justify-center h-full flex items-center border-gray-300",
          rowProps.numerator && " bg-[#fabc09] text-white"
          // rowProps.numerator === 9 && "bg-[#f1511b] text-white",
          // rowProps.numerator === 10 && "bg-[#f1511b] text-white"
        )}
      >
        {rowProps.points}
      </li>
      <li className="border-[1px] border-l-0  w-[200px] lg:w-[9%] justify-center h-full flex items-center border-gray-300">
        {rowProps.strength}
      </li>
    </ul>
  );
}
