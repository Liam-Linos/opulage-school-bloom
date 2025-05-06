import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calendar, Users, BookOpen, BarChart2, Bell, ChevronRight, GraduationCap, Clipboard, FileText, Briefcase, BookOpen as BookOpenIcon, Book, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import SDGProgressCard from '@/components/dashboard/SDGProgressCard';
import { mockAnnouncements, mockAttendanceRecords, mockStudents, mockSDGs, mockSDGInitiatives, mockAcademicRecords, mockLessonPlans, mockCareerMatches, mockMentors, mockSkillAssessments } from '@/data/mockData';
import { ThemedButton } from '@/components/ui/themed-button';
import { Button } from '@/components/ui/button';
import { RoleBadge } from '@/components/ui/role-badge';
import SkillAssessmentCard from '@/components/careers/SkillAssessmentCard';

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Filter announcements by user role
  const relevantAnnouncements = mockAnnouncements
    .filter(announcement => announcement.audience.includes(user.role))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Calculate attendance metrics
  const totalAttendanceRecords = mockAttendanceRecords.length;
  const presentCount = mockAttendanceRecords.filter(record => record.status === 'present').length;
  const attendanceRate = Math.round((presentCount / totalAttendanceRecords) * 100);

  // Find SDG titles for initiatives
  const sdgInitiativesWithTitles = mockSDGInitiatives.map(initiative => {
    const sdg = mockSDGs.find(sdg => sdg.id === initiative.sdgId);
    return {
      initiative,
      sdgTitle: sdg ? sdg.title : 'Unknown SDG'
    };
  });

  // Content based on user role
  const renderRoleSpecificContent = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard 
          attendanceRate={attendanceRate} 
          sdgInitiativesWithTitles={sdgInitiativesWithTitles}
        />;
      case 'teacher':
        return <TeacherDashboard 
          attendanceRate={attendanceRate}
          sdgInitiativesWithTitles={sdgInitiativesWithTitles}
        />;
      case 'student':
        return <StudentDashboard 
          sdgInitiativesWithTitles={sdgInitiativesWithTitles}
        />;
      case 'parent':
        return <ParentDashboard 
          sdgInitiativesWithTitles={sdgInitiativesWithTitles}
        />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
              <RoleBadge role={user.role} className="ml-2" />
            </div>
            <p className="text-muted-foreground">Here's what's happening at your school today</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-forest-600 border-forest-200 hover:bg-forest-50 hover:text-forest-700"
            >
              <Bell className="h-4 w-4 mr-1" />
              Notifications
            </Button>
            
            <ThemedButton 
              variant="primary" 
              size="sm"
            >
              School Overview
            </ThemedButton>
          </div>
        </div>
        
        {renderRoleSpecificContent()}
        
        {/* Announcements Section - Common for all roles */}
        <Card className="overflow-hidden border-forest-100">
          <CardHeader className="bg-gradient-to-r from-forest-50 to-transparent">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Latest updates from your school</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-forest-600 hover:text-forest-700 hover:bg-forest-50"
              >
                View all <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {relevantAnnouncements.length > 0 ? (
                relevantAnnouncements.slice(0, 3).map(announcement => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-6">No announcements yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Administrator-specific dashboard components
const AdminDashboard = ({ 
  attendanceRate,
  sdgInitiativesWithTitles 
}: { 
  attendanceRate: number,
  sdgInitiativesWithTitles: Array<{initiative: any, sdgTitle: string}>
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Students"
          value={mockStudents.length}
          icon={<Users size={24} className="text-forest-600" />}
          className="border-l-4 border-l-forest-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          icon={<Calendar size={24} className="text-forest-600" />}
          change={attendanceRate > 90 ? 'Good attendance' : 'Needs improvement'}
          trend={attendanceRate > 90 ? 'up' : 'down'}
          className="border-l-4 border-l-forest-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Classes"
          value={5}
          icon={<BookOpen size={24} className="text-forest-600" />}
          className="border-l-4 border-l-forest-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="SDG Initiatives"
          value={mockSDGInitiatives.length}
          icon={<BarChart2 size={24} className="text-forest-600" />}
          className="border-l-4 border-l-forest-500 hover:shadow-md transition-shadow"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-forest-100 h-full">
            <CardHeader>
              <CardTitle>School Performance Overview</CardTitle>
              <CardDescription>Overall metrics and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center bg-forest-50 rounded-md">
                <p className="text-muted-foreground">Administrator Performance Overview Chart</p>
                <p className="text-sm text-muted-foreground mt-2">Coming soon - School-wide analytics</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="overflow-hidden border-forest-100">
            <CardHeader className="bg-gradient-to-r from-forest-50 to-transparent">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>SDG Progress</CardTitle>
                  <CardDescription>Track sustainability goals</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-forest-600 hover:text-forest-700 hover:bg-forest-50"
                >
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {sdgInitiativesWithTitles.slice(0, 2).map(({ initiative, sdgTitle }) => (
                  <SDGProgressCard
                    key={initiative.id}
                    initiative={initiative}
                    sdgTitle={sdgTitle}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

// Teacher-specific dashboard components
const TeacherDashboard = ({ 
  attendanceRate,
  sdgInitiativesWithTitles 
}: { 
  attendanceRate: number,
  sdgInitiativesWithTitles: Array<{initiative: any, sdgTitle: string}>
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Students"
          value={18}
          icon={<GraduationCap size={24} className="text-amber-500" />}
          className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Class Attendance"
          value={`${attendanceRate}%`}
          icon={<Clipboard size={24} className="text-amber-500" />}
          change={attendanceRate > 90 ? 'Good attendance' : 'Needs improvement'}
          trend={attendanceRate > 90 ? 'up' : 'down'}
          className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Lesson Plans"
          value={mockLessonPlans.length}
          icon={<FileText size={24} className="text-amber-500" />}
          className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="SDG Activities"
          value={3}
          icon={<BarChart2 size={24} className="text-amber-500" />}
          className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpenIcon className="h-5 w-5 text-amber-500 mr-2" />
                AI Lesson Planning
              </CardTitle>
              <CardDescription>Create personalized lesson plans using AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h3 className="font-medium mb-2">How AI Assists Your Teaching</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 text-amber-600 flex-shrink-0">
                      1
                    </div>
                    <span>Upload teaching materials or provide links to resources</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 text-amber-600 flex-shrink-0">
                      2
                    </div>
                    <span>Describe your lesson objectives and student needs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 text-amber-600 flex-shrink-0">
                      3
                    </div>
                    <span>Let AI create a comprehensive lesson plan tailored to your class</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {mockLessonPlans.slice(0, 2).map((plan, index) => (
                  <div key={index} className="p-4 bg-white border border-amber-100 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-medium mb-1">{plan.title}</h3>
                    <div className="text-xs text-muted-foreground mb-3">
                      {plan.subject} • Grade {plan.gradeLevel} • {plan.duration}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{plan.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded">
                        {new Date(plan.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to="/lessons">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Create New Lesson Plan
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="overflow-hidden border-amber-100">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-transparent">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Teaching Resources</CardTitle>
                  <CardDescription>Access your materials</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                >
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 bg-white rounded-md border border-amber-100 hover:bg-amber-50 transition-colors">
                    <div className="font-medium">Lesson Plan #{i}</div>
                    <div className="text-sm text-muted-foreground">Math - Grade 5</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-amber-100">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-transparent">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>SDG Progress</CardTitle>
                  <CardDescription>Track sustainability goals</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                >
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {sdgInitiativesWithTitles.slice(0, 1).map(({ initiative, sdgTitle }) => (
                <SDGProgressCard
                  key={initiative.id}
                  initiative={initiative}
                  sdgTitle={sdgTitle}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

// Student-specific dashboard components
const StudentDashboard = ({ 
  sdgInitiativesWithTitles 
}: { 
  sdgInitiativesWithTitles: Array<{initiative: any, sdgTitle: string}>
}) => {
  // Filter some mock academic records for this student
  const studentAcademicRecords = mockAcademicRecords.slice(0, 4);
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance"
          value="92%"
          icon={<Calendar size={24} className="text-teal-500" />}
          className="border-l-4 border-l-teal-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Assignments"
          value="8/10"
          icon={<FileText size={24} className="text-teal-500" />}
          className="border-l-4 border-l-teal-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Average Grade"
          value="B+"
          icon={<BookOpen size={24} className="text-teal-500" />}
          className="border-l-4 border-l-teal-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Career Match"
          value={`${mockCareerMatches[0].matchPercentage}%`}
          icon={<Briefcase size={24} className="text-teal-500" />}
          className="border-l-4 border-l-teal-500 hover:shadow-md transition-shadow"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-teal-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-teal-500" />
                Career Guidance
              </CardTitle>
              <CardDescription>Discover your ideal career path and find mentors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                  <h3 className="font-medium mb-2">Your Top Career Matches</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mockCareerMatches.slice(0, 2).map((career, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-md border border-teal-100">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          career.matchPercentage >= 90 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-teal-100 text-teal-600'
                        }`}>
                          <career.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{career.title}</div>
                          <div className="text-xs text-muted-foreground">Match: {career.matchPercentage}%</div>
                          <div className="text-xs mt-1">Avg. Salary: {career.salary}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                  <h3 className="font-medium mb-2">Recommended Mentor</h3>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-md border border-teal-100">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Dr. James Wilson</div>
                      <div className="text-xs text-muted-foreground">Senior Software Engineer at TechCorp Inc.</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded">Programming</span>
                        <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded">Machine Learning</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to="/careers">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Explore Career Options
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="overflow-hidden border-teal-100">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-transparent">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Academic Progress</CardTitle>
                  <CardDescription>Your recent grades</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                >
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {studentAcademicRecords.slice(0, 3).map((record, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-white rounded-md border border-teal-100 hover:bg-teal-50 transition-colors">
                    <div>
                      <div className="font-medium">{record.subject}</div>
                      <div className="text-xs text-muted-foreground">Term: {record.term}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{record.grade}</div>
                      <div className="text-xs text-muted-foreground">{record.score}/{record.maxScore}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-teal-100">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-transparent">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>My SDG Contributions</CardTitle>
                  <CardDescription>Your sustainability impact</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                >
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {sdgInitiativesWithTitles.slice(0, 1).map(({ initiative, sdgTitle }) => (
                  <SDGProgressCard
                    key={initiative.id}
                    initiative={initiative}
                    sdgTitle={sdgTitle}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

// Parent-specific dashboard components
const ParentDashboard = ({ 
  sdgInitiativesWithTitles 
}: { 
  sdgInitiativesWithTitles: Array<{initiative: any, sdgTitle: string}>
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="My Children"
          value="2"
          icon={<Users size={24} className="text-blue-600" />}
          className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Attendance"
          value="95%"
          icon={<Calendar size={24} className="text-blue-600" />}
          className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
        />
        <StatCard
          title="Upcoming Events"
          value="3"
          icon={<Bell size={24} className="text-blue-600" />}
          className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle>Children's Progress</CardTitle>
              <CardDescription>Monitor your children's academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Alex Johnson</div>
                      <div className="text-sm text-muted-foreground">Grade 5, Class A</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="text-sm text-muted-foreground">Attendance</div>
                      <div className="font-medium">97%</div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="text-sm text-muted-foreground">Average Grade</div>
                      <div className="font-medium">A-</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-sm text-muted-foreground">Grade 3, Class B</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="text-sm text-muted-foreground">Attendance</div>
                      <div className="font-medium">92%</div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="text-sm text-muted-foreground">Average Grade</div>
                      <div className="font-medium">B+</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="overflow-hidden border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>School Calendar</CardTitle>
                  <CardDescription>Upcoming events</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {[
                  { title: "Parent-Teacher Meeting", date: "May 10, 2025" },
                  { title: "School Sports Day", date: "May 15, 2025" },
                  { title: "End of Term Exams", date: "May 25, 2025" }
                ].map((event, i) => (
                  <div key={i} className="p-3 bg-white rounded-md border border-blue-100 hover:bg-blue-50 transition-colors">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">{event.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New section: Career Recommendations and Mentors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                Career Recommendations
              </CardTitle>
              <CardDescription>Based on your children's academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-medium text-blue-600">AJ</span>
                    </div>
                    <h3 className="font-medium">Alex Johnson's Career Path</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mockCareerMatches.slice(0, 2).map((career, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-md border border-blue-100">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          career.matchPercentage >= 90 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          <career.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{career.title}</div>
                          <div className="text-xs text-muted-foreground">Match: {career.matchPercentage}%</div>
                          <div className="text-xs mt-1">Avg. Salary: {career.salary}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3 w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    View Detailed Career Analysis
                  </Button>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-medium text-blue-600">SJ</span>
                    </div>
                    <h3 className="font-medium">Sarah Johnson's Career Path</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mockCareerMatches.slice(2, 4).map((career, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-md border border-blue-100">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          career.matchPercentage >= 80 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          <career.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{career.title}</div>
                          <div className="text-xs text-muted-foreground">Match: {career.matchPercentage}%</div>
                          <div className="text-xs mt-1">Avg. Salary: {career.salary}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3 w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    View Detailed Career Analysis
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to="/careers">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Explore All Career Options
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 text-blue-500 mr-2" />
                Recommended Mentors
              </CardTitle>
              <CardDescription>For your children's future careers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMentors.slice(0, 2).map((mentor, index) => (
                  <div key={index} className="p-3 border border-blue-100 rounded-lg bg-white hover:bg-blue-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                        <span className="text-sm font-medium text-blue-600">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-xs text-muted-foreground">{mentor.role} at {mentor.company}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {mentor.expertise.slice(0, 2).map((skill, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-blue-100">
                      <div className="text-xs text-muted-foreground">Recommended for:</div>
                      <div className="text-sm">
                        {index === 0 ? "Alex Johnson" : "Sarah Johnson"}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Find More Mentors
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>Monitor your children's skill development</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSkillAssessments.slice(0, 2).map((assessment, index) => (
                  <SkillAssessmentCard 
                    key={index} 
                    assessment={assessment} 
                    variant="parent"
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
