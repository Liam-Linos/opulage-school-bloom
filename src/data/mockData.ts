import { 
  User, Student, Teacher, Admin, Parent,
  AttendanceRecord, AcademicRecord, Announcement, Message,
  SDG, SDGInitiative
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  { 
    id: 'admin1', 
    name: 'Admin User', 
    email: 'admin@school.edu', 
    role: 'admin',
    avatar: '/placeholder.svg'
  },
  { 
    id: 'teacher1', 
    name: 'Ms. Johnson', 
    email: 'teacher@school.edu', 
    role: 'teacher',
    avatar: '/placeholder.svg'
  },
  { 
    id: 'student1', 
    name: 'Alex Student', 
    email: 'student@school.edu', 
    role: 'student',
    avatar: '/placeholder.svg'
  },
  { 
    id: 'parent1', 
    name: 'Parent Smith', 
    email: 'parent@school.edu', 
    role: 'parent',
    avatar: '/placeholder.svg'
  },
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: 'student1',
    name: 'Alex Student',
    email: 'alex@school.edu',
    role: 'student',
    grade: '10',
    class: '10A',
    parentId: 'parent1',
    enrollmentDate: '2023-01-15',
    avatar: '/placeholder.svg'
  },
  {
    id: 'student2',
    name: 'Jamie Miller',
    email: 'jamie@school.edu',
    role: 'student',
    grade: '10',
    class: '10A',
    parentId: 'parent2',
    enrollmentDate: '2023-01-10',
    avatar: '/placeholder.svg'
  },
  {
    id: 'student3',
    name: 'Taylor Jones',
    email: 'taylor@school.edu',
    role: 'student',
    grade: '11',
    class: '11B',
    parentId: 'parent3',
    enrollmentDate: '2022-08-20',
    avatar: '/placeholder.svg'
  },
];

// Mock Teachers
export const mockTeachers: Teacher[] = [
  {
    id: 'teacher1',
    name: 'Ms. Johnson',
    email: 'johnson@school.edu',
    role: 'teacher',
    subjects: ['Mathematics', 'Physics'],
    classes: ['10A', '11B', '12A'],
    joinDate: '2020-08-15',
    avatar: '/placeholder.svg'
  },
  {
    id: 'teacher2',
    name: 'Mr. Williams',
    email: 'williams@school.edu',
    role: 'teacher',
    subjects: ['English', 'Literature'],
    classes: ['10A', '10B', '11A'],
    joinDate: '2019-07-10',
    avatar: '/placeholder.svg'
  },
];

// Mock Admins
export const mockAdmins: Admin[] = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@school.edu',
    role: 'admin',
    permissions: ['all'],
    avatar: '/placeholder.svg'
  },
];

// Mock Parents
export const mockParents: Parent[] = [
  {
    id: 'parent1',
    name: 'Parent Smith',
    email: 'smith@email.com',
    role: 'parent',
    studentIds: ['student1'],
    avatar: '/placeholder.svg'
  },
  {
    id: 'parent2',
    name: 'Parent Miller',
    email: 'miller@email.com',
    role: 'parent',
    studentIds: ['student2'],
    avatar: '/placeholder.svg'
  },
  {
    id: 'parent3',
    name: 'Parent Jones',
    email: 'jones@email.com',
    role: 'parent',
    studentIds: ['student3'],
    avatar: '/placeholder.svg'
  },
];

// Mock Attendance Records
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'att1',
    studentId: 'student1',
    date: '2024-05-01',
    status: 'present'
  },
  {
    id: 'att2',
    studentId: 'student2',
    date: '2024-05-01',
    status: 'absent',
    notes: 'Family emergency'
  },
  {
    id: 'att3',
    studentId: 'student3',
    date: '2024-05-01',
    status: 'late',
    notes: 'Bus delay - arrived 15 minutes late'
  },
  {
    id: 'att4',
    studentId: 'student1',
    date: '2024-04-30',
    status: 'present'
  },
  {
    id: 'att5',
    studentId: 'student2',
    date: '2024-04-30',
    status: 'present'
  },
  {
    id: 'att6',
    studentId: 'student3',
    date: '2024-04-30',
    status: 'present'
  },
];

