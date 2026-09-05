import React, { useState } from 'react';
import { Plus, Bot, CheckCircle2, Trash2, Calendar, Clock, Filter, BookOpen, Sparkles } from 'lucide-react';
import { StudyTask, DifficultyLevel, PriorityLevel, ActivePage } from '../types';
import { StudyTaskCard } from '../components/StudyTaskCard';

interface StudyPlannerProps {
  tasks: StudyTask[];
  onAddTask: (task: Omit<StudyTask, 'id' | 'createdAt'>) => void;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onClearCompleted: () => void;
  onNavigateToAssistantWithPrompt: (prompt: string) => void;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({
  tasks,
  onAddTask,
  onToggleComplete,
  onDeleteTask,
  onClearCompleted,
  onNavigateToAssistantWithPrompt,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed' | 'High Priority'>('All');

  // Form State
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [examDate, setExamDate] = useState('');
  const [hours, setHours] = useState<number>(1.5);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium');
  const [priority, setPriority] = useState<PriorityLevel>('High');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !topic.trim()) return;

    onAddTask({
      subject: subject.trim(),
      topic: topic.trim(),
      examDate: examDate || 'Upcoming',
      hours: Number(hours) || 1,
      difficulty,
      priority,
      completed: false,
    });

    // Reset Form
    setSubject('');
    setTopic('');
    setExamDate('');
    setHours(1.5);
    setDifficulty('Medium');
    setPriority('High');
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Pending') return !t.completed;
    if (filter === 'Completed') return t.completed;
    if (filter === 'High Priority') return t.priority === 'High' && !t.completed;
    return true;
  });

  const totalStudyHoursPlanned = tasks.reduce((sum, t) => sum + (t.completed ? 0 : t.hours), 0);
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Personalized Academic Schedule</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Study Planner
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Track subjects, calculate revision hours, and organize topics. Ask Hima AI to break down complex syllabi into realistic schedules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="add-task-open-btn"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Study Task</span>
          </button>

          <button
            id="ask-hima-study-help-top-btn"
            onClick={() =>
              onNavigateToAssistantWithPrompt(
                'Help me design an effective study timetable for my upcoming semester exams. Here are my current priority subjects: Data Structures, Operating Systems, and DBMS.'
              )
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>Ask Hima AI for Study Help</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Bar & Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Remaining Study</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalStudyHoursPlanned} Hours</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Topics</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {completedCount} / {tasks.length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Storage State</span>
            <div className="text-sm font-bold text-slate-800 mt-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Browser Saved (LocalStorage)
            </div>
          </div>
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Done
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl">
          {(['All', 'Pending', 'High Priority', 'Completed'] as const).map((tab) => (
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

        <span className="text-xs text-slate-500">
          Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {/* Study Task Cards Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTasks.map((task) => (
            <StudyTaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDeleteTask}
              onAskHima={(query) => onNavigateToAssistantWithPrompt(query)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-700 text-base mb-1">No study tasks found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            {filter !== 'All' ? `No tasks match the "${filter}" filter.` : 'Add your first subject and topic to begin organizing your study routine.'}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task Now</span>
          </button>
        </div>
      )}

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add Study Task</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 rounded"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Data Structures, DBMS, Operating Systems"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Topic *
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Linked Lists, Deadlock Prevention, SQL Joins"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Available Study Hours
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="12"
                    value={hours}
                    onChange={(e) => setHours(parseFloat(e.target.value) || 1)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
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

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
