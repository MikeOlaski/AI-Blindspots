'use client';

import { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { AnimatePresence, motion } from 'motion/react';
import Hero from '@/components/Hero';
import Questionnaire, { Answers } from '@/components/Questionnaire';
import Results, { AnalysisResult } from '@/components/Results';

export default function Home() {
  const [stage, setStage] = useState<'hero' | 'questionnaire' | 'results'>('hero');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setStage('questionnaire');
  };

  const handleAnalyze = async (answers: Answers) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const prompt = `
        You are an expert AI psychologist and futurist. Analyze the user's beliefs about AI in three areas: Life, World, and Business.
        Identify their "Blindspots" (hidden fears, overly optimistic assumptions, or limiting beliefs).
        Then, provide a "Re-Imagined Future" for each area that challenges their blindspot and offers a constructive, transformative perspective.
        Finally, provide a brief overarching summary of their mindset.

        User's Beliefs:
        - Life: ${answers.life}
        - World: ${answers.world}
        - Business: ${answers.business}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              life: {
                type: Type.OBJECT,
                properties: {
                  blindspot: { type: Type.STRING, description: 'The identified blindspot regarding AI in their personal life.' },
                  reimagined: { type: Type.STRING, description: 'A constructive, re-imagined perspective for their personal life.' }
                },
                required: ['blindspot', 'reimagined']
              },
              world: {
                type: Type.OBJECT,
                properties: {
                  blindspot: { type: Type.STRING, description: 'The identified blindspot regarding AI in the world/society.' },
                  reimagined: { type: Type.STRING, description: 'A constructive, re-imagined perspective for the world.' }
                },
                required: ['blindspot', 'reimagined']
              },
              business: {
                type: Type.OBJECT,
                properties: {
                  blindspot: { type: Type.STRING, description: 'The identified blindspot regarding AI in their business/career.' },
                  reimagined: { type: Type.STRING, description: 'A constructive, re-imagined perspective for their business.' }
                },
                required: ['blindspot', 'reimagined']
              },
              summary: { type: Type.STRING, description: 'A 2-3 sentence summary of their overall AI mindset and how they can evolve.' }
            },
            required: ['life', 'world', 'business', 'summary']
          }
        }
      });

      if (response.text) {
        const parsedResult = JSON.parse(response.text) as AnalysisResult;
        setResult(parsedResult);
        setStage('results');
      } else {
        throw new Error('Failed to generate analysis.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while decoding your blindspots. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStage('hero');
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {stage === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onStart={handleStart} />
            </motion.div>
          )}

          {stage === 'questionnaire' && (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <Questionnaire onSubmit={handleAnalyze} isAnalyzing={isAnalyzing} />
              {error && (
                <div className="mt-4 text-rose-400 text-sm bg-rose-500/10 px-4 py-2 rounded-lg border border-rose-500/20">
                  {error}
                </div>
              )}
            </motion.div>
          )}

          {stage === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full"
            >
              <Results result={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
