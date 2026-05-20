'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StarType, Scores } from '@/lib/types';
import { questions } from '@/lib/questions';
import StarsBackground from '@/components/StarsBackground';
import LandingScreen from '@/components/LandingScreen';
import IntroScreen from '@/components/IntroScreen';
import QuestionScreen from '@/components/QuestionScreen';
import CalculatingScreen from '@/components/CalculatingScreen';
import ResultScreen from '@/components/ResultScreen';

const TOTAL_QUESTIONS = 5;
const INITIAL_SCORES: Scores = { meteor: 0, nebula: 0, planet: 0, sun: 0 };
// Tie-breaker priority: meteor > planet > nebula > sun
const TIE_BREAKER: StarType[] = ['meteor', 'planet', 'nebula', 'sun'];

// Steps: 0=landing, 1=intro, 2..6=questions, 7=calculating, 8=result
const STEP_CALCULATING = 2 + TOTAL_QUESTIONS;
const STEP_RESULT = STEP_CALCULATING + 1;

export default function Home() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>(INITIAL_SCORES);

  const handleAnswer = useCallback((type: StarType) => {
    setScores((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setStep((s) => s + 1);
  }, []);

  const reset = useCallback(() => {
    setScores(INITIAL_SCORES);
    setStep(0);
  }, []);

  const getResultType = (s: Scores): StarType => {
    let best = TIE_BREAKER[0];
    for (const type of TIE_BREAKER) {
      if (s[type] > s[best]) best = type;
    }
    return best;
  };

  const renderScreen = () => {
    if (step === 0) {
      return <LandingScreen key="landing" onStart={() => setStep(1)} />;
    }
    if (step === 1) {
      return <IntroScreen key="intro" onAccept={() => setStep(2)} />;
    }
    if (step >= 2 && step < STEP_CALCULATING) {
      const qIndex = step - 2;
      return (
        <QuestionScreen
          key={`question-${qIndex}`}
          question={questions[qIndex]}
          questionIndex={qIndex}
          totalQuestions={TOTAL_QUESTIONS}
          onAnswer={handleAnswer}
        />
      );
    }
    if (step === STEP_CALCULATING) {
      return (
        <CalculatingScreen key="calculating" onComplete={() => setStep(STEP_RESULT)} />
      );
    }
    if (step === STEP_RESULT) {
      return (
        <ResultScreen
          key="result"
          scores={scores}
          resultType={getResultType(scores)}
          onReplay={reset}
        />
      );
    }
    return null;
  };

  return (
    <main className="relative min-h-screen bg-cosmic overflow-hidden">
      <StarsBackground />
      <div className="relative z-10 min-h-screen flex justify-center">
        <div className="w-full max-w-[480px]">
          <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>
        </div>
      </div>
    </main>
  );
}
