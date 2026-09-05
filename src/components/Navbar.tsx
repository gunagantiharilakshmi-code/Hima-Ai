import React, { useState } from 'react';
import { Bot, Menu, X, Sparkles, BookOpen, Calendar, CheckSquare, GraduationCap, CalendarDays, FolderGit2, Info } from 'lucide-react';
import { ActivePage } from '../types';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, unreadCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActivePage; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'study-planner', label: 'Study Planner', icon: Calendar },
    { id: 'college-info', label: 'College Info', icon: GraduationCap },
    { id: 'exams', label: 'Exams', icon: CalendarDays },
    { id: 'assignments', label: 'Assignments', icon: CheckSquare },
    { id: 'events', label: 'Events', icon: Sparkles },
    { id: 'resources', label: 'Resources', icon: FolderGit2 },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Hima AI
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  College
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Your Smart Study Assistant
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = activePage === item.id;
              const hasUnread = item.id === 'assistant' && unreadCount > 0;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span>{item.label}</span>
                  {hasUnread && (
                    <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-bold animate-pulse shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              id="nav-ask-hima-btn"
              onClick={() => handleNavClick('assistant')}
              className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Bot className="w-4 h-4" />
              <span>Ask Hima AI</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
                </span>
              )}
            </button>

            {/* Mobile hamburger toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-4">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const hasUnread = item.id === 'assistant' && unreadCount > 0;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {hasUnread && (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
            <span>Powered by Botpress Studio</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Assistant Online
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
