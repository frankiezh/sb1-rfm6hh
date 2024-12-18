import { type ReactNode } from 'react';

interface ContactButtonProps {
  type: 'phone' | 'whatsapp';
  children: ReactNode;
  className?: string;
  currentLang: 'de' | 'en';
}

export function ContactButton({ type, children, className = '', currentLang }: ContactButtonProps) {
  const handleClick = () => {
    window.dataLayer?.push({
      'event': 'conversion',
      'conversion_type_variable': type === 'phone' ? 'phone_call' : 'whatsapp_click'
    });

    if (type === 'phone') {
      window.location.href = 'tel:+41797389751';
      return;
    }

    const message = currentLang === 'de'
      ? 'Hallo Herr Grünenwald, können Sie mich bitte kontaktieren? Es geht um......'
      : 'Hello Mr. Grünenwald, could you please contact me? It\'s about......';

    window.location.href = `https://wa.me/41797389751?text=${encodeURIComponent(message)}`;
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
} 