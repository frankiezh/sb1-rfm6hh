interface ContactButtonProps {
  type: 'phone' | 'whatsapp';
  children: React.ReactNode;
  className?: string;
}

export function ContactButton({ type, children, className = '' }: ContactButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    console.log(`${type} click - tracking conversion`);
    
    // Debug check if dataLayer exists
    if (!window.dataLayer) {
      console.error('dataLayer not initialized');
      window.dataLayer = [];
    }

    // Push conversion event to dataLayer
    window.dataLayer.push({
      'event': 'conversion',
      'conversion_type_variable': type === 'phone' ? 'phone_call' : 'whatsapp_click'
    });

    // Perform action
    if (type === 'phone') {
      window.location.href = 'tel:+41797389751';
    } else {
      window.location.href = 'https://wa.me/41797389751?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen';
    }
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