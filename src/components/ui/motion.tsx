
import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';

export type MotionBoxProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  className?: string;
};

export const fadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut"
    }
  }
});

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down', delay: number = 0) => {
  const x = direction === 'left' ? -50 : direction === 'right' ? 50 : 0;
  const y = direction === 'up' ? -50 : direction === 'down' ? 50 : 0;
  
  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
};

export const staggerContainer = (staggerChildren: number = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren
    }
  }
});

export const scaleIn = (delay: number = 0) => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut"
    }
  }
});

export const MotionBox = ({ children, className, ...rest }: MotionBoxProps) => (
  <motion.div className={cn(className)} {...rest}>
    {children}
  </motion.div>
);

export const MotionSection = ({ children, className, ...rest }: MotionBoxProps) => (
  <motion.section className={cn(className)} {...rest}>
    {children}
  </motion.section>
);

export const MotionImage = motion.img;
export const MotionButton = motion.button;
export const MotionHeading = motion.h2;
export const MotionParagraph = motion.p;
