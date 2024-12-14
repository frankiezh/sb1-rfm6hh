import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx'

function setInitialConsent() {
  // get stored consent from local storage
  const storedConsent = localStorage.getItem('userConsent');
  const initialConsent = storedConsent === 'granted' ? 'granted' : 'denied';
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
