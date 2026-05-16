import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Calendar } from 'lucide-react';
import { ELECTION_TIMELINE } from '../../constants';

export default function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
      
      <div className="space-y-12 relative">
        {ELECTION_TIMELINE.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            id={`step-${step.id}`}
          >
            <div className="flex-1 w-full">
              <div className={`p-8 rounded-3xl glass-card relative overflow-hidden group hover:scale-[1.02] transition-transform ${
                step.isCompleted ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-blue-900'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {step.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {step.description}
                </p>
                
                {step.isCompleted && (
                  <div className="absolute top-4 right-4 animate-pulse">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                )}
              </div>
            </div>

            <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center z-10 shrink-0">
              {step.isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              ) : (
                <div className="w-3 h-3 bg-blue-900 rounded-full" />
              )}
            </div>

            <div className="flex-1 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
