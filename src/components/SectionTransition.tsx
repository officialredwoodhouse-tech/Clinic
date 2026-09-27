import React from 'react';
import { motion, Variants } from 'framer-motion';

export interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'fade' | 'scale';
}

export const smoothEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    transition: { duration: 0.4 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: smoothEasing,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const childFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: smoothEasing,
    },
  },
};

export const scaleFadeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: smoothEasing,
    },
  },
};

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  duration = 0.75,
  direction = 'up',
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'fade':
        return { opacity: 0 };
      case 'scale':
        return { opacity: 0, scale: 0.97 };
      case 'up':
      default:
        return { opacity: 0, y: 32 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'fade':
        return { opacity: 1 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      case 'up':
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.section
      id={id}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration,
        delay,
        ease: smoothEasing,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
