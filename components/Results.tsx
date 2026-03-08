import { motion } from 'motion/react';
import { RefreshCcw, Eye, Lightbulb, Sparkles } from 'lucide-react';

export type AnalysisResult = {
  life: {
    blindspot: string;
    reimagined: string;
  };
  world: {
    blindspot: string;
    reimagined: string;
  };
  business: {
    blindspot: string;
    reimagined: string;
  };
  summary: string;
};

export default function Results({ result, onReset }: { result: AnalysisResult; onReset: () => void }) {
  const sections = [
    { id: 'life', title: 'Life', data: result.life, icon: <Eye className="w-5 h-5 text-rose-400" /> },
    { id: 'world', title: 'World', data: result.world, icon: <Eye className="w-5 h-5 text-amber-400" /> },
    { id: 'business', title: 'Business', data: result.business, icon: <Eye className="w-5 h-5 text-emerald-400" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 mb-6">
          <Sparkles className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-medium text-zinc-100 mb-6">
          Your AI Blindspots Decoded
        </h2>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {result.summary}
        </p>
      </motion.div>

      <div className="space-y-12 mb-16">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Blindspot Card */}
            <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 transition-colors group-hover:bg-zinc-700" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-800/50 rounded-xl">
                  {section.icon}
                </div>
                <h3 className="text-xl font-display font-medium text-zinc-200">
                  {section.title} Blindspot
                </h3>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                {section.data.blindspot}
              </p>
            </div>

            {/* Reimagined Card */}
            <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50 transition-colors group-hover:bg-indigo-400" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/10 rounded-xl">
                  <Lightbulb className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-xl font-display font-medium text-indigo-100">
                  Re-Imagined Future
                </h3>
              </div>
              <p className="text-indigo-200/70 leading-relaxed">
                {section.data.reimagined}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center"
      >
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-zinc-300 rounded-full font-medium hover:bg-zinc-800 hover:text-zinc-100 transition-colors border border-zinc-800"
        >
          <RefreshCcw className="w-4 h-4" />
          Decode Again
        </button>
      </motion.div>
    </div>
  );
}
