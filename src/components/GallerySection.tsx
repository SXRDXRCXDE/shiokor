import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { trophyImages, natureImages, roomImages } from "@/data/gallery";

type GallerySectionKey = "trophies" | "nature" | "rooms";
type LightboxState = { section: GallerySectionKey; index: number } | null;

const sections: { key: GallerySectionKey; images: typeof trophyImages }[] = [
  { key: "trophies", images: trophyImages },
  { key: "nature", images: natureImages },
  { key: "rooms", images: roomImages },
];

const GallerySection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const currentSectionImages =
    lightbox === null ? [] : sections.find((s) => s.key === lightbox.section)?.images ?? [];

  return (
    <section id="gallery" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
            {t("gallery.label")}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mb-6">
            {t("gallery.title")}
          </h2>
          <div className="divider-gold" />
        </motion.div>

        {sections.map(({ key, images }, sectionIndex) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * (sectionIndex + 1) }}
            className="mb-16 last:mb-0"
          >
            <h3 className="font-serif text-xl md:text-2xl font-light text-foreground mb-6">
              {t(`gallery.${key}`)}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {images.map((img, i) => (
                <motion.div
                  key={`${key}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className={`overflow-hidden cursor-pointer group ${key === "trophies" && (i === 0 || i === 4) ? "row-span-2" : ""}`}
                  onClick={() => {
                  setLightbox({ section: key, index: i });
                  setSlideIndex(i);
                }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover min-h-[200px] hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox with Swiper slider */}
      {lightbox !== null && currentSectionImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
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
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border border-border/50 bg-background/80 hover:bg-primary/20 text-foreground transition-colors swiper-button-prev-custom z-10"
              aria-label="Previous"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft size={28} />
            </button>

            <Swiper
              key={lightbox.section}
              initialSlide={lightbox.index}
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
              {currentSectionImages.map((img, i) => (
                <SwiperSlide key={`${lightbox.section}-${i}`}>
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
            {t(`gallery.${lightbox.section}`)} — {slideIndex + 1} / {currentSectionImages.length}
          </p>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
