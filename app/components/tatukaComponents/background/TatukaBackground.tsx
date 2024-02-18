"use client";

import { useState } from "react";
import "./style.css";
import clsx from "clsx";

export default function TatukaBackground({
  particleColor,
  particleSize,
  backgroundColor,
  animationType,
}: {
  backgroundColor?: string;
  particleColor?: string;
  particleSize?: number;
  animationType?: "rain" | "chaos";
}) {
  const mouseEffects = [];

  // Create 80 objects with random positions
  for (let i = 0; i < 120; i++) {
    // if (typeof window === "undefined") return;
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    mouseEffects.push({
      x: randomX,
      y: randomY,
    });
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor || "black",
      }}
      className="tatuka-background"
    >
      {mouseEffects.map((mouseEffect, index) => (
        <div
          key={index}
          style={{
            boxShadow: `0 0  ${particleSize || "3"}px ${particleSize || 1}px ${
              particleColor || "white"
            }`,
            backgroundColor: particleColor || "red",
            animationDelay: `${index * 0.05}s`,
            transform: `translate(${mouseEffect.x}px, ${mouseEffect.y}px)`,
          }}
          className={clsx("particle", animationType || "rain")}
        ></div>
      ))}
    </div>
  );
}
