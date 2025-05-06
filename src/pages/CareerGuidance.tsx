
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Briefcase, GraduationCap, Users, LineChart, PlayCircle, Star, TrendingUp, Award } from 'lucide-react';
import { ThemedButton } from '@/components/ui/themed-button';
import CareerMatchComponent from '@/components/careers/CareerMatchComponent';
import SkillAssessmentCard from '@/components/careers/SkillAssessmentCard';
import { mockCareerMatches, mockSkillAssessments, mockMentors } from '@/data/mockData';

const CareerGuidance = () => {
  const [selectedCareer, setSelectedCareer] = useState(mockCareerMatches[0]);
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Career Guidance</h1>
            <p className="text-muted-foreground">Discover your strengths and potential career paths</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <GraduationCap className="h-4 w-4 mr-2" />
              Learning Path
            </Button>
            <ThemedButton size="sm">
              <PlayCircle className="h-4 w-4 mr-2" />
              Take Assessment
            </ThemedButton>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="careers">Career Matches</TabsTrigger>
            <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 text-amber-500 mr-2" />
                    Your Strengths Profile
                  </CardTitle>
                  <CardDescription>Based on your academic performance and assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Analytical Thinking</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Creative Problem Solving</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Communication</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Technical Skills</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Teamwork</span>
                        <span>80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <h3 className="font-semibold">Subject Performance</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div className="bg-green-50 border border-green-100 rounded p-2">
                        <div className="font-medium">Mathematics</div>
                        <div className="text-green-600 font-bold">A (95%)</div>
                      </div>
                      <div className="bg-green-50 border border-green-100 rounded p-2">
                        <div className="font-medium">Computer Science</div>
                        <div className="text-green-600 font-bold">A (92%)</div>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded p-2">
                        <div className="font-medium">Physics</div>
                        <div className="text-blue-600 font-bold">B+ (88%)</div>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded p-2">
                        <div className="font-medium">English</div>
                        <div className="text-blue-600 font-bold">B (85%)</div>
                      </div>
                      <div className="bg-amber-50 border border-amber-100 rounded p-2">
                        <div className="font-medium">Biology</div>
                        <div className="text-amber-600 font-bold">C+ (78%)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-forest-500 mr-2" />
                    Career Matches
                  </CardTitle>
                  <CardDescription>Based on your profile</CardDescription>
                </CardHeader>
                <CardContent className="pb-0 px-0">
                  <ScrollArea className="h-[320px] px-6">
                    <div className="space-y-3 pr-4">
                      {mockCareerMatches.map((career, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-md cursor-pointer transition-colors ${
                            selectedCareer.title === career.title 
                              ? 'bg-forest-50 border border-forest-200' 
                              : 'hover:bg-gray-50 border border-transparent'
                          }`}
                          onClick={() => setSelectedCareer(career)}
                        >
                          <div className="flex items-start">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                              career.matchPercentage >= 90
                                ? 'bg-green-100 text-green-600'
                                : career.matchPercentage >= 80
                                  ? 'bg-forest-100 text-forest-600'
                                  : 'bg-amber-100 text-amber-600'
                            }`}>
                              <career.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{career.title}</div>
                              <div className="text-xs text-muted-foreground">Match: {career.matchPercentage}%</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="ghost" size="sm" className="w-full text-forest-600 hover:text-forest-700 hover:bg-forest-50">
                    View All Career Matches
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 text-amber-500 mr-2" />
                    Career Details
                  </CardTitle>
                  <CardDescription>Detailed information about your top career match</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedCareer && <CareerMatchComponent career={selectedCareer} />}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PlayCircle className="h-5 w-5 text-teal-500 mr-2" />
                    Skills Assessments
                  </CardTitle>
                  <CardDescription>Take assessments to refine your matches</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSkillAssessments.map((assessment, index) => (
                    <SkillAssessmentCard key={index} assessment={assessment} />
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="careers">
            <Card>
              <CardHeader>
                <CardTitle>All Career Matches</CardTitle>
                <CardDescription>Explore careers that match your skills and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockCareerMatches.map((career, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            career.matchPercentage >= 90
                              ? 'bg-green-100 text-green-600'
                              : career.matchPercentage >= 80
                                ? 'bg-forest-100 text-forest-600'
                                : 'bg-amber-100 text-amber-600'
                          }`}>
                            <career.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{career.title}</CardTitle>
                            <CardDescription>Match: {career.matchPercentage}%</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">{career.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0 justify-between">
                        <div className="text-sm">
                          <span className="font-medium">Avg. Salary:</span> {career.salary}
                        </div>
                        <Button variant="ghost" size="sm" className="text-forest-600 hover:text-forest-700">
                          Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mentors">
            <Card>
              <CardHeader>
                <CardTitle>Find a Mentor</CardTitle>
                <CardDescription>Connect with professionals in your fields of interest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockMentors.map((mentor, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            <span className="text-lg font-medium text-gray-600">
                              {mentor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <CardTitle className="text-lg">{mentor.name}</CardTitle>
                            <CardDescription>{mentor.role} at {mentor.company}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {mentor.expertise.map((skill, i) => (
                            <span key={i} className="bg-forest-50 text-forest-700 text-xs px-2 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          className="w-full bg-forest-600 hover:bg-forest-700 text-white"
                          size="sm"
                        >
                          Request Mentorship
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CareerGuidance;
