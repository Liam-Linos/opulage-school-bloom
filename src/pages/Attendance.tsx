
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAttendanceRecords, mockStudents } from '@/data/mockData';
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

const Attendance = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState("all");
  
  const formattedDate = format(date, 'yyyy-MM-dd');
  
  const recordsForSelectedDate = mockAttendanceRecords.filter(
    record => record.date === formattedDate
  );
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'late':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Attendance Management</h1>
          <Button className="bg-forest-600 hover:bg-forest-700">Take Today's Attendance</Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Card className="w-full sm:w-64">
            <CardHeader>
              <CardTitle className="text-base">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>{format(date, 'PPP')}</span>
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
          
          <Card className="w-full sm:flex-1">
            <CardHeader>
              <CardTitle className="text-base">Filter Class</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="10A">Class 10A</SelectItem>
                  <SelectItem value="10B">Class 10B</SelectItem>
                  <SelectItem value="11A">Class 11A</SelectItem>
                  <SelectItem value="11B">Class 11B</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Attendance for {format(date, 'MMMM d, yyyy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Student</th>
                    <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Class</th>
                    <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                    <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recordsForSelectedDate.length > 0 ? (
                    recordsForSelectedDate.map(record => {
                      const student = mockStudents.find(s => s.id === record.studentId);
                      if (!student) return null;
                      
                      if (selectedClass !== "all" && student.class !== selectedClass) return null;
                      
                      return (
                        <tr key={record.id}>
                          <td className="py-3 px-4 text-sm">{student.name}</td>
                          <td className="py-3 px-4 text-sm">{student.class}</td>
                          <td className="py-3 px-4 text-sm">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(record.status)}
                              <span className="capitalize">{record.status}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">{record.notes || '-'}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-gray-500">
                        No attendance records found for this date.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Attendance;
