import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

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
  once: true,
  amount: 0.08,
  margin: '0px 0px -20px 0px',
};

/**
 * High-precision requestAnimationFrame smooth scroll engine.
 * Automatically cancels if the user manually scrolls via wheel, touch, or keyboard.
 */
let activeScrollRaf: number | null = null;
let cleanupInterruptListeners: (() => void) | null = null;

function cancelActiveScroll() {
  if (activeScrollRaf !== null) {
    cancelAnimationFrame(activeScrollRaf);
    activeScrollRaf = null;
  }
  if (cleanupInterruptListeners) {
    cleanupInterruptListeners();
    cleanupInterruptListeners = null;
  }
}

export function smoothScrollTo(target: string | number, offset = 78, duration = 620) {
  if (typeof window === 'undefined') return;

  cancelActiveScroll();

  let targetY = 0;
  if (typeof target === 'number') {
    targetY = target;
  } else {
    const id = target.replace(/^#/, '');
    const el = document.getElementById(id);
    if (!el) return;
    targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
  }

  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 4) {
    window.scrollTo(0, targetY);
    return;
  }

  // Allow user wheel/touch to immediately take over without fighting the animation
  const onUserInterrupt = () => cancelActiveScroll();
  window.addEventListener('wheel', onUserInterrupt, { passive: true, once: true });
  window.addEventListener('touchstart', onUserInterrupt, { passive: true, once: true });
  cleanupInterruptListeners = () => {
    window.removeEventListener('wheel', onUserInterrupt);
    window.removeEventListener('touchstart', onUserInterrupt);
  };

  const startTime = performance.now();
  // Quintic ease-out for ultra-silky deceleration
  const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuint(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      activeScrollRaf = requestAnimationFrame(step);
    } else {
      cancelActiveScroll();
    }
  };

  activeScrollRaf = requestAnimationFrame(step);
}

export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: smoothEasing,
    },
  },
};

export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: smoothEasing,
    },
  },
};

export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: smoothEasing,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

export const childFadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: smoothEasing,
    },
  },
};

export const scaleFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    y: 16,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
  offset = 16,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Direct hardware-accelerated transform without extra spring physics overhead per frame
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={`transform-gpu ${className}`}>
      {children}
    </motion.div>
  );
};

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  duration = 0.55,
  direction = 'up',
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'fade':
        return { opacity: 0 };
      case 'scale':
        return { opacity: 0, scale: 0.97, y: 16 };
      case 'left':
        return { opacity: 0, x: -24 };
      case 'right':
        return { opacity: 0, x: 24 };
      case 'up':
      default:
        return { opacity: 0, y: 24 };
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
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.section>
  );
};
