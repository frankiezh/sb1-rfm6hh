import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Image } from './Image';
import { X } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

interface BasePortfolioCardProps {
  title: string;
  description: string;
  className?: string;
  index?: number;
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
  const imageRef = useRef<HTMLDivElement>(null);
  const [textWidth, setTextWidth] = useState<number | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

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

  // Add this useEffect to update text width when image loads
  useEffect(() => {
    if (props.type === 'showcase' && imageRef.current) {
      const updateWidth = () => {
        const width = imageRef.current?.offsetWidth;
        if (width) {
          setTextWidth(width);
        }
      };

      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, [props.type]);

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
              {(isHovered || isMobile) && (
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
        className={cn(
          "p-4 flex flex-col gap-2",
          props.type === 'before-after'
            ? "w-[90vw] max-w-6xl max-h-[90vh]"
            : "w-fit max-w-[90vw] max-h-[90vh]"
        )}
        aria-describedby={`portfolio-item-${index}-description`}
      >
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <DialogTitle className="text-xl font-semibold mb-2">{props.title}</DialogTitle>
        
        {props.type === "before-after" ? (
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col">
                <div className="relative" style={{ paddingBottom: '100%' }}>
                  <Image
                    src={props.imageBefore}
                    alt={`${props.title} - Before`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <p className="text-center text-sm text-neutral-500">Before</p>
              </div>
              <div className="flex flex-col">
                <div className="relative" style={{ paddingBottom: '100%' }}>
                  <Image
                    src={props.imageAfter}
                    alt={`${props.title} - After`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <p className="text-center text-sm text-neutral-500">After</p>
              </div>
            </div>
            <p
              id={`portfolio-item-${index}-description`}
              className="text-neutral-600 mt-2"
            >
              {props.description}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="w-fit" ref={imageRef}>
              <Image
                src={props.image}
                alt={props.title}
                className="w-auto max-h-[85vh] object-cover"
              />
            </div>
            <p
              id={`portfolio-item-${index}-description`}
              className="text-neutral-600"
              style={{ width: textWidth ? `${textWidth}px` : 'auto' }}
            >
              {props.description}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}