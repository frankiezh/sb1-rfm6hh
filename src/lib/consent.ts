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
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.gtag('consent', 'update', consent);
  window.dataLayer.push({
    event: 'user_consent_update',
    consent
  });
}

export function getConsent(): ConsentType {
  const stored = localStorage.getItem(CONSENT_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_CONSENT;
} 