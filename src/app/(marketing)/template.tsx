"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

// The first render (server and hydration) is never animated, so content is
// visible without JavaScript. Later client navigations fade and rise in.
let hasMounted = false;

export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = hasMounted && !reduce;

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 18 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
