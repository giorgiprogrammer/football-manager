import clsx from "clsx";

export default function Bound({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("p-2", className)}>{children}</div>;
}
