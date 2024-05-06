import { useState } from "react";
import style from "./style.module.css";
import clsx from "clsx";

export default function CtaButton({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={clsx(className, style.ctaButton)}
    >
      {label}
    </button>
  );
}
