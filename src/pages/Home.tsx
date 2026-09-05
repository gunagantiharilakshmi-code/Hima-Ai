import React from 'react';
import { 
  Bot, 
  ArrowRight, 
  BookOpen, 
  CheckSquare, 
  CalendarDays, 
  GraduationCap, 
  Sparkles, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  AlertCircle, 
  ShieldCheck,
  Search
} from 'lucide-react';
import { ActivePage, StudyTask, ExamItem, AssignmentItem } from '../types';
import { FeatureCard } from '../components/FeatureCard';

interface HomeProps {
  onNavigate: (page: ActivePage) => void;
  studyTasks: StudyTask[];
  exams: ExamItem[];
  assignments: AssignmentItem[];
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  studyTasks,
  exams,
  assignments,
}) => {
  // Statistics calculations
  const completedTasks = studyTasks.filter((t) => t.completed).length;
  const pendingAssignments = assignments.filter((a) => a.status !== 'Completed').length;
  const totalStudyHours = studyTasks.reduce((acc, curr) => acc + (curr.completed ? curr.hours : 0), 0);

  const features = [
    {
      icon: BookOpen,
      title: 'Study Help',
      description: 'Understand difficult subjects, complex algorithms, and challenging topics through step-by-step guidance.',
      target: 'study-planner' as ActivePage,
      badge: 'Academic',
    },
    {
      icon: CheckSquare,
      title: 'Assignments',
      description: 'Get structured assistance understanding assignment requirements, problem sets, and lab projects.',
      target: 'assignments' as ActivePage,
      badge: 'Tracking',
    },
    {
      icon: CalendarDays,
      title: 'Exam Preparation',
      description: 'Prepare thoroughly for semester exams with countdown timers, subject breakdowns, and revision roadmaps.',
      target: 'exams' as ActivePage,
      badge: 'Countdown',
    },
    {
      icon: GraduationCap,
      title: 'College Information',
      description: 'Explore verified knowledge base data on courses, departments, faculty, labs, rules, and campus facilities.',
      target: 'college-info' as ActivePage,
      badge: 'Directory',
    },
    {
      icon: Sparkles,
      title: 'Events & Hackathons',
      description: 'Discover technical symposiums, hackathons, national competitions, workshops, and student activities.',
      target: 'events' as ActivePage,
      badge: 'Opportunities',
    },
    {
      icon: BarChart3,
      title: 'Student Planning',
      description: 'Organize your daily study sessions, pending coursework, and priorities with clear progress visualization.',
      target: 'study-planner' as ActivePage,
      badge: 'Productivity',
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-16 md:pb-20">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-tr from-blue-200/40 via-indigo-200/30 to-purple-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Hima AI • Your Smart College & Study Assistant</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Meet Hima AI 🤖
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Your friendly AI assistant for college, studies, exams, assignments and more.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-ask-hima-btn"
                  onClick={() => onNavigate('assistant')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-sm sm:text-base font-bold rounded-xl shadow-md shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Bot className="w-5 h-5" />
                  <span>Ask Hima AI</span>
                </button>

                <button
                  id="hero-explore-features-btn"
                  onClick={() => {
                    const el = document.getElementById('how-hima-helps');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 text-sm sm:text-base font-semibold rounded-xl border border-slate-300 shadow-xs transition-colors"
                >
                  <span>Explore Features</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Botpress Architecture Trust Badge */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Powered by your dedicated Botpress Studio workflow</span>
                </div>
                <span>•</span>
                <span>Zero Hallucination Knowledge Base</span>
              </div>
            </div>

            {/* Right Modern AI/Student Illustration Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-indigo-100/50">
                {/* Visual Avatar Banner */}
                <div className="relative mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 p-6 text-white text-center overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow-inner ring-4 ring-white/30">
                    <Bot className="w-12 h-12" />
                  </div>
                  <h3 className="font-extrabold text-xl tracking-tight text-white">Hima AI</h3>
                  <p className="text-xs text-indigo-100 mt-0.5">Ready to assist your college journey</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Botpress Brain Connected
                  </div>
                </div>

                {/* Sample Prompt Chips Preview */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Quick Sample Questions:
                  </p>
                  <button
                    onClick={() => onNavigate('assistant')}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/80 text-xs font-medium text-slate-700 transition-colors flex items-center justify-between group"
                  >
                    <span>"Help me create a study timetable for exams"</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                  <button
                    onClick={() => onNavigate('assistant')}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/80 text-xs font-medium text-slate-700 transition-colors flex items-center justify-between group"
                  >
                    <span>"What hackathons are coming up this semester?"</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                  <button
                    onClick={() => onNavigate('assistant')}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/80 text-xs font-medium text-slate-700 transition-colors flex items-center justify-between group"
                  >
                    <span>"Explain Data Structures: Linked Lists"</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STUDENT DASHBOARD OVERVIEW SECTION (Requirement 15) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Welcome back! 👋
              </h2>
              <p className="text-sm text-slate-500">
                Here is your academic overview, study schedule, and upcoming deadlines.
              </p>
            </div>

            <button
              onClick={() => onNavigate('assistant')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold rounded-xl transition-colors shrink-0"
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Ask Hima AI Anything</span>
            </button>
          </div>

          {/* Quick Statistics Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold mb-1">
                <Clock className="w-4 h-4" />
                <span>Study Hours</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {totalStudyHours} <span className="text-xs font-normal text-slate-500">hrs logged</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tasks Completed</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {completedTasks} <span className="text-xs font-normal text-slate-500">of {studyTasks.length}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
              <div className="flex items-center gap-2 text-purple-700 text-xs font-semibold mb-1">
                <Calendar className="w-4 h-4" />
                <span>Upcoming Exams</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {exams.length} <span className="text-xs font-normal text-slate-500">scheduled</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
              <div className="flex items-center gap-2 text-amber-700 text-xs font-semibold mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>Pending Assignments</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {pendingAssignments} <span className="text-xs font-normal text-slate-500">active</span>
              </div>
            </div>
          </div>

          {/* Dashboard Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div 
              onClick={() => onNavigate('study-planner')}
              className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/60 transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Today's Study Plan
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                {studyTasks[0]?.topic || 'No active study tasks'}
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                {studyTasks[0]?.subject || 'Plan your study sessions'}
              </p>
              <span className="text-xs font-semibold text-indigo-600 inline-flex items-center gap-1">
                Open Planner &rarr;
              </span>
            </div>

            <div 
              onClick={() => onNavigate('exams')}
              className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/60 transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Next Upcoming Exam
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                {exams[0]?.subject || 'No upcoming exams'}
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                {exams[0] ? `${exams[0].daysRemaining} days remaining (${exams[0].examDate})` : 'Check schedules'}
              </p>
              <span className="text-xs font-semibold text-indigo-600 inline-flex items-center gap-1">
                View Exam Dashboard &rarr;
              </span>
            </div>

            <div 
              onClick={() => onNavigate('assignments')}
              className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/60 transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Priority Assignment
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                {assignments[0]?.title || 'No pending tasks'}
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                {assignments[0] ? `Due ${assignments[0].dueDate} (${assignments[0].priority} Priority)` : 'Add coursework'}
              </p>
              <span className="text-xs font-semibold text-indigo-600 inline-flex items-center gap-1">
                Manage Coursework &rarr;
              </span>
            </div>

            <div 
              onClick={() => onNavigate('events')}
              className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/60 transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Upcoming Hackathons
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                HackNova 2026
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                36-Hour National Hackathon • Registrations Open
              </p>
              <span className="text-xs font-semibold text-indigo-600 inline-flex items-center gap-1">
                Explore Events &rarr;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW HIMA AI HELPS YOU (6 FEATURE CARDS) */}
      <section id="how-hima-helps" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide">
            Comprehensive Student Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Hima AI Helps You
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            From tackling difficult academic coursework to tracking examination dates, assignments, and campus opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <FeatureCard
              key={feat.title}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              badge={feat.badge}
              onClick={() => onNavigate(feat.target)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
