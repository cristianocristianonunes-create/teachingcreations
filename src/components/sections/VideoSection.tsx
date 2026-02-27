import FadeIn from "@/components/FadeIn";
import VideoWithPoster from "@/components/VideoWithPoster";
import vslVideo from "@/assets/vsl-video.mp4";

const VideoSection = () => (
  <section className="py-20 bg-secondary">
    <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
      <FadeIn>
        <h2 className="text-2xl md:text-3xl font-serif mb-3">
          Watch the Introduction
        </h2>
        <p className="text-sm text-muted-foreground font-sans mb-8">
          A brief introduction to the thinking behind the framework.
        </p>
        <VideoWithPoster src={vslVideo} />
      </FadeIn>
    </div>
  </section>
);

export default VideoSection;
