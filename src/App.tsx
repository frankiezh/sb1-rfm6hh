import { useState, useEffect, useRef } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Logo } from '@/components/Logo';
import { ServiceCard } from '@/components/ServiceCard';
import { PortfolioCard } from '@/components/PortfolioCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { translations } from '@/lib/translations';
import { Mail, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CookieConsent } from '@/components/CookieConsent';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import { ContactButton } from './components/ContactButton';
import { GoogleMap } from './components/GoogleMap';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ContactForm } from '@/components/ContactForm';
import { ContactDialog } from '@/components/ContactDialog';

// Declare dataLayer and gtag for TypeScript
declare global {
  interface Window {
    dataLayer: Array<{
      [key: string]: any;
      event?: string;
      conversion_type_variable?: string;
      consent?: {
        ad_storage: "granted" | "denied";
        analytics_storage: "granted" | "denied";
        ad_personalization: "granted" | "denied";
        ad_user_data: "granted" | "denied";
      };
    }>;
    gtag: (...args: any[]) => void;
  }
}

// Add prop for default language
interface AppProps {
  defaultLang: 'de' | 'en';
}

export default function App({ defaultLang }: AppProps) {
  // Use defaultLang from URL instead of hardcoded 'de'
  const [currentLang, setCurrentLang] = useState<'de' | 'en'>(defaultLang);
  const t = translations[currentLang];

  const textBlockRef = useRef<HTMLDivElement>(null);
  const [textBlockHeight, setTextBlockHeight] = useState('auto');

  useEffect(() => {
    const updateHeight = () => {
      if (textBlockRef.current) {
        setTextBlockHeight(`${textBlockRef.current.offsetHeight}px`);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const portfolioItems = t.portfolio.items.map(item => {
    if (item.type === 'before-after') {
      return {
        ...item,
        type: 'before-after' as const,
        keywords: ['antique restoration', 'furniture repair', 'upholstery'] as string[]
      };
    }
    return {
      ...item,
      type: 'showcase' as const,
      keywords: ['antique restoration', 'furniture repair', 'upholstery'] as string[]
    };
  });

  const handleCallClick = (e: React.MouseEvent) => {
    window.dataLayer?.push({
      'event': 'conversion',
      'conversion_type_variable': 'phone_call'
    });
    window.location.href = 'tel:+41797389751';
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    window.dataLayer?.push({
      'event': 'conversion',
      'conversion_type_variable': 'whatsapp_click'
    });
    window.location.href = 'https://wa.me/41797389751?text=...';
  };

  // Add state for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAcceptCookies = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'user_consent_granted',
      'consent': {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_personalization': 'granted',
        'ad_user_data': 'granted'
      }
    });
    localStorage.setItem('userConsent', 'granted');
  };

  const handleDeclineCookies = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'user_consent_denied',
      'consent': {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_personalization': 'denied',
        'ad_user_data': 'denied'
      }
    });
    localStorage.setItem('userConsent', 'denied');
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: '-80px 0px 0px 0px', // Account for header height
  });

  // Contact button component to avoid duplication
  const ContactButtons = ({ className = '', orientation = 'horizontal', currentLang }: { className?: string; orientation?: 'horizontal' | 'vertical'; currentLang: 'de' | 'en'; }) => (
    <div className={`flex ${orientation === 'vertical' ? 'flex-col md:flex-row' : 'flex-row'} gap-2 ${className}`}>
      <ContactDialog currentLang={currentLang}>
        <button
          className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-[#334B40] hover:bg-[#3D5A4C] text-white px-4 py-2 rounded-md transition-all duration-200 hover:scale-105 text-sm whitespace-nowrap"
        >
          <Mail className="h-4 w-4" />
          <span className="font-medium">{currentLang === 'de' ? 'Kontakt' : 'Contact'}</span>
        </button>
      </ContactDialog>

      <ContactButton 
        type="whatsapp"
        className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-gray-100/95 hover:bg-white text-[#334B40] px-4 py-2 rounded-md transition-all duration-200 hover:scale-105 text-sm whitespace-nowrap"
        currentLang={currentLang}
      >
        <MessageCircle className="h-4 w-4 text-[#25D366]" />
        <span className="font-medium">{t.buttons.whatsapp}</span>
      </ContactButton>
    </div>
  );

  // Update language switcher to use navigation
  const handleLanguageChange = (newLang: 'de' | 'en') => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/(de|en)\//, `/${newLang}/`);
    window.location.href = newPath;
  };

  return (
    <>
      <Helmet>
        <title>Polsterei am HB Zürich | Atelier Grünenwald</title>
        
        {/* Language meta tags */}
        <html lang={currentLang} />
        <link rel="alternate" hrefLang="de" href={`https://polsterei-hb-zuerich.ch/de${window.location.pathname.replace(/^\/(de|en)/, '')}`} />
        <link rel="alternate" hrefLang="en" href={`https://polsterei-hb-zuerich.ch/en${window.location.pathname.replace(/^\/(de|en)/, '')}`} />
        <link rel="alternate" hrefLang="x-default" href="https://polsterei-hb-zuerich.ch/de/" />
        
        <meta name="description" content="Professionelle Polsterei in Zürich. Traditionelle Polsterarbeiten, Möbelrestaurierung und Neubezüge. 2 Minuten vom Hauptbahnhof Zürich." />
        <meta name="keywords" content="polsterei zürich, polsterer zürich, möbelpolsterei, polsterarbeiten, möbelrestaurierung, hb zürich" />
        <link rel="canonical" href="https://www.polsterei-hb-zuerich.ch" />
        
        <meta property="og:title" content="Polsterei am HB Zürich | Atelier Grünenwald" />
        <meta property="og:description" content="Professionelle Polsterei in Zürich. 2 Minuten vom Hauptbahnhof." />
        <meta property="og:image" content="/path-to-your-logo-or-featured-image.jpg" />
        <meta property="og:url" content="https://www.polsterei-hb-zuerich.ch" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": currentLang === 'de' ? "Atelier Grünenwald" : "Atelier Gruenenwald",
            "image": [
              "https://polsterei-hb-zuerich.ch/atelier-gruenenwald-logo.svg",
              "https://polsterei-hb-zuerich.ch/images/hero/hero-upholstery-workshop.jpg"
            ],
            "description": currentLang === 'de' 
              ? "Professionelle Polsterei in Zürich. Traditionelle Polsterarbeiten, Möbelrestaurierung und Neubezüge."
              : "Professional upholstery in Zurich. Traditional upholstery work, furniture restoration and reupholstery.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Tellstrasse 38",
              "addressLocality": "Zürich",
              "postalCode": "8004",
              "addressCountry": "CH"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 47.378337,
              "longitude": 8.533440
            },
            "url": "https://polsterei-hb-zuerich.ch",
            "telephone": "+41442428980",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "http://schema.org/Monday",
                "http://schema.org/Tuesday",
                "http://schema.org/Wednesday",
                "http://schema.org/Thursday",
                "http://schema.org/Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "priceRange": "$$",
            "hasMap": "https://www.google.com/maps/place/Tellstrasse+38,+8004+Z%C3%BCrich",
            "sameAs": [
              "https://wa.me/41797389751",
              "https://www.instagram.com/AtelierGruenenwald"
            ]
          })}
        </script>
        <link 
          rel="preload" 
          as="image" 
          href="/images/hero/hero-upholstery-workshop.jpg" 
        />
      </Helmet>
      
      <div className="min-h-screen bg-[#f8f8f8] text-[#2B1810]">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
          {/* Main header content */}
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            {/* Logo und Language Switcher */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12">
                <Logo />
              </div>
              <LanguageSwitcher currentLang={currentLang} onLanguageChange={handleLanguageChange} />
            </div>
            
            {/* Navigation and Menu Button */}
            <div className="flex items-center gap-4">
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8 text-sm font-medium" aria-label="Main navigation">
                <a href="#services" className="text-[#2B1810] hover:text-[#334B40] transition">{t.nav.services}</a>
                <a href="#portfolio" className="text-[#2B1810] hover:text-[#334B40] transition">{t.nav.portfolio}</a>
                <a href="#contact" className="text-[#2B1810] hover:text-[#334B40] transition">{t.nav.contact}</a>
              </nav>
              
              {/* Desktop CTA Buttons - always visible on desktop */}
              <div className="hidden md:flex flex-row items-center gap-2">
                <ContactButtons orientation="horizontal" currentLang={currentLang} />
              </div>
              
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-[#2B1810]"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        <div 
          className={`
            md:hidden fixed inset-x-0 top-20 
            bg-white/95 backdrop-blur-sm 
            transform transition-transform duration-300 ease-in-out 
            z-40 border-b
            ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          `}
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6 text-base font-medium">
            <a href="#services" className="text-[#2B1810] hover:text-[#334B40] transition" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.services}</a>
            <a href="#portfolio" className="text-[#2B1810] hover:text-[#334B40] transition" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.portfolio}</a>
            <a href="#contact" className="text-[#2B1810] hover:text-[#334B40] transition" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.contact}</a>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
              alt="Hero background"
              loading="eager"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="relative flex-1 flex flex-col justify-between text-white">
            <div className="flex items-center justify-center flex-1 mt-24 md:mt-20">
              <AnimatedSection className="text-center">
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="flex flex-col items-center"
                >
                  <h1 className="text-2xl md:text-4xl font-light tracking-wider mb-2">
                    {t.hero.title}
                  </h1>
                  <div className="relative">
                    <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-sm md:text-base font-light tracking-wider opacity-80">
                      by
                    </span>
                    <h2 className="text-4xl md:text-6xl font-light tracking-wider">
                      ATELIER GRÜNENWALD
                    </h2>
                  </div>
                </motion.div>

                {/* Hero Section Buttons - now with ref for visibility tracking */}
                <motion.div
                  ref={ref}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.4
                  }}
                  className="mt-12"
                >
                  <ContactButtons className="justify-center" orientation="vertical" currentLang={currentLang} />
                </motion.div>
              </AnimatedSection>
            </div>

            {/* Tagline section */}
            <div className="w-full overflow-hidden">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.6
                }}
                className="container mx-auto px-4 pb-4 md:pb-8"
              >
                <h2 className="font-light tracking-wider text-[#B8A164] text-center flex flex-col md:block
                  text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                >
                  <span className="block md:inline">{t.hero.tagline.line1}</span>
                  <span className="mt-1 md:mt-0 md:inline">
                    <span className="hidden md:inline mx-2">-</span>
                    {t.hero.tagline.line2}
                  </span>
                </h2>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section 
          id="services" 
          className="py-24 relative" 
          aria-labelledby="services-title"
          style={{
            backgroundImage: 'url("/background.jpg")',
            backgroundRepeat: 'repeat',
            backgroundSize: '300px',
          }}
        >
          {/* Light overlay - changed opacity to match portfolio */}
          <div className="absolute inset-0 bg-[#f8f8f8]/75" />
          <div className="container mx-auto px-4 relative">
            <AnimatedSection className="text-center mb-16">
              <h2 id="services-title" className="text-3xl font-light tracking-wide">
                {t.services.title}
              </h2>
            </AnimatedSection>
            
            <div className="space-y-12">
              {t.services.items.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  index={index}
                  reverse={index % 2 !== 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section 
          id="portfolio" 
          className="py-24 relative" 
          style={{
            backgroundImage: 'url("/background.jpg")',
            backgroundRepeat: 'repeat',
            backgroundSize: '300px',
          }}
        >
          {/* Darker overlay */}
          <div className="absolute inset-0 bg-[#f8f8f8]/75" />
          <div className="container mx-auto px-4 relative">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-light tracking-wide">
                PORTFOLIO
              </h2>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioItems.map((item, index) => (
                <PortfolioCard
                  key={item.title}
                  {...item}
                  index={index}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          className="py-24 relative"
          style={{
            backgroundImage: 'url("/background.jpg")',
            backgroundRepeat: 'repeat',
            backgroundSize: '300px',
          }}
        >
          {/* Light overlay */}
          <div className="absolute inset-0 bg-[#f8f8f8]/90" />
          <div className="container mx-auto px-4 relative">
            {/* Title and Description */}
            <div className="mb-12">
              <div className="text-center" ref={textBlockRef}>
                <h2 className="text-3xl font-light tracking-wide mb-4">
                  {t.contact.subtitle}
                </h2>
                <p className="text-neutral-600">{t.contact.description}</p>
              </div>
            </div>

            {/* Contact Information and Form */}
            <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 md:gap-12 mb-12 items-baseline">
              {/* Left Column - Contact Info */}
              <div className="space-y-6 md:space-y-8 md:min-w-[280px] order-2 md:order-1">
                <div>
                  <h2 className="text-xl font-medium mb-4">Adresse</h2>
                  <div className="space-y-2">
                    <p>Tellstrasse 38</p>
                    <p>8004 Zürich</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-4">Öffnungszeiten</h2>
                  <div className="space-y-2">
                    <p>Mo-Fr: 09:00 - 18:00</p>
                    <p>Sa: Nach Vereinbarung</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-4">Kontakt</h2>
                  <div className="space-y-2">
                    <p>info@ateliergruenenwald.ch</p>
                    <p>Tel: +41 44 242 89 80</p>
                    <p>Mobile: +41 79 738 97 51</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="w-full order-1 md:order-2">
                <ContactForm currentLang={currentLang} />
              </div>
            </div>

            {/* Map Section */}
            <AnimatedSection className="container mx-auto px-4">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden mx-auto max-w-[1920px]">
                <ErrorBoundary fallback={<div className="w-full h-full flex items-center justify-center bg-gray-100">Error loading map</div>}>
                  <GoogleMap 
                    apiKey="AIzaSyAEQX-fQYb5MYj9cxHhX46miGsvZ4mTCB8"
                    placeId="ChIJb9WK7SALBQMRecnC-8QFKF4"
                    language={currentLang}
                  />
                </ErrorBoundary>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-white border-t">
          <div className="container mx-auto px-4 text-center text-sm text-neutral-600">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <span>{t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</span>
              <span className="hidden md:inline">•</span>
              <a 
                href={`/${currentLang}/privacy-policy`}
                className="text-[#334B40] hover:text-[#3D5A4C] hover:underline transition-colors"
              >
                {currentLang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
              </a>
            </div>
          </div>
        </footer>
      </div>

      <CookieConsent 
        onAccept={() => {
          console.log('Consent accepted');
          // Additional handling if needed
        }}
        onDecline={() => {
          console.log('Consent declined');
          // Additional handling if needed
        }}
      />

      {/* Floating mobile buttons - only show when hero buttons are out of view */}
      {isMobile && !inView && (
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-[80px] left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b px-4 py-2 md:hidden"
        >
          <ContactButtons className="justify-center" orientation="horizontal" currentLang={currentLang} />
        </motion.div>
      )}
    </>
  );
}