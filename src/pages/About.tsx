import React from 'react';
import { Bot, ShieldCheck, Cpu, Sparkles, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { ActivePage } from '../types';

interface AboutProps {
  onNavigate: (page: ActivePage) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header / Intro */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About Hima AI</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Your Smart College & Study Assistant 💙
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Hima AI is a student-focused college and study assistant designed to make academic life easier.
        </p>
      </div>

      {/* Mission Narrative Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Making Campus Life & Study Planning Effortless
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Navigating college requires juggling lecture schedules, fluctuating assignment deadlines, heavy syllabus loads, semester exam preparation, and career-building hackathons. <strong>Hima AI</strong> serves as a single unified portal that brings together intelligent planning tools with a dedicated conversational AI assistant.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">College Information</h4>
              <p className="text-xs text-slate-500 mt-0.5">Instant answers about departments, syllabi, faculty hours, and rules.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Academic Task Guidance</h4>
              <p className="text-xs text-slate-500 mt-0.5">Help understanding assignment requirements, problem sets, and projects.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Exam Preparation</h4>
              <p className="text-xs text-slate-500 mt-0.5">Real-time countdown dashboards, priority scheduling, and revision breakdowns.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Opportunities & Hackathons</h4>
              <p className="text-xs text-slate-500 mt-0.5">Stay updated with technical symposiums, coding competitions, and workshops.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Design Section (Botpress as AI Brain) */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Botpress Studio as the AI Brain
            </h3>
            <p className="text-xs text-indigo-300">
              Zero simulated AI • Powered by your existing Botpress Studio workflow
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The conversational intelligence, college knowledge base, student intent recognition, and academic logic are managed exclusively in <strong>Botpress Studio</strong>. This website is the dedicated frontend interface crafted to host and display your Botpress Webchat embed with complete styling harmony.
        </p>

        {/* Architecture Flow Diagram */}
        <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
            System Architecture Flow:
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center text-xs font-medium">
            <div className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-slate-700 text-white border border-slate-600">
              Student Query
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-400 rotate-90 md:rotate-0 shrink-0" />
            <div className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-indigo-900 text-indigo-200 border border-indigo-700">
              Hima AI Website
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-400 rotate-90 md:rotate-0 shrink-0" />
            <div className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-blue-900 text-blue-200 border border-blue-700">
              Botpress Webchat
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-400 rotate-90 md:rotate-0 shrink-0" />
            <div className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-purple-900 text-purple-200 border border-purple-700">
              Botpress Workflow & KB
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-400 rotate-90 md:rotate-0 shrink-0" />
            <div className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-emerald-900 text-emerald-200 border border-emerald-700">
              Verified Response
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>No unverified third-party LLMs or fake chatbots. Direct Botpress Studio integration.</span>
        </div>
      </div>

      {/* CTA Card */}
      <div className="text-center p-8 bg-indigo-50/70 rounded-3xl border border-indigo-100 space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">
          Ready to ask Hima AI?
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Start exploring your college resources, schedule your exams, or ask questions in real time.
        </p>
        <button
          onClick={() => onNavigate('assistant')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
        >
          <Bot className="w-4 h-4" />
          <span>Launch AI Assistant</span>
        </button>
      </div>
    </div>
  );
};
