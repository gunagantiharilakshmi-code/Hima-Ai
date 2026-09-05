import React from 'react';
import { Bot, GraduationCap, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const quickLinks: { id: ActivePage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'assistant', label: 'Hima AI Assistant' },
    { id: 'study-planner', label: 'Study Planner' },
    { id: 'college-info', label: 'College Directory' },
    { id: 'exams', label: 'Exam Countdown' },
    { id: 'assignments', label: 'Assignment Tracker' },
    { id: 'events', label: 'Events & Hackathons' },
    { id: 'resources', label: 'Academic Resources' },
    { id: 'about', label: 'About Hima AI' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 lg:pr-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Hima AI
                </span>
                <p className="text-xs text-indigo-400 font-medium">
                  Your Smart College & Study Assistant
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Designed to help students organize academic tasks, prepare for exams, discover hackathons, and query college information effortlessly.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Botpress Studio Brain Integration</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic & Opportunities */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              Student Tools
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.slice(5).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture & AI Brain Note */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 space-y-3">
            <h4 className="text-white text-sm font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Official Architecture
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hima AI's conversation logic, knowledge base, instructions, and college intelligence are managed through your <strong>Botpress Studio</strong> workflow.
            </p>
            <div className="pt-2 border-t border-slate-700/60 text-[11px] text-slate-400">
              Student &rarr; Hima AI Website &rarr; Botpress Webchat &rarr; Botpress Studio
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Hima AI. Built for college & university students.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-slate-400">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Students
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