// Mock Academic Records
export const mockAcademicRecords: AcademicRecord[] = [
  {
    id: 'acad1',
    studentId: 'student1',
    subject: 'Mathematics',
    term: 'Term 1',
    year: '2024',
    score: 85,
    maxScore: 100,
    grade: 'B+',
    comments: 'Good understanding of algebra concepts'
  },
  {
    id: 'acad2',
    studentId: 'student1',
    subject: 'English',
    term: 'Term 1',
    year: '2024',
    score: 92,
    maxScore: 100,
    grade: 'A',
    comments: 'Excellent writing skills'
  },
  {
    id: 'acad3',
    studentId: 'student2',
    subject: 'Mathematics',
    term: 'Term 1',
    year: '2024',
    score: 78,
    maxScore: 100,
    grade: 'C+',
    comments: 'Needs more practice with equations'
  },
  {
    id: 'acad4',
    studentId: 'student3',
    subject: 'Physics',
    term: 'Term 1',
    year: '2024',
    score: 95,
    maxScore: 100,
    grade: 'A+',
    comments: 'Outstanding grasp of concepts'
  },
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann1',
    title: 'School Closure - Teacher Training Day',
    content: 'The school will be closed on May 15th for a teacher professional development day.',
    authorId: 'admin1',
    createdAt: '2024-05-01T09:00:00',
    priority: 'high',
    audience: ['admin', 'teacher', 'student', 'parent']
  },
  {
    id: 'ann2',
    title: 'Math Competition Results',
    content: 'Congratulations to all participants in the regional math competition. Our school secured 2nd place overall!',
    authorId: 'teacher1',
    createdAt: '2024-04-28T15:30:00',
    priority: 'medium',
    audience: ['admin', 'teacher', 'student', 'parent']
  },
  {
    id: 'ann3',
    title: 'Curriculum Meeting for Teachers',
    content: 'All teachers are required to attend the curriculum planning meeting on Friday at 3:00 PM.',
    authorId: 'admin1',
    createdAt: '2024-04-27T11:15:00',
    priority: 'medium',
    audience: ['admin', 'teacher']
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg1',
    senderId: 'teacher1',
    recipientId: 'parent1',
    content: 'Alex has been doing great in math class this week!',
    sentAt: '2024-04-30T14:22:00',
    readAt: '2024-04-30T18:45:00'
  },
  {
    id: 'msg2',
    senderId: 'parent1',
    recipientId: 'teacher1',
    content: "Thank you for letting me know. We've been practicing at home as well.",
    sentAt: '2024-04-30T19:05:00',
    readAt: '2024-05-01T08:30:00'
  },
  {
    id: 'msg3',
    senderId: 'admin1',
    recipientId: 'teacher2',
    content: 'Can we discuss the new literature curriculum tomorrow?',
    sentAt: '2024-05-01T10:15:00'
  },
];

// Lucide icons for careers
import { Briefcase, CodeIcon, Database, LineChart, FlaskConical, Stethoscope, Wrench, PenTool, School, Building, Leaf, Search, Book, GraduationCap } from 'lucide-react';

