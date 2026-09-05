import React, { useState } from 'react';
import { CheckSquare, Plus, Bot, Filter, Search, Calendar, AlertCircle } from 'lucide-react';
import { AssignmentItem, AssignmentStatus, PriorityLevel } from '../types';
import { AssignmentCard } from '../components/AssignmentCard';

interface AssignmentsProps {
  assignments: AssignmentItem[];
  onAddAssignment: (assignment: Omit<AssignmentItem, 'id'>) => void;
  onUpdateStatus: (id: string, status: AssignmentStatus) => void;
  onDeleteAssignment: (id: string) => void;
  onNavigateToAssistantWithPrompt: (prompt: string) => void;
}

export const Assignments: React.FC<AssignmentsProps> = ({
  assignments,
  onAddAssignment,
  onUpdateStatus,
  onDeleteAssignment,
  onNavigateToAssistantWithPrompt,
}) => {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('High');
  const [status, setStatus] = useState<AssignmentStatus>('Pending');
  const [notes, setNotes] = useState('');
  const [submissionFormat, setSubmissionFormat] = useState('PDF Report / Code Repo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;

    onAddAssignment({
      title: title.trim(),
      subject: subject.trim(),
      dueDate: dueDate || 'Upcoming',
      priority,
      status,
      notes: notes.trim(),
      submissionFormat,
    });

    setTitle('');
    setSubject('');
    setDueDate('');
    setNotes('');
    setIsAddModalOpen(false);
  };

  const filteredAssignments = assignments.filter((a) => {
    const matchesFilter = filter === 'All' || a.status === filter;
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = assignments.filter((a) => a.status === 'Pending').length;
  const inProgressCount = assignments.filter((a) => a.status === 'In Progress').length;
  const completedCount = assignments.filter((a) => a.status === 'Completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Coursework & Submission Manager</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Assignments
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Keep coursework organized, stay ahead of deadlines, and ask Hima AI to explain difficult instructions, problem requirements, or project structures.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="add-assignment-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Assignment</span>
          </button>

          <button
            id="ask-hima-assignment-btn"
            onClick={() =>
              onNavigateToAssistantWithPrompt(
                'Help me understand my assignment requirements and suggest a step-by-step implementation guide.'
              )
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>Ask Hima AI</span>
          </button>
        </div>
      </div>

      {/* Status Highlights */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900">
          <span className="text-xs font-bold uppercase tracking-wider block mb-1">Pending</span>
          <span className="text-2xl font-extrabold">{pendingCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-900">
          <span className="text-xs font-bold uppercase tracking-wider block mb-1">In Progress</span>
          <span className="text-2xl font-extrabold">{inProgressCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-900">
          <span className="text-xs font-bold uppercase tracking-wider block mb-1">Completed</span>
          <span className="text-2xl font-extrabold">{completedCount}</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by assignment title or subject..."
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl">
          {(['All', 'Pending', 'In Progress', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === tab
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment Cards Grid */}
      {filteredAssignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAssignments.map((asg) => (
            <AssignmentCard
              key={asg.id}
              assignment={asg}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDeleteAssignment}
              onAskHima={(prompt) => onNavigateToAssistantWithPrompt(prompt)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
          <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700 text-base mb-1">No assignments found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Try adjusting your search query or filter, or add a new assignment.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Assignment</span>
          </button>
        </div>
      )}

      {/* Add Assignment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add New Assignment</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Red-Black Tree Implementation"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Data Structures, DBMS, AI"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Submission Format
                </label>
                <input
                  type="text"
                  value={submissionFormat}
                  onChange={(e) => setSubmissionFormat(e.target.value)}
                  placeholder="e.g. PDF Report, GitHub Link, .zip"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notes / Problem Requirements
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Brief description of requirements or instructions..."
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
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
