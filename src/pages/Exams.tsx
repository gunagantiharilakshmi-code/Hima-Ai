import React, { useState } from 'react';
import { CalendarDays, Bot, Plus, Flame, Clock, CheckCircle, Search, Sparkles } from 'lucide-react';
import { ExamItem, ExamPrepStatus } from '../types';
import { ExamCard } from '../components/ExamCard';

interface ExamsProps {
  exams: ExamItem[];
  onUpdateExamStatus: (id: string, status: ExamPrepStatus) => void;
  onAddExam: (exam: Omit<ExamItem, 'id'>) => void;
  onNavigateToAssistantWithPrompt: (prompt: string) => void;
}

export const Exams: React.FC<ExamsProps> = ({
  exams,
  onUpdateExamStatus,
  onAddExam,
  onNavigateToAssistantWithPrompt,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal Form
  const [subject, setSubject] = useState('');
  const [code, setCode] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('10:00 AM – 1:00 PM');
  const [daysRemaining, setDaysRemaining] = useState(15);
  const [prepStatus, setPrepStatus] = useState<ExamPrepStatus>('Not Started');
  const [room, setRoom] = useState('Hall B - 204');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    onAddExam({
      subject: subject.trim(),
      code: code.trim() || 'EX101',
      examDate: examDate || 'Upcoming',
      examTime: examTime || '10:00 AM – 1:00 PM',
      daysRemaining: Number(daysRemaining) || 10,
      prepStatus,
      room: room || 'Main Hall',
      totalMarks: 100,
    });

    setSubject('');
    setCode('');
    setExamDate('');
    setIsAddModalOpen(false);
  };

  const filteredExams = exams.filter(
    (e) =>
      e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nearestExam = [...exams].sort((a, b) => a.daysRemaining - b.daysRemaining)[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-2">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Official Examination Countdown</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Exams Dashboard
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Monitor upcoming mid-term and semester final exams, keep track of days remaining, and use Hima AI to review high-weightage topics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="add-exam-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Exam Date</span>
          </button>

          <button
            id="ask-hima-exam-btn"
            onClick={() =>
              onNavigateToAssistantWithPrompt(
                'Help me prepare for my upcoming exams! Generate a high-yield study plan and key revision points for my subjects.'
              )
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Prepare with Hima AI</span>
          </button>
        </div>
      </div>

      {/* Featured Nearest Exam Alert */}
      {nearestExam && (
        <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 rounded-2xl p-5 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-500/20">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Nearest Scheduled Exam
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {nearestExam.subject} ({nearestExam.code})
              </h3>
              <p className="text-xs text-slate-600">
                Scheduled on <strong>{nearestExam.examDate}</strong> • {nearestExam.examTime} in {nearestExam.room}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-2xl font-black text-rose-600">{nearestExam.daysRemaining}</span>
              <span className="text-xs text-slate-600 block">days left</span>
            </div>

            <button
              onClick={() =>
                onNavigateToAssistantWithPrompt(
                  `Help me prepare for ${nearestExam.subject} (${nearestExam.code}). The exam is in ${nearestExam.daysRemaining} days on ${nearestExam.examDate}. What are the most critical units and topics to master?`
                )
              }
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Sprint Revision</span>
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exam or subject code..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="text-xs text-slate-500">
          Total Scheduled: <strong>{exams.length} Exams</strong>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            onUpdateStatus={onUpdateExamStatus}
            onPrepareWithHima={(ex) =>
              onNavigateToAssistantWithPrompt(
                `I am preparing for ${ex.subject} (${ex.code}) exam on ${ex.examDate}. I currently have ${ex.daysRemaining} days left and my status is "${ex.prepStatus}". What study roadmap and practice questions do you recommend?`
              )
            }
          />
        ))}
      </div>

      {/* Add Exam Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add Exam Schedule</h3>
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
                  Subject Name *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Computer Networks"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. CS304"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Days Remaining
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={daysRemaining}
                    onChange={(e) => setDaysRemaining(parseInt(e.target.value) || 1)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Exam Date
                  </label>
                  <input
                    type="text"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    placeholder="e.g. October 15, 2026"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Exam Time
                  </label>
                  <input
                    type="text"
                    value={examTime}
                    onChange={(e) => setExamTime(e.target.value)}
                    placeholder="e.g. 10:00 AM – 1:00 PM"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Exam Venue / Room
                </label>
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="e.g. Hall A - Room 102"
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
                  Save Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
