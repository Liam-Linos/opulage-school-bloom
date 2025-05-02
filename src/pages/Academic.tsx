
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAcademicRecords, mockStudents } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { BookOpen, GraduationCap, TrendingUp, Award } from 'lucide-react';

const Academic = () => {
  const groupedRecords = mockAcademicRecords.reduce((acc, record) => {
    if (!acc[record.studentId]) {
      acc[record.studentId] = [];
    }
    acc[record.studentId].push(record);
    return acc;
  }, {} as Record<string, typeof mockAcademicRecords>);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Academic Records</h1>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <GraduationCap className="h-4 w-4 text-forest-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStudents.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-forest-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(mockAcademicRecords.reduce((acc, record) => acc + record.score, 0) / mockAcademicRecords.length)}%
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                  <BookOpen className="h-4 w-4 text-forest-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Set(mockAcademicRecords.map(record => record.subject)).size}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Top Grade</CardTitle>
                  <Award className="h-4 w-4 text-forest-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockAcademicRecords.sort((a, b) => b.score - a.score)[0].grade}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Student Performance</h2>
              <div className="space-y-6">
                {Object.entries(groupedRecords).map(([studentId, records]) => {
                  const student = mockStudents.find(s => s.id === studentId);
                  if (!student) return null;
                  
                  const averageScore = Math.round(records.reduce((acc, record) => acc + record.score, 0) / records.length);
                  
                  return (
                    <Card key={studentId}>
                      <CardHeader>
                        <CardTitle>{student.name}</CardTitle>
                        <CardDescription>Grade {student.grade}, Class {student.class}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Average Score: {averageScore}%</span>
                          <span className="text-sm text-gray-500">
                            {averageScore >= 90 ? 'Excellent' : 
                             averageScore >= 80 ? 'Good' : 
                             averageScore >= 70 ? 'Satisfactory' : 
                             'Needs Improvement'}
                          </span>
                        </div>
                        <Progress value={averageScore} className="h-2" />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {records.map(record => (
                            <div 
                              key={record.id} 
                              className="border rounded-md p-3 flex justify-between items-center"
                            >
                              <div>
                                <p className="font-medium">{record.subject}</p>
                                <p className="text-sm text-gray-500">{record.term}, {record.year}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">{record.grade}</p>
                                <p className="text-sm text-gray-500">{record.score}/{record.maxScore}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Analysis</CardTitle>
                <CardDescription>Overview of all subjects and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Subject details and analysis will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Performance Analytics</CardTitle>
                <CardDescription>Track progress and identify areas for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Detailed analytics and visualizations will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Academic;
