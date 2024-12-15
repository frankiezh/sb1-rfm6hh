interface Window {
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
}

// Add this type to ensure proper typing for consent updates
interface ConsentUpdate {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
} 