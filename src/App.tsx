import { useState } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Logo } from '@/components/Logo';
import { ServiceCard } from '@/components/ServiceCard';
import { PortfolioCard } from '@/components/PortfolioCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { translations } from '@/lib/translations';
import { Mail, MapPin, Instagram } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<'de' | 'en'>('de');
  const t = translations[currentLang];

  const portfolioItems = [
    {
      title: 'Victorian Chair Restoration',
      description: 'Complete restoration of a Victorian era chair, including structural repairs and reupholstery.',
      imageBefore: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90',
      imageAfter: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41'
    },
    {
      title: 'Art Deco Sofa',
      description: 'Preservation and reupholstery of an Art Deco period sofa using period-appropriate materials.',
      imageBefore: 'https://images.unsplash.com/photo-1493150134366-cacb0bdc03fe',
      imageAfter: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a'
    },
    {
      title: 'Antique Cabinet',
      description: 'Detailed restoration of an 18th century cabinet, including veneer repair and finish renewal.',
      imageBefore: 'https://images.unsplash.com/photo-1530603907829-659dc4bd558f',
      imageAfter: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2'
    },
    {
      title: 'Mid-Century Modern Chair',
      description: 'Sympathetic restoration of a classic mid-century modern chair design.',
      imageBefore: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8',
      imageAfter: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91'
    }
  ];

  return (
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
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#services" className="hover:text-neutral-500 transition">{t.nav.services}</a>
            <a href="#portfolio" className="hover:text-neutral-500 transition">{t.nav.portfolio}</a>
            <a href="#contact" className="hover:text-neutral-500 transition">{t.nav.contact}</a>
          </nav>
        </div>
      </header>

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
          <AnimatedSection className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide">
              {t.hero.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-wide">{t.services.title}</h2>
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
                title={item.title}
                description={item.description}
                imageBefore={item.imageBefore}
                imageAfter={item.imageAfter}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-light tracking-wide">{t.contact.title}</h2>
                <h3 className="text-xl font-medium">{t.contact.subtitle}</h3>
                <p className="text-neutral-600">{t.contact.description}</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-medium">{t.contact.companyName}</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>{t.contact.address.street1}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{t.contact.address.street2}</span>
                  </div>
                  <div className="flex items-center space-x-2 pl-7">
                    <span>{t.contact.address.city}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Instagram className="h-5 w-5" />
                  <span>{t.contact.social.instagram}</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
  <div className="aspect-[4/3] w-full h-[450px] overflow-hidden rounded-lg">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-sm text-neutral-600">
          {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
        </div>
      </footer>
    </div>
  );
}