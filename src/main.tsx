import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx'

// Add this before rendering
const storedConsent = localStorage.getItem('userConsent');
if (storedConsent === 'accepted') {
  localStorage.setItem('userConsent', 'granted');
} else if (storedConsent === 'declined') {
  localStorage.setItem('userConsent', 'denied');
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
