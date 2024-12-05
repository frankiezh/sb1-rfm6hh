export const translations = {
  de: {
    nav: {
      services: 'LEISTUNGEN',
      portfolio: 'PORTFOLIO',
      contact: 'KONTAKT'
    },
    hero: {
      title: 'POLSTEREI AM HB ZÜRICH',
      subtitle: 'ATELIER GRÜNENWALD',
      tagline: {
        line1: 'TRADITIONELLES HANDWERK',
        line2: 'TRIFFT MODERNE EXPERTISE'
      }
    },
    services: {
      title: 'LEISTUNGEN',
      items: [
        {
          title: 'Möbelrestaurierung',
          description: 'Sorgfältige Instandsetzung und Renovierung von Möbeln mit traditionellen Techniken und hochwertigen Materialien.',
          image: 'https://theoakandpinebarn.co.uk/wp-content/uploads/2024/01/lacquer-finish.jpg'
        },
        {
          title: 'Polsterarbeiten',
          description: 'Umfassende Polsterarbeiten, inklusive Neupolsterung und maßgeschneiderte Bezüge mit hochwertigen Stoffen und Materialien.',
          image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98'
        },
        {
          title: 'Antiquitätenpflege',
          description: 'Spezialisierte Pflege von Antiquitäten durch Reinigung, Konservierung und Restaurierung mit traditionellen Techniken.',
          image: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b'
        }
      ]
    },
    contact: {
      title: 'KONTAKT',
      subtitle: 'Besuchen Sie uns am Zürich HB',
      description: 'Unser Atelier befindet sich nur 2 Minuten vom Hauptbahnhof entfernt. Perfekt erreichbar mit allen öffentlichen Verkehrsmitteln.',
      companyName: 'Atelier Grünenwald',
      address: {
        street1: 'Tellstrasse 38',
        street2: 'Lagerstrasse 93',
        city: '8004 Zürich'
      },
      social: {
        instagram: '@AtelierGruenenwald'
      }
    },
    footer: {
      copyright: '© {year} Atelier Grünenwald. All rights reserved.'
    },
    portfolio: {
      items: [
        {
          type: 'before-after' as const,
          title: 'Victorian Chair Restoration',
          description: 'Complete restoration of a Victorian era chair, including structural repairs and reupholstery.',
          altBefore: 'Your new alt text here',
          altAfter: 'Your new alt text here'
        },
        {
          type: 'showcase' as const,
          title: 'Antique Dining Table',
          description: 'Meticulous restoration of an 18th century dining table.',
          alt: 'Restaurierter Esstisch aus dem 18. Jahrhundert mit detaillierter Holzarbeit und verfeinerter Oberfläche'
        },
        {
          type: 'showcase' as const,
          title: 'French Armoire',
          description: 'Complete refinishing of a French provincial armoire.',
          alt: 'Aufgearbeiteter französischer Provinzschrank mit detaillierter Holzarbeit und verfeinerter Oberfläche'
        },
        {
          type: 'before-after' as const,
          title: 'Art Deco Sofa',
          description: 'Erhaltung und Neupolsterung eines Art Deco Sofas.',
          altBefore: 'Antikes Art Deco Sofa vor der Restaurierung, mit abgenutzter Polsterung',
          altAfter: 'Wunderschön restauriertes Art Deco Sofa mit neuer Polsterung und aufgearbeitetem Holz'
        }
      ]
    }
  },
  en: {
    nav: {
      services: 'SERVICES',
      portfolio: 'PORTFOLIO',
      contact: 'CONTACT'
    },
    hero: {
      title: 'UPHOLSTERY AT HB ZURICH',
      subtitle: 'ATELIER GRÜNENWALD',
      tagline: {
        line1: 'TRADITIONAL CRAFTSMANSHIP',
        line2: 'MEETS MODERN EXPERTISE'
      }
    },
    services: {
      title: 'SERVICES',
      items: [
        {
          title: 'Furniture Restoration',
          description: 'Careful repair and renovation of furniture using traditional techniques and high-quality materials.',
          image: 'https://theoakandpinebarn.co.uk/wp-content/uploads/2024/01/lacquer-finish.jpg'
        },
        {
          title: 'Upholstery Work',
          description: 'Comprehensive upholstery services, including re-upholstery and custom covers with premium fabrics and materials.',
          image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98'
        },
        {
          title: 'Antique Care',
          description: 'Specialized care for antiques through cleaning, conservation, and restoration using traditional techniques.',
          image: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b'
        }
      ]
    },
    contact: {
      title: 'CONTACT',
      subtitle: 'Visit us at Zurich Main Station',
      description: 'Our atelier is just 2 minutes from the main station. Perfectly accessible by all public transport.',
      companyName: 'Atelier Grünenwald',
      address: {
        street1: 'Tellstrasse 38',
        street2: 'Lagerstrasse 93',
        city: '8004 Zurich'
      },
      social: {
        instagram: '@AtelierGruenenwald'
      }
    },
    footer: {
      copyright: '© {year} Atelier Grünenwald. All rights reserved.'
    },
    portfolio: {
      items: [
        {
          type: 'before-after' as const,
          title: 'Victorian Chair Restoration',
          description: 'Complete restoration of a Victorian era chair, including structural repairs and reupholstery.',
          altBefore: 'Your new alt text here',
          altAfter: 'Your new alt text here'
        },
        {
          type: 'showcase' as const,
          title: 'Antique Dining Table',
          description: 'Meticulous restoration of an 18th century dining table.',
          alt: 'Restored 18th century dining table showing detailed woodwork and refined finish'
        },
        {
          type: 'showcase' as const,
          title: 'French Armoire',
          description: 'Complete refinishing of a French provincial armoire.',
          alt: 'Refinished French provincial armoire showing detailed woodwork and refined finish'
        },
        {
          type: 'before-after' as const,
          title: 'Art Deco Sofa',
          description: 'Preservation and reupholstery of an Art Deco period sofa.',
          altBefore: 'Antique Art Deco sofa before restoration, showing worn upholstery',
          altAfter: 'Beautifully restored Art Deco sofa with new upholstery and refinished woodwork'
        }
      ]
    }
  }
};