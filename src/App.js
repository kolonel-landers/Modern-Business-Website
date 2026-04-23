import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

const TRANSLATIONS = {
  fr: {
    nav: { services: "Services", packs: "Nos Offres", about: "À propos", contact: "Contact", process: "Processus", portfolio: "Réalisations", cta: "Démarrer un projet" },
    hero: {
      badge: "Agence Web • Design • Stratégie Digitale",
      title1: "Votre présence en ligne,",
      title2: "notre chef-d'œuvre.",
      subtitle: "Du concept au lancement, nous créons des sites web qui captivent, convertissent et font grandir votre business — en Afrique comme à l'international.",
      cta1: "Voir nos offres",
      cta2: "Discutons de votre projet",
      stat1: "Délai de réponse",
      stat2: "Satisfaction client",
      stat3: "Plus de visibilité",
    },
    services: {
      title: "Ce que nous faisons",
      subtitle: "Des solutions digitales complètes, pensées pour votre croissance.",
      items: [
        { icon: "🎨", title: "Design UX/UI", desc: "Interfaces modernes, intuitives et mémorables qui transforment vos visiteurs en clients." },
        { icon: "⚙️", title: "Développement Web", desc: "Wordpress, Code propre, rapide et scalable. ReactJS, Node.js, API — nous maîtrisons la stack moderne." },
        { icon: "📈", title: "SEO & Référencement", desc: "Soyez visible sur Google. Stratégie de contenu, optimisation technique et mots-clés ciblés." },
        { icon: "🛒", title: "E-commerce", desc: "Boutiques en ligne avec paiement Mobile Money, gestion des commandes et expérience fluide." },
        { icon: "🔒", title: "Sécurité Web", desc: "SSL, protection des données, audit de sécurité — votre site est blindé contre les menaces." },
        { icon: "📣", title: "Marketing Digital", desc: "Facebook Ads, Google Ads, emailing — nous attirons vos clients là où ils se trouvent." },
        { icon: "🌐", title: "Hébergement & Domaine", desc: "Configuration, hébergement haute disponibilité et nom de domaine — tout inclus." },
        { icon: "🛠️", title: "Maintenance & Support", desc: "Votre site reste opérationnel, rapide et à jour. Support réactif disponible." },
      ]
    },
    packs: {
      title: "Nos Packs & Tarifs",
      subtitle: "Des offres adaptées à chaque ambition — du premier site vitrine à la plateforme internationale.",
      local: "Prix Local (FCFA)", intl: "Prix International ($)", included: "Inclus", cta: "Choisir ce pack", popular: "Le plus populaire",
      items: [
        { name: "Starter", emoji: "🟢", tagline: "Présence en ligne rapide", local: "50 000 – 200 000 FCFA", intl: "100 – 350 $", target: "Particuliers, artisans, petits business", features: ["Landing page 1 page", "Design simple et pro", "Formulaire de contact", "Intégration WhatsApp", "Responsive mobile", "Domaine + hébergement 1 an"] },
        { name: "Business", emoji: "🔵", tagline: "Site professionnel complet", local: "200 000 – 500 000 FCFA", intl: "350 – 850 $", target: "PME, entrepreneurs", popular: true, features: ["Site vitrine 3–7 pages", "Design personnalisé", "SEO de base", "Google Maps + Blog", "Certificat SSL", "Formation client", "Optimisation vitesse", "Responsive mobile", "Domaine + hébergement 1 an"] },
        { name: "Premium", emoji: "🟣", tagline: "Business avancé", local: "500 000 – 1 000 000 FCFA", intl: "850 – 2 000 $", target: "Entreprises en croissance", features: ["Tout le pack Business", "SEO avancé", "UX/UI pro haut niveau", "Email professionnel", "Google Analytics", "Newsletter automatisée", "Maintenance 3 mois"] },
        { name: "E-Commerce", emoji: "🔴", tagline: "Boutique en ligne", local: "500 000 – 1 500 000 FCFA", intl: "1 000 – 3 000 $", target: "Vendeurs, boutiques, dropshipping", features: ["Boutique 20–100 produits", "Paiement en ligne (MoMo, carte)", "Gestion commandes", "Compte client", "SEO produit", "Formation complète"] },
        { name: "Sur-Mesure", emoji: "⚫", tagline: "Projet international", local: "Sur devis", intl: "À partir de 2 000 $", target: "Grandes entreprises, SaaS", features: ["Développement sur-mesure", "Intégration API & CRM", "Plateforme complexe", "SEO + stratégie marketing", "Sécurité avancée", "Maintenance continue"] },
      ]
    },
    extras: {
      title: "Services Complémentaires",
      items: ["Maintenance mensuelle", "Création de logo", "Charte graphique", "Rédaction de contenu", "Gestion réseaux sociaux", "Publicité Facebook / Google", "Refonte de site", "Hébergement annuel"],
    },
    testimonials: {
      title: "Ce que disent nos clients",
      subtitle: "Ils nous ont fait confiance — voici leur expérience.",
      items: [
        { name: "Adjoua Konan", role: "Gérante — Boutique Mode Abidjan", avatar: "AK", color: "#B03A30", flag: "🇨🇮", text: "Mr. LS a transformé ma boutique en ligne en quelques semaines. Les clients commandent maintenant depuis leur téléphone avec Mobile Money. Mon chiffre d'affaires a augmenté de 40% dès le premier mois !", stars: 5 },
        { name: "Thomas Mbarga", role: "Directeur — Cabinet Juridique Yaoundé", avatar: "TM", color: "#F4A31F", flag: "🇨🇲", text: "Très professionnel et réactif. Mon site est moderne, rapide et bien référencé sur Google. Le suivi WhatsApp pendant tout le projet était rassurant. Je recommande vivement.", stars: 5 },
        { name: "Sarah Mitchell", role: "Founder — FitCoach Pro, London", avatar: "SM", color: "#2C5F8A", flag: "🇬🇧", text: "Outstanding work. Mr. LS delivered exactly what I needed — a clean, fast and professional platform. Communication was smooth despite the time difference. Will definitely work together again.", stars: 5 },
        { name: "Inès Bello", role: "Entrepreneur — Restaurant Douala", avatar: "IB", color: "#D5AF32", flag: "🇨🇲", text: "Mon site est magnifique ! Les réservations en ligne ont explosé depuis le lancement. L'équipe a été patiente, à l'écoute et a livré dans les délais. Merci Mr. LS !", stars: 5 },
        { name: "Carlos Mendes", role: "CEO — TechStart Agency, Lisbon", avatar: "CM", color: "#1A7A4A", flag: "🇵🇹", text: "High quality work at a very competitive price. The site loads in under 2 seconds and ranked on Google's first page within 6 weeks. Excellent ROI and great communication throughout.", stars: 5 },
        { name: "Fatou Diallo", role: "Directrice — ONG Éducation, Dakar", avatar: "FD", color: "#6B3FA0", flag: "🇸🇳", text: "Mr. LS a créé notre site institutionnel avec beaucoup de soin et de professionnalisme. Le résultat dépasse nos attentes. Nos donateurs internationaux sont impressionnés par la qualité.", stars: 5 },
      ],
    },
    process: {
      title: "Notre Processus de Travail",
      subtitle: "Un accompagnement clair, transparent et professionnel de A à Z — 100% en ligne.",
      steps: [
        { number: "01", icon: "💬", title: "Découverte & Consultation", desc: "Nous échangeons par WhatsApp, email ou visioconférence pour comprendre votre projet, vos objectifs et votre budget. Un devis détaillé vous est envoyé sous 24h.", tag: "Gratuit" },
        { number: "02", icon: "📋", title: "Devis & Contrat", desc: "Vous recevez une proposition claire avec les délais, le prix et les services inclus. Après validation, un contrat est signé en ligne pour sécuriser notre collaboration.", tag: "En ligne" },
        { number: "03", icon: "💰", title: "Acompte 45%", desc: "Un acompte de 45% du montant total est requis pour démarrer le projet. Paiement accepté via Mobile Money (MTN, Orange), virement bancaire ou PayPal pour les clients internationaux.", tag: "Acompte 45%", highlight: true },
        { number: "04", icon: "🎨", title: "Design & Développement", desc: "Nous créons votre site avec des points de suivi réguliers. Vous validez le design avant le développement. Des retours sont intégrés à chaque étape via un lien de prévisualisation.", tag: "Suivi régulier" },
        { number: "05", icon: "✅", title: "Validation & Tests", desc: "Le site est testé sur tous les appareils (mobile, tablette, desktop) et navigateurs. Vous effectuez vos retours finaux. Les corrections sont appliquées jusqu'à votre satisfaction totale.", tag: "Satisfaction garantie" },
        { number: "06", icon: "🚀", title: "Livraison & Solde", desc: "Le solde restant de 55% est réglé avant la mise en ligne. Votre site est ensuite déployé, vous recevez une formation complète et les accès. Le support post-livraison démarre.", tag: "Solde 55%" },
      ],
    },
    portfolio: {
      title: "Nos Réalisations",
      subtitle: "Des projets concrets, des résultats mesurables.",
      projects: [
        { title: "Saveurs du Cameroun", category: "Site Vitrine", tag: "Local", tech: "ReactJS • SEO • Mobile", desc: "Site vitrine moderne pour un restaurant camerounais. Réservation en ligne, menu interactif et intégration WhatsApp. +60% de réservations en 2 mois.", color: "#B03A30", icon: "🍽️" },
        { title: "AfricShop", category: "E-Commerce", tag: "Local", tech: "ReactJS • Mobile Money • SEO", desc: "Boutique en ligne pour une PME camerounaise vendant des produits artisanaux. Paiement MTN MoMo & Orange Money intégré. 150 commandes dès le premier mois.", color: "#F4A31F", icon: "🛍️" },
        { title: "CabinetPro RH", category: "Application Web", tag: "Local", tech: "ReactJS • Node.js • API", desc: "Plateforme de gestion RH pour une entreprise de Douala. Suivi des employés, congés automatisés et tableaux de bord en temps réel.", color: "#D5AF32", icon: "👔" },
        { title: "LuxeStay", category: "Site Vitrine", tag: "International", tech: "ReactJS • SEO Avancé • Analytics", desc: "Site hôtelier haut de gamme pour un client européen. Design UX/UI premium, réservation en ligne et référencement Google Top 3.", color: "#2C5F8A", icon: "🏨" },
        { title: "FitCoach Pro", category: "Application Web", tag: "International", tech: "ReactJS • Stripe • Dashboard", desc: "Plateforme SaaS de coaching sportif en ligne. Abonnements, suivi des séances, paiement Stripe. 500 utilisateurs actifs en 3 mois.", color: "#1A7A4A", icon: "💪" },
        { title: "TechStart Agency", category: "Site Vitrine", tag: "International", tech: "ReactJS • Animation • SEO", desc: "Site d'agence digitale pour une startup londonienne. Animations avancées, chargement ultra-rapide (score 98/100 sur Lighthouse).", color: "#6B3FA0", icon: "🚀" },
        { title: "MediCare Clinic", category: "Site Vitrine", tag: "Local", tech: "ReactJS • Google Maps • SEO", desc: "Site clinique médicale à Yaoundé. Prise de rendez-vous en ligne, localisation Google Maps et fiche de chaque médecin.", color: "#B03A30", icon: "🏥" },
        { title: "DropZone Store", category: "E-Commerce", tag: "International", tech: "ReactJS • Stripe • Dropshipping", desc: "Boutique dropshipping internationale avec 80 produits. Paiement carte bancaire, gestion automatique des commandes et SEO produit optimisé.", color: "#F4A31F", icon: "📦" },
      ],
    },
    why: {
      title: "Pourquoi choisir Mr. LS ?",
      items: [
        { icon: "🎯", title: "Résultats concrets", desc: "Nous ne vendons pas un site. Nous vendons de la visibilité, des clients et des revenus." },
        { icon: "🌍", title: "Local & International", desc: "Nous comprenons le marché camerounais ET les standards internationaux." },
        { icon: "⚡", title: "Livraison rapide", desc: "Délais respectés, communication claire, sans surprise." },
        { icon: "💬", title: "Support humain", desc: "Un interlocuteur dédié, disponible sur WhatsApp et email." },
      ]
    },
    contact: {
      title: "Démarrons votre projet",
      subtitle: "Un projet en tête ? Discutons-en. Réponse garantie sous 24h.",
      name: "Votre nom", email: "Votre email", service: "Service souhaité", message: "Décrivez votre projet...", send: "Envoyer le message",
      services: ["Starter", "Business", "Premium", "E-Commerce", "Sur-Mesure", "Autre"],
    },
    footer: { tagline: "Votre succès digital commence ici.", links: "Liens rapides", contact: "Contact", rights: "Tous droits réservés." }
  },
  en: {
    nav: { services: "Services", packs: "Our Offers", about: "About", contact: "Contact", process: "Process", portfolio: "Portfolio", cta: "Start a project" },
    hero: {
      badge: "Web Agency • Design • Digital Strategy",
      title1: "Your online presence,",
      title2: "our masterpiece.",
      subtitle: "From concept to launch, we build websites that captivate, convert and grow your business — across Africa and worldwide.",
      cta1: "See our offers", cta2: "Let's talk about your project",
      stat1: "Response time", stat2: "Client satisfaction", stat3: "More visibility",
    },
    services: {
      title: "What we do",
      subtitle: "Complete digital solutions, designed for your growth.",
      items: [
        { icon: "🎨", title: "UX/UI Design", desc: "Modern, intuitive and memorable interfaces that turn your visitors into customers." },
        { icon: "⚙️", title: "Web Development", desc: "Clean, fast and scalable code. Wordpress, ReactJS, Node.js, APIs — we master the modern stack." },
        { icon: "📈", title: "SEO & Search", desc: "Be visible on Google. Content strategy, technical optimization and targeted keywords." },
        { icon: "🛒", title: "E-commerce", desc: "Online stores with Mobile Money payments, order management and smooth experience." },
        { icon: "🔒", title: "Web Security", desc: "SSL, data protection, security audit — your site is protected from all threats." },
        { icon: "📣", title: "Digital Marketing", desc: "Facebook Ads, Google Ads, emailing — we bring your customers where they are." },
        { icon: "🌐", title: "Hosting & Domain", desc: "Configuration, high-availability hosting and domain name — all included." },
        { icon: "🛠️", title: "Maintenance & Support", desc: "Your site stays operational, fast and up-to-date. Responsive support available." },
      ]
    },
    packs: {
      title: "Our Packs & Pricing",
      subtitle: "Offers adapted to every ambition — from your first website to an international platform.",
      local: "Local Price (FCFA)", intl: "International Price ($)", included: "Included", cta: "Choose this pack", popular: "Most popular",
      items: [
        { name: "Starter", emoji: "🟢", tagline: "Fast online presence", local: "50 000 – 200 000 FCFA", intl: "$100 – $350", target: "Individuals, artisans, small business", features: ["1-page landing page", "Simple & professional design", "Contact form", "WhatsApp integration", "Mobile responsive", "Domain + hosting 1 year"] },
        { name: "Business", emoji: "🔵", tagline: "Complete professional site", local: "200 000 – 500 000 FCFA", intl: "$350 – $850", target: "SMEs, entrepreneurs", popular: true, features: ["3–7 page showcase site", "Custom design", "Basic SEO", "Google Maps + Blog", "SSL Certificate", "Client training", "Speed optimization", "Mobile responsive", "Domain + hosting 1 year"] },
        { name: "Premium", emoji: "🟣", tagline: "Advanced business", local: "500 000 – 1 000 000 FCFA", intl: "$850 – $2,000", target: "Growing companies", features: ["Everything in Business", "Advanced SEO", "High-end UX/UI", "Professional email", "Google Analytics", "Automated newsletter", "3-month maintenance"] },
        { name: "E-Commerce", emoji: "🔴", tagline: "Online store", local: "500 000 – 1 500 000 FCFA", intl: "$1,000 – $3,000", target: "Sellers, shops, dropshipping", features: ["Store with 20–100 products", "Online payment (MoMo, card)", "Order management", "Customer account", "Product SEO", "Full training"] },
        { name: "Custom", emoji: "⚫", tagline: "International project", local: "On quote", intl: "From $2,000", target: "Large companies, SaaS", features: ["Custom development", "API & CRM integration", "Complex platform", "SEO + marketing strategy", "Advanced security", "Ongoing maintenance"] },
      ]
    },
    extras: {
      title: "Additional Services",
      items: ["Monthly maintenance", "Logo creation", "Brand identity", "Content writing", "Social media management", "Facebook / Google Ads", "Website redesign", "Annual hosting"],
    },
    testimonials: {
      title: "What our clients say",
      subtitle: "They trusted us — here is their experience.",
      items: [
        { name: "Adjoua Konan", role: "Owner — Fashion Boutique Abidjan", avatar: "AK", color: "#B03A30", flag: "🇨🇮", text: "Mr. LS transformed my online store in just a few weeks. Customers now order from their phones with Mobile Money. My revenue increased by 40% in the first month!", stars: 5 },
        { name: "Thomas Mbarga", role: "Director — Law Firm Yaoundé", avatar: "TM", color: "#F4A31F", flag: "🇨🇲", text: "Very professional and responsive. My site is modern, fast and well ranked on Google. The WhatsApp follow-up throughout the project was reassuring. Highly recommended.", stars: 5 },
        { name: "Sarah Mitchell", role: "Founder — FitCoach Pro, London", avatar: "SM", color: "#2C5F8A", flag: "🇬🇧", text: "Outstanding work. Mr. LS delivered exactly what I needed — a clean, fast and professional platform. Communication was smooth despite the time difference. Will definitely work together again.", stars: 5 },
        { name: "Inès Bello", role: "Entrepreneur — Restaurant Douala", avatar: "IB", color: "#D5AF32", flag: "🇨🇲", text: "My site is beautiful! Online reservations have exploded since launch. The team was patient, attentive and delivered on time. Thank you Mr. LS!", stars: 5 },
        { name: "Carlos Mendes", role: "CEO — TechStart Agency, Lisbon", avatar: "CM", color: "#1A7A4A", flag: "🇵🇹", text: "High quality work at a very competitive price. The site loads in under 2 seconds and ranked on Google's first page within 6 weeks. Excellent ROI and great communication throughout.", stars: 5 },
        { name: "Fatou Diallo", role: "Director — Education NGO, Dakar", avatar: "FD", color: "#6B3FA0", flag: "🇸🇳", text: "Mr. LS created our institutional site with great care and professionalism. The result exceeds our expectations. Our international donors are impressed by the quality.", stars: 5 },
      ],
    },
    process: {
      title: "Our Work Process",
      subtitle: "Clear, transparent and professional support from A to Z — 100% online.",
      steps: [
        { number: "01", icon: "💬", title: "Discovery & Consultation", desc: "We connect via WhatsApp, email or video call to understand your project, goals and budget. A detailed quote is sent within 24 hours.", tag: "Free" },
        { number: "02", icon: "📋", title: "Quote & Contract", desc: "You receive a clear proposal with deadlines, price and included services. After validation, a contract is signed online to secure our collaboration.", tag: "Online" },
        { number: "03", icon: "💰", title: "45% Deposit", desc: "A 45% deposit of the total amount is required to start the project. Payment accepted via Mobile Money (MTN, Orange), bank transfer or PayPal for international clients.", tag: "45% Deposit", highlight: true },
        { number: "04", icon: "🎨", title: "Design & Development", desc: "We build your site with regular check-ins. You validate the design before development. Feedback is integrated at each stage via a preview link.", tag: "Regular updates" },
        { number: "05", icon: "✅", title: "Validation & Testing", desc: "The site is tested on all devices (mobile, tablet, desktop) and browsers. You give final feedback. Corrections are applied until your complete satisfaction.", tag: "Satisfaction guaranteed" },
        { number: "06", icon: "🚀", title: "Delivery & Balance", desc: "The remaining 55% balance is paid before going live. Your site is then deployed, you receive full training and access credentials. Post-delivery support begins.", tag: "55% Balance" },
      ],
    },
    portfolio: {
      title: "Our Work",
      subtitle: "Real projects, measurable results.",
      projects: [
        { title: "Saveurs du Cameroun", category: "Showcase Site", tag: "Local", tech: "ReactJS • SEO • Mobile", desc: "Modern showcase site for a Cameroonian restaurant. Online booking, interactive menu and WhatsApp integration. +60% bookings in 2 months.", color: "#B03A30", icon: "🍽️" },
        { title: "AfricShop", category: "E-Commerce", tag: "Local", tech: "ReactJS • Mobile Money • SEO", desc: "Online store for a Cameroonian SME selling handcrafted products. MTN MoMo & Orange Money payment integrated. 150 orders in the first month.", color: "#F4A31F", icon: "🛍️" },
        { title: "CabinetPro HR", category: "Web Application", tag: "Local", tech: "ReactJS • Node.js • API", desc: "HR management platform for a Douala company. Employee tracking, automated leave management and real-time dashboards.", color: "#D5AF32", icon: "👔" },
        { title: "LuxeStay", category: "Showcase Site", tag: "International", tech: "ReactJS • Advanced SEO • Analytics", desc: "High-end hotel website for a European client. Premium UX/UI design, online booking and Google Top 3 ranking.", color: "#2C5F8A", icon: "🏨" },
        { title: "FitCoach Pro", category: "Web Application", tag: "International", tech: "ReactJS • Stripe • Dashboard", desc: "Online sports coaching SaaS platform. Subscriptions, session tracking, Stripe payment. 500 active users in 3 months.", color: "#1A7A4A", icon: "💪" },
        { title: "TechStart Agency", category: "Showcase Site", tag: "International", tech: "ReactJS • Animation • SEO", desc: "Digital agency site for a London startup. Advanced animations, ultra-fast loading (98/100 Lighthouse score).", color: "#6B3FA0", icon: "🚀" },
        { title: "MediCare Clinic", category: "Showcase Site", tag: "Local", tech: "ReactJS • Google Maps • SEO", desc: "Medical clinic site in Yaoundé. Online appointment booking, Google Maps location and individual doctor profiles.", color: "#B03A30", icon: "🏥" },
        { title: "DropZone Store", category: "E-Commerce", tag: "International", tech: "ReactJS • Stripe • Dropshipping", desc: "International dropshipping store with 80 products. Card payment, automatic order management and optimized product SEO.", color: "#F4A31F", icon: "📦" },
      ],
    },
    why: {
      title: "Why choose Mr. LS?",
      items: [
        { icon: "🎯", title: "Concrete results", desc: "We don't sell a website. We sell visibility, clients and revenue." },
        { icon: "🌍", title: "Local & International", desc: "We understand the Cameroonian market AND international standards." },
        { icon: "⚡", title: "Fast delivery", desc: "Deadlines respected, clear communication, no surprises." },
        { icon: "💬", title: "Human support", desc: "A dedicated contact, available on WhatsApp and email." },
      ]
    },
    contact: {
      title: "Let's start your project",
      subtitle: "Have a project in mind? Let's discuss it. Guaranteed reply within 24h.",
      name: "Your name", email: "Your email", service: "Desired service", message: "Describe your project...", send: "Send message",
      services: ["Starter", "Business", "Premium", "E-Commerce", "Custom", "Other"],
    },
    footer: { tagline: "Your digital success starts here.", links: "Quick links", contact: "Contact", rights: "All rights reserved." }
  }
};

