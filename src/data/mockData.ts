import { StudyTask, ExamItem, AssignmentItem, CollegeInfoCategory, EventItem, ResourceItem } from '../types';

export const INITIAL_STUDY_TASKS: StudyTask[] = [
  {
    id: 'st-1',
    subject: 'Data Structures',
    topic: 'Linked Lists (Singly, Doubly, & Circular)',
    examDate: '2026-09-20',
    hours: 2,
    difficulty: 'Medium',
    priority: 'High',
    completed: false,
    createdAt: '2026-09-01',
  },
  {
    id: 'st-2',
    subject: 'Database Management Systems',
    topic: 'Normalization (1NF, 2NF, 3NF, BCNF) & ER Diagrams',
    examDate: '2026-09-24',
    hours: 1.5,
    difficulty: 'Medium',
    priority: 'High',
    completed: true,
    createdAt: '2026-09-02',
  },
  {
    id: 'st-3',
    subject: 'Operating Systems',
    topic: 'CPU Scheduling Algorithms & Deadlock Prevention',
    examDate: '2026-09-28',
    hours: 2.5,
    difficulty: 'Hard',
    priority: 'Medium',
    completed: false,
    createdAt: '2026-09-03',
  },
  {
    id: 'st-4',
    subject: 'Computer Networks',
    topic: 'TCP/IP Model vs OSI Layer Architecture',
    examDate: '2026-10-04',
    hours: 1,
    difficulty: 'Easy',
    priority: 'Low',
    completed: false,
    createdAt: '2026-09-04',
  }
];

export const INITIAL_EXAMS: ExamItem[] = [
  {
    id: 'ex-1',
    subject: 'Data Structures & Algorithms',
    code: 'CS301',
    examDate: 'September 20, 2026',
    examTime: '10:00 AM – 1:00 PM',
    daysRemaining: 16,
    prepStatus: 'In Progress',
    room: 'Hall B - Room 204',
    totalMarks: 100
  },
  {
    id: 'ex-2',
    subject: 'Database Management Systems',
    code: 'CS302',
    examDate: 'September 24, 2026',
    examTime: '02:00 PM – 5:00 PM',
    daysRemaining: 20,
    prepStatus: 'Nearly Ready',
    room: 'Main Academic Block 301',
    totalMarks: 100
  },
  {
    id: 'ex-3',
    subject: 'Operating Systems',
    code: 'CS303',
    examDate: 'September 28, 2026',
    examTime: '10:00 AM – 1:00 PM',
    daysRemaining: 24,
    prepStatus: 'Reviewing Basics',
    room: 'Hall A - Room 102',
    totalMarks: 100
  },
  {
    id: 'ex-4',
    subject: 'Computer Networks',
    code: 'CS304',
    examDate: 'October 04, 2026',
    examTime: '10:00 AM – 1:00 PM',
    daysRemaining: 30,
    prepStatus: 'Not Started',
    room: 'Hall C - Room 115',
    totalMarks: 100
  }
];

export const INITIAL_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: 'asg-1',
    title: 'Balanced Binary Search Tree Implementation',
    subject: 'Data Structures',
    dueDate: '2026-09-12',
    priority: 'High',
    status: 'In Progress',
    notes: 'Implement AVL tree rotations and benchmark traversal efficiency against standard BST.',
    submissionFormat: 'GitHub Repo URL & PDF Report'
  },
  {
    id: 'asg-2',
    title: 'Relational Schema Design & SQL Queries',
    subject: 'DBMS',
    dueDate: '2026-09-15',
    priority: 'Medium',
    status: 'Pending',
    notes: 'Submit schema diagrams for student campus housing system along with complex JOIN queries.',
    submissionFormat: '.sql Script File'
  },
  {
    id: 'asg-3',
    title: 'Process Synchronization using Semaphores',
    subject: 'Operating Systems',
    dueDate: '2026-09-18',
    priority: 'High',
    status: 'Pending',
    notes: 'Dining Philosophers and Producer-Consumer problem solutions in C++.',
    submissionFormat: 'Zip archive with Makefile'
  },
  {
    id: 'asg-4',
    title: 'Subnetting & Packet Tracer Simulation',
    subject: 'Computer Networks',
    dueDate: '2026-09-08',
    priority: 'Low',
    status: 'Completed',
    notes: 'CIDR notation lab report completed and verified by lab instructor.',
    submissionFormat: '.pkt and Lab Document'
  }
];

