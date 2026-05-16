import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ShieldCheck, Zap, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/4 -translate-y-1/4">
        <div className="w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-60" />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/4 translate-y-1/4">
        <div className="w-[400px] h-[400px] bg-red-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold bg-blue-100 text-blue-900 rounded-full uppercase tracking-wider">
            Democracy Starts with You
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            Your Guide to the <br />
            <span className="text-orange-600 italic">2026 Lok Sabha.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Understand every step of the Indian electoral process. 
            From NVSP registration to counting day results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {[
            { icon: ShieldCheck, label: 'Reliable Info' },
            { icon: Zap, label: 'Fast Updates' },
            { icon: Heart, label: 'Non-Partisan' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-500">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block p-3 border border-slate-200 rounded-full text-slate-400"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
}
