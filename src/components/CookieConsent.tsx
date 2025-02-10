import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { setConsent } from '@/lib/consent';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const currentLang = location.pathname.split('/')[1] || 'de';

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);

    setConsent({
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_personalization: 'granted',
      ad_user_data: 'granted'
    });

    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    setConsent({
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_personalization: 'denied',
      ad_user_data: 'denied'
    });
    onDecline();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern. 
              Mit der Nutzung unserer Website stimmen Sie unserer 
              <a href={`/${currentLang}/privacy-policy`} className="text-[#334B40] hover:underline mx-1">Datenschutzerklärung</a>
              zu.
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
              >
                Ablehnen
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm bg-[#334B40] hover:bg-[#3D5A4C] text-white rounded-md transition"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 