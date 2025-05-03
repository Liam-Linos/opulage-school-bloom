
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, BookOpen, BarChart2, Bell, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import SDGProgressCard from '@/components/dashboard/SDGProgressCard';
import { mockAnnouncements, mockAttendanceRecords, mockStudents, mockSDGs, mockSDGInitiatives } from '@/data/mockData';
import { ThemedButton } from '@/components/ui/themed-button';
import { Button } from '@/components/ui/button';

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
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome, {user.name}</h1>
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
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Students"
            value={mockStudents.length}
            icon={<Users size={24} />}
            className="hover:shadow-md transition-shadow"
          />
          <StatCard
            title="Attendance Rate"
            value={`${attendanceRate}%`}
            icon={<Calendar size={24} />}
            change={attendanceRate > 90 ? 'Good attendance' : 'Needs improvement'}
            trend={attendanceRate > 90 ? 'up' : 'down'}
            className="hover:shadow-md transition-shadow"
          />
          <StatCard
            title="Classes"
            value={5}
            icon={<BookOpen size={24} />}
            className="hover:shadow-md transition-shadow"
          />
          <StatCard
            title="SDG Initiatives"
            value={mockSDGInitiatives.length}
            icon={<BarChart2 size={24} />}
            className="hover:shadow-md transition-shadow"
          />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Announcements Section */}
          <div className="lg:col-span-2 space-y-6">
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
          
          {/* SDG Progress Section */}
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
      </div>
    </Layout>
  );
};

export default Dashboard;
