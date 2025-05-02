
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, BookOpen, BarChart2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import SDGProgressCard from '@/components/dashboard/SDGProgressCard';
import { mockAnnouncements, mockAttendanceRecords, mockStudents, mockSDGs, mockSDGInitiatives } from '@/data/mockData';

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

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Here's what's happening at your school today</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Students"
            value={mockStudents.length}
            icon={<Users size={24} />}
          />
          <StatCard
            title="Attendance Rate"
            value={`${attendanceRate}%`}
            icon={<Calendar size={24} />}
            change={attendanceRate > 90 ? 'Good attendance' : 'Needs improvement'}
            trend={attendanceRate > 90 ? 'up' : 'down'}
          />
          <StatCard
            title="Classes"
            value={5}
            icon={<BookOpen size={24} />}
          />
          <StatCard
            title="SDG Initiatives"
            value={mockSDGInitiatives.length}
            icon={<BarChart2 size={24} />}
          />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Announcements Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Latest updates from your school</CardDescription>
              </CardHeader>
              <CardContent>
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
          
          {/* SDG Progress Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SDG Progress</CardTitle>
                <CardDescription>Track sustainability goals</CardDescription>
              </CardHeader>
              <CardContent>
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
      </div>
    </Layout>
  );
};

export default Dashboard;
