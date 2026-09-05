import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Bot, 
  Building2, 
  BookOpen, 
  Users, 
  Cpu, 
  Library, 
  MapPin, 
  CalendarDays, 
  PhoneCall, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { COLLEGE_INFO_CATEGORIES } from '../data/mockData';
import { CollegeInfoCategory } from '../types';

interface CollegeInfoProps {
  onNavigateToAssistantWithPrompt: (prompt: string) => void;
}

export const CollegeInfo: React.FC<CollegeInfoProps> = ({
  onNavigateToAssistantWithPrompt,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return Building2;
      case 'GraduationCap':
        return GraduationCap;
      case 'BookOpen':
        return BookOpen;
      case 'Users':
        return Users;
      case 'Cpu':
        return Cpu;
      case 'Library':
        return Library;
      case 'MapPin':
        return MapPin;
      case 'CalendarDays':
        return CalendarDays;
      case 'PhoneCall':
        return PhoneCall;
      case 'ShieldAlert':
      default:
        return ShieldAlert;
    }
  };

  const filteredCategories = COLLEGE_INFO_CATEGORIES.filter((cat) => {
    const term = searchTerm.toLowerCase();
    return (
      cat.title.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term) ||
      cat.sampleTopics.some((t) => t.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Campus Intelligence & Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            College Information
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Explore college departments, regulations, faculty details, lab timings, and campus facilities.
          </p>
        </div>

        <button
          id="ask-hima-college-info-btn"
          onClick={() =>
            onNavigateToAssistantWithPrompt(
              'What college information, departments, or campus facilities can you provide details on?'
            )
          }
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all shrink-0"
        >
          <Bot className="w-4 h-4" />
          <span>Ask Hima AI</span>
        </button>
      </div>

      {/* Official Knowledge Base Clarification (Requirement 12) */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Official College Data is Powered by Hima AI's Botpress Knowledge Base
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed max-w-3xl">
              To ensure 100% accuracy and prevent unverified claims about your specific institution, all official departmental documents, fee structures, faculty contacts, and semester schedules are retrieved directly through your custom <strong>Botpress Studio Knowledge Base</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            onNavigateToAssistantWithPrompt(
              'What are the official college rules regarding minimum attendance and examination eligibility?'
            )
          }
          className="px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200 text-xs font-semibold rounded-xl shrink-0 transition-colors shadow-2xs"
        >
          Query Knowledge Base &rarr;
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search categories (e.g. library, attendance rules, faculty, labs)..."
          className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
        />
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => {
          const Icon = getIcon(cat.iconName);
          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {cat.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {cat.description}
                </p>

                <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Topics in Knowledge Base:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.sampleTopics.map((topic) => (
                      <span
                        key={topic}
                        className="text-[11px] bg-slate-50 border border-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateToAssistantWithPrompt(cat.suggestedPrompt)}
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl transition-colors group"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ask Hima AI</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
