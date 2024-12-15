interface Window {
  dataLayer: Array<{
    event?: string;
    consent?: {
      ad_storage: 'granted' | 'denied';
      analytics_storage: 'granted' | 'denied';
      ad_personalization: 'granted' | 'denied';
      ad_user_data: 'granted' | 'denied';
    };
    [key: string]: any;
  }>;
  gtag: (
    command: 'event' | 'config' | 'consent',
    action: string,
    params?: Record<string, any>
  ) => void;
} 