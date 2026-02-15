import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const stepKeys = [
  "inquiry",
  "confirmation",
  "contract",
  "deposit",
  "documentation",
  "arrival",
] as const;

const BookingProcess = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding bg-forest-light" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
            {t("process.label")}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mb-6">
            {t("process.title")}
          </h2>
          <div className="divider-gold" />
        </motion.div>

        <div className="space-y-0">
          {stepKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="flex gap-6 md:gap-10 items-start pb-10 relative"
            >
              {i < stepKeys.length - 1 && (
                <div className="absolute left-5 md:left-6 top-12 w-px h-full bg-border/40" />
              )}
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 border border-primary/40 flex items-center justify-center relative z-10 bg-background">
                <span className="font-sans text-xs text-primary tracking-wider">
                  {t(`process.steps.${key}.num`)}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">
                  {t(`process.steps.${key}.title`)}
                </h3>
                <p className="font-sans text-sm text-muted-foreground">
                  {t(`process.steps.${key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;
