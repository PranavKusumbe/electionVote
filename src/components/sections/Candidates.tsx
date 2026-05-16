import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Target, Briefcase, Award, Info } from 'lucide-react';
import { CANDIDATES } from '../../constants';

export default function Candidates() {
  return (
    <div className="space-y-16">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Leading Coalitions</h2>
        <p className="text-slate-600 font-medium">
          VoterLab is strictly non-partisan and does not endorse any party or alliance. 
          Information is based on official manifestos and ECI communications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {CANDIDATES.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full border-none shadow-2xl shadow-slate-200/50"
            id={`candidate-${candidate.id}`}
          >
            {/* Header */}
            <div className={`p-8 ${candidate.color} text-white`}>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                  <Users className="w-8 h-8" />
                </div>
                <span className="px-4 py-1.5 bg-white text-slate-900 rounded-full text-xs font-bold uppercase tracking-widest">
                  {candidate.party}
                </span>
              </div>
              <h3 className="text-4xl font-black mb-1">{candidate.name}</h3>
              <p className="text-white/80 font-medium italic opacity-80">{candidate.role}</p>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col">
              <div className="space-y-8 mb-8">
                <section>
                  <div className="flex items-center gap-2 mb-3 text-blue-900">
                    <Target className="w-5 h-5" />
                    <h4 className="font-bold text-lg">Main Platform</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium pl-7 border-l-2 border-slate-100 italic">
                    "{candidate.platform}"
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-4 text-blue-900">
                    <Award className="w-5 h-5" />
                    <h4 className="font-bold text-lg">Key Policy Proposals</h4>
                  </div>
                  <ul className="space-y-4 pl-7">
                    {candidate.keyPoints.map((point, i) => (
                      <li key={i} className="group flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-50 transition-colors">
                          <span className="text-[10px] font-bold text-slate-400">{i + 1}</span>
                        </div>
                        <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="mt-auto pt-8 border-t border-slate-100">
                <button 
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                  id={`view-more-${candidate.id}`}
                >
                  <Briefcase className="w-4 h-4" />
                  Detailed Policy Analysis
                  <ExternalLink className="w-4 h-4 opacity-50" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Voter Education Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="p-8 rounded-[2rem] bg-blue-900 text-white flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <Info className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-xl font-bold mb-2">How to Evaluate Candidates?</h4>
          <p className="text-blue-100 leading-relaxed font-medium">
            Don't just look at slogans. Evaluate their past record, their fiscal responsibility, 
            and how their policies align with your core values. Use our Assistant to ask specific comparative questions.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Re-using icon from main app for simplicity in imports
function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
