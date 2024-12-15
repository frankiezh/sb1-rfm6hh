import { useState, useEffect, useRef } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Logo } from '@/components/Logo';
import { ServiceCard } from '@/components/ServiceCard';
import { PortfolioCard } from '@/components/PortfolioCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { translations } from '@/lib/translations';
import { Mail, MapPin, Phone, AtSign, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CookieConsent } from '@/components/CookieConsent';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import { ContactButton } from './components/ContactButton';

// Declare dataLayer and gtag for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<'de' | 'en'>('de');
  const t = translations[currentLang];

  const textBlockRef = useRef<HTMLDivElement>(null);
  const [textBlockHeight, setTextBlockHeight] = useState('auto');

  // Create a ref to store the scroll handler
  const scrollHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Create the scroll handler function and store it in the ref
    scrollHandlerRef.current = () => {
      const heroSection = document.querySelector('section');
      const floatingButtons = document.getElementById('floating-buttons');
      
      if (heroSection && floatingButtons) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        requestAnimationFrame(() => {
          if (scrollPosition > heroBottom - 100) {
            floatingButtons.style.transform = 'translateY(0)';
          } else {
            floatingButtons.style.transform = 'translateY(100%)';
          }
        });
      }
    };

    // Add event listener using the ref's current value
    if (scrollHandlerRef.current) {
      window.addEventListener('scroll', scrollHandlerRef.current, { passive: true });
      // Initial check
      scrollHandlerRef.current();
    }

    // Cleanup function
    return () => {
      // Remove event listener using the ref's current value
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Reset floating buttons state
      const floatingButtons = document.getElementById('floating-buttons');
      if (floatingButtons) {
        floatingButtons.style.transform = 'translateY(100%)';
      }
    };
  }, []); // Empty dependency array

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
    e.preventDefault();
    
    // Track conversion with dataLayer
    window.dataLayer?.push({
      'event': 'conversion',
      'conversion_type_variable': 'phone_call'
    });

    // Immediate action
    window.location.href = 'tel:+41797389751';
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Track conversion with dataLayer
    window.dataLayer?.push({
      'event': 'conversion',
      'conversion_type_variable': 'whatsapp_click'
    });

    // Immediate action
    window.location.href = 'https://wa.me/41797389751?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen';
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
  const ContactButtons = ({ className = '', orientation = 'horizontal' }) => (
    <div className={`flex ${orientation === 'vertical' ? 'flex-col md:flex-row' : 'flex-row'} gap-2 ${className}`}>
      <ContactButton 
        type="phone"
        className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-[#334B40] hover:bg-[#3D5A4C] text-white px-4 py-2 rounded-md transition-all duration-200 hover:scale-105 text-sm whitespace-nowrap"
      >
        <Phone className="h-4 w-4" />
        <span className="font-medium">Jetzt anrufen</span>
      </ContactButton>

      <ContactButton 
        type="whatsapp"
        className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-gray-100/95 hover:bg-white text-[#334B40] px-4 py-2 rounded-md transition-all duration-200 hover:scale-105 text-sm whitespace-nowrap"
      >
        <MessageCircle className="h-4 w-4 text-[#25D366]" />
        <span className="font-medium">WhatsApp</span>
      </ContactButton>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Polsterei am HB Zürich | Atelier Grünenwald</title>
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
            "name": "Atelier Grünenwald",
            "image": [
              "url-to-image1.jpg",
              "url-to-image2.jpg"
            ],
            "description": "Expert furniture restoration and antique repair in Zürich.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": t.contact.address.street1,
              "addressLocality": "Zürich",
              "postalCode": "8004",
              "addressCountry": "CH"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 47.37833710898837,
              "longitude": 8.533439776271842
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            }
          })}
        </script>
        <link 
          rel="preload" 
          as="image" 
          href="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace" 
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
              <LanguageSwitcher currentLang={currentLang} onLanguageChange={setCurrentLang} />
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
                <ContactButtons orientation="horizontal" />
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

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-t transform translate-y-full transition-transform duration-300 ease-in-out md:translate-y-full" id="floating-buttons">
          <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3">
            <button
              onClick={handleCallClick}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-[#334B40] hover:bg-[#3D5A4C] text-white px-3 md:px-4 py-1.5 rounded-md transition-all duration-200 hover:scale-105 text-sm whitespace-nowrap"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="font-medium">Jetzt anrufen</span>
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-gray-100/95 hover:bg-white text-[#334B40] px-3 md:px-4 py-1.5 rounded-md transition-all duration-200 hover:scale-105 text-sm whitespace-nowrap"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
              <span className="font-medium">WhatsApp</span>
            </button>
          </div>
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
                  <ContactButtons className="justify-center" orientation="vertical" />
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
            {/* Title and Logo Row */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 mb-12">
              {/* Text block - Use as height reference */}
              <div className="w-full md:flex-1 min-w-0 text-center md:text-left" ref={textBlockRef}>
                <h2 className="text-3xl font-light tracking-wide mb-4">
                  {t.contact.subtitle}
                </h2>
                <p className="text-neutral-600">{t.contact.description}</p>
              </div>
              
              {/* Logo container - Match height with text block */}
              <div className="w-32 md:w-48 flex-shrink-0">
                <img 
                  src="/atelier-gruenenwald-logo.svg"
                  alt="Atelier Grünenwald Logo"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <h2 className="text-xl font-medium mb-4">Adresse</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Mail className="h-5 w-5 flex-shrink-0 mt-1 text-[#334B40]" />
                    <div className="flex-1">
                      <span>{t.contact.address.street1}</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 flex-shrink-0 mt-1 text-[#334B40]" />
                    <div className="flex-1">
                      <span>{t.contact.address.street2}</span>
                    </div>
                  </div>
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
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <AtSign className="h-5 w-5 flex-shrink-0 text-[#334B40]" />
                    <span>info@ateliergruenenwald.ch</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 flex-shrink-0 text-[#334B40]" />
                    <span>+41 44 242 89 80</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width Map */}
            <AnimatedSection>
              <div className="aspect-[21/9] w-full overflow-hidden rounded-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.3685467436644!2d8.533439776271842!3d47.37833710898837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a0e1b77b6c7%3A0x6a4d8a746db7c848!2sLagerstrasse%2093%2C%208004%20Z%C3%BCrich!5e0!3m2!1sen!2sch!4v1708732246399!5m2!1sen!2sch"
                  className="w-full h-full"
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-white border-t">
          <div className="container mx-auto px-4 text-center text-sm text-neutral-600">
            {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
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
          <ContactButtons className="justify-center" orientation="horizontal" />
        </motion.div>
      )}
    </>
  );
}