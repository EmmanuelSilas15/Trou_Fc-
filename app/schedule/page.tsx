// app/reservation-schedule/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function ReservationSchedule() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const venueAddress = "31 Angus Rd, Bedfordview, Germiston, 2008";
  const venueLat = -26.179;   // exact coordinates for 31 Angus Rd
  const venueLng = 28.146;

  // Google Maps shortlink for the exact location
  const exactMapUrl = "https://maps.app.goo.gl/fxcmNj91mncjLX1W8?g_st=aw";

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
      },
      (error) => {
        setLocationError("Unable to get your location. You can still search for directions manually.");
      }
    );
  };

  const getDirectionsUrl = () => {
    const destination = `${venueLat},${venueLng}`;
    if (userLocation) {
      const origin = `${userLocation.lat},${userLocation.lng}`;
      return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    } else {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-yellow-500 text-white">
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-300 mb-8">
            Schedule & Reservations
          </h1>

          {/* Event Details Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 mb-12 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-200">
              Main Event
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-yellow-100 mb-2">
              Saturday, 4th April 2026
            </p>
            <div className="mt-4 space-y-2 text-white/90">
              <p className="text-xl">📍 Venue: Party Cabin</p>
              <p>{venueAddress}</p>
            </div>

            {/* Calendar Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Trou%20Fc%2010th%20Anniversary%20Celebration&dates=20260404T100000/20260404T180000&details=Join%20us%20for%20the%2010th%20anniversary%20of%20Trou%20Fc%21&location=Party%20Cabin%2C%2031%20Angus%20Road%2C%20Bedfordview%2C%20Germiston%202008"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition shadow-lg"
              >
                📅 Google Calendar
              </a>
              <a
                href="https://icalendar.com/?title=Trou%20Fc%2010th%20Anniversary%20Celebration&dates=20260404/20260404&start=100000&end=180000&location=Party%20Cabin%2C%2031%20Angus%20Road%2C%20Bedfordview%2C%20Germiston%202008&description=Join%20us%20for%20the%2010th%20anniversary%20of%20Trou%20Fc%21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition shadow-lg"
              >
                📅 Apple Calendar
              </a>
              <a
                href="https://outlook.live.com/calendar/0/deeplink/compose?subject=Trou%20Fc%2010th%20Anniversary%20Celebration&startdt=20260404T100000&enddt=20260404T180000&location=Party%20Cabin%2C%2031%20Angus%20Road%2C%20Bedfordview%2C%20Germiston%202008&body=Join%20us%20for%20the%2010th%20anniversary%20of%20Trou%20Fc%21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition shadow-lg"
              >
                📅 Outlook
              </a>
            </div>
            <p className="text-xs text-white/60 mt-3">
              Click to open your calendar and save the event.
            </p>
          </div>

          {/* Directions & Map Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 mb-12 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-200">
              How to Get There
            </h2>
            <p className="text-white/90 mb-4">
              <span className="font-semibold">📍 Party Cabin</span><br />
              {venueAddress}
            </p>

            {/* Embedded Google Map (centered on exact coordinates) */}
            <div className="relative w-full max-w-3xl mx-auto h-64 md:h-80 mb-4 overflow-hidden rounded-xl shadow-lg">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.google.com/maps?q=${venueLat},${venueLng}&z=16&output=embed`}
                title="Map showing Party Cabin location"
              />
            </div>
            <div className="flex flex-col items-center gap-2 mb-6">
              <a
                href={exactMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-yellow-300 hover:text-yellow-200 underline"
              >
                📍 Open exact location in Google Maps
              </a>
            </div>

            {/* Directions Button */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => {
                  getUserLocation();
                  window.open(getDirectionsUrl(), "_blank");
                }}
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-md transition shadow-lg"
              >
                🧭 Get Directions from Your Location
              </button>
              {locationError && (
                <p className="text-sm text-yellow-200 mt-2">{locationError}</p>
              )}
              <p className="text-xs text-white/60">
                We&apos;ll use your current location to plan the route. You can also just click the button to open Google Maps.
              </p>
            </div>
          </div>

          {/* Dress Code Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-200">
              Dress Code
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              To honour the elegance of our 10th anniversary, we invite all guests to dress in formal attire.
              Black tie optional – we look forward to celebrating in style.
            </p>
            <div className="relative w-full max-w-2xl mx-auto max-h-96 overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/formal-dress.png"
                alt="Formal dress code example"
                width={800}
                height={600}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}