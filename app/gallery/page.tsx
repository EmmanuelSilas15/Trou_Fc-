"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Gallery() {
  const { t } = useLanguage();

  // ============================================================
  // 📸 PUT YOUR OWN PICTURES PER YEAR HERE
  // ============================================================
  const yearlyImages: Record<number, { src: string; altKey?: string; alt?: string }[]> = {
    2016: [
      { src: "/Trou_image/troufc1.jpeg", alt: "Souvenir 2016" },
      { src: "/Trou_image/troufc7.jpeg", alt: "Souvenir 2016" },
      { src: "/Trou_image/troufc8.jpeg", alt: "Souvenir 2016" },
      { src: "/Trou_image/troufc9.jpeg", alt: "Souvenir 2016" },
      { src: "/Trou_image/troufc11.jpeg", alt: "Souvenir 2016" },
      { src: "/Trou_image/troufc12.jpeg", alt: "Souvenir 2016" },
      { src: "/Trou_image/troufc13.jpeg", alt: "Souvenir 2016" },
    ],
    2017: [
      { src: "/Trou_image/troufc14.jpeg", alt: "Souvenir 2017" },
      { src: "/Trou_image/troufc15.jpeg", alt: "Souvenir 2017" },
    ],
    2018: [
      { src: "/Trou_image/troufc2.jpeg", alt: "Souvenir 2018" },
      { src: "/Trou_image/troufc3.jpeg", alt: "Souvenir 2018" },
      { src: "/Trou_image/troufc4.jpeg", alt: "Souvenir 2018" },
      { src: "/Trou_image/troufc5.jpeg", alt: "Souvenir 2018" },
      { src: "/Trou_image/troufc16.jpeg", alt: "Souvenir 2018" },
    ],
    2019: [
      { src: "/Trou_image/troufc17.jpeg", alt: "Souvenir 2025" },
      { src: "/Trou_image/troufc18.jpeg", alt: "Souvenir 2026" },
    ],
    2020: [],
    2021: [], // Add your 2021 images here
    2022: [],
    2023: [],
    2024: [],
    2025: [],
    2026: [],
  };

  // ============================================================
  // MIX ALL IMAGES TOGETHER (no year grouping)
  // ============================================================
  // Flatten all images into a single array, preserving year info
  const allImages = Object.entries(yearlyImages).flatMap(([year, images]) =>
    images.map((img) => ({ ...img, year: parseInt(year) }))
  );

  // Optional: sort by year (newest first) – remove if you want original order
  allImages.sort((a, b) => b.year - a.year);

  // Optional: shuffle randomly – uncomment the next line to randomize order
  // allImages.sort(() => Math.random() - 0.5);

  // ============================================================
  // ALTERNATIVE: If you want to keep year sections, use the commented code below
  // instead of the 'allImages' logic and the single grid loop.
  // ============================================================
  // const years = Object.keys(yearlyImages)
  //   .map(Number)
  //   .filter(year => yearlyImages[year].length > 0)
  //   .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-yellow-500 text-white">
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-300 mb-4">
            {t("galleryTitle")}
          </h1>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            {t("gallerySubtitle")}
          </p>

          {/* MIXED GALLERY: one grid with all images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {allImages.map((img, idx) => {
              const altText = img.alt
                ? img.alt
                : img.altKey
                ? t(img.altKey)
                : `Souvenir from ${img.year}`;

              return (
                <div
                  key={`mixed-${idx}`}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="relative w-full aspect-square bg-black/30">
                    <Image
                      src={img.src}
                      alt={altText}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  {/* Optional caption – remove if not wanted */}
                  <div className="p-3 text-center">
                    <p className="text-white/70 text-sm">{altText}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================================================== */}
          {/* ALTERNATIVE YEAR‑GROUPED VERSION (commented out)   */}
          {/* ================================================== */}
          {/* {years.map((year) => {
            const images = yearlyImages[year];
            return (
              <section key={year} className="mb-20 last:mb-0">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
                  <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 px-4">
                    {year}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {images.map((img, idx) => {
                    const altText = img.alt ? img.alt : img.altKey ? t(img.altKey) : `Souvenir from ${year}`;
                    return (
                      <div key={`${year}-${idx}`} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
                        <div className="relative w-full aspect-square bg-black/30">
                          <Image src={img.src} alt={altText} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        </div>
                        <div className="p-3 text-center">
                          <p className="text-white/70 text-sm">{altText}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}