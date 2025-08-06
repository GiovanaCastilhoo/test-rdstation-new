interface CardProps {
  title: string;
  children: React.ReactNode;
  size?: "small" | "large";
  color?: string; 
  headerTextColor?: string;
  className?: string; 
}

export default function Card({ title, children, size = "large", color, headerTextColor,  className = ""  }: CardProps) {
  const width = size === "small" ? "w-64" : "w-80";

  return (
    <div className={`bg-white rounded-lg shadow-md ${width} ${className}`}>
      <div className={`${color} px-4 py-2 rounded-t-lg`}>
        <h3 className={`${headerTextColor} text-lg font-semibold`}>{title}</h3>
      </div>

      <div className="p-4">
        {children}
      </div>
    </div>
  );
}