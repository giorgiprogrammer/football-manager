"use client";

import clsx from "clsx";
import style from "./style.module.css";
import { AnimationEventHandler } from "react";

export default function Symbol({
  symbol,
  fontSize,
  animationDelay,
  animationDuration,
  color,
  onAnimationEnd,
}: {
  symbol: string;
  animationDelay: number;
  animationDuration: number;
  fontSize: number;
  color: string;
  onAnimationEnd?: AnimationEventHandler<HTMLLIElement> | undefined;
}) {
  const className = clsx(`${style.symbol} `);

  return (
    <li
      onAnimationEnd={onAnimationEnd}
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
