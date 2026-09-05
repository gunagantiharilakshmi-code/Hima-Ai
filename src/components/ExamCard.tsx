import React from 'react';
import { Calendar, Clock, MapPin, Bot, CheckCircle, Flame } from 'lucide-react';
import { ExamItem, ExamPrepStatus } from '../types';

interface ExamCardProps {
  exam: ExamItem;
  onUpdateStatus?: (id: string, status: ExamPrepStatus) => void;
  onPrepareWithHima: (exam: ExamItem) => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  onUpdateStatus,
  onPrepareWithHima,
}) => {
  const getDaysBadge = (days: number) => {
    if (days <= 7) {
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        text: `${days} Days Remaining!`,
        urgent: true,
      };
    }
    if (days <= 20) {
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        text: `${days} Days Remaining`,
        urgent: false,
      };
    }
    return {
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      text: `${days} Days Remaining`,
      urgent: false,
    };
  };

  const getStatusColor = (status: ExamPrepStatus) => {
    switch (status) {
      case 'Fully Prepared':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Nearly Ready':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'In Progress':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'Reviewing Basics':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Not Started':
      default:
        return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const daysInfo = getDaysBadge(exam.daysRemaining);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
              {exam.code}
            </span>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {exam.subject}
            </h3>
          </div>

          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${daysInfo.bg}`}
          >
            {daysInfo.urgent && <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />}
            {daysInfo.text}
          </span>
        </div>

        {/* Exam Schedule Details */}
        <div className="space-y-2 py-3 border-y border-slate-100 my-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="font-semibold text-slate-800">Exam Date:</span>
            <span>{exam.examDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="font-semibold text-slate-800">Time:</span>
            <span>{exam.examTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="font-semibold text-slate-800">Venue:</span>
            <span>{exam.room}</span>
          </div>
        </div>

        {/* Preparation Status */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-slate-500">Preparation Status:</span>
            <span className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold ${getStatusColor(exam.prepStatus)}`}>
              {exam.prepStatus}
            </span>
          </div>

          {onUpdateStatus && (
            <select
              value={exam.prepStatus}
              onChange={(e) => onUpdateStatus(exam.id, e.target.value as ExamPrepStatus)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Not Started">Status: Not Started</option>
              <option value="Reviewing Basics">Status: Reviewing Basics</option>
              <option value="In Progress">Status: In Progress</option>
              <option value="Nearly Ready">Status: Nearly Ready</option>
              <option value="Fully Prepared">Status: Fully Prepared</option>
            </select>
          )}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          onClick={() => onPrepareWithHima(exam)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs shadow-indigo-500/20 transition-all hover:scale-[1.01]"
        >
          <Bot className="w-4 h-4" />
          <span>Prepare with Hima AI</span>
        </button>
      </div>
    </div>
  );
};
