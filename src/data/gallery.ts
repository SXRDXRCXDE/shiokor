/**
 * Gallery images from src/assets/gallery (nature, rooms, trophies).
 * Import from here so components don't use long paths.
 */

import room1 from "@/assets/gallery/rooms/accommodation-1.jpg";
import room2 from "@/assets/gallery/rooms/accommodation-2.jpg";
import room3 from "@/assets/gallery/rooms/accommodation-3.jpg";
import room4 from "@/assets/gallery/rooms/accommodation-4.jpg";
import room5 from "@/assets/gallery/rooms/porf-accommodation5.jpg";
import room6 from "@/assets/gallery/rooms/porf-accommodation6.jpg";
import room7 from "@/assets/gallery/rooms/porf-accommodation7.jpg";
import room8 from "@/assets/gallery/rooms/porf-accommodation8.jpg";

import trophy1 from "@/assets/gallery/trophies/trophy-1.jpg";
import trophy2 from "@/assets/gallery/trophies/trophy-2.jpg";
import trophy3 from "@/assets/gallery/trophies/trophy-3.jpg";
import trophy4 from "@/assets/gallery/trophies/trophy-4.jpg";
import ibex1 from "@/assets/gallery/trophies/ibex-1.jpg";
import ibex2 from "@/assets/gallery/trophies/ibex-2.jpg";
import boar1 from "@/assets/gallery/trophies/boar-1.jpg";
import photo1 from "@/assets/gallery/trophies/photo_2026-02-08_13-32-21.jpg";
import photo2 from "@/assets/gallery/trophies/photo_2026-02-08_13-41-30.jpg";
import photo3 from "@/assets/gallery/trophies/photo_2026-02-08_13-41-32.jpg";
import porf2 from "@/assets/gallery/trophies/porf-2.jpg";
import porf3 from "@/assets/gallery/trophies/porf-3.jpg";
import porf4 from "@/assets/gallery/trophies/porf-4.jpg";
import porf5 from "@/assets/gallery/trophies/porf-5.jpg";
import porf6 from "@/assets/gallery/trophies/porf-6.jpg";
import porf7 from "@/assets/gallery/trophies/porf-7.jpg";
import porf8 from "@/assets/gallery/trophies/porf-8.jpg";
import porf10 from "@/assets/gallery/trophies/porf-10.jpg";
import porf111 from "@/assets/gallery/trophies/porf-111.jpg";
import porfKaban from "@/assets/gallery/trophies/porf-kaban.jpg";
import porfKaban5 from "@/assets/gallery/trophies/porf-kaban5.jpg";
import porfKozerog5 from "@/assets/gallery/trophies/porf-kozerog5.jpg";

import territory1 from "@/assets/gallery/nature/territory-1.jpg";
import territory2 from "@/assets/gallery/nature/territory-2.jpg";
import hunt1 from "@/assets/gallery/nature/hunt-1.jpg";
import hunt2 from "@/assets/gallery/nature/hunt-2.jpg";

export const trophyImages = [
  { src: trophy1, alt: "Trophy ibex hunting result" },
  { src: trophy2, alt: "Successful ibex hunt" },
  { src: trophy3, alt: "Hunter with trophy" },
  { src: trophy4, alt: "Trophy display" },
  { src: ibex1, alt: "Ibex in the wild" },
  { src: ibex2, alt: "Ibex trophy hunt" },
  { src: boar1, alt: "Wild boar hunting" },
  { src: photo1, alt: "Trophy hunt" },
  { src: photo2, alt: "Trophy hunt" },
  { src: photo3, alt: "Trophy hunt" },
  { src: porf2, alt: "Trophy" },
  { src: porf3, alt: "Trophy" },
  { src: porf4, alt: "Trophy" },
  { src: porf5, alt: "Trophy" },
  { src: porf6, alt: "Trophy" },
  { src: porf7, alt: "Trophy" },
  { src: porf8, alt: "Trophy" },
  { src: porf10, alt: "Trophy" },
  { src: porf111, alt: "Trophy" },
  { src: porfKaban, alt: "Wild boar trophy" },
  { src: porfKaban5, alt: "Wild boar trophy" },
  { src: porfKozerog5, alt: "Ibex trophy" },
];

export const natureImages = [
  { src: territory1, alt: "Mountain hunting territory" },
  { src: territory2, alt: "Steppe landscape near hunting camp" },
  { src: hunt1, alt: "Hunting expedition" },
  { src: hunt2, alt: "Hunting expedition in the mountains" },
];

export const roomImages = [
  { src: room1, alt: "Hunting lodge accommodation" },
  { src: room2, alt: "Camp interior" },
  { src: room3, alt: "Comfortable camp quarters" },
  { src: room4, alt: "Camp dining area" },
  { src: room5, alt: "Hunting lodge accommodation" },
  { src: room6, alt: "Camp interior" },
  { src: room7, alt: "Comfortable camp quarters" },
  { src: room8, alt: "Camp dining area" },
];

export const speciesKeys = ["ibex", "markhor", "boar", "roe"] as const;
export type SpeciesKey = (typeof speciesKeys)[number];

export const speciesImages: Record<SpeciesKey, string> = {
  ibex: ibex1,
  markhor: ibex2,
  boar: boar1,
  roe: hunt1,
};

export const aboutTerritoryImages = [
  { src: territory1, alt: "Mountain hunting territory in Uzbekistan" },
  { src: territory2, alt: "Steppe landscape near hunting camp" },
];
