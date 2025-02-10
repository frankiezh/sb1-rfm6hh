import { useState, useEffect } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Logo } from '@/components/Logo';
import { ServiceCard } from '@/components/ServiceCard';
import { PortfolioCard } from '@/components/PortfolioCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { translations } from '@/lib/translations';
import { Mail, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import { ContactButton } from './components/ContactButton';
import { GoogleMap } from './components/GoogleMap';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ContactForm } from '@/components/ContactForm';
import { ContactDialog } from '@/components/ContactDialog';
import { TrackedPhoneNumber } from '@/components/TrackedPhoneNumber';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

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
  const [currentLang] = useState<'de' | 'en'>(defaultLang);
  const t = translations[currentLang];

  // Move settings here to access t
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7500,
    fade: true,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    lazyLoad: undefined,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false
        }
      }
    ],
    initialSlide: Math.floor(Math.random() * t.hero.slides.length),
    beforeChange: (current: number, next: number) => {
      // Current slide continues zooming
      const currentSlide = document.querySelector(
        `.slick-slide[data-index="${current}"] img`
      );
      if (currentSlide) {
        currentSlide.classList.remove('zoom-active');
        currentSlide.classList.add('zoom-next');
      }

      // Next slide starts from active state
      const nextSlide = document.querySelector(
        `.slick-slide[data-index="${next}"] img`
      );
      if (nextSlide) {
        nextSlide.classList.add('zoom-active');
      }
    },
    afterChange: (current: number) => {
      // Clean up after transition
      document.querySelectorAll('.hero-carousel .slick-slide img').forEach(img => {
        img.classList.remove('zoom-next');
      });
    },
    onInit: () => {
      // Force initial zoom on first load with a slightly longer delay
      setTimeout(() => {
        const firstSlide = document.querySelector('.hero-carousel .slick-current img');
        if (firstSlide) {
          firstSlide.classList.add('zoom-active');
        }
      }, 100);  // Increased from 0 to 100ms
    },
    onReInit: () => {
      const currentSlide = document.querySelector('.hero-carousel .slick-current img');
      if (currentSlide) {
        currentSlide.classList.add('zoom-active');
      }
    }
  };

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
    window.dataLayer?.push({
      'event': 'conversion',
      'conversion_type_variable': 'phone_call'
    });
    window.location.href = 'tel:+41797389751';
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dataLayer?.push({
      'event': 'conversion',
      'conversion_type_variable': 'whatsapp_click'
    });
    window.location.href = 'https://wa.me/41797389751?text=...';
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

  // Keep these handlers as they're used in CookieConsent component
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
  };

  // Add state for mobile menu if you need it
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add toggle handler
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <>
      <style>
        {`
          .hero-carousel .slick-slide > div {
            height: 100vh;
          }
          /* Base state with slower movement */
          .hero-carousel .slick-slide img {
            transform: scale(1.05) translate(-4%, -1%);
            transition: transform 15s linear;
            will-change: transform;
          }
          /* Active slide with slower speeds */
          .hero-carousel .slick-slide img.zoom-active {
            transform: scale(1.3) translate(4%, 1%);
            transition: 
              transform 15s linear,
              scale 10s linear;
          }
          /* Next slide continues the slower movement */
          .hero-carousel .slick-slide img.zoom-next {
            transform: scale(1.5) translate(8%, 2%);
            transition: 
              transform 15s linear,
              scale 10s linear;
          }
        `}
      </style>

      <Helmet>
        <title>Polsterei am HB Zürich | Atelier Grünenwald</title>
        
        {/* Language meta tags */}
        <html lang={currentLang} />
        <link rel="alternate" hrefLang="de" href={`https://polsterei-hb-zuerich.ch/de${window.location.pathname.replace(/^\/(de|en)/, '')}`} />
        <link rel="alternate" hrefLang="en" href={`https://polsterei-hb-zuerich.ch/en${window.location.pathname.replace(/^\/(de|en)/, '')}`} />
        <link rel="alternate" hrefLang="x-default" href="https://polsterei-hb-zuerich.ch/de/" />
        
        {/* Fix canonical URL to be language-specific */}
        <link rel="canonical" href={`https://polsterei-hb-zuerich.ch${window.location.pathname}`} />
        
        <meta name="description" content="Professionelle Polsterei in Zürich. Traditionelle Polsterarbeiten, Möbelrestaurierung und Neubezüge. 2 Minuten vom Hauptbahnhof Zürich." />
        <meta name="keywords" content="polsterei zürich, polsterer zürich, möbelpolsterei, polsterarbeiten, möbelrestaurierung, hb zürich" />
        
        {/* Update og:url to match canonical */}
        <meta property="og:title" content="Polsterei am HB Zürich | Atelier Grünenwald" />
        <meta property="og:description" content="Professionelle Polsterei in Zürich. 2 Minuten vom Hauptbahnhof." />
        <meta property="og:image" content="/path-to-your-logo-or-featured-image.jpg" />
        <meta property="og:url" content={`https://polsterei-hb-zuerich.ch${window.location.pathname}`} />
        
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
          type="image/webp"
          href={`/images/hero/${t.hero.slides[0].imageId}-large.webp`}
          media="(min-width: 1280px)"
        />
        <link 
          rel="preload" 
          as="image"
          type="image/webp"
          href="/images/hero/upholstery-workshop-zurich-medium.webp"
          media="(min-width: 768px) and (max-width: 1279px)"
        />
        <link 
          rel="preload" 
          as="image"
          type="image/jpeg"
          href="/images/hero/fallback/upholstery-workshop-zurich-small.jpg"
          media="(max-width: 767px)"
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
                onClick={toggleMobileMenu}
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
            <a href="#services" className="text-[#2B1810] hover:text-[#334B40] transition" onClick={toggleMobileMenu}>{t.nav.services}</a>
            <a href="#portfolio" className="text-[#2B1810] hover:text-[#334B40] transition" onClick={toggleMobileMenu}>{t.nav.portfolio}</a>
            <a href="#contact" className="text-[#2B1810] hover:text-[#334B40] transition" onClick={toggleMobileMenu}>{t.nav.contact}</a>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative h-screen">
          {/* Carousel container */}
          <div className="absolute inset-0">
            <Slider {...settings} className="hero-carousel h-full">
              {t.hero.slides.map((slide, index) => (
                <div key={index} className="relative h-full overflow-hidden">
                  <picture>
                    <source
                      media="(min-width: 1280px)"
                      srcSet={`/images/hero/${slide.imageId}-large.webp`}
                      type="image/webp"
                    />
                    <source
                      media="(min-width: 768px)"
                      srcSet={`/images/hero/${slide.imageId}-medium.webp`}
                      type="image/webp"
                    />
                    <source
                      srcSet={`/images/hero/${slide.imageId}-small.webp`}
                      type="image/webp"
                    />
                    <img
                      src={`/images/hero/fallback/${slide.imageId}-small.jpg`}
                      alt={slide.alt}
                      className={`w-full h-full object-cover object-center ${index === 0 ? 'zoom-active' : ''}`}
                      style={{ minHeight: '100vh' }}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              ))}
            </Slider>
          </div>

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between py-8 md:py-12">
            <div className="flex-1 flex items-center justify-center">
              <AnimatedSection className="text-center w-full px-4">
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <h1 className="text-2xl md:text-4xl font-light tracking-wider mb-2 text-white whitespace-normal">
                    {t.hero.title}
                  </h1>
                  <div className="relative mt-2">
                    <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-sm md:text-base font-light tracking-wider opacity-80 text-white hidden md:block">
                      by
                    </span>
                    <h2 className="text-3xl md:text-6xl font-light tracking-wider text-white whitespace-normal px-4 md:px-0">
                      {t.hero.subtitle}
                    </h2>
                  </div>
                </motion.div>

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

            {/* Tagline at bottom - adjusted for mobile */}
            <div className="w-full overflow-hidden px-4 md:px-0">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="container mx-auto pb-4 md:pb-8"
              >
                <h2 className="font-light tracking-wider text-[#B8A164] text-center
                  text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl"
                >
                  <span className="block md:inline">{t.hero.tagline.line1}</span>
                  <span className="block mt-1 md:mt-0 md:inline">
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
              <div className="text-center" ref={ref}>
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
                  <h2 className="text-xl font-medium mb-4">{currentLang === 'de' ? 'Adresse' : 'Address'}</h2>
                  <div className="space-y-2">
                    <p>Tellstrasse 38</p>
                    <p>8004 Zürich</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-4">{currentLang === 'de' ? 'Öffnungszeiten' : 'Opening Hours'}</h2>
                  <div className="space-y-2">
                    <p>{currentLang === 'de' ? 'Mo-Fr: 09:00 - 18:00' : 'Mon-Fri: 09:00 - 18:00'}</p>
                    <p>{currentLang === 'de' ? 'Sa: Nach Vereinbarung' : 'Sat: By appointment'}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-4">{currentLang === 'de' ? 'Kontakt' : 'Contact'}</h2>
                  <div className="space-y-2">
                    <p>info@ateliergruenenwald.ch</p>
                    <div className="flex">
                      <span className="w-16">Tel:</span>
                      <TrackedPhoneNumber number="+41442428980" className="hover:text-[#334B40] transition-colors">
                        +41 44 242 89 80
                      </TrackedPhoneNumber>
                    </div>
                    <div className="flex">
                      <span className="w-16">Mobile:</span>
                      <TrackedPhoneNumber number="+41797389751" className="hover:text-[#334B40] transition-colors">
                        +41 79 738 97 51
                      </TrackedPhoneNumber>
                    </div>
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
                  <div>
                    {console.log('Env var in App:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY)}
                    <GoogleMap 
                      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                      placeId="ChIJb9WK7SALBQMRecnC-8QFKF4"
                      language={currentLang}
                    />
                  </div>
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
        location="bottom"
        buttonText={t.buttons.accept}
        declineButtonText={t.buttons.decline}
        cookieName="myAppConsentCookie"
        style={{ 
          background: "#334B40",  // Dark green background matching your theme
          padding: "1rem",
          alignItems: "center",
          gap: "1rem"
        }}
        buttonStyle={{ 
          background: "#FFFFFF",  // White background for accept button
          color: "#334B40",      // Dark green text
          fontSize: "14px",
          fontWeight: "500",
          padding: "0.5rem 1.5rem",
          borderRadius: "0.375rem",
          border: "none"
        }}
        declineButtonStyle={{
          background: "transparent", // Transparent background for decline button
          color: "#FFFFFF",         // White text
          fontSize: "14px",
          fontWeight: "500",
          padding: "0.5rem 1.5rem",
          borderRadius: "0.375rem",
          border: "1px solid #FFFFFF"
        }}
        expires={150}
        enableDeclineButton
        flipButtons
        onAccept={handleAcceptCookies}
        onDecline={handleDeclineCookies}
        sameSite="strict"
        debug={process.env.NODE_ENV === 'development'}
      >
        <span style={{ 
          fontSize: "14px",
          color: "#FFFFFF"
        }}>
          {t.cookieConsent.message}
        </span>
      </CookieConsent>

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