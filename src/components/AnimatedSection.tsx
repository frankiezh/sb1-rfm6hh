import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
    initialInView: false
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }
        },
        hidden: { 
          opacity: 0, 
          y: 40,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}