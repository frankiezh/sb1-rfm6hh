import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Image } from './Image';
// Import icons from Lucide React
import { 
  Scissors, 
  Armchair, 
  Paintbrush, 
  RotateCcw, 
  Sofa, 
  Settings,
  Heart,
  Sparkles,
  Hammer,
  Clock,
  History,
  Trophy,
  Gem,
  Wrench,
  PaintBucket,
  Briefcase,
  Wand2,
  ShieldCheck,
  Star,
  Scale
} from 'lucide-react';
import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  index?: number;
  iconType?: 
    | 'scissors' 
    | 'chair' 
    | 'paint' 
    | 'restore' 
    | 'sofa' 
    | 'custom' 
    | 'care' 
    | 'sparkle' 
    | 'hammer' 
    | 'clock' 
    | 'history' 
    | 'trophy' 
    | 'gem'
    | 'wrench'
    | 'paintbucket'
    | 'briefcase'
    | 'wand'
    | 'shield'
    | 'star'
    | 'scale'
    | 'rotate'
    | 'settings';
}

export function ServiceCard({ 
  title, 
  description, 
  image, 
  reverse = false, 
  index = 0,
  iconType
}: ServiceCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const cardVariants = {
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.8, 
        delay: index * 0.2 
      } 
    },
    hidden: { 
      opacity: 0, 
      scale: 0.95 
    },
  };

  // Text content animations
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        delay: (index * 0.2) + 0.3 
      } 
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        delay: (index * 0.2) + 0.5 
      } 
    }
  };

  // Determine which icon to display based on the service title or explicit iconType
  const getIcon = (): ReactNode => {
    // If iconType is explicitly provided, use that
    if (iconType) {
      switch (iconType) {
        // Basic icons
        case 'scissors': return <Scissors className="h-6 w-6" />;
        case 'chair': return <Armchair className="h-6 w-6" />;
        case 'paint': return <Paintbrush className="h-6 w-6" />;
        case 'sofa': return <Sofa className="h-6 w-6" />;
        case 'settings': return <Settings className="h-6 w-6" />;
        
        // Care icons
        case 'care': return <Heart className="h-6 w-6" />;
        case 'sparkle': return <Sparkles className="h-6 w-6" />;
        
        // Restoration icons
        case 'restore': return <Wand2 className="h-6 w-6" />;
        case 'hammer': return <Hammer className="h-6 w-6" />;
        case 'wrench': return <Wrench className="h-6 w-6" />;
        case 'paintbucket': return <PaintBucket className="h-6 w-6" />;
        case 'rotate': return <RotateCcw className="h-6 w-6" />;
        
        // Quality & premium icons
        case 'trophy': return <Trophy className="h-6 w-6" />;
        case 'gem': return <Gem className="h-6 w-6" />;
        case 'star': return <Star className="h-6 w-6" />;
        case 'shield': return <ShieldCheck className="h-6 w-6" />;
        
        // Other specialized icons
        case 'clock': return <Clock className="h-6 w-6" />;
        case 'history': return <History className="h-6 w-6" />;
        case 'briefcase': return <Briefcase className="h-6 w-6" />;
        case 'wand': return <Wand2 className="h-6 w-6" />;
        case 'scale': return <Scale className="h-6 w-6" />;
        case 'custom': return <Settings className="h-6 w-6" />;
      }
    }
    
    // Otherwise try to match based on title text
    const titleLower = title.toLowerCase();
    
    // Upholstery related
    if (titleLower.includes('polster') || titleLower.includes('upholster')) {
      return <Sofa className="h-6 w-6" />;
    } 
    
    // Restoration related
    else if (titleLower.includes('restaur') || titleLower.includes('restor') || titleLower.includes('renovier')) {
      return <Wand2 className="h-6 w-6" />;
    } 
    else if (titleLower.includes('reparatur') || titleLower.includes('repair') || titleLower.includes('fix')) {
      return <Hammer className="h-6 w-6" />; 
    }
    
    // Antique & history related
    else if (titleLower.includes('antik') || titleLower.includes('antique')) {
      return <Clock className="h-6 w-6" />;
    } 
    else if (titleLower.includes('tradition') || titleLower.includes('handwerk') || titleLower.includes('craft')) {
      return <History className="h-6 w-6" />;
    } 
    else if (titleLower.includes('erbe') || titleLower.includes('heritage') || titleLower.includes('histor')) {
      return <Briefcase className="h-6 w-6" />;
    }
    
    // Design & custom work
    else if (titleLower.includes('design') || titleLower.includes('custom')) {
      return <Paintbrush className="h-6 w-6" />;
    } 
    else if (titleLower.includes('gestalt') || titleLower.includes('kreativ')) {
      return <Wand2 className="h-6 w-6" />;
    }
    
    // Materials
    else if (titleLower.includes('stoff') || titleLower.includes('fabric') || titleLower.includes('material')) {
      return <Scissors className="h-6 w-6" />;
    } 
    
    // Furniture
    else if (titleLower.includes('möbel') || titleLower.includes('furniture')) {
      return <Armchair className="h-6 w-6" />;
    } 
    
    // Care & maintenance
    else if (titleLower.includes('pflege') || titleLower.includes('care') || titleLower.includes('maintain')) {
      return <Sparkles className="h-6 w-6" />;
    } 
    else if (titleLower.includes('schutz') || titleLower.includes('protect') || titleLower.includes('guarantee')) {
      return <ShieldCheck className="h-6 w-6" />;
    }
    
    // Quality & premium
    else if (titleLower.includes('luxus') || titleLower.includes('luxury') || titleLower.includes('premium')) {
      return <Gem className="h-6 w-6" />;
    } 
    else if (titleLower.includes('qualität') || titleLower.includes('quality') || titleLower.includes('meister')) {
      return <Trophy className="h-6 w-6" />;
    }
    else if (titleLower.includes('präzision') || titleLower.includes('precision')) {
      return <Scale className="h-6 w-6" />;
    }
    else if (titleLower.includes('exklusiv') || titleLower.includes('exclusive') || titleLower.includes('besonder')) {
      return <Star className="h-6 w-6" />;
    }
    
    // Transformation
    else if (titleLower.includes('transform') || titleLower.includes('verwandl')) {
      return <Wand2 className="h-6 w-6" />;
    }
    
    // Detail & finishing
    else if (titleLower.includes('detail') || titleLower.includes('finish') || titleLower.includes('vollend')) {
      return <PaintBucket className="h-6 w-6" />;
    }
    
    // Default icon
    return <Settings className="h-6 w-6" />;
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      className={cn(
        "flex flex-col md:flex-row gap-4",
        reverse ? "md:flex-row-reverse" : ""
      )}
    >
      <motion.div 
        className="aspect-[16/10] overflow-hidden rounded-lg flex-1"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
        }}
      >
        <Image 
          src={image} 
          alt={title} 
          loading={index === 0 ? "eager" : "lazy"}
          className="w-full h-full object-cover" 
        />
      </motion.div>
      
      <motion.div 
        className="p-6 flex flex-col justify-center bg-[#8A9A8E]/90 backdrop-blur-sm text-white rounded-lg flex-1"
        whileHover={{ 
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          y: -5,
          transition: { duration: 0.3 }
        }}
      >
        <motion.div 
          className="flex items-center gap-3 mb-4"
          variants={titleVariants}
        >
          <div className="p-2 bg-white/20 rounded-full">
            {getIcon()}
          </div>
          <h3 className="text-2xl md:text-3xl font-medium md:font-light tracking-wide">{title}</h3>
        </motion.div>
        
        <motion.p 
          className="text-base md:text-lg leading-relaxed" 
          variants={descriptionVariants}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}