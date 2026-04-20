import { useState, useEffect, useRef } from "react";

const TRANSLATIONS = {
  fr: {
    nav: { services: "Services", packs: "Nos Offres", about: "À propos", contact: "Contact", cta: "Démarrer un projet" },
    hero: {
      badge: "Agence Web • Design • Stratégie Digitale",
      title1: "Votre présence en ligne,",
      title2: "notre chef-d'œuvre.",
      subtitle: "Du concept au lancement, nous créons des sites web qui captivent, convertissent et font grandir votre business — en Afrique comme à l'international.",
      cta1: "Voir nos offres",
      cta2: "Discutons de votre projet",
      stat1: "Projets livrés",
      stat2: "Clients satisfaits",
      stat3: "Années d'expertise",
    },
    services: {
      title: "Ce que nous faisons",
      subtitle: "Des solutions digitales complètes, pensées pour votre croissance.",
      items: [
        { icon: "🎨", title: "Design UX/UI", desc: "Interfaces modernes, intuitives et mémorables qui transforment vos visiteurs en clients." },
        { icon: "⚙️", title: "Développement Web", desc: "Code propre, rapide et scalable. ReactJS, Node.js, API — nous maîtrisons la stack moderne." },
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
      local: "Prix Local (FCFA)",
      intl: "Prix International ($)",
      included: "Inclus",
      cta: "Choisir ce pack",
      popular: "Le plus populaire",
      items: [
        {
          name: "Starter",
          emoji: "🟢",
          tagline: "Présence en ligne rapide",
          local: "50 000 – 150 000 FCFA",
          intl: "100 – 300 $",
          target: "Particuliers, artisans, petits business",
          features: ["Landing page 1 page", "Design simple et pro", "Formulaire de contact", "Intégration WhatsApp", "Responsive mobile", "Domaine + hébergement 1 an"],
        },
        {
          name: "Business",
          emoji: "🔵",
          tagline: "Site professionnel complet",
          local: "150 000 – 400 000 FCFA",
          intl: "300 – 800 $",
          target: "PME, entrepreneurs",
          popular: true,
          features: ["Site vitrine 3–7 pages", "Design personnalisé", "SEO de base", "Google Maps + Blog", "Certificat SSL", "Formation client", "Optimisation vitesse"],
        },
        {
          name: "Premium",
          emoji: "🟣",
          tagline: "Business avancé",
          local: "400 000 – 900 000 FCFA",
          intl: "800 – 2 000 $",
          target: "Entreprises en croissance",
          features: ["Tout le pack Business", "SEO avancé", "UX/UI pro haut niveau", "Email professionnel", "Google Analytics", "Newsletter automatisée", "Maintenance 3 mois"],
        },
        {
          name: "E-Commerce",
          emoji: "🔴",
          tagline: "Boutique en ligne",
          local: "500 000 – 1 500 000 FCFA",
          intl: "1 000 – 3 000 $",
          target: "Vendeurs, boutiques, dropshipping",
          features: ["Boutique 20–100 produits", "Paiement en ligne (MoMo, carte)", "Gestion commandes", "Compte client", "SEO produit", "Formation complète"],
        },
        {
          name: "Sur-Mesure",
          emoji: "⚫",
          tagline: "Projet international",
          local: "Sur devis",
          intl: "À partir de 2 000 $",
          target: "Grandes entreprises, SaaS",
          features: ["Développement sur-mesure", "Intégration API & CRM", "Plateforme complexe", "SEO + stratégie marketing", "Sécurité avancée", "Maintenance continue"],
        },
      ]
    },
    extras: {
      title: "Services Complémentaires",
      items: ["Maintenance mensuelle", "Création de logo", "Rédaction de contenu", "Gestion réseaux sociaux", "Publicité Facebook / Google", "Refonte de site", "Hébergement annuel"],
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
      name: "Votre nom",
      email: "Votre email",
      service: "Service souhaité",
      message: "Décrivez votre projet...",
      send: "Envoyer le message",
      services: ["Starter", "Business", "Premium", "E-Commerce", "Sur-Mesure", "Autre"],
    },
    footer: {
      tagline: "Votre succès digital commence ici.",
      links: "Liens rapides",
      contact: "Contact",
      rights: "Tous droits réservés.",
    }
  },
  en: {
    nav: { services: "Services", packs: "Our Offers", about: "About", contact: "Contact", cta: "Start a project" },
    hero: {
      badge: "Web Agency • Design • Digital Strategy",
      title1: "Your online presence,",
      title2: "our masterpiece.",
      subtitle: "From concept to launch, we build websites that captivate, convert and grow your business — across Africa and worldwide.",
      cta1: "See our offers",
      cta2: "Let's talk about your project",
      stat1: "Projects delivered",
      stat2: "Happy clients",
      stat3: "Years of expertise",
    },
    services: {
      title: "What we do",
      subtitle: "Complete digital solutions, designed for your growth.",
      items: [
        { icon: "🎨", title: "UX/UI Design", desc: "Modern, intuitive and memorable interfaces that turn your visitors into customers." },
        { icon: "⚙️", title: "Web Development", desc: "Clean, fast and scalable code. ReactJS, Node.js, APIs — we master the modern stack." },
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
      local: "Local Price (FCFA)",
      intl: "International Price ($)",
      included: "Included",
      cta: "Choose this pack",
      popular: "Most popular",
      items: [
        {
          name: "Starter",
          emoji: "🟢",
          tagline: "Fast online presence",
          local: "50,000 – 150,000 FCFA",
          intl: "$100 – $300",
          target: "Individuals, artisans, small business",
          features: ["1-page landing page", "Simple & professional design", "Contact form", "WhatsApp integration", "Mobile responsive", "Domain + hosting 1 year"],
        },
        {
          name: "Business",
          emoji: "🔵",
          tagline: "Complete professional site",
          local: "150,000 – 400,000 FCFA",
          intl: "$300 – $800",
          target: "SMEs, entrepreneurs",
          popular: true,
          features: ["3–7 page showcase site", "Custom design", "Basic SEO", "Google Maps + Blog", "SSL Certificate", "Client training", "Speed optimization"],
        },
        {
          name: "Premium",
          emoji: "🟣",
          tagline: "Advanced business",
          local: "400,000 – 900,000 FCFA",
          intl: "$800 – $2,000",
          target: "Growing companies",
          features: ["Everything in Business", "Advanced SEO", "High-end UX/UI", "Professional email", "Google Analytics", "Automated newsletter", "3-month maintenance"],
        },
        {
          name: "E-Commerce",
          emoji: "🔴",
          tagline: "Online store",
          local: "500,000 – 1,500,000 FCFA",
          intl: "$1,000 – $3,000",
          target: "Sellers, shops, dropshipping",
          features: ["Store with 20–100 products", "Online payment (MoMo, card)", "Order management", "Customer account", "Product SEO", "Full training"],
        },
        {
          name: "Custom",
          emoji: "⚫",
          tagline: "International project",
          local: "On quote",
          intl: "From $2,000",
          target: "Large companies, SaaS",
          features: ["Custom development", "API & CRM integration", "Complex platform", "SEO + marketing strategy", "Advanced security", "Ongoing maintenance"],
        },
      ]
    },
    extras: {
      title: "Additional Services",
      items: ["Monthly maintenance", "Logo creation", "Content writing", "Social media management", "Facebook / Google Ads", "Website redesign", "Annual hosting"],
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
      name: "Your name",
      email: "Your email",
      service: "Desired service",
      message: "Describe your project...",
      send: "Send message",
      services: ["Starter", "Business", "Premium", "E-Commerce", "Custom", "Other"],
    },
    footer: {
      tagline: "Your digital success starts here.",
      links: "Quick links",
      contact: "Contact",
      rights: "All rights reserved.",
    }
  }
};

const COLORS = { brick: "#B03A30", orange: "#F4A31F", gold: "#D5AF32" };

const Logo = ({ size = 40 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.brick}, ${COLORS.orange})`,
      borderRadius: 8,
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Merriweather', serif",
      fontWeight: 900,
      fontSize: size * 0.28,
      color: "#fff",
      letterSpacing: "-0.5px",
      flexShrink: 0,
    }}>Mr.LS</div>
    <span style={{
      fontFamily: "'Merriweather', serif",
      fontWeight: 900,
      fontSize: size * 0.38,
      background: `linear-gradient(90deg, ${COLORS.brick}, ${COLORS.gold})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    }}>Mr. LS</span>
  </div>
);

