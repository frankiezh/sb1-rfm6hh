import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface PortfolioCardProps {
  title: string;
  description: string;
  imageBefore: string;
  imageAfter: string;
  className?: string;
  index?: number;
}

export function PortfolioCard({ 
  title, 
  description, 
  imageBefore, 
  imageAfter, 
  className,
  index = 0
}: PortfolioCardProps) {
  const [showAfter, setShowAfter] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                duration: 1.2,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }
            },
            hidden: { 
              opacity: 0, 
              scale: 0.98,
              y: 40,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }}
          className={cn(
            "group cursor-pointer relative overflow-hidden rounded-lg bg-white",
            className
          )}
          onMouseEnter={() => setShowAfter(true)}
          onMouseLeave={() => setShowAfter(false)}
        >
          <div className="aspect-[3/2] overflow-hidden">
            <motion.img
              src={showAfter ? imageAfter : imageBefore}
              alt={title}
              className="w-full h-full object-cover"
              animate={{ 
                scale: showAfter ? 1.05 : 1,
                transition: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
            />
          </div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: showAfter ? 1 : 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: showAfter ? 1 : 0,
                  y: showAfter ? 0 : 20,
                  transition: {
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
              >
                <h3 className="text-lg font-light mb-2">{title}</h3>
                <p className="text-sm text-white/90">{description}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <img
              src={imageBefore}
              alt={`${title} - Before`}
              className="w-full rounded-lg"
            />
            <p className="mt-2 text-center text-sm text-neutral-500">Before</p>
          </div>
          <div>
            <img
              src={imageAfter}
              alt={`${title} - After`}
              className="w-full rounded-lg"
            />
            <p className="mt-2 text-center text-sm text-neutral-500">After</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-light mb-2">{title}</h3>
          <p className="text-neutral-600">{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}