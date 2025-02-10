export const CONSENT_KEY = 'userConsent';

export type ConsentType = {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
};

export const DEFAULT_CONSENT: ConsentType = {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_personalization: 'denied',
  ad_user_data: 'denied'
};

export function setConsent(consent: ConsentType) {
  const value = Object.values(consent).every(v => v === 'granted') ? 'granted' : 
                Object.values(consent).every(v => v === 'denied') ? 'denied' :
                JSON.stringify(consent);
  localStorage.setItem(CONSENT_KEY, value);
  window.gtag('consent', 'update', consent);
  window.dataLayer.push({
    event: 'user_consent_update',
    consent
  });
}

export function getConsent(): ConsentType {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return DEFAULT_CONSENT;
    
    // Handle legacy string value
    if (stored === 'granted' || stored === 'denied') {
      const value = stored as 'granted' | 'denied';
      return {
        ad_storage: value,
        analytics_storage: value,
        ad_personalization: value,
        ad_user_data: value
      };
    }
    
    // Parse stored JSON
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error parsing consent:', error);
    return DEFAULT_CONSENT;
  }
} 