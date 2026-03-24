// app/reservation-schedule/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function ReservationSchedule() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
    guests: "1",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Reservation submitted! We'll contact you soon.");
    setFormData({ name: "", email: "", event: "", guests: "1" });
  };

  // Event data used in the reservation form dropdown
  const schedule = [
    {
      date: "April 4, 2026",
      event: "Gala Dinner & Opening Ceremony",
      time: "6:00 PM",
      location: "City Convention Hall",
    },
    {
      date: "April 5, 2026",
      event: "Legends Match",
      time: "2:00 PM",
      location: "Trou Fc Stadium",
    },
    {
      date: "April 6, 2026",
      event: "Community Festival & Youth Clinic",
      time: "10:00 AM",
      location: "Central Park",
    },
  ];

  // Function to generate and download an ICS file
  const addToCalendar = () => {
    // Event details
    const eventTitle = "Trou Fc 10th Anniversary Celebration";
    const eventDate = "20260404"; // YYYYMMDD
    const eventTimeStart = "100000"; // 10:00 AM (24h format)
    const eventTimeEnd = "180000";   // 6:00 PM
    const eventLocation = "Party Cabin, 31 Angus Road, Bedfordview, Germiston 2008";
    const eventDescription = "Join us for the 10th anniversary of Trou Fc!";

    // Build ICS string
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TrouFc//Anniversary//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${eventTitle}`,
      `DTSTART:${eventDate}T${eventTimeStart}`,
      `DTEND:${eventDate}T${eventTimeEnd}`,
      `LOCATION:${eventLocation}`,
      `DESCRIPTION:${eventDescription}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    // Create blob and trigger download
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "trou_fc_anniversary.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black-600 to-yellow-400 text-white">
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
              <p>31 Angus Road, Bedfordview, Germiston 2008</p>
            </div>
            <button
              onClick={addToCalendar}
              className="mt-6 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-md transition shadow-lg"
            >
              📅 Add to Calendar
            </button>
          </div>

          {/* Dress Code Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 mb-12 text-center">
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

          {/* Reservation Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl font-semibold mb-6 text-yellow-200">
              Make a Reservation
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-yellow-100">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-black/40 border border-white/30 rounded-md shadow-sm p-2 text-white placeholder-white/50 focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-yellow-100">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-black/40 border border-white/30 rounded-md shadow-sm p-2 text-white placeholder-white/50 focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="event" className="block text-sm font-medium text-yellow-100">
                  Select Event *
                </label>
                <select
                  id="event"
                  name="event"
                  required
                  value={formData.event}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-black/40 border border-white/30 rounded-md shadow-sm p-2 text-white focus:ring-yellow-400 focus:border-yellow-400"
                >
                  <option value="" className="bg-black text-white">
                    -- Choose an event --
                  </option>
                  {schedule.map((item, idx) => (
                    <option key={idx} value={item.event} className="bg-black text-white">
                      {item.event} - {item.date}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-yellow-100">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  max="10"
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-black/40 border border-white/30 rounded-md shadow-sm p-2 text-white focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md transition shadow-lg"
              >
                Submit Reservation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}