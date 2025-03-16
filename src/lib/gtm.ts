/**
 * Google Tag Manager utilities
 */

// Initialize Google Tag Manager
export function initializeGTM(): void {
  try {
    // Check if GTM is already initialized
    if (window.dataLayer) {
      // Load user consent from localStorage if available
      const storedConsent = localStorage.getItem('userConsent');
      if (storedConsent) {
        try {
          const consentData = JSON.parse(storedConsent);
          window.dataLayer.push({
            event: 'consent.update',
            ...consentData
          });
        } catch (e) {
          // Invalid JSON in localStorage
          console.error('Invalid consent data in localStorage');
        }
      }
    }
  } catch (error) {
    // Silently fail in production, log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('GTM initialization error:', error);
    }
  }
} 