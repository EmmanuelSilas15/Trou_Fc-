"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function RSVP() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "yes",
    guests: "1",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSubmitStatus({ type: 'success', message: t('successMessage') });
      setFormData({
        name: "",
        email: "",
        attendance: "yes",
        guests: "1",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: t('errorMessage') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-yellow-500 text-white">
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-yellow-500/20 px-6 py-8 text-center border-b border-white/20">
              <h1 className="text-3xl font-bold text-yellow-300">{t('rsvpTitle')}</h1>
              <p className="text-white/80 mt-2">{t('rsvpSubtitle')}</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-yellow-100">
                  {t('fullName')}
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
                  {t('emailAddress')}
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
                <label className="block text-sm font-medium text-yellow-100 mb-2">
                  {t('attendQuestion')}
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={formData.attendance === "yes"}
                      onChange={handleChange}
                      className="form-radio text-yellow-400 bg-black/40 border-white/30 focus:ring-yellow-400"
                    />
                    <span className="ml-2 text-white/90">{t('yesAttend')}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={formData.attendance === "no"}
                      onChange={handleChange}
                      className="form-radio text-yellow-400 bg-black/40 border-white/30 focus:ring-yellow-400"
                    />
                    <span className="ml-2 text-white/90">{t('noAttend')}</span>
                  </label>
                </div>
              </div>
              {formData.attendance === "yes" && (
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-yellow-100">
                    {t('guestsLabel')}
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    min="1"
                    max="10"
                    value={formData.guests}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-black/40 border border-white/30 rounded-md shadow-sm p-2 text-white focus:ring-yellow-400 focus:border-yellow-400"
                  />
                </div>
              )}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-yellow-100">
                  {t('messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-black/40 border border-white/30 rounded-md shadow-sm p-2 text-white placeholder-white/50 focus:ring-yellow-400 focus:border-yellow-400"
                ></textarea>
              </div>

              {submitStatus && (
                <div className={`p-3 rounded-md text-center ${
                  submitStatus.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-black font-bold py-3 px-4 rounded-md transition shadow-lg"
              >
                {isSubmitting ? t('submittingButton') : t('submitButton')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}