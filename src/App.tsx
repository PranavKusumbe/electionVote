import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut, Vote, ChevronRight, MessageSquare, Info, Users, Calendar } from 'lucide-react';
import { auth, signInWithGoogle, logout, onAuthStateChanged, User } from './lib/firebase';
import Hero from './components/sections/Hero';
import Timeline from './components/sections/Timeline';
import Assistant from './components/sections/Assistant';
import Candidates from './components/sections/Candidates';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'timeline' | 'assistant' | 'candidates'>('timeline');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Vote className="w-12 h-12 text-blue-900" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-card mx-4 my-2 rounded-2xl flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-900 rounded-lg">
            <Vote className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold font-serif tracking-tight">VoterLab</span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-blue-900" />
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium hover:text-red-600 transition-colors"
                id="logout-btn"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-blue-900 text-white rounded-full font-medium hover:bg-blue-800 transition-all flex items-center gap-2"
              id="login-btn"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </nav>

      <main className="flex-1">
        <Hero />
        
        {/* Navigation Tabs */}
        <div className="max-w-4xl mx-auto px-4 mt-8">
          <div className="flex bg-slate-200 p-1 rounded-2xl gap-1">
            {[
              { id: 'timeline', label: 'Timeline', icon: Calendar },
              { id: 'assistant', label: 'Assistant', icon: MessageSquare },
              { id: 'candidates', label: 'Candidates', icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                  activeTab === tab.id ? 'bg-white shadow-sm font-bold' : 'text-slate-600 hover:bg-white/50'
                }`}
                id={`tab-${tab.id}`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <AnimatePresence mode="wait">
            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Timeline />
              </motion.div>
            )}
            
            {activeTab === 'assistant' && (
              <motion.div
                key="assistant"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Assistant user={user} onLogin={handleLogin} />
              </motion.div>
            )}

            {activeTab === 'candidates' && (
              <motion.div
                key="candidates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Candidates />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-60">
            <Vote className="w-5 h-5" />
            <span className="font-serif">VoterLab Education Initiative</span>
          </div>
          <div className="text-sm text-slate-500">
            © 2026 VoterLab. All information is sourced from official non-partisan election resources.
          </div>
        </div>
      </footer>
    </div>
  );
}
