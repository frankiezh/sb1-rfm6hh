import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
  index?: number;
}

export function ServiceCard({ title, description, image, className, index = 0 }: ServiceCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "50px 0px -50px 0px"
  });

  const containerVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
        staggerChildren: 0.1
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn(
        "overflow-hidden text-[#2B1810]",
        className
      )}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="aspect-[3/2] overflow-hidden rounded-lg"
          variants={childVariants}
        >
          <motion.img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
            }}
          />
        </motion.div>
        <motion.div 
          className="p-8 flex flex-col justify-center bg-[#8A9A8E]/90 backdrop-blur-sm text-white rounded-lg"
          variants={childVariants}
        >
          <h3 className="text-xl font-light mb-4 tracking-wide">{title}</h3>
          <p className="leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}