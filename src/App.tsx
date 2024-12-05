import { useState, useEffect } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Logo } from '@/components/Logo';
import { ServiceCard } from '@/components/ServiceCard';
import { PortfolioCard } from '@/components/PortfolioCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { translations } from '@/lib/translations';
import { Mail, MapPin, Phone, AtSign, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function App() {
  const [currentLang, setCurrentLang] = useState<'de' | 'en'>('de');
  const t = translations[currentLang];

  useEffect(() => {
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      // Clean up
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section') as HTMLElement;
      const floatingButtons = document.getElementById('floating-buttons');
      
      if (heroSection && floatingButtons) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > heroBottom) {
          floatingButtons.style.transform = 'translateY(0)';
        } else {
          floatingButtons.style.transform = 'translateY(100%)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const portfolioItems = t.portfolio.items.map(item => {
    if (item.type === 'before-after') {
      return {
        ...item,
        type: 'before-after' as const,
        imageBefore: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90',
        imageAfter: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41',
        keywords: ['antique restoration', 'furniture repair', 'upholstery'] as string[]
      };
    }
    return {
      ...item,
      type: 'showcase' as const,
      image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc',
      keywords: ['antique restoration', 'furniture repair', 'upholstery'] as string[]
    };
  });

  const handleCallClick = () => {
    trackEvent({
      action: 'phone_call',
      category: 'Contact',
      label: 'Header Call Button'
    });
  };

  const handleWhatsAppClick = () => {
    trackEvent({
      action: 'whatsapp_click',
      category: 'Contact',
      label: 'Header WhatsApp Button'
    });
  };

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
      </Helmet>
      
      <div className="min-h-screen bg-[#f8f8f8] text-neutral-800">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12">
                <Logo />
              </div>
              <LanguageSwitcher currentLang={currentLang} onLanguageChange={setCurrentLang} />
            </div>
            
            <div className="flex items-center">
              <nav className="hidden md:flex items-center space-x-8 text-sm font-medium" aria-label="Main navigation">
                <a href="#services" className="hover:text-neutral-500 transition" aria-label="View our services">
                  {t.nav.services}
                </a>
                <a href="#portfolio" className="hover:text-neutral-500 transition">{t.nav.portfolio}</a>
                <a href="#contact" className="hover:text-neutral-500 transition">{t.nav.contact}</a>
              </nav>
            </div>
          </div>
        </header>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-t transform md:translate-y-full transition-transform duration-300 ease-in-out" id="floating-buttons">
          <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3">
            <a
              href="tel:+41797389751"
              onClick={handleCallClick}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-[#2A3C35] hover:bg-[#374F45] text-white px-3 md:px-4 py-1.5 rounded-md transition-all duration-200 hover:scale-105 text-sm whitespace-nowrap"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="font-medium">Jetzt anrufen</span>
            </a>

            <a
              href="https://wa.me/41797389751?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-[#4A665B] hover:bg-[#5B7D6F] text-white px-3 md:px-4 py-1.5 rounded-md transition-all duration-200 hover:scale-105 text-sm whitespace-nowrap"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
              <span className="font-medium">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
              alt="Luxury Furniture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center text-white">
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
                <h1 className="text-3xl md:text-5xl font-light tracking-wider mb-2">
                  Polsterei am HB Zürich
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

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.4
                }}
                className="flex flex-col md:flex-row items-center justify-center gap-3 mt-12"
              >
                <a
                  href="tel:+41797389751"
                  onClick={handleCallClick}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#2A3C35] hover:bg-[#374F45] text-white px-5 md:px-6 py-2 rounded-md transition-all duration-200 hover:scale-105 text-sm md:text-base whitespace-nowrap"
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">Jetzt anrufen</span>
                </a>

                <a
                  href="https://wa.me/41797389751?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-[#4A665B] px-5 md:px-6 py-2 rounded-md transition-all duration-200 hover:scale-105 text-sm md:text-base whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span className="font-medium">WhatsApp</span>
                </a>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24" aria-labelledby="services-title">
          <div className="container mx-auto px-4">
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
                />
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-light tracking-wide">PORTFOLIO</h2>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioItems.map((item, index) => (
                <PortfolioCard
                  key={item.title}
                  {...item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24">
          <div className="container mx-auto px-4">
            {/* Title and Logo Row */}
            <div className="flex items-stretch justify-between gap-12 mb-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-light tracking-wide">{t.contact.subtitle}</h2>
                <p className="text-neutral-600 max-w-2xl">{t.contact.description}</p>
              </div>
              <div className="flex items-center" style={{ transform: 'scale(1.5)' }}>
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%2018%20copy-mkGJ2YCAJdOhaws0ST1zvrqbmvcE3d.svg"
                  alt="Atelier Grünenwald Logo"
                  className="h-full w-auto flex-shrink-0 min-h-[80px]"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <h2 className="text-xl font-medium mb-4">Adresse</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <span>{t.contact.address.street1}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <span>{t.contact.address.street2}</span>
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
                    <AtSign className="h-5 w-5 flex-shrink-0" />
                    <span>info@ateliergruenenwald.ch</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 flex-shrink-0" />
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
    </>
  );
}