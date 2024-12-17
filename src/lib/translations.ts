export const translations = {
  de: {
    nav: {
      services: 'LEISTUNGEN',
      portfolio: 'PORTFOLIO',
      contact: 'KONTAKT'
    },
    buttons: {
      call: 'Jetzt anrufen',
      whatsapp: 'WhatsApp'
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
          title: 'Restaurierung eines Vintage-Sessels aus den 1950er Jahren',
          description: 'Vollständige Restaurierung eines klassischen 1950er Jahre Sessels vom abgenutzten Zustand zu eleganter Raffinesse, mit hochwertiger Seidenbrokat-Polsterung und detaillierter Handwerkskunst.',
          altBefore: 'Vintage Sessel aus den 1950er Jahren vor der Restaurierung - abgenutzter Zustand mit Polsterungsbedarf',
          altAfter: 'Restaurierter 1950er Jahre Sessel mit luxuriöser Seidenbrokat-Polsterung - nach professioneller Restaurierung',
          imageBefore: '/images/portfolio/before/1950s-vintage-armchair-restoration-before.jpg',
          imageAfter: '/images/portfolio/after/1950s-vintage-armchair-silk-brocade-after.jpg'
        },
        {
          type: 'before-after' as const,
          title: 'IKEA STRANDMON Vintage Makeover',
          description: 'Kreative Neugestaltung eines IKEA STRANDMON Sessels mit Hocker. Bezogen mit diagonalem Vintage-Streifenstoff und historischen Schweizer Armeeuniformen-Bändern.',
          altBefore: 'IKEA STRANDMON Sessel vor der Restaurierung - Original Grauer Bezug',
          altAfter: 'IKEA STRANDMON Sessel nach der Restaurierung - Vintage Streifenstoff mit Militärbändern',
          imageBefore: '/images/portfolio/before/ikea-strandmon-armchair-footstool-before-restoration.jpg',
          imageAfter: '/images/portfolio/after/ikea-strandmon-armchair-footstool-vintage-stripe-restoration.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Antiker Sessel (ca. 1900)',
          description: 'Vollständige Restaurierung und Neupolsterung mit exklusivem Osborne & Little Stoff',
          alt: 'Antiker Sessel aus der Jahrhundertwende, restauriert und neu bezogen mit Osborne & Little Stoff',
          image: '/images/portfolio/showcase/antique-chair-1900-osborne-little-restoration.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Louis XVI Sessel mit Kalligrafie-Samt',
          description: 'Vollständige Restaurierung eines antiken Louis XVI Sessels aus dem 18. Jahrhundert, neu bezogen mit einem exklusiven, von Kalligrafie inspirierten Braunton-Samt. Traditionelle Restaurierungstechniken kombiniert mit zeitgenössischem Design.',
          alt: 'Antiker Louis XVI Sessel restauriert und neu bezogen mit abstraktem Kalligrafie-inspiriertem verbranntem Samtstoff - Restaurierung von Atelier Grünenwald Zürich',
          image: '/images/portfolio/showcase/antique-louis-xvi-armchair-calligraphy-velvet-restoration.jpg',
          keywords: ['Louis XVI Sessel', 'Antike Möbel Restaurierung', 'Polsterarbeiten Zürich', 'Kalligrafie Samt']
        },
        {
          type: 'showcase' as const,
          title: '1950er Küchenstühle im American Diner Stil',
          description: 'Kreative Neugestaltung eines Vintage Küchenstuhl-Paares aus den 1950er Jahren. Hochwertige Lederpolsterung im klassischen American Diner Stil, kombiniert mit originalgetreuer Restaurierung der Chromgestelle.',
          alt: 'Vintage Küchenstühle aus den 1950er Jahren, restauriert und neu bezogen mit hochwertigem Leder im American Diner Stil - Restaurierung von Atelier Grünenwald Zürich',
          image: '/images/portfolio/showcase/1950s-kitchen-chairs-american-diner-leather-restoration.jpg',
          keywords: ['1950er Küchenstühle', 'American Diner Stil', 'Vintage Restaurierung', 'Lederpolsterung', 'Chromgestell']
        },
        {
          type: 'showcase' as const,
          title: '1960er Grünenwald Original Zweisitzer',
          description: 'Exklusives Grünenwald Design inspiriert von den 1960er Jahren: Ein eleganter Zweisitzer-Sofa mit schwarz-oxidiertem Stahlrohrgestell. Eine perfekte Verschmelzung von zeitgenössischem Design und klassischer Handwerkskunst.',
          alt: 'Original Grünenwald Zweisitzer-Sofa im 1960er Jahre Stil mit schwarz-oxidiertem Stahlrohrgestell - Handgefertigt in Zürich',
          image: '/images/portfolio/showcase/1960s-gruenenwald-two-seater-sofa-ebonized-steel-frame.jpg',
          keywords: ['Grünenwald Original', '1960er Design', 'Stahlrohrgestell', 'Zweisitzer-Sofa', 'Zeitgenössisches Design']
        },
        {
          type: 'showcase' as const,
          title: 'Grünenwald Design Beistelltisch & Hocker',
          description: 'Exklusives Grünenwald Original: Eleganter Beistelltisch kombiniert mit einem luxuriösen Polsterhocker, bezogen mit edlem Pierre Frey Stoff. Eine harmonische Verbindung von Funktionalität und hochwertigem Design.',
          alt: 'Original Grünenwald Beistelltisch und Polsterhocker mit Pierre Frey Stoffbezug - Handgefertigt in Zürich',
          image: '/images/portfolio/showcase/gruenenwald-side-table-footstool-pierre-frey-fabric.jpg',
          keywords: ['Grünenwald Original', 'Beistelltisch', 'Polsterhocker', 'Pierre Frey Stoff', 'Designermöbel']
        },
        {
          type: 'showcase' as const,
          title: '1950er Sessel in Mintgrünem Samt',
          description: 'Hochwertige Neupolsterung eines eleganten 1950er Jahre Sessels mit feinem Samtvelours in Mintgrün. Die ursprüngliche Designästhetik wurde bewahrt, während der Sitzkomfort durch moderne Polstertechniken optimiert wurde.',
          alt: '1950er Jahre Sessel neu bezogen mit hochwertigem Samtvelours in Mintgrün - Restaurierung mit verbessertem Sitzkomfort von Atelier Grünenwald Zürich',
          image: '/images/portfolio/showcase/1950s-armchair-mint-velvet-upholstery-restoration.jpg',
          keywords: ['1950er Sessel', 'Samtvelours', 'Vintage Restaurierung', 'Sitzkomfort', 'Mintgrün']
        },
        {
          type: 'showcase' as const,
          title: 'Giorgetti Flügel-Sessel aus den 1980er Jahren',
          description: 'Meisterhafte Restaurierung eines klassischen Giorgetti Flügel-Sessels aus den 1980er Jahren. Modernisiert mit hochwertigem grauen Wollstoff, der die zeitlose Eleganz des italienischen Designs unterstreicht. Die charakteristische Giorgetti-Silhouette wurde bewahrt und durch moderne Polstertechniken ergänzt.',
          alt: 'Restaurierter Giorgetti Flügel-Sessel aus den 1980er Jahren mit grauem Wollstoff - Modernisierte Vintage-Möbel von Atelier Grünenwald',
          image: '/images/portfolio/showcase/1980s-giorgetti-wingback-armchair-grey-wool.jpg',
          keywords: ['Giorgetti Sessel', 'Flügel-Sessel', '1980er Möbel', 'Wollstoff', 'Vintage Restaurierung']
        },
        {
          type: 'showcase' as const,
          title: 'Vintage Hochlehner Esszimmerstühle in Leder',
          description: 'Elegantes Paar Vintage-Hochlehner, neu interpretiert mit hochwertigem Lederpolster. Die schlanke Silhouette der Stühle wurde durch präzise Restaurierungsarbeit erhalten und durch moderne Polstertechniken ergänzt. Die zeitlose Kombination aus dunklem Holzgestell und geschmeidigem Leder schafft eine perfekte Balance zwischen Klassik und Moderne.',
          alt: 'Restauriertes Paar Vintage-Hochlehner Esszimmerstühle mit elegantem Lederbezug - Handwerkskunst von Atelier Grünenwald',
          image: '/images/portfolio/showcase/vintage-highback-dining-chairs-leather-upholstery.jpg',
          keywords: ['Hochlehner', 'Esszimmerstühle', 'Lederpolsterung', 'Vintage Restaurierung', 'Holzmöbel']
        },
        {
          type: 'showcase' as const,
          title: 'Biedermeier Sofa mit Paisley-Wollstoff',
          description: 'Exquisite Restaurierung eines antiken Biedermeier Sofas, neu interpretiert mit einem edlen gewebten Paisley-Wollstoff. Die charakteristische Biedermeier-Formensprache wurde sorgfältig erhalten und durch hochwertige Polsterarbeit ergänzt. Ein Beispiel zeitloser Eleganz aus der Epoche des frühen 19. Jahrhunderts.',
          alt: 'Antikes Biedermeier Sofa restauriert mit exklusivem Paisley-Wollstoff - Traditionelle Handwerkskunst von Atelier Grünenwald',
          image: '/images/portfolio/showcase/antique-biedermeier-sofa-paisley-wool-upholstery.jpg',
          keywords: ['Biedermeier Sofa', 'Antike Möbel', 'Paisley-Wollstoff', 'Restaurierung', 'Historische Möbel']
        },
        {
          type: 'showcase' as const,
          title: 'Französischer Sessel mit Psychedelischem Blumenmuster',
          description: 'Spektakuläre Transformation eines antiken französischen Sessels. Das restaurierte Holzgestell wurde kunstvoll lackiert und mit einem gewagten, psychedelischen Blumenmuster-Stoff neu bezogen. Eine mutige Verschmelzung von klassischer Form und zeitgenössischem Design, die den Sessel vom vernachlässigten Antiquitätenstück zum modernen Blickfang verwandelt.',
          alt: 'Antiker französischer Sessel mit lackiertem Gestell und psychedelischem Blumenmuster - Kreative Restaurierung von Atelier Grünenwald',
          image: '/images/portfolio/showcase/antique-french-armchair-psychedelic-floral-transformation.jpg',
          keywords: ['Französischer Sessel', 'Psychedelisches Muster', 'Lackiertes Holz', 'Kreative Restaurierung', 'Blumenmuster']
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
    buttons: {
      call: 'Call now',
      whatsapp: 'WhatsApp'
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
          title: '1950s Vintage Armchair Restoration',
          description: 'Complete restoration of a classic 1950s armchair from worn condition to elegant sophistication, featuring premium silk brocade upholstery and detailed craftsmanship.',
          altBefore: 'Vintage 1950s armchair before restoration - worn condition requiring upholstery repair',
          altAfter: 'Restored 1950s armchair with luxurious silk brocade upholstery - after professional restoration',
          imageBefore: '/images/portfolio/before/1950s-vintage-armchair-restoration-before.jpg',
          imageAfter: '/images/portfolio/after/1950s-vintage-armchair-silk-brocade-after.jpg'
        },
        {
          type: 'before-after' as const,
          title: 'IKEA STRANDMON Vintage Makeover',
          description: 'Creative transformation of an IKEA STRANDMON armchair and footstool, reupholstered with diagonal vintage striped fabric and historic Swiss Army uniform bands.',
          altBefore: 'IKEA STRANDMON armchair before restoration - Original grey upholstery',
          altAfter: 'IKEA STRANDMON armchair after restoration - Vintage stripe fabric with military bands',
          imageBefore: '/images/portfolio/before/ikea-strandmon-armchair-footstool-before-restoration.jpg',
          imageAfter: '/images/portfolio/after/ikea-strandmon-armchair-footstool-vintage-stripe-restoration.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Antique Chair (c. 1900)',
          description: 'Complete restoration and reupholstery with exclusive Osborne & Little fabric',
          alt: 'Turn of the century antique chair restored and reupholstered with Osborne & Little fabric',
          image: '/images/portfolio/showcase/antique-chair-1900-osborne-little-restoration.jpg'
        },
        {
          type: 'showcase' as const,
          title: 'Louis XVI Armchair with Calligraphy Velvet',
          description: 'Complete restoration of an 18th century antique Louis XVI armchair, reupholstered with exclusive calligraphy-inspired burnt velvet fabric. Traditional restoration techniques combined with contemporary design.',
          alt: 'Antique Louis XVI armchair restored and reupholstered with abstract calligraphy-inspired burnt velvet fabric - restoration by Atelier Grünenwald Zurich',
          image: '/images/portfolio/showcase/antique-louis-xvi-armchair-calligraphy-velvet-restoration.jpg',
          keywords: ['Louis XVI armchair', 'antique furniture restoration', 'upholstery Zurich', 'calligraphy velvet']
        },
        {
          type: 'showcase' as const,
          title: '1950s Kitchen Chairs in American Diner Style',
          description: 'Creative transformation of a pair of vintage 1950s kitchen chairs. Premium leather upholstery in classic American diner style, combined with authentic restoration of the chrome frames.',
          alt: 'Vintage 1950s kitchen chairs restored and reupholstered with premium leather in American diner style - restoration by Atelier Grünenwald Zurich',
          image: '/images/portfolio/showcase/1950s-kitchen-chairs-american-diner-leather-restoration.jpg',
          keywords: ['1950s kitchen chairs', 'American diner style', 'vintage restoration', 'leather upholstery', 'chrome frame']
        },
        {
          type: 'showcase' as const,
          title: '1960s Grünenwald Original Two-Seater',
          description: 'Exclusive Grünenwald design inspired by the 1960s: An elegant two-seater sofa featuring an ebonized steel tubular frame. A perfect fusion of contemporary design and classic craftsmanship.',
          alt: 'Original Grünenwald two-seater sofa in 1960s style with ebonized steel tubular frame - Handcrafted in Zurich',
          image: '/images/portfolio/showcase/1960s-gruenenwald-two-seater-sofa-ebonized-steel-frame.jpg',
          keywords: ['Grünenwald Original', '1960s design', 'steel frame', 'two-seater sofa', 'contemporary design']
        },
        {
          type: 'showcase' as const,
          title: 'Grünenwald Design Side Table & Footstool',
          description: 'Exclusive Grünenwald original: Elegant side table combined with a luxurious upholstered footstool featuring premium Pierre Frey fabric. A harmonious blend of functionality and high-end design.',
          alt: 'Original Grünenwald side table and upholstered footstool with Pierre Frey fabric - Handcrafted in Zurich',
          image: '/images/portfolio/showcase/gruenenwald-side-table-footstool-pierre-frey-fabric.jpg',
          keywords: ['Grünenwald Original', 'side table', 'footstool', 'Pierre Frey fabric', 'designer furniture']
        },
        {
          type: 'showcase' as const,
          title: '1950er Sessel in Mintgrünem Samt',
          description: 'Hochwertige Neupolsterung eines eleganten 1950er Jahre Sessels mit feinem Samtvelours in Mintgrün. Die ursprüngliche Designästhetik wurde bewahrt, während der Sitzkomfort durch moderne Polstertechniken optimiert wurde.',
          alt: '1950er Jahre Sessel neu bezogen mit hochwertigem Samtvelours in Mintgrün - Restaurierung mit verbessertem Sitzkomfort von Atelier Grünenwald Zürich',
          image: '/images/portfolio/showcase/1950s-armchair-mint-velvet-upholstery-restoration.jpg',
          keywords: ['1950er Sessel', 'Samtvelours', 'Vintage Restaurierung', 'Sitzkomfort', 'Mintgrün']
        },
        {
          type: 'showcase' as const,
          title: '1980s Giorgetti Wing Back Armchair',
          description: 'Masterful restoration of a classic 1980s Giorgetti wing back armchair. Modernized with premium gray wool fabric that complements the timeless elegance of Italian design. The distinctive Giorgetti silhouette has been preserved while incorporating modern upholstery techniques.',
          alt: 'Restored 1980s Giorgetti wing back armchair with gray wool fabric - Modernized vintage furniture by Atelier Grünenwald',
          image: '/images/portfolio/showcase/1980s-giorgetti-wingback-armchair-grey-wool.jpg',
          keywords: ['Giorgetti armchair', 'wing back chair', '1980s furniture', 'wool upholstery', 'vintage restoration']
        },
        {
          type: 'showcase' as const,
          title: 'Vintage High Back Dining Chairs',
          description: 'Elegant pair of vintage high back dining chairs, reimagined with premium leather upholstery. The chairs\' sleek silhouette has been preserved through precise restoration work and enhanced with modern upholstery techniques. The timeless combination of dark wood frame and supple leather creates a perfect balance between classic and contemporary.',
          alt: 'Restored pair of vintage high back dining chairs with elegant leather upholstery - Craftsmanship by Atelier Grünenwald',
          image: '/images/portfolio/showcase/vintage-highback-dining-chairs-leather-upholstery.jpg',
          keywords: ['high back chairs', 'dining chairs', 'leather upholstery', 'vintage restoration', 'wooden furniture']
        },
        {
          type: 'showcase' as const,
          title: 'Antique Biedermeier Sofa in Paisley Wool',
          description: 'Exquisite restoration of an antique Biedermeier sofa, reimagined with a refined woven paisley wool fabric. The characteristic Biedermeier design language has been carefully preserved and enhanced through premium upholstery work. A testament to timeless elegance from the early 19th century era.',
          alt: 'Antique Biedermeier sofa restored with exclusive paisley wool fabric - Traditional craftsmanship by Atelier Grünenwald',
          image: '/images/portfolio/showcase/antique-biedermeier-sofa-paisley-wool-upholstery.jpg',
          keywords: ['Biedermeier sofa', 'antique furniture', 'paisley wool fabric', 'restoration', 'historical furniture']
        },
        {
          type: 'showcase' as const,
          title: 'French Armchair with Psychedelic Floral Print',
          description: 'Spectacular transformation of an antique French armchair. The restored wooden frame has been artfully lacquered and reupholstered with a bold psychedelic floral print fabric. A daring fusion of classical form and contemporary design, transforming the chair from a neglected antique into a modern statement piece.',
          alt: 'Antique French armchair with lacquered frame and psychedelic floral print - Creative restoration by Atelier Grünenwald',
          image: '/images/portfolio/showcase/antique-french-armchair-psychedelic-floral-transformation.jpg',
          keywords: ['French armchair', 'psychedelic pattern', 'lacquered wood', 'creative restoration', 'floral print']
        }
      ]
    }
  }
};