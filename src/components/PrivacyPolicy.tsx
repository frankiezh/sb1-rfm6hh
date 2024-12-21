import { AnimatedSection } from './AnimatedSection';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';

const translations = {
  de: {
    back: 'Zurück',
    title: 'Datenschutzerklärung',
    cookieSettings: 'Cookie-Einstellungen',
    cookieQuestion: 'Möchten Sie die Verwendung von Cookies auf unserer Website erlauben?',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
    content: {
      responsible: {
        title: '1. Verantwortliche Person',
        text: `Atelier Grünenwald\nGottfried Grünenwald\nTellstrasse 38\n8004 Zürich\nMobile: 079 738 97 51`
      },
      dataProcessing: {
        title: '2. Erhebung und Verarbeitung personenbezogener Daten',
        text: 'Wir erheben, verarbeiten und nutzen Ihre personenbezogenen Daten nur mit Ihrer Einwilligung bzw. wenn eine Rechtsvorschrift dies erlaubt. Wir erheben und verarbeiten Ihre personenbezogenen Daten nur, soweit dies für die Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.'
      },
      cookies: {
        title: '3. Cookies und Analysedienste',
        subtitle1: '3.1 Cookies',
        text1: 'Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Einige sind technisch notwendig (essenzielle Cookies), während andere der Verbesserung Ihres Online-Erlebnisses dienen.',
        subtitle2: '3.2 Google Analytics',
        text2: 'Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Ireland Limited. Google Analytics verwendet Cookies, die eine Analyse der Benutzung der Website durch Sie ermöglichen.',
        text3: 'Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Wir haben die IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird.'
      },
      rights: {
        title: '4. Ihre Rechte',
        intro: 'Sie haben folgende Rechte:',
        list: [
          'Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten',
          'Recht auf Berichtigung unrichtiger Daten',
          'Recht auf Löschung der Daten',
          'Recht auf Einschränkung der Datenverarbeitung',
          'Recht auf Datenübertragbarkeit',
          'Recht auf Widerruf erteilter Einwilligungen',
          'Beschwerderecht bei der zuständigen Aufsichtsbehörde'
        ]
      },
      withdrawal: {
        title: '5. Widerruf Ihrer Einwilligung zur Datenverarbeitung',
        text: 'Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.'
      },
      security: {
        title: '6. SSL- bzw. TLS-Verschlüsselung',
        text: 'Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt.'
      },
      changes: {
        title: '7. Änderungen dieser Datenschutzerklärung',
        text: 'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services.'
      }
    },
    lastUpdated: 'Stand: März 2024'
  },
  en: {
    back: 'Back',
    title: 'Privacy Policy',
    cookieSettings: 'Cookie Settings',
    cookieQuestion: 'Would you like to allow the use of cookies on our website?',
    accept: 'Accept',
    decline: 'Decline',
    content: {
      responsible: {
        title: '1. Responsible Person',
        text: `Atelier Grünenwald\nGottfried Grünenwald\nTellstrasse 38\n8004 Zurich\nMobile: +41 79 738 97 51`
      },
      dataProcessing: {
        title: '2. Collection and Processing of Personal Data',
        text: 'We collect, process, and use your personal data only with your consent or if permitted by law. We collect and process your personal data only to the extent necessary to provide a functional website and our content and services.'
      },
      cookies: {
        title: '3. Cookies and Analytics Services',
        subtitle1: '3.1 Cookies',
        text1: 'Our website uses cookies. Cookies are small text files that are stored on your device. Some are technically necessary (essential cookies), while others serve to improve your online experience.',
        subtitle2: '3.2 Google Analytics',
        text2: 'This website uses Google Analytics, a web analytics service provided by Google Ireland Limited. Google Analytics uses cookies to analyze your use of the website.',
        text3: 'The information generated by the cookie about your use of this website is usually transmitted to and stored by Google on servers in the United States. We have activated IP anonymization, which means your IP address will be truncated by Google within member states of the European Union or other parties to the Agreement on the European Economic Area.'
      },
      rights: {
        title: '4. Your Rights',
        intro: 'You have the following rights:',
        list: [
          'Right to access information about your stored personal data',
          'Right to rectification of incorrect data',
          'Right to erasure of data',
          'Right to restriction of data processing',
          'Right to data portability',
          'Right to withdraw given consent',
          'Right to lodge a complaint with the competent supervisory authority'
        ]
      },
      withdrawal: {
        title: '5. Withdrawal of Your Consent to Data Processing',
        text: 'Many data processing operations are only possible with your express consent. You can withdraw consent that you have already given at any time. The legality of the data processing carried out until the withdrawal remains unaffected by the withdrawal.'
      },
      security: {
        title: '6. SSL or TLS Encryption',
        text: 'This site uses SSL or TLS encryption for security reasons. You can recognize an encrypted connection by the fact that the browser address line changes from "http://" to "https://".'
      },
      changes: {
        title: '7. Changes to this Privacy Policy',
        text: 'We reserve the right to adapt this privacy policy so that it always complies with current legal requirements or to implement changes to our services in the privacy policy, e.g., when introducing new services.'
      }
    },
    lastUpdated: 'Last updated: March 2024'
  }
};

