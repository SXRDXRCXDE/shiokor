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
import { speciesKeys, speciesImages } from "@/data/gallery";

const HuntingSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="hunting" className="section-padding bg-forest-light" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
            {t("hunting.label")}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mb-6">
            {t("hunting.title")}
          </h2>
          <div className="divider-gold" />
        </motion.div>

        <div className="space-y-16">
          {speciesKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * i }}
              className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
            >
              <div
                className={`overflow-hidden cursor-pointer ${i % 2 === 1 ? "md:order-2" : ""}`}
                onClick={() => {
                  setLightboxIndex(i);
                  setSlideIndex(i);
                }}
              >
                <img
                  src={speciesImages[key]}
                  alt={`${t(`hunting.species.${key}.name`)} ${t("hunting.species.altTrophy")}`}
                  className="w-full h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-1">
                  {t(`hunting.species.${key}.name`)}
                </h3>
                <p className="font-sans text-xs tracking-widest text-primary italic mb-4">
                  {t(`hunting.species.${key}.latin`)}
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                  {t(`hunting.species.${key}.description`)}
                </p>
                <div className="space-y-2 text-sm font-sans">
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-muted-foreground">{t("hunting.season")}</span>
                    <span className="text-foreground">{t(`hunting.species.${key}.season`)}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-muted-foreground">{t("hunting.trophy")}</span>
                    <span className="text-foreground">{t(`hunting.species.${key}.trophy`)}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-muted-foreground">{t("hunting.difficulty")}</span>
                    <span className="text-foreground">{t(`hunting.species.${key}.difficulty`)}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">{t("hunting.price")}</span>
                    <span className="text-primary font-semibold">
                      {t(`hunting.species.${key}.price`)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen lightbox — Swiper как в галерее */}
      {lightboxIndex !== null && speciesKeys.length > 0 && (
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
              key="hunting-species"
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
              {speciesKeys.map((key) => (
                <SwiperSlide key={key}>
                  <div className="flex items-center justify-center min-h-[50vh] md:min-h-[70vh]">
                    <img
                      src={speciesImages[key]}
                      alt={`${t(`hunting.species.${key}.name`)} ${t("hunting.species.altTrophy")}`}
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
            {t("hunting.label")} — {t(`hunting.species.${speciesKeys[slideIndex]}.name`)} ({slideIndex + 1} / {speciesKeys.length})
          </p>
        </div>
      )}
    </section>
  );
};

export default HuntingSection;
