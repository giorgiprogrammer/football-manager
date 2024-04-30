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
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={() => {
        onClick();
        setPressed(true);
      }}
      className={clsx(className, style.ctaButton, pressed && style.pressed)}
    >
      {label}
    </button>
  );
}
