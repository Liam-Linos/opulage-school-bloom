
// User roles in the system
export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

// User profile basic information
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Student-specific data
export interface Student extends User {
  role: 'student';
  grade: string;
  class: string;
  parentId?: string;
  enrollmentDate: string;
}

// Teacher-specific data
export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
  classes: string[];
  joinDate: string;
}

// Admin-specific data
export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Parent-specific data
export interface Parent extends User {
  role: 'parent';
  studentIds: string[];
}

// Attendance record
export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

// Academic record
export interface AcademicRecord {
  id: string;
  studentId: string;
  subject: string;
  term: string;
  year: string;
  score: number;
  maxScore: number;
  grade: string;
  comments?: string;
}

// School announcement
export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt?: string;
  priority: 'low' | 'medium' | 'high';
  audience: UserRole[];
}

// Message between users
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  sentAt: string;
  readAt?: string;
}

// Sustainable Development Goal
export interface SDG {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// School's SDG initiative
export interface SDGInitiative {
  id: string;
  sdgId: number;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  metrics: SDGMetric[];
  status: 'planned' | 'in-progress' | 'completed';
}

// Metric to track SDG progress
export interface SDGMetric {
  id: string;
  name: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  lastUpdated: string;
}
