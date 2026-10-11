import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform, useSpring } from 'framer-motion';

export interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'fade' | 'scale' | 'left' | 'right';
}

export const smoothEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const scrollViewport = {
  once: false,
  amount: 0.14,
  margin: '-30px 0px -30px 0px',
};

export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
    transition: { duration: 0.35, ease: smoothEasing },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: smoothEasing,
    },
  },
};

export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -44,
    scale: 0.98,
    transition: { duration: 0.35, ease: smoothEasing },
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: smoothEasing,
    },
  },
};

export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 44,
    scale: 0.98,
    transition: { duration: 0.35, ease: smoothEasing },
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
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
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const childFadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
    transition: { duration: 0.3, ease: smoothEasing },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: smoothEasing,
    },
  },
};

export const scaleFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.93,
    y: 24,
    transition: { duration: 0.35, ease: smoothEasing },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: smoothEasing,
    },
  },
};

export interface ScrollParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const ScrollParallax: React.FC<ScrollParallaxProps> = ({
  children,
  offset = 36,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const y = useSpring(rawY, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
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
        return { opacity: 0, scale: 0.95, y: 20 };
      case 'left':
        return { opacity: 0, x: -40 };
      case 'right':
        return { opacity: 0, x: 40 };
      case 'up':
      default:
        return { opacity: 0, y: 38 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'fade':
        return { opacity: 1 };
      case 'scale':
        return { opacity: 1, scale: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
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
      viewport={scrollViewport}
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
