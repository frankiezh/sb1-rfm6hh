interface Window {
  dataLayer: Array<{
    event?: string;
    conversion_type_variable?: string;
    consent?: {
      ad_storage: 'granted' | 'denied';
      analytics_storage: 'granted' | 'denied';
      ad_personalization: 'granted' | 'denied';
      ad_user_data: 'granted' | 'denied';
    };
    [key: string]: any;
  }>;
} 