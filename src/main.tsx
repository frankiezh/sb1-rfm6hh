import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx'

function setInitialConsent() {
  const storedConsent = localStorage.getItem('cookieConsent');
  const initialConsent = storedConsent === 'accepted' ? 'granted' : 'denied';
  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'consent': {
      'ad_storage': initialConsent,
      'analytics_storage': initialConsent,
      'ad_personalization': initialConsent,
      'ad_user_data': initialConsent
    }
  });
}

setInitialConsent();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
)
