'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarType, Scores } from '@/lib/types';
import { results } from '@/lib/results';

interface Props {
  scores: Scores;
  resultType: StarType;
  onReplay: () => void;
}

const STAR_ICONS: Record<StarType, string> = {
  meteor: '☄️',
  nebula: '🌌',
  planet: '🪐',
  sun: '☀️',
};

const STAR_LABELS: Record<StarType, string> = {
  meteor: 'ดาวตก',
  nebula: 'เนบิวลา',
  planet: 'ดาวเคราะห์',
  sun: 'ดาวฤกษ์',
};

const STAR_COLORS: Record<StarType, string> = {
  meteor: '#e24b4a',
  nebula: '#7f77dd',
  planet: '#1d9e75',
  sun: '#ef9f27',
};

const STAR_TYPES: StarType[] = ['meteor', 'nebula', 'planet', 'sun'];

export default function ResultScreen({ scores, resultType, onReplay }: Props) {
  const [shared, setShared] = useState(false);
  const result = results[resultType];
  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleShare = async () => {
    const text = `ฉันคือ ${result.name} — ${result.subtitle}!\nค้นพบดาวของคุณที่ WhichStar ⭐`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'WhichStar - คุณคือดาวดวงไหน?', text });
      } else {
        await navigator.clipboard.writeText(text);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // user cancelled
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen px-6 py-10"
    >
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="text-7xl mb-4" role="img" aria-label={result.name}>
          {result.icon}
        </div>
        <h2 className="font-serif text-3xl font-bold text-white mb-1">
          {result.name}
        </h2>
        <p className="font-sans text-base font-semibold" style={{ color: result.color }}>
          {result.subtitle}
        </p>
      </div>

      {/* Description */}
      <div className="mb-5 p-4 bg-white/5 rounded-2xl border border-white/10">
        <p className="font-sans text-sm text-white/80 leading-relaxed">
          {result.description}
        </p>
      </div>

      {/* Strengths & Warnings */}
      <div className="space-y-3 mb-6">
        <div
          className="p-4 rounded-xl border"
          style={{
            borderColor: `${result.color}50`,
            backgroundColor: `${result.color}12`,
          }}
        >
          <p className="font-sans text-xs text-white/40 uppercase tracking-wider mb-1">
            จุดแข็ง
          </p>
          <p className="font-sans text-sm text-white/90">{result.strengths}</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="font-sans text-xs text-white/40 uppercase tracking-wider mb-1">
            ระวัง
          </p>
          <p className="font-sans text-sm text-white/75">{result.warnings}</p>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="mb-8">
        <p className="font-sans text-xs text-white/40 uppercase tracking-wider mb-3">
          สัดส่วนพลังดาว
        </p>
        <div className="space-y-2.5">
          {STAR_TYPES.map((type) => {
            const pct = total > 0 ? Math.round((scores[type] / total) * 100) : 0;
            return (
              <div key={type} className="flex items-center gap-3">
                <span className="text-base w-5">{STAR_ICONS[type]}</span>
                <span className="font-sans text-xs text-white/55 w-16 shrink-0">
                  {STAR_LABELS[type]}
                </span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    style={{ backgroundColor: STAR_COLORS[type] }}
                  />
                </div>
                <span className="font-sans text-xs text-white/45 w-8 text-right shrink-0">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleShare}
          className="flex-1 min-h-[44px] py-3 bg-white/10 border border-white/20 rounded-full text-white font-sans text-sm font-medium hover:bg-white/16 active:bg-white/22 transition-colors"
          aria-label="แชร์ผลลัพธ์"
        >
          {shared ? '✅ คัดลอกแล้ว' : '✨ แชร์ผลลัพธ์'}
        </button>
        <button
          onClick={onReplay}
          className="flex-1 min-h-[44px] py-3 bg-white/5 border border-white/12 rounded-full text-white/65 font-sans text-sm hover:bg-white/10 active:bg-white/14 transition-colors"
          aria-label="เล่นอีกครั้ง"
        >
          🔄 เล่นอีกครั้ง
        </button>
      </div>
    </motion.div>
  );
}
