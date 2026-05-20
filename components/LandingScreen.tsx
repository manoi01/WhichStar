'use client';

import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center"
    >
      <div className="mb-8 animate-pulse-star">
        <span className="text-8xl" role="img" aria-label="star">
          ⭐
        </span>
      </div>

      <h1 className="font-serif text-5xl font-bold text-white mb-3 tracking-wide">
        WhichStar
      </h1>
      <p className="font-serif text-xl text-white/70 mb-3">
        คุณคือดาวดวงไหน?
      </p>
      <p className="font-sans text-sm text-white/45 mb-14 max-w-xs leading-relaxed">
        ค้นพบจุดแข็งที่ซ่อนอยู่ในตัวคุณ ผ่านการเดินทางข้ามจักรวาล
      </p>

      <button
        onClick={onStart}
        className="min-h-[44px] px-8 py-3 bg-white/10 border border-white/25 rounded-full text-white font-sans font-medium text-base hover:bg-white/18 active:bg-white/25 transition-colors backdrop-blur-sm"
      >
        เริ่มต้นการเดินทาง
      </button>
    </motion.div>
  );
}