export function PrivacyPolicy() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = location.pathname.split('/')[1] as 'de' | 'en';
  const t = translations[currentLang];
  const hasConsent = localStorage.getItem('cookieConsent');

  const handleLanguageSwitch = () => {
    const newLang = currentLang === 'de' ? 'en' : 'de';
    const newPath = location.pathname.replace(`/${currentLang}/`, `/${newLang}/`);
    navigate(newPath);
  };

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    window.dataLayer.push({
      'event': 'user_consent_granted',
      'consent': {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_personalization': 'granted',
        'ad_user_data': 'granted'
      }
    });
    navigate(`/${currentLang}/`);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    window.dataLayer.push({
      'event': 'user_consent_denied',
      'consent': {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_personalization': 'denied',
        'ad_user_data': 'denied'
      }
    });
    navigate(`/${currentLang}/`);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate(`/${currentLang}/`)}
            className="flex items-center gap-2 text-[#2B1810] hover:text-[#334B40] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.back}</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLanguageSwitch}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#334B40] hover:text-[#3D5A4C] transition"
            >
              <Globe className="h-4 w-4" />
              <span>{currentLang === 'de' ? 'English' : 'Deutsch'}</span>
            </button>

            {hasConsent && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
                >
                  {t.decline}
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 text-sm bg-[#334B40] hover:bg-[#3D5A4C] text-white rounded-md transition"
                >
                  {t.accept}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <h1 className="text-3xl font-light mb-8">{t.title}</h1>
            
            <div className="prose prose-sm md:prose-lg prose-slate max-w-none">
              <h2>{t.content.responsible.title}</h2>
              <p className="whitespace-pre-line">
                {t.content.responsible.text}
              </p>

              <h2>{t.content.dataProcessing.title}</h2>
              <p>{t.content.dataProcessing.text}</p>

              <h2>{t.content.cookies.title}</h2>
              <h3>{t.content.cookies.subtitle1}</h3>
              <p>{t.content.cookies.text1}</p>

              <h3>{t.content.cookies.subtitle2}</h3>
              <p>{t.content.cookies.text2}</p>
              <p>{t.content.cookies.text3}</p>

              <h2>{t.content.rights.title}</h2>
              <p>{t.content.rights.intro}</p>
              <ul>
                {t.content.rights.list.map((right, index) => (
                  <li key={index}>{right}</li>
                ))}
              </ul>

              <h2>{t.content.withdrawal.title}</h2>
              <p>{t.content.withdrawal.text}</p>

              <h2>{t.content.security.title}</h2>
              <p>{t.content.security.text}</p>

              <h2>{t.content.changes.title}</h2>
              <p>{t.content.changes.text}</p>

              <p className="mt-8 text-sm text-gray-600">
                {t.lastUpdated}
              </p>
            </div>

            {!hasConsent && (
              <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border">
                <h2 className="text-xl font-medium mb-4">{t.cookieSettings}</h2>
                <p className="text-gray-600 mb-6">
                  {t.cookieQuestion}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDecline}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
                  >
                    {t.decline}
                  </button>
                  <button
                    onClick={handleAccept}
                    className="px-4 py-2 text-sm bg-[#334B40] hover:bg-[#3D5A4C] text-white rounded-md transition"
                  >
                    {t.accept}
                  </button>
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
} 