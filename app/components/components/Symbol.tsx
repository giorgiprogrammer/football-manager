"use client";

import clsx from "clsx";
import "./style.css";
import { AnimationEventHandler } from "react";

export default function Symbol({
  symbol,
  fontSize,
  animationDelay,
  animationDuration,
  color,
  animationName,
  onAnimationEnd,
}: {
  symbol: string;
  animationDelay: number;
  animationDuration: number;
  fontSize: number;
  color: string;
  animationName?: string;
  onAnimationEnd?: AnimationEventHandler<HTMLLIElement> | undefined;
}) {
  const className = clsx(`symbol`, animationName);

  return (
    <li
      onAnimationIteration={onAnimationEnd}
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
