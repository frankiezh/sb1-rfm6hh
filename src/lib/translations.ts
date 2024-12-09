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
          image: '/images/services/furniture-restoration.jpg'
        },
        {
          title: 'Polsterarbeiten',
          description: 'Umfassende Polsterarbeiten, inklusive Neupolsterung und maßgeschneiderte Bezüge mit hochwertigen Stoffen und Materialien.',
          image: '/images/services/upholstery-work.jpg'
        },
        {
          title: 'Antiquitätenpflege',
          description: 'Spezialisierte Pflege von Antiquitäten durch Reinigung, Konservierung und Restaurierung mit traditionellen Techniken.',
          image: '/images/services/antique-care.jpg'
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
          title: 'Sessel Restaurierung',
          description: 'Vollständige Restaurierung eines klassischen Sessels mit traditioneller Polsterung',
          altBefore: 'Klassischer Sessel vor der Restaurierung',
          altAfter: 'Klassischer Sessel nach der Restaurierung',
          imageBefore: '/images/portfolio/before/armchair-restoration-before.jpg',
          imageAfter: '/images/portfolio/after/armchair-restoration-after.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Baroque Sofa',
          description: 'Restoration of a baroque sofa with gold details',
          alt: 'Restored baroque sofa with detailed gold ornaments',
          image: '/images/portfolio/showcase/showcase-1.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Victorian Chair',
          description: 'Traditional upholstery of a Victorian chair',
          alt: 'Victorian chair with new upholstery',
          image: '/images/portfolio/showcase/showcase-2.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Antique Cabinet',
          description: 'Restoration and conservation of an antique cabinet',
          alt: 'Restored antique cabinet',
          image: '/images/portfolio/showcase/showcase-3.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Chesterfield Sofa',
          description: 'Classic Chesterfield upholstery with leather',
          alt: 'Chesterfield sofa with new leather upholstery',
          image: '/images/portfolio/showcase/showcase-4.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Dining Chairs',
          description: 'Set of six restored dining chairs',
          alt: 'Restored antique dining chairs',
          image: '/images/portfolio/showcase/showcase-5.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'French Armchair',
          description: 'Restoration of a French armchair',
          alt: 'French armchair after restoration',
          image: '/images/portfolio/showcase/showcase-6.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Vintage Settee',
          description: 'Reupholstery of a vintage two-seater',
          alt: 'Restored vintage settee',
          image: '/images/portfolio/showcase/showcase-7.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Art Deco Chair',
          description: 'Restoration of an Art Deco chair',
          alt: 'Restored Art Deco chair',
          image: '/images/portfolio/showcase/showcase-8.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Bergère Chair',
          description: 'Classic restoration of a Bergère chair',
          alt: 'Restored Bergère chair',
          image: '/images/portfolio/showcase/showcase-9.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Wingback Chair',
          description: 'Complete restoration of an antique wingback chair',
          alt: 'Restored antique wingback chair',
          image: '/images/portfolio/showcase/showcase-10.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Louis XV Sofa',
          description: 'Restoration of a Louis XV sofa with silk upholstery',
          alt: 'Restored Louis XV sofa',
          image: '/images/portfolio/showcase/showcase-11.jpg'
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
          image: '/images/services/furniture-restoration.jpg'
        },
        {
          title: 'Upholstery Work',
          description: 'Comprehensive upholstery services, including re-upholstery and custom covers with premium fabrics and materials.',
          image: '/images/services/upholstery-work.jpg'
        },
        {
          title: 'Antique Care',
          description: 'Specialized care for antiques through cleaning, conservation, and restoration using traditional techniques.',
          image: '/images/services/antique-care.jpg'
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
          title: 'Sessel Restaurierung',
          description: 'Vollständige Restaurierung eines klassischen Sessels mit traditioneller Polsterung',
          altBefore: 'Klassischer Sessel vor der Restaurierung',
          altAfter: 'Klassischer Sessel nach der Restaurierung',
          imageBefore: '/images/portfolio/before/armchair-restoration-before.jpg',
          imageAfter: '/images/portfolio/after/armchair-restoration-after.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Baroque Sofa',
          description: 'Restoration of a baroque sofa with gold details',
          alt: 'Restored baroque sofa with detailed gold ornaments',
          image: '/images/portfolio/showcase/showcase-1.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Victorian Chair',
          description: 'Traditional upholstery of a Victorian chair',
          alt: 'Victorian chair with new upholstery',
          image: '/images/portfolio/showcase/showcase-2.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Antique Cabinet',
          description: 'Restoration and conservation of an antique cabinet',
          alt: 'Restored antique cabinet',
          image: '/images/portfolio/showcase/showcase-3.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Chesterfield Sofa',
          description: 'Classic Chesterfield upholstery with leather',
          alt: 'Chesterfield sofa with new leather upholstery',
          image: '/images/portfolio/showcase/showcase-4.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Dining Chairs',
          description: 'Set of six restored dining chairs',
          alt: 'Restored antique dining chairs',
          image: '/images/portfolio/showcase/showcase-5.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'French Armchair',
          description: 'Restoration of a French armchair',
          alt: 'French armchair after restoration',
          image: '/images/portfolio/showcase/showcase-6.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Vintage Settee',
          description: 'Reupholstery of a vintage two-seater',
          alt: 'Restored vintage settee',
          image: '/images/portfolio/showcase/showcase-7.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Art Deco Chair',
          description: 'Restoration of an Art Deco chair',
          alt: 'Restored Art Deco chair',
          image: '/images/portfolio/showcase/showcase-8.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Bergère Chair',
          description: 'Classic restoration of a Bergère chair',
          alt: 'Restored Bergère chair',
          image: '/images/portfolio/showcase/showcase-9.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Wingback Chair',
          description: 'Complete restoration of an antique wingback chair',
          alt: 'Restored antique wingback chair',
          image: '/images/portfolio/showcase/showcase-10.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Louis XV Sofa',
          description: 'Restoration of a Louis XV sofa with silk upholstery',
          alt: 'Restored Louis XV sofa',
          image: '/images/portfolio/showcase/showcase-11.jpg'
        }
      ]
    }
  }
};