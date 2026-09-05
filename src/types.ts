export type ActivePage = 
  | 'home' 
  | 'assistant' 
  | 'study-planner' 
  | 'college-info' 
  | 'exams' 
  | 'assignments' 
  | 'events' 
  | 'resources' 
  | 'about';

export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type AssignmentStatus = 'Pending' | 'In Progress' | 'Completed';
export type ExamPrepStatus = 'Not Started' | 'Reviewing Basics' | 'In Progress' | 'Nearly Ready' | 'Fully Prepared';

export interface StudyTask {
  id: string;
  subject: string;
  topic: string;
  examDate: string;
  hours: number;
  difficulty: DifficultyLevel;
  priority: PriorityLevel;
  completed: boolean;
  createdAt: string;
}

export interface ExamItem {
  id: string;
  subject: string;
  code: string;
  examDate: string;
  examTime: string;
  daysRemaining: number;
  prepStatus: ExamPrepStatus;
  room: string;
  totalMarks: number;
}

export interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: PriorityLevel;
  status: AssignmentStatus;
  notes?: string;
  submissionFormat?: string;
}

export interface CollegeInfoCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  sampleTopics: string[];
  suggestedPrompt: string;
}

export type EventCategory = 
  | 'All'
  | 'College Events' 
  | 'Technical Events' 
  | 'Hackathons' 
  | 'Workshops' 
  | 'Competitions';

export interface EventItem {
  id: string;
  title: string;
  category: 'College Events' | 'Technical Events' | 'Hackathons' | 'Workshops' | 'Competitions';
  date: string;
  time: string;
  location: string;
  organizer: string;
  registrationStatus: 'Open' | 'Closing Soon' | 'Closed';
  description: string;
  prizeOrBadge?: string;
  tags: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 
    | 'Study Materials' 
    | 'Programming' 
    | 'Artificial Intelligence' 
    | 'Data Structures' 
    | 'DBMS' 
    | 'Mathematics' 
    | 'Electronics' 
    | 'Exam Preparation' 
    | 'Placement Preparation';
  type: 'PDF Notes' | 'Cheat Sheet' | 'Problem Set' | 'Question Bank' | 'Guide' | 'Roadmap';
  description: string;
  academicTerm: string;
  tags: string[];
}

export interface BotpressConfig {
  botId: string;
  clientId: string;
  hostUrl: string;
  useCustomScript: boolean;
  customScriptCode: string;
}

export interface BotMessageNotification {
  id: string;
  preview: string;
  timestamp: number;
}
