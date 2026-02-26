const TriangleDiagram = ({ className = "", size = "lg" }: { className?: string; size?: "sm" | "lg" }) => {
  const dim = size === "lg" ? 320 : 200;
  return (
    <svg
      viewBox="0 0 320 300"
      width={dim}
      height={(dim * 300) / 320}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer gold triangle */}
      <polygon
        points="160,20 300,270 20,270"
        stroke="hsl(43, 45%, 55%)"
        strokeWidth="2"
        fill="none"
      />
      {/* Middle teal triangle */}
      <polygon
        points="160,50 275,255 45,255"
        stroke="hsl(175, 35%, 30%)"
        strokeWidth="2.5"
        fill="hsl(175, 35%, 30%)"
        fillOpacity="0.06"
      />
      {/* Inner white triangle */}
      <polygon
        points="160,80 250,240 70,240"
        stroke="hsl(175, 35%, 30%)"
        strokeWidth="1"
        fill="hsl(40, 20%, 97%)"
        fillOpacity="0.5"
      />

      {/* Labels */}
      <text x="160" y="295" textAnchor="middle" fill="hsl(43, 45%, 55%)" fontSize="10" fontFamily="Inter" fontWeight="500" letterSpacing="2">
        THE CYCLE OF THINKING™
      </text>
      
      {/* Vertex labels */}
      <text x="160" y="14" textAnchor="middle" fill="hsl(175, 35%, 30%)" fontSize="9" fontFamily="Inter" fontWeight="600" letterSpacing="1.5">
        INTELLECTUAL AUTONOMY
      </text>
      <text x="8" y="285" textAnchor="start" fill="hsl(175, 35%, 30%)" fontSize="9" fontFamily="Inter" fontWeight="600" letterSpacing="1.5">
        STRATEGIC ACCESS™
      </text>
      <text x="312" y="285" textAnchor="end" fill="hsl(175, 35%, 30%)" fontSize="9" fontFamily="Inter" fontWeight="600" letterSpacing="1.5">
        STRUCTURED EXPRESSION™
      </text>
    </svg>
  );
};

export default TriangleDiagram;
