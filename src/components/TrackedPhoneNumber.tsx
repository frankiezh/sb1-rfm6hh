import { type ReactNode } from 'react';

interface TrackedPhoneNumberProps {
  number: string;
  children: ReactNode;
  className?: string;
}

export function TrackedPhoneNumber({ number, children, className = '' }: TrackedPhoneNumberProps) {
  const handleClick = () => {
    window.dataLayer?.push({
      'event': 'conversion',
      'conversion_type_variable': 'phone_call'
    });
    window.location.href = `tel:${number.replace(/\s/g, '')}`;
  };

  return (
    <a
      href={`tel:${number.replace(/\s/g, '')}`}
      onClick={handleClick}
      className={`hover:text-[#334B40] transition-colors duration-200 ${className}`}
    >
      {children}
    </a>
  );
} 