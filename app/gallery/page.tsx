"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Gallery() {
  const { t } = useLanguage();

  const images = [
    { id: 1, src: "/gallery/img1.jpg", altKey: "galleryAltCelebration" },
    { id: 2, src: "/gallery/img2.jpg", altKey: "galleryAltFans" },
    { id: 3, src: "/gallery/img3.jpg", altKey: "galleryAltMatch" },
    { id: 4, src: "/gallery/img4.jpg", altKey: "galleryAltAward" },
    { id: 5, src: "/gallery/img5.jpg", altKey: "galleryAltYouth" },
    { id: 6, src: "/gallery/img6.jpg", altKey: "galleryAltCommunity" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-yellow-500 text-white">
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-300 mb-4">
            {t('galleryTitle')}
          </h1>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            {t('gallerySubtitle')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={img.src}
                    alt={t(img.altKey)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-white/80">{t(img.altKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}