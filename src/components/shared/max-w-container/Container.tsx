interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  weight?: number;
}

export default function Container({
  className = "",
  children,
  weight = 1920,
}: ContainerProps) {
  return (
    <div className={`mx-auto ${className}`} style={{ maxWidth: `${weight}px` }}>
      {children}
    </div>
  );
}
