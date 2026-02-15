import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FileCheck,
  Shield,
  Users,
  Truck,
  Home,
  UtensilsCrossed,
  Trophy,
  ScrollText,
} from "lucide-react";
import helicopterImage from "@/assets/gallery/vert.jpg";

const serviceKeys = [
  "licenses",
  "authorization",
  "guides",
  "transport",
  "accommodation",
  "board",
  "trophy",
  "cites",
] as const;

const serviceIcons: Record<(typeof serviceKeys)[number], typeof FileCheck> = {
  licenses: FileCheck,
  authorization: Shield,
  guides: Users,
  transport: Truck,
  accommodation: Home,
  board: UtensilsCrossed,
  trophy: Trophy,
  cites: ScrollText,
};

const IncludedSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="included" className="section-padding bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
            {t("included.label")}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mb-6">
            {t("included.title")}
          </h2>
          <div className="divider-gold" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.05 * i }}
                className="text-center p-6 border border-border/30 hover:border-primary/30 transition-colors duration-500 group"
              >
                <Icon
                  className="mx-auto mb-4 text-primary/70 group-hover:text-primary transition-colors duration-500"
                  size={28}
                  strokeWidth={1.2}
                />
                <p className="font-serif text-lg text-foreground mb-1">
                  {t(`included.services.${key}.label`)}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {t(`included.services.${key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Заброска вертолётом */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-12 border-t border-border/30"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:max-w-md overflow-hidden rounded-lg border border-border/30">
              <img
                src={helicopterImage}
                alt={t("included.helicopter.alt")}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="font-sans text-foreground leading-relaxed mb-2">
                {t("included.helicopter.text")}
              </p>
              <p className="font-sans text-primary font-semibold">
                {t("included.helicopter.price")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IncludedSection;
