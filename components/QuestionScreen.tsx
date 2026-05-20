'use client';

import { motion } from 'framer-motion';
import { Question, StarType } from '@/lib/types';
import ProgressDots from './ProgressDots';

interface Props {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (type: StarType) => void;
}

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-screen px-5 py-8"
    >
      <div className="mb-7">
        <ProgressDots total={totalQuestions} current={questionIndex} />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <p className="font-sans text-xs text-white/35 uppercase tracking-widest mb-2">
            ภารกิจที่ {questionIndex + 1}
          </p>
          <h2 className="font-serif text-2xl font-bold text-white mb-4">
            {question.title}
          </h2>
          <p className="font-sans text-sm text-white/70 leading-relaxed">
            {question.scenario}
          </p>
        </div>

        <div className="space-y-3 mt-auto pb-8">
          {question.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => onAnswer(choice.type)}
              className="w-full min-h-[56px] px-4 py-4 text-left bg-white/5 border border-white/12 rounded-2xl text-white/85 font-sans text-sm leading-relaxed hover:bg-white/10 hover:border-white/28 active:bg-white/14 transition-all"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
