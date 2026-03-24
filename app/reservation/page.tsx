// app/rsvp/page.tsx
"use client";

import { useState } from "react";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "yes",
    guests: "1",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit to backend or email
    alert("Thank you for your RSVP! We look forward to celebrating with you.");
    setFormData({
      name: "",
      email: "",
      attendance: "yes",
      guests: "1",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-green-700 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white">Join the Celebration</h1>
            <p className="text-green-100 mt-2">RSVP for FC Tou&apos;s 25th Anniversary</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Will you attend? *
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === "yes"}
                    onChange={handleChange}
                    className="form-radio text-green-600"
                  />
                  <span className="ml-2">Yes, I&apos;ll be there</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === "no"}
                    onChange={handleChange}
                    className="form-radio text-green-600"
                  />
                  <span className="ml-2">No, can&apos;t make it</span>
                </label>
              </div>
            </div>
            {formData.attendance === "yes" && (
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                  Number of guests (including you)
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            )}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Any special requests or message?
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-md transition"
            >
              Submit RSVP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}