'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export default function CalculatingScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <div className="animate-pulse-star text-7xl mb-8" role="img" aria-label="กำลังคำนวณ">
        ⭐
      </div>
      <p className="font-serif text-xl text-white/80 mb-2">
        กำลังอ่านดวงดาว...
      </p>
      <p className="font-sans text-sm text-white/40">
        ห้วงจักรวาลกำลังค้นหาดาวของคุณ
      </p>
    </motion.div>
  );
}
