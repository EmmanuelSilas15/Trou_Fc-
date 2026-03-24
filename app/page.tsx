"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  } | null>(null);
  const [eventDateStr, setEventDateStr] = useState<string>("");

  useEffect(() => {
    // Function to get the next April 4th (if today is after April 4, use next year)
    const getNextAprilFourth = (): Date => {
      const now = new Date();
      const currentYear = now.getFullYear();
      // Month is 0-indexed: April = 3
      let target = new Date(currentYear, 3, 4);
      if (target < now) {
        target = new Date(currentYear + 1, 3, 4);
      }
      return target;
    };

    const targetDate = getNextAprilFourth();
    // Format event date string (e.g., "April 4, 2026")
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

    // Initial update
    updateCountdown();

    // Set up interval
    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-yellow-300 text-white">
      <div className="flex flex-col items-center justify-center text-center px-4 py-32 md:py-48">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Trou Fc <span className="text-yellow-300">Anniversary</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl">
          Celebrating 10 years of passion, pride, and community.
        </p>

        {/* Event Date & Countdown Section */}
        <div className="mt-16 w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-wider text-yellow-200 mb-1">
              Mark your calendars
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
              📅 {eventDateStr || "April 4th"}
            </h2>
            <p className="text-yellow-100/80 mt-1">10th Anniversary Celebration</p>
          </div>

          {/* Countdown Timer */}
          <div>
            <p className="text-sm uppercase tracking-wider text-yellow-200 mb-4">
              Countdown to the event
            </p>
            {timeLeft === null ? (
              <div className="text-xl">Loading countdown...</div>
            ) : timeLeft.isPast ? (
              <div className="text-2xl md:text-3xl font-bold bg-yellow-500/20 inline-block px-6 py-3 rounded-full">
                🎉 The celebration is happening now! 🎉
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/30 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-yellow-200">
                    Days
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-yellow-200">
                    Hours
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-yellow-200">
                    Minutes
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-yellow-200">
                    Seconds
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Our Story Section - Two Columns */}
        <div className="mt-20 w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-yellow-300">
            Our Story
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Column 1: The Beginning */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-200 flex items-center gap-2">
                <span className="text-2xl">⚽</span> The Beginning
              </h3>
              <p className="text-white/90 leading-relaxed">
                In the spring of 2016, a group of varsity friends wanted to bring their friendship onto a soccer pitch.
                What started as a casual kickabout quickly turned into a shared dream.
                Frustrated by the lack of local competitive football, they decided to form their own club.
                With nothing more than a second‑hand ball and unwavering passion, Trou Fc was born.
              </p>
              <p className="text-white/90 leading-relaxed">
                The first few seasons were humble: unmatched kits, small fields, and no competitive games.
                But the spirit never wavered. Word spread, and soon amazing talents joined the cause,
                drawn by the infectious energy and the promise of a team that played for love of the game.
                By 2018, Trou Fc managed to participate in its first ever competitive league,
                the University of Johannesburg internal league.
              </p>
            </div>

            {/* Column 2: Growth & Community */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-200 flex items-center gap-2">
                <span className="text-2xl">🏆</span> Growth & Community
              </h3>
              <p className="text-white/90 leading-relaxed">
                The club’s philosophy – “Not only enjoying the game, but winning at all cost
                and creating unbreakable bonds” – resonated beyond the pitch.
                Families, friends, and admirers rallied behind the team, turning matches into
                vibrant community celebrations.
              </p>
              <p className="text-white/90 leading-relaxed">
                Today, as we celebrate a decade of existence, Trou Fc stands as a symbol
                of unity and resilience. From three amazing games to countless friendships forged,
                the journey has been nothing short of extraordinary.
                This anniversary is not just ours – it belongs to every supporter, volunteer,
                and dreamer who believed that a simple game could change a community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}