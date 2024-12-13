import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Image } from './Image';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  index?: number;
}

export function ServiceCard({ title, description, image, reverse = false, index = 0 }: ServiceCardProps) {
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
        className="p-4 flex flex-col justify-center bg-[#8A9A8E]/90 backdrop-blur-sm text-white rounded-lg flex-1"
      >
        <h3 className="text-xl font-medium md:font-light mb-3 tracking-wide">{title}</h3>
        <p className="leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
}