// Mock data for lesson plans
export const mockLessonPlans = [
  {
    id: '1',
    title: 'Introduction to Algebraic Equations',
    subject: 'Mathematics',
    gradeLevel: '9',
    duration: '60 minutes',
    objectives: [
      'Understand the basic concept of algebraic equations',
      'Learn how to solve simple linear equations',
      'Apply algebraic concepts to real-world problems'
    ],
    materials: [
      'Whiteboard and markers',
      'Student worksheets',
      'Graphing calculators',
      'Online equation solver tool'
    ],
    activities: [
      {
        title: 'Warm-up Exercise',
        duration: '10 minutes',
        description: 'Students will solve simple numerical equations to recall pre-algebra concepts.'
      },
      {
        title: 'Introduction to Algebraic Notation',
        duration: '15 minutes',
        description: 'Teacher presentation on variables, coefficients, and equation structure with interactive examples.'
      },
      {
        title: 'Guided Practice',
        duration: '20 minutes',
        description: 'Students work in pairs to solve increasingly complex equations with teacher guidance.'
      },
      {
        title: 'Real-world Application',
        duration: '10 minutes',
        description: 'Students create and solve word problems that can be modeled with linear equations.'
      },
      {
        title: 'Exit Ticket',
        duration: '5 minutes',
        description: 'Individual assessment to check understanding of key concepts covered.'
      }
    ],
    assessment: 'Students will complete a short quiz with 5 equations to solve and one word problem. Success criteria: correctly solving at least 4 out of 6 problems.',
    extensions: [
      'Advanced students can work on systems of equations',
      'Visual learners can create graphical representations of equations',
      'Additional support through video tutorials for struggling students'
    ],
    createdAt: '2024-04-10T14:30:00Z',
    description: 'A comprehensive lesson plan for introducing algebraic equations to 9th grade students, focusing on conceptual understanding and practical application.'
  },
  {
    id: '2',
    title: 'Exploring Cellular Respiration',
    subject: 'Biology',
    gradeLevel: '10',
    duration: '90 minutes',
    objectives: [
      'Explain the process of cellular respiration',
      'Identify the stages of cellular respiration',
      'Compare aerobic and anaerobic respiration'
    ],
    materials: [
      'Laboratory equipment',
      'Digital microscopes',
      'Cellular respiration simulation software',
      'Student handouts'
    ],
    activities: [
      {
        title: 'Review of Cell Structure',
        duration: '15 minutes',
        description: 'Brief review of cell structure focusing on mitochondria function.'
      },
      {
        title: 'Interactive Lecture',
        duration: '25 minutes',
        description: 'Presentation on cellular respiration processes with animations and diagrams.'
      },
      {
        title: 'Laboratory Investigation',
        duration: '35 minutes',
        description: 'Students work in groups to observe respiratory rate in different conditions.'
      },
      {
        title: 'Discussion and Analysis',
        duration: '15 minutes',
        description: 'Class discussion on findings and implications for cellular energy production.'
      }
    ],
    assessment: 'Students will create concept maps showing the relationships between different components of cellular respiration and submit a lab report with their findings.',
    extensions: [
      'Research the impact of exercise on cellular respiration rates',
      'Compare respiration in plant and animal cells',
      'Investigate mitochondrial diseases and their effects'
    ],
    createdAt: '2024-04-12T09:15:00Z',
    description: 'An engaging biology lesson on cellular respiration with hands-on laboratory activities to deepen understanding of energy processes in cells.'
  },
  {
    id: '3',
    title: 'World War II: Causes and Global Impact',
    subject: 'History',
    gradeLevel: '11',
    duration: '75 minutes',
    objectives: [
      'Analyze the key factors that led to World War II',
      'Understand the global scale and impact of the conflict',
      'Evaluate primary source documents from the period'
    ],
    materials: [
      'Historical maps of pre-war and wartime Europe',
      'Primary source document excerpts',
      'Video testimonials from veterans',
      'Timeline construction materials'
    ],
    activities: [
      {
        title: 'Historical Context Setup',
        duration: '15 minutes',
        description: 'Overview of post-WWI conditions and rising tensions in Europe.'
      },
      {
        title: 'Document Analysis',
        duration: '20 minutes',
        description: 'Small groups analyze different primary sources from the period.'
      },
      {
        title: 'Interactive Timeline Construction',
        duration: '25 minutes',
        description: 'Class creates a collaborative timeline of key events leading to and during WWII.'
      },
      {
        title: 'Discussion on Global Impact',
        duration: '15 minutes',
        description: 'Facilitated discussion on short and long-term consequences of the war.'
      }
    ],
    assessment: 'Students will write a reflective essay analyzing one cause of WWII and its connection to modern international relations.',
    extensions: [
      'Research specific countries\' experiences during the war',
      'Compare propaganda from different nations involved',
      'Investigate personal family connections to the war period'
    ],
    createdAt: '2024-04-15T13:45:00Z',
    description: 'A comprehensive history lesson examining the causes and global impacts of World War II with a focus on critical analysis of primary sources.'
  }
];

