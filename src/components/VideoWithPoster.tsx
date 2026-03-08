import { useState, useRef } from "react";
import { Play } from "lucide-react";
import logo from "@/assets/logo-full-transparent.png";

interface VideoWithPosterProps {
  src: string;
  className?: string;
}

const VideoWithPoster = ({ src, className }: VideoWithPosterProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      <video
        ref={videoRef}
        src={src}
        controls
        className="aspect-video w-full rounded-sm relative z-10"
      />

      {/* Custom poster overlay */}
      <div
        onClick={handlePlay}
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 cursor-pointer rounded-sm bg-foreground transition-opacity duration-500 ${
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <img src={logo} alt="Teaching Creations" className="w-64 md:w-80 opacity-90" />

        <h3 className="text-2xl md:text-3xl font-serif text-background tracking-tight">
          Making Thinking <span className="italic text-primary">Visible.</span>
        </h3>

        <div className="mt-2 w-16 h-16 rounded-full border-2 border-primary/60 flex items-center justify-center animate-pulse">
          <Play className="w-7 h-7 text-primary ml-1" />
        </div>

        <p className="text-xs tracking-widest uppercase text-muted-foreground font-sans">
          Watch the Introduction
        </p>
      </div>
    </div>
  );
};

export default VideoWithPoster;
