import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  accentColor?: string;
  onClick?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  badge,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform duration-200">
        <span>Explore feature</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
};
