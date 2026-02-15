import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import type { Locale } from "date-fns";
import { Mail, Phone, Send, MessageCircle, CalendarIcon } from "lucide-react";
import { speciesImages } from "@/data/gallery";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const animalIds = ["ibex", "markhor", "boar", "roe"] as const;

const localeMap: Record<string, Locale> = { en: enUS, ru, uz: enUS };

const ContactSection = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const calendarLocale = localeMap[i18n.language] ?? enUS;

  const toggleAnimal = (id: string) => {
    setSelectedAnimals((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") ?? "",
      country: formData.get("country") ?? "",
      email: formData.get("email") ?? "",
      phone: formData.get("phone") ?? "",
      huntingInterest: selectedAnimals,
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : null,
      endDate: endDate ? format(endDate, "yyyy-MM-dd") : null,
      message: formData.get("message") ?? "",
      language: i18n.language,
    };
    console.log("Contact form submitted:", data);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-forest-light" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">{t("contact.label")}</p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground mb-6">
            {t("contact.title")}
          </h2>
          <div className="divider-gold" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <p className="font-serif text-xl text-foreground mb-4">{t("contact.directContact")}</p>
              <div className="space-y-4">
                <a
                  href="mailto:hunt@shikor.uz"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail size={18} className="text-primary/60 group-hover:text-primary" />
                  <span className="font-sans text-sm">hunt@shikor.uz</span>
                </a>
                <a
                  href="https://wa.me/998901234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Phone size={18} className="text-primary/60 group-hover:text-primary" />
                  <span className="font-sans text-sm">+998 90 123 45 67 ({t("contact.whatsapp")})</span>
                </a>
                <a
                  href="https://t.me/shikor_uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Send size={18} className="text-primary/60 group-hover:text-primary" />
                  <span className="font-sans text-sm">{t("contact.telegram")}: @shikor_uz</span>
                </a>
                <a
                  href="https://instagram.com/shikor_uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <MessageCircle size={18} className="text-primary/60 group-hover:text-primary" />
                  <span className="font-sans text-sm">{t("contact.instagram")}: @shikor_uz</span>
                </a>
              </div>
            </div>

            <div className="border-t border-border/30 pt-6">
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-2">
                {t("contact.responseTime")}
              </p>
              <p className="font-sans text-sm text-foreground">
                {t("contact.responseTimeDesc")}
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-3"
          >
            {submitted ? (
             <div className="text-center py-16 border border-primary/20 bg-background/50">
                <p className="font-serif text-2xl text-foreground mb-3">{t("contact.thankYou")}</p>
                <p className="font-sans text-sm text-muted-foreground">
                  {t("contact.thankYouMsg")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                   <input
                     name="name"
                     type="text"
                     placeholder={t("contact.name")}
                     required
                     className="w-full px-4 py-3 bg-background/50 border border-border/50 text-foreground font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                   />
                   <input
                     name="country"
                     type="text"
                     placeholder={t("contact.country")}
                     required
                     className="w-full px-4 py-3 bg-background/50 border border-border/50 text-foreground font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                   />
                 </div>
                 <div className="grid sm:grid-cols-2 gap-4">
                   <input
                     name="email"
                     type="email"
                     placeholder={t("contact.email")}
                     required
                     className="w-full px-4 py-3 bg-background/50 border border-border/50 text-foreground font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                   />
                   <input
                     name="phone"
                     type="tel"
                     placeholder={t("contact.phone")}
                     className="w-full px-4 py-3 bg-background/50 border border-border/50 text-foreground font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                   />
                 </div>

                {/* Animal selection */}
                 <div>
                   <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">
                     {t("contact.huntingInterest")}
                   </p>
                  <div className="flex flex-wrap gap-4">
                    {animalIds.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleAnimal(id)}
                        className={`flex flex-col items-center p-0 rounded-lg border-2 overflow-hidden transition-all duration-300 hover:border-primary/50 ${
                          selectedAnimals.includes(id)
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                            : "border-border/40 bg-background/30 hover:bg-background/50"
                        }`}
                      >
                        <span className="w-20 h-20 sm:w-24 sm:h-24 block overflow-hidden bg-muted">
                          <img
                            src={speciesImages[id]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </span>
                        <span
                          className={`w-full py-2.5 px-3 text-center font-sans text-sm font-medium ${
                            selectedAnimals.includes(id) ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {t(`contact.animals.${id}`)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-sans font-normal h-12 px-4 py-3 bg-background/50 border border-border/50 text-foreground hover:bg-background/70",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: calendarLocale }) : t("contact.startDate")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        locale={calendarLocale}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-sans font-normal h-12 px-4 py-3 bg-background/50 border border-border/50 text-foreground hover:bg-background/70",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: calendarLocale }) : t("contact.endDate")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        locale={calendarLocale}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                 <textarea
                   name="message"
                   placeholder={t("contact.message")}
                   rows={4}
                   className="w-full px-4 py-3 bg-background/50 border border-border/50 text-foreground font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                 />

                 <button
                   type="submit"
                   className="w-full py-3 border border-primary text-primary font-sans text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-500"
                 >
                   {t("contact.submit")}
                 </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