// Mock data for career matches
export const mockCareerMatches = [
  {
    title: 'Software Developer',
    description: 'Design, develop, and maintain computer programs and applications. Work with various programming languages and technologies to solve problems and create software solutions.',
    matchPercentage: 95,
    icon: CodeIcon,
    salary: '$75,000 - $120,000',
    growth: 'Faster than average (22% growth)',
    education: [
      'Bachelor\'s degree in Computer Science or related field',
      'Coding bootcamp with portfolio (alternative path)'
    ],
    skills: [
      { name: 'Programming Languages', level: 90 },
      { name: 'Problem Solving', level: 85 },
      { name: 'Software Design', level: 80 },
      { name: 'Testing & Debugging', level: 75 }
    ],
    keySubjects: ['Computer Science', 'Mathematics', 'Logic', 'Information Technology']
  },
  {
    title: 'Data Scientist',
    description: 'Analyze, interpret, and extract insights from large datasets. Apply statistical methods and machine learning techniques to solve complex problems and inform business decisions.',
    matchPercentage: 88,
    icon: Database,
    salary: '$85,000 - $130,000',
    growth: 'Much faster than average (36% growth)',
    education: [
      'Master\'s degree in Data Science, Statistics, or related field',
      'Bachelor\'s with specialized certifications (alternative path)'
    ],
    skills: [
      { name: 'Statistical Analysis', level: 95 },
      { name: 'Machine Learning', level: 85 },
      { name: 'Data Visualization', level: 80 },
      { name: 'Programming (Python/R)', level: 75 }
    ],
    keySubjects: ['Statistics', 'Mathematics', 'Computer Science', 'Domain Knowledge']
  },
  {
    title: 'Financial Analyst',
    description: 'Evaluate financial data and market trends to guide investment decisions and business strategy. Create financial models and forecasts to support organizational planning.',
    matchPercentage: 82,
    icon: LineChart,
    salary: '$65,000 - $100,000',
    growth: 'Average (5% growth)',
    education: [
      'Bachelor\'s degree in Finance, Economics, or related field',
      'MBA or Master\'s in Finance (for advancement)'
    ],
    skills: [
      { name: 'Financial Analysis', level: 90 },
      { name: 'Excel & Financial Modeling', level: 85 },
      { name: 'Investment Analysis', level: 75 },
      { name: 'Business Strategy', level: 70 }
    ],
    keySubjects: ['Finance', 'Economics', 'Accounting', 'Mathematics']
  },
  {
    title: 'Research Scientist',
    description: 'Conduct experiments and investigations to advance knowledge in a specific scientific field. Design research studies, analyze results, and publish findings in academic journals.',
    matchPercentage: 78,
    icon: FlaskConical,
    salary: '$70,000 - $110,000',
    growth: 'Faster than average (8% growth)',
    education: [
      'PhD in specific scientific field',
      'Master\'s degree (for some entry-level positions)'
    ],
    skills: [
      { name: 'Research Methodology', level: 90 },
      { name: 'Data Analysis', level: 85 },
      { name: 'Technical Writing', level: 80 },
      { name: 'Laboratory Techniques', level: 95 }
    ],
    keySubjects: ['Chemistry', 'Biology', 'Physics', 'Mathematics']
  },
  {
    title: 'Healthcare Administrator',
    description: 'Manage healthcare facilities, services, or departments. Ensure compliance with regulations, optimize operations, and coordinate healthcare delivery to patients.',
    matchPercentage: 72,
    icon: Stethoscope,
    salary: '$70,000 - $115,000',
    growth: 'Much faster than average (32% growth)',
    education: [
      'Bachelor\'s degree in Healthcare Administration or related field',
      'Master\'s in Healthcare Administration or MBA (preferred)'
    ],
    skills: [
      { name: 'Healthcare Operations', level: 85 },
      { name: 'Regulatory Compliance', level: 90 },
      { name: 'Financial Management', level: 75 },
      { name: 'Leadership', level: 80 }
    ],
    keySubjects: ['Healthcare Management', 'Business', 'Policy', 'Ethics']
  },
  {
    title: 'Mechanical Engineer',
    description: 'Design, develop, and test mechanical devices and systems. Apply principles of physics and materials science to create solutions for manufacturing, transportation, and other industries.',
    matchPercentage: 68,
    icon: Wrench,
    salary: '$70,000 - $110,000',
    growth: 'Average (4% growth)',
    education: [
      'Bachelor\'s degree in Mechanical Engineering',
      'Professional Engineer (PE) license (for advancement)'
    ],
    skills: [
      { name: 'CAD Software', level: 90 },
      { name: 'Technical Problem Solving', level: 85 },
      { name: 'Project Management', level: 70 },
      { name: 'Prototyping & Testing', level: 80 }
    ],
    keySubjects: ['Physics', 'Calculus', 'Materials Science', 'Engineering Design']
  },
  {
    title: 'Graphic Designer',
    description: 'Create visual concepts to communicate ideas that inspire and inform consumers. Develop layouts and production design for applications such as advertisements, brochures, or corporate reports.',
    matchPercentage: 65,
    icon: PenTool,
    salary: '$45,000 - $85,000',
    growth: 'Average (3% growth)',
    education: [
      'Bachelor\'s degree in Graphic Design or related field',
      'Strong portfolio (sometimes more important than formal education)'
    ],
    skills: [
      { name: 'Adobe Creative Suite', level: 95 },
      { name: 'Typography', level: 85 },
      { name: 'Visual Communication', level: 90 },
      { name: 'UI/UX Principles', level: 70 }
    ],
    keySubjects: ['Art', 'Design', 'Computer Graphics', 'Marketing']
  },
  {
    title: 'Environmental Scientist',
    description: 'Study environmental issues to protect the environment and human health. Collect and analyze data, assess potential threats, and develop solutions to environmental problems.',
    matchPercentage: 60,
    icon: Leaf,
    salary: '$55,000 - $90,000',
    growth: 'Faster than average (8% growth)',
    education: [
      'Bachelor\'s degree in Environmental Science or related field',
      'Master\'s degree (for advancement and specialization)'
    ],
    skills: [
      { name: 'Environmental Sampling', level: 90 },
      { name: 'Data Analysis', level: 85 },
      { name: 'Technical Writing', level: 80 },
      { name: 'GIS Mapping', level: 70 }
    ],
    keySubjects: ['Environmental Science', 'Chemistry', 'Biology', 'Geology']
  }
];

