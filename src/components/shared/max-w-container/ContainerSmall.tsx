interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  weight?: number;
}
export default function ContainerSmall({
  className = "",
  children,
  weight = 1380,
}: ContainerProps) {
  return (
    <div style={{ maxWidth: `${weight}px` }} className={`${className} mx-auto`}>
      {children}
    </div>
  );
}
