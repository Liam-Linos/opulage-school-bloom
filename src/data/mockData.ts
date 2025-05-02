
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
    email: 'johnson@school.edu', 
    role: 'teacher',
    avatar: '/placeholder.svg'
  },
  { 
    id: 'student1', 
    name: 'Alex Student', 
    email: 'alex@school.edu', 
    role: 'student',
    avatar: '/placeholder.svg'
  },
  { 
    id: 'parent1', 
    name: 'Parent Smith', 
    email: 'smith@email.com', 
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
