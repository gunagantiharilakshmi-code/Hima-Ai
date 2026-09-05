import React from 'react';
import { Calendar, MapPin, Users, Bot, Trophy, Sparkles, Tag } from 'lucide-react';
import { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
  onAskHima: (query: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onAskHima }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Closing Soon':
        return 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse';
      case 'Closed':
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Hackathons':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Technical Events':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Workshops':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Competitions':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'College Events':
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadge(event.category)}`}>
            {event.category}
          </span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(event.registrationStatus)}`}>
            {event.registrationStatus === 'Closing Soon' ? '⏰ ' : ''}{event.registrationStatus}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
          {event.title}
        </h3>

        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {event.description}
        </p>

        {event.prizeOrBadge && (
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-lg mb-4">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>{event.prizeOrBadge}</span>
          </div>
        )}

        <div className="space-y-1.5 text-xs text-slate-600 mb-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Organizer: {event.organizer}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {event.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={() =>
            onAskHima(
              `Give me more details, schedule, and team registration guide for ${event.title} organized by ${event.organizer}.`
            )
          }
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
        >
          <Bot className="w-4 h-4 text-indigo-600" />
          <span>Ask Hima AI About Event</span>
        </button>
      </div>
    </div>
  );
};
