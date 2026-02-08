'use client';

import { motion } from 'motion/react';

interface BorderBeamProps {
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  reverse?: boolean;
  /** Visible arc length as percentage of full circle (default 30 = ~108deg) */
  arcLength?: number;
}

export function BorderBeam({
  duration = 6,
  delay = 0,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  reverse = false,
  arcLength = 30,
}: BorderBeamProps) {
  // fade-in: 0 → colorFrom at ~30% of arc
  // solid:   colorFrom → colorTo in middle
  // fade-out: colorTo → transparent at end
  const fadeIn = Math.round(arcLength * 0.3);
  const fadeOut = arcLength;
  const mid = Math.round(arcLength * 0.6);

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        top: '50%',
        left: '50%',
        width: '150vmax',
        height: '150vmax',
        background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} ${fadeIn}%, ${colorTo} ${mid}%, transparent ${fadeOut}%)`,
      }}
      initial={{ x: '-50%', y: '-50%' }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    />
  );
}
