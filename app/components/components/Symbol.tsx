import clsx from "clsx";
import style from "./style.module.css";

export default function Symbol({
  symbol,
  fontSize,
  animationDelay,
  animationDuration,
  color,
}: {
  symbol: string;
  animationDelay: number;
  animationDuration: number;
  fontSize: number;
  color: string;
}) {
  const className = clsx(`${style.symbol} `);

  return (
    <li
      key={symbol}
      style={{
        color: color,
        fontSize: fontSize,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`,
      }}
      className={className}
    >
      {symbol}
    </li>
  );
}
