// components/Spinner.tsx
export default function Spinner({
  size = 16,
  color = "border-white",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <div
      className={`border-2 ${color} border-t-transparent rounded-full animate-spin`}
      style={{ width: size, height: size }}
    />
  );
}
