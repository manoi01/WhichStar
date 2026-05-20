'use client';

import { motion } from 'framer-motion';

interface Props {
  onAccept: () => void;
}

export default function IntroScreen({ onAccept }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-between min-h-screen px-6 py-12"
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <span className="text-5xl mb-10" role="img" aria-label="galaxy">
          🌌
        </span>

        <div className="space-y-6 max-w-sm">
          <p className="font-serif text-lg text-white/90 leading-relaxed">
            &ldquo;คุณลืมตาขึ้นมาพบว่าตัวเองกำลังลอยอยู่ท่ามกลางความมืดมิดของอวกาศ
            รอบกายไม่มีเสียงใดๆ มีเพียงละอองดาวระยิบระยับ ทันใดนั้น
            ดวงตาของผู้พิทักษ์จักรวาลก็ปรากฏขึ้นพร้อมเสียงกระซิบ...&rdquo;
          </p>
          <p className="font-serif text-base text-white/65 leading-relaxed">
            &ldquo;แสงสว่างแห่งกลุ่มดาวหลักได้ดับลงแล้ว
            จักรวาลกำลังจะเข้าสู่ความมืดมิดนิรันดร์
            เจ้าคือผู้ถูกเลือกให้เดินทางข้ามแกแล็กซีเพื่อจุดไฟดวงดาวเหล่านั้นอีกครั้ง&rdquo;
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={onAccept}
          className="min-h-[44px] px-8 py-3 bg-white/10 border border-white/25 rounded-full text-white font-sans font-medium text-base hover:bg-white/18 active:bg-white/25 transition-colors backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a1f]"
        >
          ยอมรับภารกิจ ✨
        </button>
      </div>
    </motion.div>
  );
}