const Section = ({ id, children, style = {} }) => (
  <section id={id} style={{ padding: "90px 0", ...style }}>{children}</section>
);

const Container = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", ...style }}>{children}</div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div style={{ textAlign: "center", marginBottom: 64 }}>
    <h2 style={{
      fontFamily: "'Merriweather', serif",
      fontSize: "clamp(28px, 4vw, 42px)",
      fontWeight: 900,
      color: "#0f0f0f",
      margin: "0 0 16px",
      letterSpacing: "-0.5px",
    }}>{title}</h2>
    <div style={{ width: 60, height: 4, background: `linear-gradient(90deg, ${COLORS.brick}, ${COLORS.gold})`, borderRadius: 2, margin: "0 auto 20px" }} />
    {subtitle && <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, color: "#555", maxWidth: 600, margin: "0 auto" }}>{subtitle}</p>}
  </div>
);

export default function MrLSWebsite() {
  const [lang, setLang] = useState("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
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
        .btn-primary { background: linear-gradient(135deg, ${COLORS.brick}, ${COLORS.orange}); color: #fff; border: none; border-radius: 50px; padding: 14px 32px; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; display: inline-block; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(176,58,48,0.35); }
        .btn-ghost { background: transparent; border: 2px solid ${COLORS.brick}; color: ${COLORS.brick}; border-radius: 50px; padding: 12px 30px; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
        .btn-ghost:hover { background: ${COLORS.brick}; color: #fff; }
        .card { background: #fff; border-radius: 20px; border: 1.5px solid #f0ece8; transition: transform 0.25s, box-shadow 0.25s; }
        .card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.10); }
        .pack-card { background: #fff; border-radius: 24px; border: 2px solid #f0ece8; padding: 36px 32px; transition: transform 0.25s, box-shadow 0.25s; position: relative; }
        .pack-card:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.12); }
        .pack-card.popular { border-color: ${COLORS.brick}; }
        .input-field { width: 100%; border: 1.5px solid #e5e0d8; border-radius: 12px; padding: 14px 18px; font-family: 'Poppins', sans-serif; font-size: 15px; color: #0f0f0f; background: #faf9f7; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: ${COLORS.brick}; background: #fff; }
        .lang-btn { border: 2px solid; border-radius: 50px; padding: 5px 14px; font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .floating { animation: float 5s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        .hero-gradient { background: radial-gradient(ellipse 80% 60% at 80% 50%, rgba(176,58,48,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(213,175,50,0.07) 0%, transparent 60%), #faf9f7; }
        .check { color: ${COLORS.brick}; font-size: 14px; flex-shrink: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: ${COLORS.brick}; border-radius: 3px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #f0ece8" : "none",
        transition: "all 0.3s",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo size={36} />
          <div style={{ display: "flex", alignItems: "center", gap: 40 }} className="desktop-nav">
            {["services", "packs", "contact"].map(k => (
              <button key={k} className="nav-link" onClick={() => scrollTo(k)}>{t.nav[k]}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="lang-btn"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              style={{ borderColor: COLORS.brick, color: lang === "fr" ? "#fff" : COLORS.brick, background: lang === "fr" ? COLORS.brick : "transparent" }}
            >FR</button>
            <button
              className="lang-btn"
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              style={{ borderColor: COLORS.brick, color: lang === "en" ? "#fff" : COLORS.brick, background: lang === "en" ? COLORS.brick : "transparent" }}
            >EN</button>
            <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ padding: "10px 22px", fontSize: 13 }}>{t.nav.cta}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero-gradient" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80 }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <div className="fade-up" style={{ animationDelay: "0.1s" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: `linear-gradient(135deg, rgba(176,58,48,0.1), rgba(244,163,31,0.1))`,
                  border: `1px solid rgba(176,58,48,0.2)`,
                  borderRadius: 50, padding: "8px 18px",
                  fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.brick,
                  marginBottom: 28, letterSpacing: "0.5px",
                }}>
                  ✦ {t.hero.badge}
                </span>
              </div>
              <h1 className="fade-up" style={{ animationDelay: "0.2s", fontFamily: "'Merriweather', serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-1px", marginBottom: 24, color: "#0a0a0a" }}>
                {t.hero.title1}<br />
                <span style={{ background: `linear-gradient(90deg, ${COLORS.brick}, ${COLORS.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {t.hero.title2}
                </span>
              </h1>
              <p className="fade-up" style={{ animationDelay: "0.35s", fontFamily: "'Poppins', sans-serif", fontSize: 17, lineHeight: 1.75, color: "#555", maxWidth: 500, marginBottom: 36 }}>
                {t.hero.subtitle}
              </p>
              <div className="fade-up" style={{ animationDelay: "0.5s", display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("packs")}>{t.hero.cta1} →</button>
                <button className="btn-ghost" onClick={() => scrollTo("contact")}>{t.hero.cta2}</button>
              </div>
              <div className="fade-up" style={{ animationDelay: "0.65s", display: "flex", gap: 48, marginTop: 52 }}>
                {[["50+", t.hero.stat1], ["100%", t.hero.stat2], ["5+", t.hero.stat3]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Merriweather', serif", fontSize: 32, fontWeight: 900, color: COLORS.brick }}>{num}</div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#888", marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="floating" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div style={{
                width: 420, height: 420,
                background: `linear-gradient(135deg, ${COLORS.brick}15, ${COLORS.orange}20, ${COLORS.gold}15)`,
                borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{
                    background: "linear-gradient(135deg, #fff, #faf9f7)",
                    borderRadius: 24, padding: "40px 48px",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
                    textAlign: "center",
                    border: "1px solid #f0ece8",
                  }}>
                    <Logo size={52} />
                    <div style={{ marginTop: 20, fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#888", letterSpacing: 2, textTransform: "uppercase" }}>Digital Agency</div>
                    <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "center" }}>
                      {[COLORS.brick, COLORS.orange, COLORS.gold].map(c => (
                        <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                      ))}
                    </div>
                  </div>
                </div>
                {[
                  { top: "15%", left: "5%", label: "ReactJS", delay: "0s" },
                  { top: "70%", left: "5%", label: "UX/UI", delay: "0.5s" },
                  { top: "15%", right: "5%", label: "SEO", delay: "1s" },
                  { top: "70%", right: "5%", label: "DevOps", delay: "1.5s" },
                ].map(({ label, ...pos }) => (
                  <div key={label} style={{
                    position: "absolute", ...pos,
                    background: "#fff", borderRadius: 10, padding: "6px 14px",
                    fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 600,
                    color: COLORS.brick, border: `1.5px solid ${COLORS.brick}30`,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    animation: `float 4s ease-in-out ${pos.delay || "0s"} infinite`,
                  }}>{label}</div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <Section id="services" style={{ background: "#fff" }}>
        <Container>
          <SectionTitle title={t.services.title} subtitle={t.services.subtitle} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {t.services.items.map((s, i) => (
              <div key={i} className="card" style={{ padding: "32px 28px" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: 18, fontWeight: 700, color: "#0a0a0a", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: "#666", lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{ marginTop: 20, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${COLORS.brick}, ${COLORS.gold})`, width: 40 }} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PACKS */}
      <Section id="packs" style={{ background: "#faf9f7" }}>
        <Container>
          <SectionTitle title={t.packs.title} subtitle={t.packs.subtitle} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {t.packs.items.map((pack, i) => (
              <div key={i} className={`pack-card${pack.popular ? " popular" : ""}`}>
                {pack.popular && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: `linear-gradient(135deg, ${COLORS.brick}, ${COLORS.orange})`,
                    color: "#fff", borderRadius: 50, padding: "6px 20px",
                    fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}>★ {t.packs.popular}</div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 28 }}>{pack.emoji}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: 22, fontWeight: 900, color: "#0a0a0a" }}>{pack.name}</h3>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#888" }}>{pack.tagline}</p>
                  </div>
                </div>
                <div style={{ background: `linear-gradient(135deg, ${COLORS.brick}08, ${COLORS.gold}08)`, borderRadius: 12, padding: "16px 18px", margin: "20px 0" }}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#888", marginBottom: 4 }}>{t.packs.local}</div>
                  <div style={{ fontFamily: "'Merriweather', serif", fontWeight: 900, fontSize: 17, color: COLORS.brick }}>{pack.local}</div>
                  <div style={{ borderTop: "1px solid #e5e0d8", marginTop: 10, paddingTop: 10 }}>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#888", marginBottom: 4 }}>{t.packs.intl}</div>
                    <div style={{ fontFamily: "'Merriweather', serif", fontWeight: 900, fontSize: 17, color: COLORS.orange }}>{pack.intl}</div>
                  </div>
                </div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#888", marginBottom: 16 }}>👤 {pack.target}</p>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>{t.packs.included}</p>
                  {pack.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                      <span className="check">✓</span>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: "#444", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ width: "100%", textAlign: "center" }}>{t.packs.cta}</button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* EXTRAS */}
      <Section style={{ background: `linear-gradient(135deg, ${COLORS.brick}, #8a2520)`, padding: "70px 0" }}>
        <Container>
          <h2 style={{ fontFamily: "'Merriweather', serif", fontSize: 32, fontWeight: 900, color: "#fff", textAlign: "center", marginBottom: 40 }}>{t.extras.title}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            {t.extras.items.map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 50, padding: "10px 22px",
                fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, color: "#fff",
              }}>+ {item}</div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY US */}
      <Section style={{ background: "#fff" }}>
        <Container>
          <SectionTitle title={t.why.title} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {t.why.items.map((item, i) => (
              <div key={i} style={{ textAlign: "center", padding: "32px 24px" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: 20, fontWeight: 900, color: "#0a0a0a", marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CONTACT */}
      <Section id="contact" style={{ background: "#faf9f7" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  ["📧", "contact@mrls.agency"],
                  ["💬", "WhatsApp: +237 6XX XXX XXX"],
                  ["🌍", "Yaoundé, Cameroun — International"],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "'Poppins', sans-serif", fontSize: 15, color: "#444" }}>
                    <span style={{ fontSize: 22 }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", border: "1.5px solid #f0ece8", boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>
              <ContactForm t={t} />
            </div>
          </div>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a0a", padding: "60px 24px 32px", color: "#aaa" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 60, marginBottom: 48 }}>
            <div>
              <Logo size={40} />
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, lineHeight: 1.8, marginTop: 20, color: "#888", maxWidth: 320 }}>{t.footer.tagline}</p>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Merriweather', serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 20 }}>{t.footer.links}</h4>
              {["services", "packs", "contact"].map(k => (
                <div key={k} style={{ marginBottom: 10 }}>
                  <button className="nav-link" onClick={() => scrollTo(k)} style={{ color: "#888", fontSize: 14 }}>{t.nav[k]}</button>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ fontFamily: "'Merriweather', serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 20 }}>{t.footer.contact}</h4>
              {["contact@mrls.agency", "WhatsApp", "Yaoundé, CM"].map(c => (
                <p key={c} style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: "#888", marginBottom: 10 }}>{c}</p>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #222", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: "#555" }}>© 2025 Mr. LS Agency. {t.footer.rights}</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[COLORS.brick, COLORS.orange, COLORS.gold].map(c => (
                <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm({ t }) {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
      <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: 22, fontWeight: 900, color: "#0a0a0a", marginBottom: 12 }}>
        {t.lang === "en" ? "Message sent!" : "Message envoyé !"}
      </h3>
      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, color: "#666" }}>
        {t.lang === "en" ? "We'll get back to you within 24 hours." : "Nous vous répondrons sous 24h."}
      </p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <input required className="input-field" placeholder={t.contact.name} value={form.name} onChange={handle("name")} />
      <input required type="email" className="input-field" placeholder={t.contact.email} value={form.email} onChange={handle("email")} />
      <select required className="input-field" value={form.service} onChange={handle("service")}>
        <option value="">{t.contact.service}</option>
        {t.contact.services.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea required className="input-field" placeholder={t.contact.message} value={form.message} onChange={handle("message")} rows={5} style={{ resize: "vertical" }} />
      <button type="submit" className="btn-primary" style={{ textAlign: "center" }}>{t.contact.send} →</button>
    </form>
  );
}
