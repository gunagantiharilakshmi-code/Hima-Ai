import React from 'react';
import { CheckCircle2, Circle, Clock, Calendar, AlertTriangle, Bot } from 'lucide-react';
import { StudyTask } from '../types';

interface StudyTaskCardProps {
  task: StudyTask;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onAskHima: (query: string) => void;
}

export const StudyTaskCard: React.FC<StudyTaskCardProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onAskHima,
}) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Hard':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Easy':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl p-5 border transition-all duration-200 ${
        task.completed
          ? 'border-slate-200 bg-slate-50/70 opacity-75'
          : 'border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block">
              {task.subject}
            </span>
            <h4
              className={`text-base font-bold text-slate-900 ${
                task.completed ? 'line-through text-slate-500' : ''
              }`}
            >
              {task.topic}
            </h4>
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-400 hover:text-rose-500 text-xs p-1 rounded transition-colors"
          title="Delete task"
        >
          ✕
        </button>
      </div>

      {/* Badges & Metadata */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
        <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          {task.hours} {task.hours === 1 ? 'hour' : 'hours'}
        </span>

        {task.examDate && (
          <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Exam: {task.examDate}
          </span>
        )}

        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border font-medium ${getPriorityBadge(
            task.priority
          )}`}
        >
          {task.priority === 'High' && <AlertTriangle className="w-3 h-3 inline" />}
          {task.priority} Priority
        </span>

        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md border font-medium ${getDifficultyBadge(
            task.difficulty
          )}`}
        >
          {task.difficulty}
        </span>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
            task.completed
              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
          }`}
        >
          {task.completed ? 'Completed' : 'Mark Complete'}
        </button>

        <button
          onClick={() =>
            onAskHima(
              `Help me study ${task.subject}: ${task.topic}. I have ${task.hours} hours to prepare for my exam on ${task.examDate || 'upcoming date'}.`
            )
          }
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg shadow-2xs transition-all hover:bg-indigo-50/50"
          title="Ask Hima AI Botpress Assistant"
        >
          <Bot className="w-3.5 h-3.5 text-indigo-600" />
          <span>Ask Hima AI</span>
        </button>
      </div>
    </div>
  );
};
