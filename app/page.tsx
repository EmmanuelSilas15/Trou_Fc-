"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  } | null>(null);
  const [eventDateStr, setEventDateStr] = useState<string>("");

  useEffect(() => {
    const getNextAprilFourth = (): Date => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let target = new Date(currentYear, 3, 4);
      if (target < now) {
        target = new Date(currentYear + 1, 3, 4);
      }
      return target;
    };

    const targetDate = getNextAprilFourth();
    setEventDateStr(
      targetDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
      });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-yellow-300 text-white">
      <div className="flex flex-col items-center justify-center text-center px-4 py-32 md:py-48">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          {t('anniversaryTitle')} <span className="text-yellow-300">{t('anniversarySpan')}</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl">
          {t('heroDescription')}
        </p>

        {/* Event Date & Countdown Section */}
        <div className="mt-16 w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-wider text-yellow-200 mb-1">
              {t('markCalendars')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
              📅 {eventDateStr || "April 4th"}
            </h2>
            <p className="text-yellow-100/80 mt-1">{t('eventDateLabel')}</p>
          </div>

          {/* Countdown Timer */}
          <div>
            <p className="text-sm uppercase tracking-wider text-yellow-200 mb-4">
              {t('countdown')}
            </p>
            {timeLeft === null ? (
              <div className="text-xl">Loading countdown...</div>
            ) : timeLeft.isPast ? (
              <div className="text-2xl md:text-3xl font-bold bg-yellow-500/20 inline-block px-6 py-3 rounded-full">
                {t('celebrationNow')}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/30 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-yellow-200">
                    {t('days')}
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-yellow-200">
                    {t('hours')}
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-yellow-200">
                    {t('minutes')}
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-yellow-200">
                    {t('seconds')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Our Story Section - Two Columns */}
        <div className="mt-20 w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-yellow-300">
            {t('ourStory')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Column 1: The Beginning */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-200 flex items-center gap-2">
                <span className="text-2xl">⚽</span> {t('theBeginning')}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {t('storyBeginning')}
              </p>
              <p className="text-white/90 leading-relaxed">
                {t('storyEarlySeasons')}
              </p>
            </div>

            {/* Column 2: Growth & Community */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-200 flex items-center gap-2">
                <span className="text-2xl">🏆</span> {t('growthCommunity')}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {t('philosophy')}
              </p>
              <p className="text-white/90 leading-relaxed">
                {t('conclusion')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}