import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, User, Phone } from 'lucide-react';

const translations = {
  de: {
    title: 'Kontaktieren Sie uns',
    name: 'Vollständiger Name',
    email: 'E-Mail',
    phone: 'Telefon (optional)',
    message: 'Ihre Nachricht',
    submit: 'Nachricht senden',
    success: 'Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglichst bei Ihnen.',
    required: 'Pflichtfeld'
  },
  en: {
    title: 'Contact Us',
    name: 'Full Name',
    email: 'Email',
    phone: 'Phone (optional)',
    message: 'Your Message',
    submit: 'Send Message',
    success: 'Thank you for your message! We\'ll get in touch as soon as possible.',
    required: 'Required'
  }
};

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const currentLang = location.pathname.split('/')[1] || 'de';
  const t = translations[currentLang as keyof typeof translations];

  if (isSubmitted) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-white/50 backdrop-blur-sm rounded-lg">
        <p className="text-lg text-[#334B40]">{t.success}</p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="space-y-4 h-full w-full"
      onSubmit={() => setIsSubmitted(true)}
    >
      <input type="hidden" name="form-name" value="contact" />
      <div className="hidden">
        <input name="bot-field" />
      </div>

      <div className="h-full bg-white/50 backdrop-blur-sm rounded-lg">
        <h3 className="text-xl font-medium px-4 md:px-6 pt-4 md:pt-6 mb-4">{t.title}</h3>
        <div className="space-y-4 px-4 md:px-6 pb-4 md:pb-6 h-[calc(100%-4rem)]">
          <div className="relative">
            <div className="absolute left-3 top-3 text-neutral-500">
              <User className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="name"
              required
              placeholder={t.name + ' *'}
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
              placeholder={t.email + ' *'}
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
              placeholder={t.phone}
              className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#334B40] focus:border-transparent transition-all"
            />
          </div>

          <textarea
            name="message"
            required
            placeholder={t.message + ' *'}
            rows={4}
            className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#334B40] focus:border-transparent transition-all resize-none"
          />

          <button
            type="submit"
            className="w-full bg-[#334B40] hover:bg-[#3D5A4C] text-white py-2 px-4 rounded-md transition-colors duration-200"
          >
            {t.submit}
          </button>
        </div>
      </div>
    </form>
  );
} 