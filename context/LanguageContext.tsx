"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    home: "Home",
    schedule: "Schedule and Reservation",
    gallery: "Gallery",
    rsvp: "RSVP",

    // Home page
    anniversaryTitle: "Trou Fc",
    anniversarySpan: "Anniversary",
    heroDescription: "Celebrating 10 years of passion, pride, and community.",
    markCalendars: "Mark your calendars",
    eventDateLabel: "10th Anniversary Celebration",
    countdown: "Countdown to the event",
    celebrationNow: "🎉 The celebration is happening now! 🎉",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    ourStory: "Our Story",
    theBeginning: "The Beginning",
    storyBeginning: "In the spring of 2016, a group of varsity friends wanted to bring their friendship onto a soccer pitch. What started as a casual kickabout quickly turned into a shared dream. Frustrated by the lack of local competitive football, they decided to form their own club. With nothing more than a second‑hand ball and unwavering passion, Trou Fc was born.",
    storyEarlySeasons: "The first few seasons were humble: unmatched kits, small fields, and no competitive games. But the spirit never wavered. Word spread, and soon amazing talents joined the cause, drawn by the infectious energy and the promise of a team that played for love of the game. By 2018, Trou Fc managed to participate in its first ever competitive league, the University of Johannesburg internal league.",
    growthCommunity: "Growth & Community",
    philosophy: "The club’s philosophy – “Not only enjoying the game, but winning at all cost and creating unbreakable bonds” – resonated beyond the pitch. Families, friends, and admirers rallied behind the team, turning matches into vibrant community celebrations.",
    conclusion: "Today, as we celebrate a decade of existence, Trou Fc stands as a symbol of unity and resilience. From three amazing games to countless friendships forged, the journey has been nothing short of extraordinary. This anniversary is not just ours – it belongs to every supporter, volunteer, and dreamer who believed that a simple game could change a community.",

    // Schedule page
    scheduleTitle: "Schedule & Reservations",
    mainEvent: "Main Event",
    venue: "Venue: Party Cabin",
    calendarButtons: "Click to open your calendar and save the event.",
    howToGetThere: "How to Get There",
    openExactLocation: "Open exact location in Google Maps",
    getDirections: "Get Directions from Your Location",
    directionsNote: "We'll use your current location to plan the route. You can also just click the button to open Google Maps.",
    dressCode: "Dress Code",
    dressCodeDesc: "To honour the elegance of our 10th anniversary, we invite all guests to dress in formal attire. Black tie optional – we look forward to celebrating in style.",
    googleCalendar: "Google Calendar",
    appleCalendar: "Apple Calendar",
    outlook: "Outlook",
    saturdayApril: "Saturday, 4th April 2026",
    interactiveMap: "(Interactive map – drag to explore, click to open in Google Maps)",
    locationError: "Unable to get your location. You can still search for directions manually.",
    geolocationUnsupported: "Geolocation is not supported by your browser.",

    // Gallery page
    galleryTitle: "Photo Gallery",
    gallerySubtitle: "Relive the best moments of Trou Fc's 10‑year journey.",
    galleryAltCelebration: "Team celebration",
    galleryAltFans: "Fans cheering",
    galleryAltMatch: "Match action",
    galleryAltAward: "Award ceremony",
    galleryAltYouth: "Youth academy",
    galleryAltCommunity: "Community event",

    // RSVP page
    rsvpTitle: "Join the Celebration",
    rsvpSubtitle: "RSVP for Trou Fc's 10th Anniversary",
    fullName: "Full Name *",
    emailAddress: "Email Address *",
    attendQuestion: "Will you attend? *",
    yesAttend: "Yes, I'll be there",
    noAttend: "No, can't make it",
    guestsLabel: "Number of guests (including you)",
    messageLabel: "Any special requests or message?",
    submitButton: "Submit RSVP",
    submittingButton: "Sending...",
    successMessage: "Thank you for your RSVP! We look forward to celebrating with you.",
    errorMessage: "Something went wrong. Please try again later.",

    // Footer
    footerAboutText: "Celebrating 10 years of passion, pride, and community. Join us on the pitch and beyond.",
    quickLinks: "Quick Links",
    getInTouch: "Get in Touch",
    copyright: "All rights reserved.",
    hashTag: "#FCTou10Years",
  },
  fr: {
    // Navbar
    home: "Accueil",
    schedule: "Programme et Réservation",
    gallery: "Galerie",
    rsvp: "Confirmer",

    // Home page
    anniversaryTitle: "Trou Fc",
    anniversarySpan: "Anniversaire",
    heroDescription: "Célébrons 10 ans de passion, de fierté et de communauté.",
    markCalendars: "Marquez vos calendriers",
    eventDateLabel: "Célébration du 10e anniversaire",
    countdown: "Compte à rebours",
    celebrationNow: "🎉 La célébration a lieu maintenant ! 🎉",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
    ourStory: "Notre Histoire",
    theBeginning: "Les Débuts",
    storyBeginning: "Au printemps 2016, un groupe d'amis universitaires a voulu partager leur amitié sur un terrain de soccer. Ce qui a commencé comme un simple jeu est vite devenu un rêve commun. Frustrés par le manque de compétitions locales, ils décidèrent de créer leur propre club. Avec rien de plus qu'un ballon d'occasion et une passion inébranlable, Trou Fc est né.",
    storyEarlySeasons: "Les premières saisons furent modestes : kits dépareillés, petits terrains, et aucun match compétitif. Mais l'esprit n'a jamais faibli. Le bouche-à-oreille a fait son travail, et des talents incroyables ont rejoint l'aventure, attirés par l'énergie contagieuse et la promesse d'une équipe qui joue par amour du jeu. En 2018, Trou Fc a participé à sa première ligue compétitive : la ligue interne de l'Université de Johannesburg.",
    growthCommunity: "Croissance et Communauté",
    philosophy: "La philosophie du club – « Non seulement profiter du jeu, mais gagner à tout prix et créer des liens indéfectibles » – a résonné au‑delà du terrain. Familles, amis et admirateurs se sont ralliés à l'équipe, transformant les matchs en célébrations communautaires vibrantes.",
    conclusion: "Aujourd'hui, alors que nous célébrons une décennie d'existence, Trou Fc est un symbole d'unité et de résilience. Des trois matchs incroyables aux innombrables amitiés forgées, le parcours a été extraordinaire. Cet anniversaire n'est pas seulement le nôtre – il appartient à tous les supporters, bénévoles et rêveurs qui ont cru qu'un simple jeu pouvait changer une communauté.",

    // Schedule page
    scheduleTitle: "Programme & Réservations",
    mainEvent: "Événement Principal",
    venue: "Lieu : Party Cabin",
    calendarButtons: "Cliquez pour ouvrir votre calendrier et enregistrer l'événement.",
    howToGetThere: "Comment s'y rendre",
    openExactLocation: "Ouvrir l'emplacement exact dans Google Maps",
    getDirections: "Obtenir l'itinéraire depuis votre position",
    directionsNote: "Nous utiliserons votre position actuelle pour planifier l'itinéraire. Vous pouvez aussi simplement cliquer sur le bouton pour ouvrir Google Maps.",
    dressCode: "Code vestimentaire",
    dressCodeDesc: "Pour honorer l'élégance de notre 10e anniversaire, nous invitons tous les invités à s'habiller en tenue de soirée. Smoking optionnel – nous avons hâte de célébrer avec style.",
    googleCalendar: "Google Agenda",
    appleCalendar: "Calendrier Apple",
    outlook: "Outlook",
    saturdayApril: "Samedi 4 avril 2026",
    interactiveMap: "(Carte interactive – glissez pour explorer, cliquez pour ouvrir dans Google Maps)",
    locationError: "Impossible d'obtenir votre position. Vous pouvez toujours rechercher un itinéraire manuellement.",
    geolocationUnsupported: "La géolocalisation n'est pas supportée par votre navigateur.",

    // Gallery page
    galleryTitle: "Galerie Photos",
    gallerySubtitle: "Revivez les meilleurs moments du parcours de Trou Fc.",
    galleryAltCelebration: "Célébration d'équipe",
    galleryAltFans: "Supporters en liesse",
    galleryAltMatch: "Action de match",
    galleryAltAward: "Cérémonie de remise des prix",
    galleryAltYouth: "Académie des jeunes",
    galleryAltCommunity: "Événement communautaire",

    // RSVP page
    rsvpTitle: "Rejoignez la Célébration",
    rsvpSubtitle: "Confirmez votre présence pour le 10e anniversaire",
    fullName: "Nom complet *",
    emailAddress: "Adresse e-mail *",
    attendQuestion: "Allez-vous participer ? *",
    yesAttend: "Oui, je serai présent(e)",
    noAttend: "Non, je ne peux pas venir",
    guestsLabel: "Nombre de personnes (vous inclus)",
    messageLabel: "Une demande spéciale ou un message ?",
    submitButton: "Envoyer la confirmation",
    submittingButton: "Envoi en cours...",
    successMessage: "Merci pour votre confirmation ! Nous avons hâte de célébrer avec vous.",
    errorMessage: "Une erreur s'est produite. Veuillez réessayer plus tard.",

    // Footer
    footerAboutText: "Célébrons 10 ans de passion, de fierté et de communauté. Rejoignez-nous sur le terrain et au-delà.",
    quickLinks: "Liens rapides",
    getInTouch: "Contactez-nous",
    copyright: "Tous droits réservés.",
    hashTag: "#FCTou10Ans",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => translations[language][key as keyof typeof translations.en] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};