// Mock data for skill assessments
export const mockSkillAssessments = [
  {
    title: 'Logical Reasoning Assessment',
    description: 'Evaluate your analytical thinking and problem-solving abilities.',
    duration: '25 minutes',
    icon: Search,
    completed: true
  },
  {
    title: 'Technical Skills Evaluation',
    description: 'Assess your proficiency with programming and technical concepts.',
    duration: '30 minutes',
    icon: CodeIcon,
    completed: false
  },
  {
    title: 'Career Interests Inventory',
    description: 'Discover your work preferences and career interests.',
    duration: '15 minutes',
    icon: Briefcase,
    completed: true
  },
  {
    title: 'Academic Strengths Analysis',
    description: 'Identify your strongest academic areas and learning style.',
    duration: '20 minutes',
    icon: Book,
    completed: false
  }
];

// Mock data for mentors
export const mockMentors = [
  {
    id: '1',
    name: 'Dr. James Wilson',
    role: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    expertise: ['Programming', 'Machine Learning', 'System Architecture'],
    bio: 'Over 15 years of experience in software development with a focus on scalable systems and AI applications. PhD in Computer Science from MIT.',
    availability: 'Weekly',
    rating: 4.9,
    menteeCount: 12
  },
  {
    id: '2',
    name: 'Sarah Johnson, PhD',
    role: 'Data Science Director',
    company: 'AnalyticsHub',
    expertise: ['Data Science', 'Statistics', 'Python', 'R'],
    bio: 'Leading data science teams for 10+ years. Specializes in predictive analytics and machine learning applications in business contexts.',
    availability: 'Bi-weekly',
    rating: 4.8,
    menteeCount: 8
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Investment Analyst',
    company: 'Global Investments Partners',
    expertise: ['Financial Analysis', 'Investment Strategy', 'Market Research'],
    bio: 'CFA charterholder with experience in investment banking and equity research. Passionate about teaching financial literacy and investment principles.',
    availability: 'Monthly',
    rating: 4.7,
    menteeCount: 6
  },
  {
    id: '4',
    name: 'Dr. Anya Patel',
    role: 'Research Scientist',
    company: 'Biogen Research',
    expertise: ['Biochemistry', 'Laboratory Methods', 'Scientific Writing'],
    bio: 'PhD in Biochemistry with multiple published papers. Conducts research on protein interactions and mentors graduate students.',
    availability: 'Bi-weekly',
    rating: 4.9,
    menteeCount: 5
  },
  {
    id: '5',
    name: 'Robert Jackson',
    role: 'Healthcare Administrator',
    company: 'Metropolitan Medical Center',
    expertise: ['Healthcare Management', 'Regulatory Compliance', 'Operations'],
    bio: 'MBA in Healthcare Administration with 12+ years in hospital management. Experienced in transforming healthcare delivery systems.',
    availability: 'Monthly',
    rating: 4.6,
    menteeCount: 4
  },
  {
    id: '6',
    name: 'Emily Williams',
    role: 'Design Director',
    company: 'Creative Solutions Agency',
    expertise: ['Graphic Design', 'Brand Strategy', 'UX/UI Design'],
    bio: 'Award-winning designer with experience across print and digital media. Focuses on creating impactful visual communication and brand identities.',
    availability: 'Weekly',
    rating: 4.8,
    menteeCount: 9
  }
];

