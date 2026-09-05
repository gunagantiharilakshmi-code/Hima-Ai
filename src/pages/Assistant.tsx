import React, { useState } from 'react';
import { Bot, Sparkles, HelpCircle, ShieldCheck, ChevronRight, Copy, Check } from 'lucide-react';
import { BotpressChat } from '../components/BotpressChat';

interface AssistantProps {
  initialQuery?: string;
  onClearInitialQuery?: () => void;
  onNewBotMessage?: (preview: string) => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  isCurrentPage?: boolean;
}

export const Assistant: React.FC<AssistantProps> = ({ 
  initialQuery, 
  onClearInitialQuery,
  onNewBotMessage,
  soundEnabled = true,
  onToggleSound,
  isCurrentPage = true,
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>(initialQuery || '');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const suggestedQuestions = [
    'What subjects do I have?',
    'Help me create a study timetable',
    'When are my exams?',
    'Explain my assignment',
    'What hackathons are coming up?',
    'Help me prepare for my exam',
  ];

  const handlePromptClick = (question: string, index: number) => {
    setSelectedPrompt(question);
    setCopiedIndex(index);
    navigator.clipboard?.writeText(question).catch(() => {});
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Bot className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full ring-2 ring-emerald-200" />
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Hima AI
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ● Online
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                Botpress Powered
              </span>
            </div>

            <p className="text-sm text-slate-600 mt-1">
              Your Smart College & Study Assistant • Conversational Academic Intelligence
            </p>
          </div>
        </div>

        {/* Knowledge Base Notice */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 max-w-sm text-xs text-slate-600 space-y-1 shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Official Botpress Brain</span>
          </div>
          <p>
            Connected to your custom knowledge base containing verified course syllabi, faculty contacts, timetable logic, and exam schedules.
          </p>
        </div>
      </div>

      {/* Welcome & Prompt Suggestions Section */}
      <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/60 to-purple-50/50 rounded-3xl p-6 sm:p-7 border border-indigo-100/80 space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Hi! 👋 I'm Hima AI – Your friendly college and study assistant.
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-medium mt-1">
            Ask me anything related to your college or studies.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Suggested Questions (click to copy and ask):</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => {
              const isCopied = copiedIndex === idx;
              return (
                <button
                  key={q}
                  id={`suggested-question-${idx}`}
                  onClick={() => handlePromptClick(q, idx)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                    isCopied
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white hover:bg-indigo-50 border-slate-200/90 text-slate-700 hover:text-indigo-700 hover:border-indigo-300 shadow-2xs'
                  }`}
                >
                  <span>{q}</span>
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dedicated Chatbot Container with Botpress Webchat */}
      <div className="w-full flex-1 flex flex-col min-h-[580px] lg:min-h-[660px]">
        <BotpressChat 
          initialPrompt={selectedPrompt} 
          onClearInitialPrompt={() => setSelectedPrompt('')}
          onNewBotMessage={onNewBotMessage}
          soundEnabled={soundEnabled}
          onToggleSound={onToggleSound}
          isCurrentPage={isCurrentPage}
        />
      </div>
    </div>
  );
};
