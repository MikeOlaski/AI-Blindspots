import { motion } from 'motion/react';
import { ArrowRight, BrainCircuit } from 'lucide-react';

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
          <BrainCircuit className="w-4 h-4 text-indigo-400" />
          <span>Decoder.Rehabit AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6 bg-gradient-to-br from-zinc-100 to-zinc-500 bg-clip-text text-transparent">
          Uncover Your AI Blindspots
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Determine objectively what your beliefs are telling you about AI in your life, the world, and your business. Re-imagine the future to adjust those beliefs and change the world.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-950 rounded-full font-medium text-lg hover:bg-white transition-colors"
        >
          Start Decoding
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
