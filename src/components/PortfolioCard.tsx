import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Image } from './Image';

interface BasePortfolioCardProps {
  title: string;
  description: string;
  className?: string;
  index?: number;
  keywords?: string[];
}

interface BeforeAfterCardProps extends BasePortfolioCardProps {
  type: 'before-after';
  imageBefore: string;
  imageAfter: string;
  altBefore: string;
  altAfter: string;
}

interface ShowcaseCardProps extends BasePortfolioCardProps {
  type: 'showcase';
  image: string;
  alt: string;
}

type PortfolioCardProps = BeforeAfterCardProps | ShowcaseCardProps;

export function PortfolioCard(props: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showBefore, setShowBefore] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // Update the sequence to wait for zoom
  useEffect(() => {
    let zoomTimeoutId: NodeJS.Timeout;
    let beforeTimeoutId: NodeJS.Timeout;
    
    if (isHovered && props.type === 'before-after') {
      // Wait for zoom animation to complete (2.4s) before showing before image
      zoomTimeoutId = setTimeout(() => {
        setShowBefore(true);
        
        // After showing before image for 2s, switch back to after
        beforeTimeoutId = setTimeout(() => {
          setShowBefore(false);
        }, 2000);
      }, 2400); // Match the zoom duration
    } else {
      // Reset to after image when not hovering
      setShowBefore(false);
    }

    return () => {
      if (zoomTimeoutId) clearTimeout(zoomTimeoutId);
      if (beforeTimeoutId) clearTimeout(beforeTimeoutId);
    };
  }, [isHovered, props.type]);

  const index = props.index ?? 0;

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
              transition: {
                duration: 2.4,
                delay: index * 0.1,
                ease: "easeOut"
              },
            },
            hidden: {
              opacity: 0,
            },
          }}
          className={cn(
            "group cursor-pointer relative overflow-hidden rounded-lg bg-white w-full aspect-[4/3]",
            props.className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-full">
            {props.type === "before-after" ? (
              <div className="relative h-full overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: isHovered ? 1.15 : 1,
                    opacity: showBefore ? 0 : 1
                  }}
                  transition={{ 
                    scale: { duration: 2.4, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 1.5, ease: "easeInOut" }
                  }}
                >
                  <Image
                    src={props.imageAfter}
                    alt={props.altAfter}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: showBefore ? 1 : 0,
                    scale: isHovered ? 1.15 : 1,
                  }}
                  transition={{ 
                    opacity: { duration: 1.5, ease: "easeInOut" },
                    scale: { duration: 2.4, ease: [0.16, 1, 0.3, 1] }
                  }}
                >
                  <Image
                    src={props.imageBefore}
                    alt={props.altBefore}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.15 : 1 }}
                transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={props.image}
                  alt={props.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', props.image);
                  }}
                />
              </motion.div>
            )}

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  key="overlay"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-light mb-2">{props.title}</h3>
                    <p className="text-sm text-white/90">{props.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent
        className="max-w-4xl"
        aria-describedby={`portfolio-item-${index}-description`}
      >
        <DialogTitle className="sr-only">{props.title}</DialogTitle>
        {props.type === "before-after" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Image
                src={props.imageBefore}
                alt={`${props.title} - Before`}
                className="w-full rounded-lg"
              />
              <p className="mt-2 text-center text-sm text-neutral-500">
                Before
              </p>
            </div>
            <div>
              <Image
                src={props.imageAfter}
                alt={`${props.title} - After`}
                className="w-full rounded-lg"
              />
              <p className="mt-2 text-center text-sm text-neutral-500">
                After
              </p>
            </div>
          </div>
        ) : (
          <div>
            <Image
              src={props.image}
              alt={props.title}
              className="w-full rounded-lg"
            />
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-xl font-light mb-2">{props.title}</h3>
          <p
            id={`portfolio-item-${index}-description`}
            className="text-neutral-600"
          >
            {props.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}