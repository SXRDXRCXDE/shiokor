import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState } from "react";
import heroVideo from "@/assets/videos/video_2026-02-13_15-54-38.mp4?url";

const HeroSection = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.error("Ошибка воспроизведения видео:", error);
      });
    }
  }, []);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <motion.video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleVideoLoaded}
          onError={(e) => {
            console.error("Ошибка загрузки видео:", e);
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="divider-gold mb-8 w-24 h-px mx-auto" />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light tracking-wide text-foreground leading-tight mb-6">
            {t("hero.subtitle")}
          </h1>
          <p className="font-sans text-base md:text-lg text-muted-foreground tracking-wide max-w-2xl mx-auto mb-10">
            {t("hero.description")}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 border border-primary text-primary font-sans text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-500"
          >
            {t("hero.cta")}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="text-primary/50" size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
