import triangleImg from "@/assets/triangle-diagram.png";

const TriangleDiagram = ({ className = "", size = "lg" }: { className?: string; size?: "sm" | "lg" }) => {
  const dim = size === "lg" ? 380 : 220;
  return (
    <div className={`relative ${className}`}>
      <img
        src={triangleImg}
        alt="The Cycle of Thinking™ — Strategic Access, Structured Expression, Intellectual Autonomy"
        width={dim}
        height={dim}
        className="relative z-10 object-contain"
      />
    </div>
  );
};

export default TriangleDiagram;
