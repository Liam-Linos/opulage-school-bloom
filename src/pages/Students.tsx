
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockStudents } from '@/data/mockData';
import { Search, Plus, ChevronRight, UserRound, Mail, Calendar } from 'lucide-react';
import { ThemedButton } from '@/components/ui/themed-button';
import { Separator } from '@/components/ui/separator';

interface StudentDisplayProps {
  students: typeof mockStudents;
}

// Separate component for the student cards
const StudentGrid: React.FC<StudentDisplayProps> = ({ students }) => {
  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-forest-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <UserRound className="h-8 w-8 text-forest-500" />
        </div>
        <h3 className="text-lg font-medium mb-1">No students found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student) => (
        <Card key={student.id} className="hover:shadow-md transition-all group">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-forest-100 flex items-center justify-center group-hover:bg-forest-200 transition-colors">
                <span className="text-forest-600 font-medium">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <CardTitle className="text-lg">{student.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  Grade {student.grade}, Class {student.class}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Enrolled: {student.enrollmentDate}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              variant="ghost" 
              className="w-full justify-between text-forest-600 hover:bg-forest-50 hover:text-forest-700 -mx-2"
              asChild
            >
              <Link to={`/students/${student.id}`}>
                View Profile
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);

  // Filter students based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStudents(mockStudents);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = mockStudents.filter(student => 
      student.name.toLowerCase().includes(query) || 
      student.email.toLowerCase().includes(query) ||
      `Grade ${student.grade}, Class ${student.class}`.toLowerCase().includes(query)
    );
    
    setFilteredStudents(filtered);
  }, [searchQuery]);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Students Management</h1>
            <p className="text-muted-foreground">View and manage student records</p>
          </div>
          
          <ThemedButton className="sm:ml-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add New Student
          </ThemedButton>
        </div>
        
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            className="pl-10" 
            placeholder="Search students by name, class, or grade..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Separator className="my-4" />
        
        <StudentGrid students={filteredStudents} />
      </div>
    </Layout>
  );
};

export default Students;
