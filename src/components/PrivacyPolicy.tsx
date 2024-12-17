import { AnimatedSection } from './AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
  const navigate = useNavigate();
  const hasConsent = localStorage.getItem('cookieConsent');

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
    navigate('/');
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
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] debug">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#2B1810] hover:text-[#334B40] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Zurück</span>
          </button>

          {hasConsent && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
              >
                Cookies ablehnen
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm bg-[#334B40] hover:bg-[#3D5A4C] text-white rounded-md transition"
              >
                Cookies akzeptieren
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="pt-24 pb-16 debug-inner">
        <div className="container mx-auto px-4 md:px-6 debug-container">
          <AnimatedSection className="debug-section">
            <h1 className="text-3xl font-light mb-8">Datenschutzerklärung</h1>
            
            <div className="prose prose-sm md:prose-lg prose-slate max-w-none">
              <h2>1. Verantwortliche Person</h2>
              <p>
                Atelier Grünenwald<br />
                Gottfried Grünenwald<br />
                Tellstrasse 38<br />
                8004 Zürich<br />
                Mobile: 079 738 97 51
              </p>

              <h2>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
              <p>
                Wir erheben, verarbeiten und nutzen Ihre personenbezogenen Daten nur mit Ihrer Einwilligung bzw. 
                wenn eine Rechtsvorschrift dies erlaubt. Wir erheben und verarbeiten Ihre personenbezogenen Daten 
                nur, soweit dies für die Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und 
                Leistungen erforderlich ist.
              </p>

              <h2>3. Cookies und Analysedienste</h2>
              <h3>3.1 Cookies</h3>
              <p>
                Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert 
                werden. Einige sind technisch notwendig (essenzielle Cookies), während andere der Verbesserung Ihres 
                Online-Erlebnisses dienen.
              </p>

              <h3>3.2 Google Analytics</h3>
              <p>
                Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Ireland Limited. Google Analytics 
                verwendet Cookies, die eine Analyse der Benutzung der Website durch Sie ermöglichen.
              </p>
              <p>
                Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an 
                einen Server von Google in den USA übertragen und dort gespeichert. Wir haben die IP-Anonymisierung 
                aktiviert, sodass Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder 
                in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird.
              </p>
              <p>
                Google wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über 
                die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung 
                verbundene Dienstleistungen uns gegenüber zu erbringen.
              </p>

              <h2>4. Ihre Rechte</h2>
              <p>Sie haben folgende Rechte:</p>
              <ul>
                <li>Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten</li>
                <li>Recht auf Berichtigung unrichtiger Daten</li>
                <li>Recht auf Löschung der Daten</li>
                <li>Recht auf Einschränkung der Datenverarbeitung</li>
                <li>Recht auf Datenübertragbarkeit</li>
                <li>Recht auf Widerruf erteilter Einwilligungen</li>
                <li>Beschwerderecht bei der zuständigen Aufsichtsbehörde</li>
              </ul>

              <h2>5. Widerruf Ihrer Einwilligung zur Datenverarbeitung</h2>
              <p>
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können 
                eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf 
                erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>

              <h2>6. SSL- bzw. TLS-Verschlüsselung</h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte 
                Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt.
              </p>

              <h2>7. Änderungen dieser Datenschutzerklärung</h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen 
                Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, 
                z.B. bei der Einführung neuer Services.
              </p>

              <p className="mt-8 text-sm text-gray-600">
                Stand: März 2024
              </p>
            </div>

            {!hasConsent && (
              <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border">
                <h2 className="text-xl font-medium mb-4">Cookie-Einstellungen</h2>
                <p className="text-gray-600 mb-6">
                  Möchten Sie die Verwendung von Cookies auf unserer Website erlauben?
                </p>
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
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
} 