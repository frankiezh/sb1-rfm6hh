import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  const [showAfter, setShowAfter] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

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
              y: 40
            }
          }}
          className={cn(
            "group cursor-pointer relative overflow-hidden rounded-lg bg-white",
            props.className
          )}
          onMouseEnter={() => props.type === 'before-after' && setShowAfter(true)}
          onMouseLeave={() => props.type === 'before-after' && setShowAfter(false)}
        >
          <div className="aspect-[3/2] overflow-hidden">
            <motion.img
              src={props.type === 'before-after' 
                ? (showAfter ? props.imageAfter : props.imageBefore)
                : props.image
              }
              alt={props.type === 'before-after' ? props.altBefore : props.alt}
              className="w-full h-full object-cover"
              animate={{ 
                scale: showAfter ? 1.05 : 1
              }}
            />
          </div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: showAfter ? 1 : 0 }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: showAfter ? 1 : 0,
                  y: showAfter ? 0 : 20
                }}
              >
                <h3 className="text-lg font-light mb-2">{props.title}</h3>
                <p className="text-sm text-white/90">{props.description}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        {props.type === 'before-after' ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Image
                src={props.imageBefore}
                alt={`${props.title} - Before`}
                className="w-full rounded-lg"
              />
              <p className="mt-2 text-center text-sm text-neutral-500">Before</p>
            </div>
            <div>
              <Image
                src={props.imageAfter}
                alt={`${props.title} - After`}
                className="w-full rounded-lg"
              />
              <p className="mt-2 text-center text-sm text-neutral-500">After</p>
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
          <p className="text-neutral-600">{props.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}