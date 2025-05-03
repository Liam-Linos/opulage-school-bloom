import React from 'react';
import Layout from '@/components/layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { mockStudents } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Mail, Phone, MapPin, CalendarClock, BookOpen, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';

const StudentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const student = mockStudents.find(s => s.id === id);
  
  if (!student) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold mb-4">Student Not Found</h2>
          <p className="text-muted-foreground mb-6">The student you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/students')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Students
          </Button>
        </div>
      </Layout>
    );
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-2" 
          onClick={() => navigate('/students')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Students
        </Button>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Student Info */}
          <div className="lg:w-1/3 space-y-6">
            <Card>
              <CardHeader className="text-center border-b pb-6">
                <Avatar className="mx-auto h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl bg-forest-100 text-forest-700">
                    {getInitials(student.name)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{student.name}</CardTitle>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="forest">Grade {student.grade}</Badge>
                  <Badge variant="amber">Class {student.class}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-[24px_1fr] items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
                <div className="grid grid-cols-[24px_1fr] items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>+254 712 345 678</span>
                </div>
                <div className="grid grid-cols-[24px_1fr] items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="grid grid-cols-[24px_1fr] items-center gap-3">
                  <CalendarClock className="h-5 w-5 text-muted-foreground" />
                  <span>Enrolled: {student.enrollmentDate}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contacts</CardTitle>
                <CardDescription>People to contact in case of emergency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Sarah Johnson (Mother)</p>
                  <p className="text-sm text-muted-foreground">+254 722 123 456</p>
                </div>
                <Separator />
                <div>
                  <p className="font-medium">Michael Johnson (Father)</p>
                  <p className="text-sm text-muted-foreground">+254 733 987 654</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Tabs with Academic Info, SDG, Attendance */}
          <div className="lg:w-2/3">
            <Tabs defaultValue="academic">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="sdg">SDG Initiatives</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="academic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Current Performance</CardTitle>
                        <CardDescription>Academic year 2025</CardDescription>
                      </div>
                      <Badge className="bg-forest-600">Current GPA: 3.8</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-forest-600" />
                          <span>Mathematics</span>
                        </div>
                        <span className="font-medium">A (92%)</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-forest-600" />
                          <span>English</span>
                        </div>
                        <span className="font-medium">A- (88%)</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-forest-600" />
                          <span>Science</span>
                        </div>
                        <span className="font-medium">B+ (85%)</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-forest-600" />
                          <span>Social Studies</span>
                        </div>
                        <span className="font-medium">A (90%)</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Assignments</CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Mathematics Quiz</p>
                          <p className="text-sm text-muted-foreground">Submitted on Apr 28, 2025</p>
                        </div>
                        <Badge variant="forest">95%</Badge>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">English Essay</p>
                          <p className="text-sm text-muted-foreground">Submitted on Apr 20, 2025</p>
                        </div>
                        <Badge variant="forest">88%</Badge>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Science Project</p>
                          <p className="text-sm text-muted-foreground">Submitted on Apr 15, 2025</p>
                        </div>
                        <Badge variant="forest">92%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sdg" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SDG Participation</CardTitle>
                    <CardDescription>Student's involvement in sustainability goals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-teal-600" />
                          <span>Clean Water Project</span>
                        </div>
                        <Badge variant="teal">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Helping to install water filters in nearby communities</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-teal-600" />
                          <span>School Garden Initiative</span>
                        </div>
                        <Badge variant="teal">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Contributing to the school's sustainable garden project</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-teal-600" />
                          <span>Recycling Campaign</span>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Led a successful school-wide plastic recycling campaign</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>SDG Impact Points</CardTitle>
                    <CardDescription>Recognition for sustainability efforts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-teal-50 p-6 rounded-lg text-center">
                      <p className="text-4xl font-bold text-teal-600 mb-2">248</p>
                      <p className="text-muted-foreground">Total Impact Points</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-forest-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-forest-600 mb-1">3</p>
                        <p className="text-xs text-muted-foreground">Projects Led</p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-amber-600 mb-1">12</p>
                        <p className="text-xs text-muted-foreground">Activities Joined</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="attendance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Overview</CardTitle>
                    <CardDescription>Academic year 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center gap-8">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-forest-600">96%</p>
                        <p className="text-sm text-muted-foreground">Attendance Rate</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-3xl font-bold text-amber-600">3</p>
                        <p className="text-sm text-muted-foreground">Absences</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-600">2</p>
                        <p className="text-sm text-muted-foreground">Late Arrivals</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Attendance</CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        const isAbsent = i === 2;
                        const isLate = i === 4;
                        
                        return (
                          <div key={i} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</p>
                            </div>
                            {isAbsent ? (
                              <Badge variant="destructive">Absent</Badge>
                            ) : isLate ? (
                              <Badge variant="amber">Late (15 min)</Badge>
                            ) : (
                              <Badge variant="forest">Present</Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
