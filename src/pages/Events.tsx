import React, { useState } from 'react';
import { Sparkles, Bot, Plus, Search, Filter, Calendar } from 'lucide-react';
import { EventItem, EventCategory } from '../types';
import { EventCard } from '../components/EventCard';

interface EventsProps {
  events: EventItem[];
  onAddEvent: (event: Omit<EventItem, 'id'>) => void;
  onNavigateToAssistantWithPrompt: (prompt: string) => void;
}

export const Events: React.FC<EventsProps> = ({
  events,
  onAddEvent,
  onNavigateToAssistantWithPrompt,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Exclude<EventCategory, 'All'>>('Hackathons');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00 AM onwards');
  const [location, setLocation] = useState('Campus Auditorium');
  const [organizer, setOrganizer] = useState('Student Club');
  const [description, setDescription] = useState('');
  const [prizeOrBadge, setPrizeOrBadge] = useState('Exciting Prizes & Certificates');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    onAddEvent({
      title: title.trim(),
      category,
      date,
      time,
      location: location || 'Campus',
      organizer: organizer || 'Student Council',
      registrationStatus: 'Open',
      description: description || 'Participate and build innovative solutions.',
      prizeOrBadge,
      tags: [category, 'Campus Event'],
    });

    setTitle('');
    setDate('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  const filteredEvents = events.filter((ev) => {
    const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: EventCategory[] = [
    'All',
    'Hackathons',
    'Technical Events',
    'Workshops',
    'Competitions',
    'College Events',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Competitions & Opportunities</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Events & Hackathons
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Discover student competitions, coding hackathons, guest lectures, technical workshops, and campus cultural festivals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="post-event-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>

          <button
            id="ask-hima-events-btn"
            onClick={() =>
              onNavigateToAssistantWithPrompt(
                'What hackathons, technical events, or college workshops are coming up this semester?'
              )
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Ask Hima AI About Events</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events or organizers..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onAskHima={(prompt) => onNavigateToAssistantWithPrompt(prompt)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700 text-base mb-1">No events found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            No events match your current category or search query.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-xl text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Post New Event / Hackathon</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. CodeForge 2026 Hackathon"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Hackathons">Hackathons</option>
                    <option value="Technical Events">Technical Events</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Competitions">Competitions</option>
                    <option value="College Events">College Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. October 18, 2026"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Seminar Hall 1"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Organizer
                  </label>
                  <input
                    type="text"
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    placeholder="e.g. CSE Dept / Developer Club"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Prize / Incentive
                </label>
                <input
                  type="text"
                  value={prizeOrBadge}
                  onChange={(e) => setPrizeOrBadge(e.target.value)}
                  placeholder="e.g. $1,000 Cash Prize & Goodies"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details regarding teams, topics, or eligibility..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
