import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Mountain, Thermometer, Calendar, Ruler, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { aboutTerritoryImages } from "@/data/gallery";

const AboutSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
    };
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [lightboxIndex]);

  const stats = [
    { icon: Ruler, label: t("about.area"), value: "35,000+ ha" },
    { icon: Mountain, label: t("about.elevation"), value: "1,500–3,000 m" },
    { icon: Thermometer, label: t("about.climate"), value: "Continental" },
    { icon: Calendar, label: t("about.season"), value: "Oct — Mar" },
  ];

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">{t("about.label")}</p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mb-6">
            {t("about.title")}
          </h2>
          <div className="divider-gold mb-8" />
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("about.description")}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 border border-border/50 bg-card/50">
              <stat.icon className="mx-auto mb-3 text-primary" size={24} strokeWidth={1.5} />
              <p className="font-serif text-2xl text-foreground mb-1">{stat.value}</p>
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Images */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="overflow-hidden cursor-pointer"
            onClick={() => setLightboxIndex(0)}
          >
            <img
              src={aboutTerritoryImages[0].src}
              alt={aboutTerritoryImages[0].alt}
              className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="overflow-hidden cursor-pointer"
            onClick={() => setLightboxIndex(1)}
          >
            <img
              src={aboutTerritoryImages[1].src}
              alt={aboutTerritoryImages[1].alt}
              className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Fullscreen lightbox — Swiper как в галерее */}
        {lightboxIndex !== null && aboutTerritoryImages.length > 0 && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              className="absolute top-6 right-6 z-20 text-foreground/70 hover:text-foreground"
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>

            <div
              className="relative w-full max-w-5xl flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border border-border/50 bg-background/80 hover:bg-primary/20 text-foreground transition-colors z-10"
                aria-label="Previous"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ChevronLeft size={28} />
              </button>

              <Swiper
                key="about-territory"
                initialSlide={lightboxIndex}
                modules={[Navigation, Pagination, Keyboard]}
                spaceBetween={0}
                slidesPerView={1}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setSlideIndex(swiper.activeIndex);
                }}
                onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
                onBeforeDestroy={() => {
                  swiperRef.current = null;
                }}
                keyboard={{ enabled: true }}
                className="w-full max-h-[85vh] flex-1"
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
              >
                {aboutTerritoryImages.map((img, i) => (
                  <SwiperSlide key={`about-${i}`}>
                    <div className="flex items-center justify-center min-h-[50vh] md:min-h-[70vh]">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                        draggable={false}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                type="button"
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border border-border/50 bg-background/80 hover:bg-primary/20 text-foreground transition-colors z-10"
                aria-label="Next"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {t("about.label")} — {slideIndex + 1} / {aboutTerritoryImages.length}
            </p>
          </div>
        )}

        {/* Map embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384000!2d70.0!3d41.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000"
            className="w-full h-64 md:h-80 border border-border/30 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            allowFullScreen
            loading="lazy"
            title="Hunting grounds location"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
