import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Trash2, Shield } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { askAssistant } from '../../services/geminiService';
import { User as FirebaseUser } from '../../lib/firebase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { uri: string; title: string }[];
}

interface AssistantProps {
  user: FirebaseUser | null;
  onLogin: () => void;
}

export default function Assistant({ user, onLogin }: AssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '# Namaste! I am VoterLab AI.\n\nI can help you navigate the Indian General Elections. Ask me about registration on NVSP, voting phases, or the latest election dates.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const fullHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    const response = await askAssistant(userMessage, fullHistory);

    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: response.text,
      sources: response.sources
    }]);
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: '# Hello! I am VoterLab AI.\n\nI can help you navigate the 2026 election process. Ask me about registration, voting methods, or how to research candidates.' }]);
  };

  return (
    <div className="max-w-3xl mx-auto h-[600px] flex flex-col glass-card rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-900 rounded-2xl flex items-center justify-center p-1">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold">Interactive Assistant</h3>
            <p className="text-xs text-slate-500 font-medium">Powered by Gemini AI</p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          title="Clear Chat"
          id="clear-chat"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              id={`msg-${i}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                m.role === 'assistant' ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {m.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                m.role === 'assistant' ? 'bg-slate-50 text-slate-800' : 'bg-blue-900 text-white'
              }`}>
                <div className="markdown-body prose prose-sm max-w-none mb-2">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {m.sources.map((source, idx) => (
                        <a
                          key={idx}
                          href={source.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] px-2 py-1 bg-slate-200 text-slate-600 rounded hover:bg-blue-900 hover:text-white transition-colors"
                        >
                          {source.title.length > 20 ? source.title.substring(0, 20) + '...' : source.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center animate-pulse">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-50 px-4 py-3 rounded-2xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-900/30 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-blue-900/30 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-blue-900/30 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100">
        {!user && messages.length > 5 ? (
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm font-medium text-blue-900 mb-3">Sign in to save your conversation and get personalized deadline reminders.</p>
            <button
              onClick={onLogin}
              className="px-6 py-2 bg-blue-900 text-white rounded-full text-sm font-bold hover:shadow-lg transition-all"
            >
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about the election..."
              className="flex-1 bg-white px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all font-medium"
              id="assistant-input"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-900 text-white p-3 rounded-xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              id="send-btn"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        )}
        <p className="text-[10px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" />
          Always verify important dates with official local election offices
        </p>
      </div>
    </div>
  );
}
