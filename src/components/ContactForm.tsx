import { useState } from 'react';
import { Mail, User, Phone } from 'lucide-react';
import { translations } from '@/lib/translations';
import { useLocation } from 'react-router-dom';

interface ContactFormProps {
  isDialog?: boolean;
  currentLang?: 'de' | 'en';
}

export function ContactForm({ isDialog = false, currentLang }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const lang = currentLang || location.pathname.split('/')[1] || 'de';
  const t = translations[lang as keyof typeof translations];

  if (isSubmitted) {
    const successMessage = currentLang === 'de' 
      ? 'Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglichst bei Ihnen.'
      : 'Thank you for your message! We\'ll get back to you as soon as possible.';

    return (
      <div className={`flex items-center justify-center p-8 ${!isDialog ? 'h-full bg-white/50 backdrop-blur-sm rounded-lg' : ''}`}>
        <p className="text-lg text-[#334B40]">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className={`space-y-4 w-full ${!isDialog ? 'h-full' : ''}`}
    >
      <input type="hidden" name="form-name" value="contact" />
      <div className="hidden">
        <input name="bot-field" />
      </div>

      <div className="h-full bg-white/50 backdrop-blur-sm rounded-lg">
        <h3 className="text-xl font-medium px-4 md:px-6 pt-4 md:pt-4 mb-4">
          {currentLang === 'de' ? 'Kontaktieren Sie uns' : 'Contact Us'}
        </h3>
        <div className="space-y-4 px-4 md:px-6 pb-4 md:pb-6">
          <div className="relative">
            <div className="absolute left-3 top-3 text-neutral-500">
              <User className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="name"
              required
              placeholder={`${currentLang === 'de' ? 'Vollständiger Name' : 'Full Name'} *`}
              className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#334B40] focus:border-transparent transition-all"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-3 text-neutral-500">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="E-Mail *"
              className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#334B40] focus:border-transparent transition-all"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-3 text-neutral-500">
              <Phone className="h-5 w-5" />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder={`${currentLang === 'de' ? 'Telefon (optional)' : 'Phone (optional)'}`}
              className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#334B40] focus:border-transparent transition-all"
            />
          </div>

          <textarea
            name="message"
            required
            placeholder={`${currentLang === 'de' ? 'Ihre Nachricht' : 'Your Message'} *`}
            rows={4}
            className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#334B40] focus:border-transparent transition-all resize-none"
          />

          <button
            type="submit"
            className={`w-full bg-[#334B40] hover:bg-[#3D5A4C] text-white py-2 px-4 rounded-md transition-colors duration-200`}
          >
            {currentLang === 'de' ? 'Nachricht senden' : 'Send Message'}
          </button>
        </div>
      </div>
    </form>
  );
} 