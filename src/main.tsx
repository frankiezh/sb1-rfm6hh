import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx'

// Add at the start, before any other consent code
const CONSENT_VERSION = '2';  // Increment this when consent format changes
const storedVersion = localStorage.getItem('consentVersion');

if (storedVersion !== CONSENT_VERSION) {
  // Clear old consent data
  localStorage.removeItem('userConsent');
  localStorage.removeItem('cookieConsent');
  // Set new version
  localStorage.setItem('consentVersion', CONSENT_VERSION);
}

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
