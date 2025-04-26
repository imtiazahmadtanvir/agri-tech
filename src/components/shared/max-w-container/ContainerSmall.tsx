interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  weight?: number;
}
export default function ContainerSmall({
  className = "",
  children,
  weight = 1280,
}: ContainerProps) {
  return (
    <div
      style={{ maxWidth: `${weight}px` }}
      className={`${className} lg:mx-auto md:mx-6`}
    >
      {children}
    </div>
  );
}
