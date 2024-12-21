interface Window {
  dataLayer: {
    push: (obj: {
      event?: string;
      conversion_type_variable?: string;
      consent?: {
        ad_storage?: 'granted' | 'denied';
        analytics_storage?: 'granted' | 'denied';
        ad_personalization?: 'granted' | 'denied';
        ad_user_data?: 'granted' | 'denied';
        personalization_storage?: 'granted' | 'denied';
        functionality_storage?: 'granted' | 'denied';
        security_storage?: 'granted' | 'denied';
      };
      [key: string]: any;
    }) => void;
  }[];
} 