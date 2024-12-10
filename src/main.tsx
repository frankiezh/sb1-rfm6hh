import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <Helmet>
      <meta name="robots" content="noindex,nofollow" />
      <meta name="googlebot" content="noindex,nofollow" />
    </Helmet>
    <App />
  </HelmetProvider>
);