const COLORS = { brick: "#B03A30", orange: "#F4A31F", gold: "#D5AF32" };

// ─── Hook responsive ───────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
};

// ─── Composants de base ────────────────────────────────────────────────────────
const Logo = ({ size = 60 }) => (
  <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
    <img
  src="/logo.webp"
  alt="Mr. LS Agence Web"
  loading="lazy"
  decoding="async"
  style={{ height: size, width: "auto", objectFit: "contain" }}
/>
  </div>
);

const Section = ({ id, children, style = {} }) => (
  <section id={id} style={{ padding: "70px 0", ...style }}>{children}</section>
);

const Container = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", ...style }}>{children}</div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div style={{ textAlign: "center", marginBottom: 52 }}>
    <h2 style={{ fontFamily: "'Merriweather', serif", fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 900, color: "#0f0f0f", margin: "0 0 14px", letterSpacing: "-0.5px" }}>{title}</h2>
    <div style={{ width: 56, height: 4, background: `linear-gradient(90deg, ${COLORS.brick}, ${COLORS.gold})`, borderRadius: 2, margin: "0 auto 18px" }} />
    {subtitle && <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(14px, 2vw, 17px)", color: "#555", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>{subtitle}</p>}
  </div>
);

// ─── Témoignages ───────────────────────────────────────────────────────────────
function TestimonialsSection({ t }) {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();
  const items = t.testimonials.items;
  const total = items.length;
  const visible = isMobile ? 1 : 3;

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);
  const getVisible = () => Array.from({ length: visible }, (_, i) => (current + i) % total);

  return (
    <Section id="testimonials" style={{ background: "#faf9f7" }}>
      <Container>
        <SectionTitle title={t.testimonials.title} subtitle={t.testimonials.subtitle} />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20, marginBottom: 36 }}>
          {getVisible().map((idx, pos) => {
            const item = items[idx];
            const isCenter = !isMobile && pos === 1;
            return (
              <div key={idx} style={{ background: "#fff", borderRadius: 24, padding: isMobile ? "24px 20px" : "32px 28px", border: `2px solid ${isCenter ? item.color + "40" : "#f0ece8"}`, transform: isCenter ? "scale(1.04)" : "scale(1)", boxShadow: isCenter ? `0 20px 50px ${item.color}20` : "none", transition: "all 0.4s ease" }}>
                <div style={{ marginBottom: 14 }}>
                  {"★".repeat(item.stars).split("").map((s, i) => <span key={i} style={{ color: COLORS.gold, fontSize: 16 }}>{s}</span>)}
                </div>
                <div style={{ fontFamily: "'Merriweather', serif", fontSize: 52, color: item.color + "20", lineHeight: 0.5, marginBottom: 14 }}>"</div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 13 : 14, color: "#444", lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>{item.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid #f0ece8", paddingTop: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${item.color}, ${item.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{item.avatar}</div>
                  <div>
                    <div style={{ fontFamily: "'Merriweather', serif", fontSize: 14, fontWeight: 700, color: "#0a0a0a" }}>{item.flag} {item.name}</div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: "#888", marginTop: 2 }}>{item.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <button onClick={prev} style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${COLORS.brick}`, background: "#fff", cursor: "pointer", fontSize: 18, color: COLORS.brick, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
          <div style={{ display: "flex", gap: 8 }}>
            {items.map((_, i) => <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 22 : 8, height: 8, borderRadius: 4, background: i === current ? COLORS.brick : "#e0d8d0", border: "none", cursor: "pointer", transition: "all 0.3s" }} />)}
          </div>
          <button onClick={next} style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${COLORS.brick}`, background: "#fff", cursor: "pointer", fontSize: 18, color: COLORS.brick, display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
        </div>
        <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: isMobile ? 20 : 32, flexWrap: "wrap" }}>
          {[["🌍", "Clients Afrique & International"], ["⭐", "100% d'avis positifs"], ["🔒", "Collaboration sécurisée"]].map(([icon, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 12 : 14, fontWeight: 600, color: "#555" }}>
              <span style={{ fontSize: 18 }}>{icon}</span>{label}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── Processus ─────────────────────────────────────────────────────────────────
function ProcessSection({ t }) {
  const [active, setActive] = useState(null);
  const isMobile = useIsMobile();

  return (
    <Section id="process" style={{ background: "#fff" }}>
      <Container>
        <SectionTitle title={t.process.title} subtitle={t.process.subtitle} />
        <div style={{ position: "relative" }}>
          {!isMobile && (
            <div style={{ position: "absolute", top: 32, left: "8%", right: "8%", height: 2, background: `linear-gradient(90deg, ${COLORS.brick}, ${COLORS.orange}, ${COLORS.gold})`, zIndex: 0 }} />
          )}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(6, 1fr)", gap: isMobile ? 16 : 12, position: "relative", zIndex: 1 }}>
            {t.process.steps.map((step, i) => (
              <div key={i} onClick={() => setActive(active === i ? null : i)} style={{ cursor: "pointer", textAlign: "center" }}>
                <div style={{ width: isMobile ? 52 : 64, height: isMobile ? 52 : 64, borderRadius: "50%", background: step.highlight ? `linear-gradient(135deg, ${COLORS.brick}, ${COLORS.orange})` : active === i ? `linear-gradient(135deg, ${COLORS.brick}, ${COLORS.gold})` : "#fff", border: `3px solid ${step.highlight ? COLORS.orange : active === i ? COLORS.brick : "#e5e0d8"}`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 22 : 26, boxShadow: step.highlight || active === i ? `0 8px 24px ${COLORS.brick}35` : "0 4px 12px rgba(0,0,0,0.08)", transition: "all 0.3s" }}>{step.icon}</div>
                <div style={{ fontFamily: "'Merriweather', serif", fontSize: 10, fontWeight: 900, color: COLORS.brick, letterSpacing: 1, marginBottom: 4 }}>{step.number}</div>
                <h4 style={{ fontFamily: "'Merriweather', serif", fontSize: isMobile ? 11 : 12, fontWeight: 900, color: "#0a0a0a", marginBottom: 6, lineHeight: 1.4 }}>{step.title}</h4>
                <span style={{ display: "inline-block", background: step.highlight ? `linear-gradient(135deg, ${COLORS.brick}, ${COLORS.orange})` : `${COLORS.brick}12`, color: step.highlight ? "#fff" : COLORS.brick, borderRadius: 50, padding: "2px 8px", fontFamily: "'Poppins', sans-serif", fontSize: 9, fontWeight: 700 }}>{step.tag}</span>
              </div>
            ))}
          </div>
          {active !== null && (
            <div style={{ marginTop: 32, background: "#fff", borderRadius: 20, padding: isMobile ? "20px 16px" : "32px 36px", border: `2px solid ${COLORS.brick}25`, boxShadow: `0 16px 48px ${COLORS.brick}12`, display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${COLORS.brick}15, ${COLORS.orange}15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{t.process.steps[active].icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                  <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: isMobile ? 16 : 20, fontWeight: 900, color: "#0a0a0a" }}>{t.process.steps[active].title}</h3>
                  <span style={{ background: t.process.steps[active].highlight ? `linear-gradient(135deg, ${COLORS.brick}, ${COLORS.orange})` : `${COLORS.brick}12`, color: t.process.steps[active].highlight ? "#fff" : COLORS.brick, borderRadius: 50, padding: "3px 12px", fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700 }}>{t.process.steps[active].tag}</span>
                </div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 13 : 15, color: "#555", lineHeight: 1.8 }}>{t.process.steps[active].desc}</p>
              </div>
              <button onClick={() => setActive(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#aaa", flexShrink: 0 }}>✕</button>
            </div>
          )}
        </div>
        <div style={{ marginTop: 48, background: `linear-gradient(135deg, ${COLORS.brick}, #8a2520)`, borderRadius: 20, padding: isMobile ? "20px 16px" : "32px 40px", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: isMobile ? 14 : 20 }}>
          {[["💬", "Consultation gratuite"], ["📝", "Contrat en ligne"], ["💰", "Acompte 45% au démarrage"], ["🚀", "Solde 55% à la livraison"]].map(([icon, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 11 : 14, fontWeight: 600, color: "#fff" }}>
              <span style={{ fontSize: isMobile ? 16 : 22 }}>{icon}</span>{label}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── Portfolio ─────────────────────────────────────────────────────────────────
function PortfolioSection({ t }) {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();
  const projects = t.portfolio.projects;
  const total = projects.length;
  const visible = isMobile ? 1 : 3;

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);
  const getVisible = () => Array.from({ length: visible }, (_, i) => (current + i) % total);

  return (
    <Section id="portfolio" style={{ background: "#faf9f7", overflow: "hidden" }}>
      <Container>
        <SectionTitle title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
          {getVisible().map((idx, pos) => {
            const p = projects[idx];
            const isCenter = !isMobile && pos === 1;
            return (
              <div key={idx} style={{ background: "#fff", borderRadius: 24, border: `2px solid ${isCenter ? p.color : "#f0ece8"}`, padding: isMobile ? "24px 20px" : "32px 28px", transition: "all 0.4s ease", transform: isCenter ? "scale(1.04)" : "scale(1)", boxShadow: isCenter ? `0 20px 50px ${p.color}25` : "none" }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 16 }}>{p.icon}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ background: `${p.color}15`, color: p.color, borderRadius: 50, padding: "3px 10px", fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{p.category}</span>
                  <span style={{ background: p.tag === "Local" ? "#e8f5e9" : "#e3f2fd", color: p.tag === "Local" ? "#2e7d32" : "#1565c0", borderRadius: 50, padding: "3px 10px", fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700 }}>🌍 {p.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: isMobile ? 17 : 19, fontWeight: 900, color: "#0a0a0a", marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 13 : 14, color: "#666", lineHeight: 1.7, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ borderTop: "1px solid #f0ece8", paddingTop: 14, fontFamily: "'Poppins', sans-serif", fontSize: 12, color: p.color, fontWeight: 600 }}>{p.tech}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <button onClick={prev} style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${COLORS.brick}`, background: "#fff", cursor: "pointer", fontSize: 18, color: COLORS.brick, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
          <div style={{ display: "flex", gap: 8 }}>
            {projects.map((_, i) => <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 22 : 8, height: 8, borderRadius: 4, background: i === current ? COLORS.brick : "#e0d8d0", border: "none", cursor: "pointer", transition: "all 0.3s" }} />)}
          </div>
          <button onClick={next} style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${COLORS.brick}`, background: "#fff", cursor: "pointer", fontSize: 18, color: COLORS.brick, display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
        </div>
      </Container>
    </Section>
  );
}

// ─── Page principale ───────────────────────────────────────────────────────────
export default function MrLSWebsite() {
  const [lang, setLang] = useState("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: "#0f0f0f", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Poppins:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fff; }
        .nav-link { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 500; color: #333; text-decoration: none; cursor: pointer; padding: 6px 0; transition: color 0.2s; border: none; background: none; }
        .nav-link:hover { color: ${COLORS.brick}; }
        .btn-primary { background: linear-gradient(135deg, ${COLORS.brick}, ${COLORS.orange}); color: #fff; border: none; border-radius: 50px; padding: 13px 28px; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; display: inline-block; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(176,58,48,0.35); }
        .btn-ghost { background: transparent; border: 2px solid ${COLORS.brick}; color: ${COLORS.brick}; border-radius: 50px; padding: 11px 24px; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .btn-ghost:hover { background: ${COLORS.brick}; color: #fff; }
        .card { background: #fff; border-radius: 20px; border: 1.5px solid #f0ece8; transition: transform 0.25s, box-shadow 0.25s; }
        .card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.10); }
        .pack-card { background: #fff; border-radius: 24px; border: 2px solid #f0ece8; padding: 32px 28px; transition: transform 0.25s, box-shadow 0.25s; position: relative; }
        .pack-card:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.12); }
        .pack-card.popular { border-color: ${COLORS.brick}; }
        .input-field { width: 100%; border: 1.5px solid #e5e0d8; border-radius: 12px; padding: 13px 16px; font-family: 'Poppins', sans-serif; font-size: 14px; color: #0f0f0f; background: #faf9f7; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: ${COLORS.brick}; background: #fff; }
        .lang-btn { border: 2px solid; border-radius: 50px; padding: 4px 12px; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .floating { animation: float 5s ease-in-out infinite; }
        .hero-gradient { background: radial-gradient(ellipse 80% 60% at 80% 50%, rgba(176,58,48,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(213,175,50,0.07) 0%, transparent 60%), #faf9f7; }
        .check { color: ${COLORS.brick}; font-size: 13px; flex-shrink: 0; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: ${COLORS.brick}; border-radius: 3px; }
        .hamburger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: #333; border-radius: 2px; transition: all 0.3s; }
        .mobile-menu { position: fixed; top: 72px; left: 0; right: 0; background: rgba(255,255,255,0.98); backdrop-filter: blur(12px); border-bottom: 1px solid #f0ece8; padding: 16px 20px; z-index: 99; display: flex; flex-direction: column; gap: 2px; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(255,255,255,0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid #f0ece8" : "none", transition: "all 0.3s", padding: "0 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo size={isMobile ? 40 : 50} />

          {/* Liens desktop */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {["services", "packs", "process", "portfolio", "contact"].map(k => (
                <button key={k} className="nav-link" onClick={() => scrollTo(k)}>{t.nav[k]}</button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="lang-btn" onClick={() => setLang("fr")} style={{ borderColor: COLORS.brick, color: lang === "fr" ? "#fff" : COLORS.brick, background: lang === "fr" ? COLORS.brick : "transparent" }}>FR</button>
            <button className="lang-btn" onClick={() => setLang("en")} style={{ borderColor: COLORS.brick, color: lang === "en" ? "#fff" : COLORS.brick, background: lang === "en" ? COLORS.brick : "transparent" }}>EN</button>
            {!isMobile && <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ padding: "9px 20px", fontSize: 13 }}>{t.nav.cta}</button>}
            {isMobile && (
              <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
                <span style={{ opacity: menuOpen ? 0 : 1 }} />
                <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
              </button>
            )}
          </div>
        </div>

        {/* Menu mobile */}
        {isMobile && menuOpen && (
          <div className="mobile-menu">
            {["services", "packs", "process", "portfolio", "contact"].map(k => (
              <button key={k} className="nav-link" onClick={() => scrollTo(k)} style={{ padding: "12px 0", borderBottom: "1px solid #f5f0eb", textAlign: "left", fontSize: 16 }}>{t.nav[k]}</button>
            ))}
            <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ marginTop: 12, textAlign: "center" }}>{t.nav.cta}</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero-gradient" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80 }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 60, alignItems: "center" }}>
            <div>
              <div className="fade-up" style={{ animationDelay: "0.1s" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, rgba(176,58,48,0.1), rgba(244,163,31,0.1))`, border: `1px solid rgba(176,58,48,0.2)`, borderRadius: 50, padding: "7px 16px", fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 11 : 13, fontWeight: 600, color: COLORS.brick, marginBottom: 24, letterSpacing: "0.5px" }}>
                  ✦ {t.hero.badge}
                </span>
              </div>
              <h1 className="fade-up" style={{ animationDelay: "0.2s", fontFamily: "'Merriweather', serif", fontSize: "clamp(28px, 5vw, 58px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 20, color: "#0a0a0a" }}>
                {t.hero.title1}<br />
                <span style={{ background: `linear-gradient(90deg, ${COLORS.brick}, ${COLORS.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.hero.title2}</span>
              </h1>
              <p className="fade-up" style={{ animationDelay: "0.35s", fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 15 : 17, lineHeight: 1.75, color: "#555", maxWidth: 500, marginBottom: 32 }}>{t.hero.subtitle}</p>
              <div className="fade-up" style={{ animationDelay: "0.5s", display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("packs")}>{t.hero.cta1} →</button>
                <button className="btn-ghost" onClick={() => scrollTo("contact")}>{t.hero.cta2}</button>
              </div>
              <div className="fade-up" style={{ animationDelay: "0.65s", display: "flex", gap: isMobile ? 28 : 48, marginTop: 44 }}>
                {[["24h", t.hero.stat1], ["100%", t.hero.stat2], ["3x", t.hero.stat3]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Merriweather', serif", fontSize: isMobile ? 26 : 32, fontWeight: 900, color: COLORS.brick }}>{num}</div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 11 : 13, color: "#888", marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visuel hero — masqué sur mobile */}
            {!isMobile && (
              <div className="floating" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                <div style={{ width: 420, height: 420, background: `linear-gradient(135deg, ${COLORS.brick}15, ${COLORS.orange}20, ${COLORS.gold}15)`, borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ background: "linear-gradient(135deg, #fff, #faf9f7)", borderRadius: 24, padding: "40px 48px", boxShadow: "0 30px 80px rgba(0,0,0,0.12)", textAlign: "center", border: "1px solid #f0ece8" }}>
                      <Logo size={120} />
                      <div style={{ marginTop: 20, fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#888", letterSpacing: 2, textTransform: "uppercase" }}>Digital Agency</div>
                      <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "center" }}>
                        {[COLORS.brick, COLORS.orange, COLORS.gold].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                      </div>
                    </div>
                  </div>
                  {[{ top: "15%", left: "5%", label: "ReactJS" }, { top: "70%", left: "5%", label: "UX/UI" }, { top: "15%", right: "5%", label: "SEO" }, { top: "70%", right: "5%", label: "DevOps" }].map(({ label, ...pos }) => (
                    <div key={label} style={{ position: "absolute", ...pos, background: "#fff", borderRadius: 10, padding: "6px 14px", fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.brick, border: `1.5px solid ${COLORS.brick}30`, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", animation: "float 4s ease-in-out infinite" }}>{label}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── SERVICES ── */}
      <Section id="services" style={{ background: "#fff" }}>
        <Container>
          <SectionTitle title={t.services.title} subtitle={t.services.subtitle} />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {t.services.items.map((s, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px" }}>
                <div style={{ fontSize: 34, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: 17, fontWeight: 700, color: "#0a0a0a", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#666", lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{ marginTop: 16, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${COLORS.brick}, ${COLORS.gold})`, width: 36 }} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── PACKS ── */}
      <Section id="packs" style={{ background: "#faf9f7" }}>
        <Container>
          <SectionTitle title={t.packs.title} subtitle={t.packs.subtitle} />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {t.packs.items.map((pack, i) => (
              <div key={i} className={`pack-card${pack.popular ? " popular" : ""}`}>
                {pack.popular && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${COLORS.brick}, ${COLORS.orange})`, color: "#fff", borderRadius: 50, padding: "5px 18px", fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>★ {t.packs.popular}</div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 26 }}>{pack.emoji}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: 20, fontWeight: 900, color: "#0a0a0a" }}>{pack.name}</h3>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#888" }}>{pack.tagline}</p>
                  </div>
                </div>
                <div style={{ background: `linear-gradient(135deg, ${COLORS.brick}08, ${COLORS.gold}08)`, borderRadius: 12, padding: "14px 16px", margin: "16px 0" }}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: "#888", marginBottom: 3 }}>{t.packs.local}</div>
                  <div style={{ fontFamily: "'Merriweather', serif", fontWeight: 900, fontSize: 15, color: COLORS.brick }}>{pack.local}</div>
                  <div style={{ borderTop: "1px solid #e5e0d8", marginTop: 8, paddingTop: 8 }}>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: "#888", marginBottom: 3 }}>{t.packs.intl}</div>
                    <div style={{ fontFamily: "'Merriweather', serif", fontWeight: 900, fontSize: 15, color: COLORS.orange }}>{pack.intl}</div>
                  </div>
                </div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: "#888", marginBottom: 14 }}>👤 {pack.target}</p>
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, color: "#333", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>{t.packs.included}</p>
                  {pack.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7 }}>
                      <span className="check">✓</span>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#444", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ width: "100%", textAlign: "center" }}>{t.packs.cta}</button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── EXTRAS ── */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.brick}, #8a2520)`, padding: "60px 20px" }}>
        <Container>
          <h2 style={{ fontFamily: "'Merriweather', serif", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 900, color: "#fff", textAlign: "center", marginBottom: 32 }}>{t.extras.title}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {t.extras.items.map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 50, padding: "9px 20px", fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 12 : 14, fontWeight: 500, color: "#fff" }}>+ {item}</div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <TestimonialsSection t={t} />

      {/* ── PROCESSUS ── */}
      <ProcessSection t={t} />

      {/* ── PORTFOLIO ── */}
      <PortfolioSection t={t} />

      {/* ── POURQUOI NOUS ── */}
      <Section style={{ background: "#fff" }}>
        <Container>
          <SectionTitle title={t.why.title} />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 24 }}>
            {t.why.items.map((item, i) => (
              <div key={i} style={{ textAlign: "center", padding: isMobile ? "20px 12px" : "32px 24px" }}>
                <div style={{ fontSize: isMobile ? 40 : 48, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: isMobile ? 15 : 18, fontWeight: 900, color: "#0a0a0a", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 12 : 14, color: "#666", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" style={{ background: "#faf9f7" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 80, alignItems: "start" }}>
            <div>
              <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["📧", "monsieurls100@gmail.com"], ["💬", "WhatsApp: +237 697 13 43 68"], ["🌍", "Douala, Cameroun — International"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 13 : 15, color: "#444" }}>
                    <span style={{ fontSize: 20 }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 24, padding: isMobile ? "24px 20px" : "40px 36px", border: "1.5px solid #f0ece8", boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>
              <ContactForm t={t} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0a0a0a", padding: isMobile ? "44px 20px 24px" : "60px 24px 32px", color: "#aaa" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 28 : 60, marginBottom: 40 }}>
            <div>
              <Logo size={isMobile ? 44 : 56} />
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, lineHeight: 1.8, marginTop: 16, color: "#888", maxWidth: 300 }}>{t.footer.tagline}</p>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Merriweather', serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 16 }}>{t.footer.links}</h4>
              {["services", "packs", "contact"].map(k => (
                <div key={k} style={{ marginBottom: 10 }}>
                  <button className="nav-link" onClick={() => scrollTo(k)} style={{ color: "#888", fontSize: 13 }}>{t.nav[k]}</button>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ fontFamily: "'Merriweather', serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 16 }}>{t.footer.contact}</h4>
              {["monsieurls100@gmail.com", "WhatsApp: +237 697 13 43 68", "Douala, Cameroun"].map(c => (
                <p key={c} style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#888", marginBottom: 10 }}>{c}</p>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #222", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#555" }}>© 2025 Mr. LS Agency. {t.footer.rights}</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[COLORS.brick, COLORS.orange, COLORS.gold].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Formulaire de contact ─────────────────────────────────────────────────────
function ContactForm({ t }) {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    emailjs.send(
      "service_iye761d",
      "template_sgzs85x",
      { name: form.name, email: form.email, service: form.service, message: form.message },
      "e7jMTvRlxYd1YrOlC"
    )
    .then(() => { setSent(true); setLoading(false); })
    .catch(() => { setError("Une erreur s'est produite. Réessayez."); setLoading(false); });
  };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ fontSize: 56, marginBottom: 18 }}>🎉</div>
      <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: 20, fontWeight: 900, color: "#0a0a0a", marginBottom: 10 }}>Message envoyé !</h3>
      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: "#666" }}>Nous vous répondrons sous 24h.</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input required className="input-field" placeholder={t.contact.name} value={form.name} onChange={handle("name")} />
      <input required type="email" className="input-field" placeholder={t.contact.email} value={form.email} onChange={handle("email")} />
      <select required className="input-field" value={form.service} onChange={handle("service")}>
        <option value="">{t.contact.service}</option>
        {t.contact.services.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea required className="input-field" placeholder={t.contact.message} value={form.message} onChange={handle("message")} rows={5} style={{ resize: "vertical" }} />
      {error && <p style={{ color: COLORS.brick, fontFamily: "'Poppins', sans-serif", fontSize: 13 }}>⚠️ {error}</p>}
      <button type="submit" className="btn-primary" disabled={loading} style={{ textAlign: "center", opacity: loading ? 0.7 : 1 }}>
        {loading ? "Envoi en cours..." : `${t.contact.send} →`}
      </button>
    </form>
  );
}