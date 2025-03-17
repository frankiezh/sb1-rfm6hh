import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { initializeGTM } from './lib/gtm.ts'
// Lazy load non-critical component
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));

// Register service worker for PWA support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        if (process.env.NODE_ENV === 'development') {
          console.log('SW registered: ', registration);
        }
      })
      .catch(registrationError => {
        console.error('SW registration failed: ', registrationError);
      });
  });
}

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

// Loading component for Suspense fallback
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
    <div className="animate-pulse w-16 h-16 rounded-full bg-[#334B40]/30"></div>
  </div>
);

// Simplified critical resource loading
const prefetchCriticalResources = () => {
  // ONLY preload the truly critical hero image
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = '/images/hero/upholstery-workshop-zurich-large.webp';
  link.as = 'image';
  link.type = 'image/webp';
  document.head.appendChild(link);
};

// Replace existing prefetch function with this simplified one
prefetchCriticalResources();

// After registering the service worker
initializeGTM();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to="/de/" replace />} />
            
            <Route path="/de/*" element={<App defaultLang="de" />} />
            <Route path="/en/*" element={<App defaultLang="en" />} />
            
            <Route path="/:lang/privacy-policy" element={<PrivacyPolicy />} />
            
            <Route path="*" element={<Navigate to="/de/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
)