// Mock Sustainable Development Goals (SDGs)
export const mockSDGs: SDG[] = [
  {
    id: 1,
    title: 'No Poverty',
    description: 'End poverty in all its forms everywhere',
    icon: '1️⃣'
  },
  {
    id: 2,
    title: 'Zero Hunger',
    description: 'End hunger, achieve food security and improved nutrition',
    icon: '2️⃣'
  },
  {
    id: 3,
    title: 'Good Health and Well-being',
    description: 'Ensure healthy lives and promote well-being for all at all ages',
    icon: '3️⃣'
  },
  {
    id: 4,
    title: 'Quality Education',
    description: 'Ensure inclusive and equitable quality education',
    icon: '4️⃣'
  },
  {
    id: 5,
    title: 'Gender Equality',
    description: 'Achieve gender equality and empower all women and girls',
    icon: '5️⃣'
  },
  {
    id: 6,
    title: 'Clean Water and Sanitation',
    description: 'Ensure availability and sustainable management of water and sanitation',
    icon: '6️⃣'
  },
];

// Mock SDG Initiatives
export const mockSDGInitiatives: SDGInitiative[] = [
  {
    id: 'sdgi1',
    sdgId: 4,
    title: 'Community Education Program',
    description: 'Weekend classes for out-of-school children in the community',
    startDate: '2024-02-01',
    metrics: [
      {
        id: 'metric1',
        name: 'Children enrolled',
        currentValue: 45,
        targetValue: 100,
        unit: 'children',
        lastUpdated: '2024-05-01'
      },
      {
        id: 'metric2',
        name: 'Volunteer teachers',
        currentValue: 5,
        targetValue: 10,
        unit: 'teachers',
        lastUpdated: '2024-04-20'
      }
    ],
    status: 'in-progress'
  },
  {
    id: 'sdgi2',
    sdgId: 6,
    title: 'Rainwater Harvesting System',
    description: 'Installing rainwater collection systems to provide clean water for the school',
    startDate: '2024-03-15',
    metrics: [
      {
        id: 'metric3',
        name: 'Water collected',
        currentValue: 2500,
        targetValue: 10000,
        unit: 'liters',
        lastUpdated: '2024-04-30'
      },
      {
        id: 'metric4',
        name: 'Systems installed',
        currentValue: 2,
        targetValue: 5,
        unit: 'systems',
        lastUpdated: '2024-04-15'
      }
    ],
    status: 'in-progress'
  },
  {
    id: 'sdgi3',
    sdgId: 2,
    title: 'School Garden Project',
    description: 'Growing vegetables to supplement school meals and teach sustainable farming',
    startDate: '2024-01-10',
    metrics: [
      {
        id: 'metric5',
        name: 'Food produced',
        currentValue: 120,
        targetValue: 500,
        unit: 'kg',
        lastUpdated: '2024-04-25'
      },
      {
        id: 'metric6',
        name: 'Students involved',
        currentValue: 35,
        targetValue: 50,
        unit: 'students',
        lastUpdated: '2024-03-30'
      }
    ],
    status: 'in-progress'
  },
];
