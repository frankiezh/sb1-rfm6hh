interface TrackEventParams {
  action: string;
  category: string;
  label: string;
  value?: number;
}

export const trackEvent = ({ action, category, label, value }: TrackEventParams) => {
  // Google Analytics 4 tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }

  // Google Ads conversion tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with your actual conversion tracking ID
      'event_callback': function() {
        console.log('Conversion tracked successfully');
      }
    });
  }
}; 