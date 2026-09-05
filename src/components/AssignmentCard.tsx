import React from 'react';
import { Calendar, Bot, CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';
import { AssignmentItem, AssignmentStatus } from '../types';

interface AssignmentCardProps {
  assignment: AssignmentItem;
  onUpdateStatus: (id: string, status: AssignmentStatus) => void;
  onDelete: (id: string) => void;
  onAskHima: (query: string) => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onUpdateStatus,
  onDelete,
  onAskHima,
}) => {
  const getStatusBadge = (status: AssignmentStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

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

  return (
    <div
      className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
        assignment.status === 'Completed'
          ? 'border-slate-200 bg-slate-50/60 opacity-80'
          : 'border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-sm'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              {assignment.subject}
            </span>
            <h4
              className={`text-base font-bold text-slate-900 ${
                assignment.status === 'Completed' ? 'line-through text-slate-500' : ''
              }`}
            >
              {assignment.title}
            </h4>
          </div>

          <button
            onClick={() => onDelete(assignment.id)}
            className="text-slate-400 hover:text-rose-500 text-xs p-1 rounded transition-colors"
            title="Delete assignment"
          >
            ✕
          </button>
        </div>

        {assignment.notes && (
          <p className="text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {assignment.notes}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Due: {assignment.dueDate}
          </span>

          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md border font-medium ${getPriorityBadge(
              assignment.priority
            )}`}
          >
            {assignment.priority} Priority
          </span>

          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md border font-medium ${getStatusBadge(
              assignment.status
            )}`}
          >
            {assignment.status}
          </span>

          {assignment.submissionFormat && (
            <span className="inline-flex items-center gap-1 text-slate-500 text-[11px]">
              <FileText className="w-3 h-3" />
              {assignment.submissionFormat}
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <label className="text-[11px] text-slate-500 font-medium">Status:</label>
          <select
            value={assignment.status}
            onChange={(e) => onUpdateStatus(assignment.id, e.target.value as AssignmentStatus)}
            className="text-xs bg-slate-100 border-0 rounded-lg px-2 py-1 text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          onClick={() =>
            onAskHima(
              `Explain and guide me through my assignment: "${assignment.title}" for ${assignment.subject}. Due on ${assignment.dueDate}.`
            )
          }
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-lg transition-colors"
          title="Ask Hima AI Botpress Assistant"
        >
          <Bot className="w-3.5 h-3.5 text-indigo-600" />
          <span>Ask Hima AI</span>
        </button>
      </div>
    </div>
  );
};
