import "./style.css";

export default function TatukaButton({
  text,
  paddingX,
  paddingY,
  width,
  height,
  fontSize,
  backgroundColor,
  onclick,
}: {
  text: string;
  fontSize?: number;
  paddingX?: number;
  paddingY?: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  onclick: () => void;
}) {
  return (
    <button
      style={{
        padding: `${paddingY || 20}px ${paddingX || 20}px`,
        width: `${width && width}px`,
        height: `${height && height}px`,
        fontSize: `${fontSize && fontSize}px`,
      }}
      className="tatuka-button"
      onClick={onclick}
    >
      <span>{text}</span>
      <svg
        viewBox="-5 -5 110 110"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill={backgroundColor || "black"}
          d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0"
        />
      </svg>
    </button>
  );
}
