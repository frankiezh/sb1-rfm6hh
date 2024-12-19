import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
          <Route path="/" element={<Navigate to="/de/" replace />} />
          
          <Route path="/de/*" element={<App defaultLang="de" />} />
          <Route path="/en/*" element={<App defaultLang="en" />} />
          
          <Route path="/:lang/privacy-policy" element={<PrivacyPolicy />} />
          
          <Route path="*" element={<Navigate to="/de/" replace />} />
        </Routes>
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
)
