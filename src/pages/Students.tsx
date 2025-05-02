
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockStudents } from '@/data/mockData';
import { Search } from 'lucide-react';

const Students = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Students Management</h1>
          <Button className="bg-forest-600 hover:bg-forest-700">Add New Student</Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input className="pl-10" placeholder="Search students by name, class, or grade..." />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockStudents.map((student) => (
            <Card key={student.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-forest-100 flex items-center justify-center">
                    <span className="text-forest-600 font-medium">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <CardTitle>{student.name}</CardTitle>
                    <CardDescription>Grade {student.grade}, Class {student.class}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <p className="text-gray-500">Email:</p>
                  <p className="text-right">{student.email}</p>
                  <p className="text-gray-500">Enrollment:</p>
                  <p className="text-right">{student.enrollmentDate}</p>
                </div>
                <Button variant="ghost" className="w-full mt-4">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Students;
