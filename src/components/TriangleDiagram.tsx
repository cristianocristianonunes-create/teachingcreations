const TriangleDiagram = ({ className = "", size = "lg" }: { className?: string; size?: "sm" | "lg" }) => {
  const dim = size === "lg" ? 380 : 220;
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 -m-4 rounded-sm bg-secondary/50" />
      <svg
        viewBox="0 0 320 300"
        width={dim}
        height={(dim * 300) / 320}
        className="relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer gold triangle */}
        <polygon
          points="160,20 300,270 20,270"
          stroke="hsl(43, 45%, 55%)"
          strokeWidth="3.5"
          fill="none"
        />
        {/* Middle teal triangle */}
        <polygon
          points="160,50 275,255 45,255"
          stroke="hsl(175, 35%, 25%)"
          strokeWidth="4"
          fill="hsl(175, 35%, 25%)"
          fillOpacity="0.12"
        />
        {/* Inner triangle */}
        <polygon
          points="160,80 250,240 70,240"
          stroke="hsl(175, 35%, 25%)"
          strokeWidth="2"
          fill="hsl(40, 20%, 97%)"
          fillOpacity="0.6"
        />

        {/* Labels */}
        <text x="160" y="295" textAnchor="middle" fill="hsl(43, 45%, 50%)" fontSize="10" fontFamily="Inter" fontWeight="600" letterSpacing="2">
          THE CYCLE OF THINKING™
        </text>
        
        {/* Vertex labels */}
        <text x="160" y="14" textAnchor="middle" fill="hsl(175, 35%, 22%)" fontSize="10" fontFamily="Inter" fontWeight="700" letterSpacing="1.5">
          INTELLECTUAL AUTONOMY
        </text>
        <text x="8" y="285" textAnchor="start" fill="hsl(175, 35%, 22%)" fontSize="10" fontFamily="Inter" fontWeight="700" letterSpacing="1.5">
          STRATEGIC ACCESS™
        </text>
        <text x="312" y="285" textAnchor="end" fill="hsl(175, 35%, 22%)" fontSize="10" fontFamily="Inter" fontWeight="700" letterSpacing="1.5">
          STRUCTURED EXPRESSION™
        </text>
      </svg>
    </div>
  );
};

export default TriangleDiagram;
