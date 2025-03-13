interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
export default function Container({
  className = "",
  children,
}: ContainerProps) {
  return (
    <div className={`max-w-[1920px] mx-auto ${className}`}>{children}</div>
  );
}
