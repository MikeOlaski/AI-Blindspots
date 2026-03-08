import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

const questions = [
  {
    id: 'life',
    title: 'AI in Your Life',
    description: 'How do you feel about AI integrating into your daily routines, personal decisions, and private life?',
    placeholder: 'e.g., I worry it will make me lazy, or I hope it frees up my time for hobbies...',
  },
  {
    id: 'world',
    title: 'AI in the World',
    description: 'What are your core beliefs about how AI will shape society, culture, and humanity as a whole?',
    placeholder: 'e.g., I think it will solve climate change, or I fear it will increase inequality...',
  },
  {
    id: 'business',
    title: 'AI in Your Business',
    description: 'How do you view AI\'s role in your career, industry, or business operations?',
    placeholder: 'e.g., It\'s a tool to increase efficiency, or it\'s a threat to my job security...',
  }
];

export type Answers = {
  life: string;
  world: string;
  business: string;
};

export default function Questionnaire({ onSubmit, isAnalyzing }: { onSubmit: (answers: Answers) => void, isAnalyzing: boolean }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ life: '', world: '', business: '' });

  const currentQuestion = questions[step];
  const isLastStep = step === questions.length - 1;

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onSubmit(answers);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const currentAnswer = answers[currentQuestion.id as keyof Answers];
  const isNextDisabled = currentAnswer.trim().length < 10 || isAnalyzing;

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-12">
      <div className="mb-8 flex justify-between items-center text-sm font-medium text-zinc-500">
        <span>Step {step + 1} of {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors ${i <= step ? 'bg-indigo-500' : 'bg-zinc-800'}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-8 md:p-10 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-display font-medium text-zinc-100 mb-3">
            {currentQuestion.title}
          </h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            {currentQuestion.description}
          </p>

          <textarea
            value={currentAnswer}
            onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
            placeholder={currentQuestion.placeholder}
            className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none transition-all"
            disabled={isAnalyzing}
          />

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={step === 0 || isAnalyzing}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-colors ${
                step === 0 ? 'opacity-0 pointer-events-none' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Decoding...
                </>
              ) : isLastStep ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Blindspots
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
