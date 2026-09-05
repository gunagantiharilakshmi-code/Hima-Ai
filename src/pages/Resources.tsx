import React, { useState } from 'react';
import { FolderGit2, Search, Bot, BookOpen, Sparkles, Filter } from 'lucide-react';
import { ResourceItem } from '../types';
import { INITIAL_RESOURCES } from '../data/mockData';
import { ResourceCard } from '../components/ResourceCard';

interface ResourcesProps {
  onNavigateToAssistantWithPrompt: (prompt: string) => void;
}

export const Resources: React.FC<ResourcesProps> = ({
  onNavigateToAssistantWithPrompt,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Study Materials',
    'Programming',
    'Artificial Intelligence',
    'Data Structures',
    'DBMS',
    'Mathematics',
    'Electronics',
    'Exam Preparation',
    'Placement Preparation',
  ];

  const filteredResources = INITIAL_RESOURCES.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Academic Vault & Curated Guides</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Resources
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Access curated lecture notes, cheat sheets, previous university question banks, and placement interview roadmaps.
          </p>
        </div>

        <button
          id="ask-hima-resources-btn"
          onClick={() =>
            onNavigateToAssistantWithPrompt(
              'What study materials, cheat sheets, and previous year exam questions are available for my subjects?'
            )
          }
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all shrink-0"
        >
          <Bot className="w-4 h-4" />
          <span>Ask Hima AI for Materials</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes, algorithms, SQL, cheat sheets..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onAskHima={(prompt) => onNavigateToAssistantWithPrompt(prompt)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700 text-base mb-1">No resources found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            No academic documents match "{searchTerm}". Try clearing your search or switching categories.
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
    </div>
  );
};
