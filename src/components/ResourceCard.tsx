import React, { useState } from 'react';
import { BookOpen, FileText, Download, Bot, Check, ExternalLink, Sparkles } from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourceCardProps {
  resource: ResourceItem;
  onAskHima: (query: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onAskHima }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            {resource.category}
          </span>
          <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
            {resource.type}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
          {resource.title}
        </h3>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          {resource.description}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <span className="font-medium text-slate-700">Target: {resource.academicTerm}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.tags.map((tag) => (
            <span key={tag} className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={handleDownload}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            downloaded
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {downloaded ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Access Doc</span>
            </>
          )}
        </button>

        <button
          onClick={() =>
            onAskHima(
              `Summarize key concepts and high-yield topics from the ${resource.category} guide: "${resource.title}".`
            )
          }
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/70 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Bot className="w-3.5 h-3.5 text-indigo-600" />
          <span>Ask Hima AI</span>
        </button>
      </div>
    </div>
  );
};
