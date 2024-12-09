import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  index?: number;
}

export function ServiceCard({ title, description, image, index = 0 }: ServiceCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: {
            duration: 0.8,
            delay: index * 0.2
          }
        },
        hidden: { opacity: 0, scale: 0.95 }
      }}
      className={cn(
        "grid md:grid-cols-2 gap-8",
        index % 2 === 1 ? "[grid-template-areas:'text_image']" : "[grid-template-areas:'image_text']"
      )}
    >
      <motion.div 
        className="aspect-[16/10] overflow-hidden rounded-lg [grid-area:image]"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
        }}
      >
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <motion.div 
        className="p-8 flex flex-col justify-center bg-[#8A9A8E]/90 backdrop-blur-sm text-white rounded-lg [grid-area:text]"
      >
        <h3 className="text-xl font-light mb-4 tracking-wide">{title}</h3>
        <p className="leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
}