import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Subtle scroll-triggered motion wrapper.
 * Keeps opacity at 1 so content is never trapped invisible before scroll,
 * while gently settling into place as it enters the viewport.
 */
export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Immediate mount entrance for above-the-fold Hero elements.
 */
export function HeroReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