export const COLLEGE_INFO_CATEGORIES: CollegeInfoCategory[] = [
  {
    id: 'departments',
    title: 'Departments',
    description: 'Explore academic departments, heads of department, departmental syllabus, and specialized wings.',
    iconName: 'Building2',
    sampleTopics: ['Computer Science & Eng', 'Electronics & Comm', 'Mechanical', 'Civil', 'Information Tech'],
    suggestedPrompt: 'Tell me about the Computer Science department and faculty coordinators.'
  },
  {
    id: 'courses',
    title: 'Courses & Curricula',
    description: 'Undergraduate and postgraduate degree programs, electives, credit structures, and prerequisites.',
    iconName: 'GraduationCap',
    sampleTopics: ['B.Tech / B.E. Programs', 'M.Tech Specializations', 'Open Electives', 'Credit Requirements'],
    suggestedPrompt: 'What open electives are offered for 3rd year students?'
  },
  {
    id: 'subjects',
    title: 'Subjects & Syllabi',
    description: 'Detailed unit-wise subject outlines, recommended textbooks, reference authors, and grading schemes.',
    iconName: 'BookOpen',
    sampleTopics: ['Core Engineering Subjects', 'Lab Manuals', 'Prescribed Textbooks', 'Marking Rubrics'],
    suggestedPrompt: 'What is the syllabus and recommended textbook for CS301 Data Structures?'
  },
  {
    id: 'faculty',
    title: 'Faculty & Mentors',
    description: 'Professor directory, departmental office hours, research domains, and academic advisors.',
    iconName: 'Users',
    sampleTopics: ['Faculty Directory', 'Academic Mentors', 'Office Visiting Hours', 'Research Guides'],
    suggestedPrompt: 'Who is the faculty advisor for section CS-A and what are their office hours?'
  },
  {
    id: 'laboratories',
    title: 'Laboratories & R&D Labs',
    description: 'Hardware, software, robotics, and cloud computing laboratory timings, safety guidelines, and access rules.',
    iconName: 'Cpu',
    sampleTopics: ['Advanced Computing Lab', 'IoT & Embedded Systems Lab', 'Robotics Hub', 'Lab Timings'],
    suggestedPrompt: 'What are the open hours and rules for the Advanced Computing Lab?'
  },
  {
    id: 'library',
    title: 'Central Library',
    description: 'Digital catalog, IEEE/ACM journal access, book borrowing limits, silent study zones, and hours.',
    iconName: 'Library',
    sampleTopics: ['Digital Repository', 'Book Renewal Rules', 'Quiet Study Rooms', 'Overdue Fine Policy'],
    suggestedPrompt: 'How many books can a student issue from the library and for how many days?'
  },
  {
    id: 'facilities',
    title: 'Campus Facilities',
    description: 'Hostels, canteen & cafeteria menus, sports complexes, gymnasiums, medical center, and transport routes.',
    iconName: 'MapPin',
    sampleTopics: ['Campus Clinic', 'College Bus Routes & Schedule', 'Cafeteria & Dining', 'Sports Complex'],
    suggestedPrompt: 'What are the college bus routes and morning pickup timings?'
  },
  {
    id: 'calendar',
    title: 'Academic Calendar',
    description: 'Semester commencement dates, mid-term evaluation windows, semester exams, holidays, and breaks.',
    iconName: 'CalendarDays',
    sampleTopics: ['Odd/Even Semester Dates', 'Mid-Term Windows', 'National Holidays', 'Semester Break'],
    suggestedPrompt: 'When do the semester final examinations begin according to the official calendar?'
  },
  {
    id: 'contacts',
    title: 'Important Contacts',
    description: 'Direct contact extensions for Student Affairs, Dean of Academics, Examination Cell, and Accounts.',
    iconName: 'PhoneCall',
    sampleTopics: ['Examination Controller Cell', 'Scholarship & Fee Desk', "Dean's Office", 'Emergency Hotline'],
    suggestedPrompt: 'What is the email and phone number for the college Examination Cell?'
  },
  {
    id: 'rules',
    title: 'College Rules & Regulations',
    description: 'Minimum attendance criteria (75% rule), dress code policies, code of conduct, and disciplinary policies.',
    iconName: 'ShieldAlert',
    sampleTopics: ['Minimum 75% Attendance Rule', 'Medical Leave Procedures', 'Lab Dress Code', 'Discipline Code'],
    suggestedPrompt: 'What is the official policy if my attendance drops below 75%?'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'HackNova 2026 – Annual 36-Hour National Hackathon',
    category: 'Hackathons',
    date: 'September 26–27, 2026',
    time: '09:00 AM onwards',
    location: 'Auditorium Complex & Innovation Hub',
    organizer: 'Department of CSE & Student Developer Club',
    registrationStatus: 'Open',
    description: 'Build impactful solutions in Web3, AI, Climate Tech, and Healthcare. Free food, mentor sessions, and exciting prizes.',
    prizeOrBadge: '$2,500 Prize Pool',
    tags: ['Hackathon', 'AI & ML', 'Web Dev', 'Team of 4']
  },
  {
    id: 'ev-2',
    title: 'Cloud & AI DevOps Masterclass Workshop',
    category: 'Workshops',
    date: 'September 14, 2026',
    time: '02:00 PM – 05:30 PM',
    location: 'Seminar Hall 2, Block B',
    organizer: 'ACM Student Chapter',
    registrationStatus: 'Closing Soon',
    description: 'Hands-on session on containerization, CI/CD pipelines with GitHub Actions, and deploying scalable apps to Cloud Run.',
    prizeOrBadge: 'Certificate of Attendance',
    tags: ['Workshop', 'Cloud', 'Docker', 'DevOps']
  },
  {
    id: 'ev-3',
    title: 'Algorithmics – Competitive Coding Sprint',
    category: 'Competitions',
    date: 'September 19, 2026',
    time: '04:00 PM – 07:00 PM',
    location: 'Online / Computer Lab 4',
    organizer: 'Coding & Algorithms Society',
    registrationStatus: 'Open',
    description: 'Speed-coding battle featuring dynamic programming, graph theory, and algorithmic puzzles on HackerRank.',
    prizeOrBadge: 'Medals & Placement Mentorship',
    tags: ['DSA', 'Competitive Coding', 'Prizes']
  },
  {
    id: 'ev-4',
    title: 'TechnoSphere 2026 – Inter-College Technical Symposium',
    category: 'Technical Events',
    date: 'October 10, 2026',
    time: '10:00 AM – 06:00 PM',
    location: 'Main Campus Quadrangle',
    organizer: 'College Technical Council',
    registrationStatus: 'Open',
    description: 'Paper presentations, project expos, robo-wars, circuit debugging, and guest keynote by industry leaders.',
    prizeOrBadge: 'Trophies & Merit Badges',
    tags: ['Symposium', 'Robotics', 'Paper Presentation']
  },
  {
    id: 'ev-5',
    title: 'AuraFest – Annual Cultural & Sports Gala',
    category: 'College Events',
    date: 'October 22–24, 2026',
    time: 'Full Day Festival',
    location: 'Open Air Amphitheatre & Sports Ground',
    organizer: 'Student Welfare Council',
    registrationStatus: 'Open',
    description: 'The flagship annual festival celebrating music, dance, theater, esports tournaments, and live acoustic night.',
    prizeOrBadge: 'Campus Wide Celebration',
    tags: ['Festival', 'Music', 'Sports', 'Networking']
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Complete Data Structures & Algorithms Handcrafted Notes',
    category: 'Data Structures',
    type: 'PDF Notes',
    description: 'Comprehensive handwritten and formatted review of arrays, trees, heaps, graphs, and Big-O notation.',
    academicTerm: 'Semester 3 / 4',
    tags: ['DSA', 'Trees', 'Graphs', 'Big-O']
  },
  {
    id: 'res-2',
    title: 'SQL & Relational Database Normalization Cheat Sheet',
    category: 'DBMS',
    type: 'Cheat Sheet',
    description: 'Quick reference for DDL/DML syntax, indexing strategies, ACID guarantees, and 1NF to BCNF rules.',
    academicTerm: 'Semester 4',
    tags: ['SQL', 'Normalization', 'Indexing', 'Transactions']
  },
  {
    id: 'res-3',
    title: 'Operating Systems System Calls & Memory Management Guide',
    category: 'Study Materials',
    type: 'Guide',
    description: 'Visual breakdowns of paging, virtual memory, semaphore synchronization, and disk scheduling algorithms.',
    academicTerm: 'Semester 4',
    tags: ['OS', 'Paging', 'Semaphores', 'Virtual Memory']
  },
  {
    id: 'res-4',
    title: 'Modern TypeScript, React & Node.js Developer Handbook',
    category: 'Programming',
    type: 'Roadmap',
    description: 'Full-stack engineering fundamentals, state management best practices, and clean architecture guidelines.',
    academicTerm: 'All Semesters',
    tags: ['Web Dev', 'TypeScript', 'React', 'Frontend']
  },
  {
    id: 'res-5',
    title: 'Foundations of Artificial Intelligence & Neural Networks',
    category: 'Artificial Intelligence',
    type: 'Guide',
    description: 'Core overview of search algorithms (A*, minimax), supervised learning, gradient descent, and LLM basics.',
    academicTerm: 'Semester 5 / 6',
    tags: ['AI', 'Machine Learning', 'Search', 'Neural Networks']
  },
  {
    id: 'res-6',
    title: 'Engineering Mathematics & Discrete Structures Problem Set',
    category: 'Mathematics',
    type: 'Problem Set',
    description: 'Curated 100 high-yield solved questions on graph theory, combinatorics, recurrence relations, and boolean algebra.',
    academicTerm: 'Semester 1 / 2 / 3',
    tags: ['Discrete Math', 'Probability', 'Solved Problems']
  },
  {
    id: 'res-7',
    title: 'Digital Electronics & Microprocessor Architecture Notes',
    category: 'Electronics',
    type: 'PDF Notes',
    description: 'Logic gates, Karnaugh maps, sequential circuits, flip-flops, and 8086/ARM micro-architecture.',
    academicTerm: 'Semester 3',
    tags: ['Digital Logic', 'K-Maps', 'Registers']
  },
  {
    id: 'res-8',
    title: 'Last 5 Years University Exam Question Bank with Model Answers',
    category: 'Exam Preparation',
    type: 'Question Bank',
    description: 'Official previous year question papers categorized by unit with step-by-step marking rubrics.',
    academicTerm: 'Mid-term & End-term',
    tags: ['PYQ', 'Exam Papers', 'High Yield']
  },
  {
    id: 'res-9',
    title: 'Campus Placement Interview Prep: 75 Top LeetCode & CS Core Questions',
    category: 'Placement Preparation',
    type: 'Roadmap',
    description: 'Frequently asked coding questions, system design fundamentals, and HR technical interview tips.',
    academicTerm: 'Final & Pre-Final Year',
    tags: ['Placements', 'Interviews', 'LeetCode 75', 'Resume']
  }
];
