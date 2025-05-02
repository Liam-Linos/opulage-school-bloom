
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSDGs, mockSDGInitiatives } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronRight, LineChart, Target } from 'lucide-react';

const SDG = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">SDG Initiatives</h1>
          <Button className="bg-forest-600 hover:bg-forest-700">New Initiative</Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="initiatives">Active Initiatives</TabsTrigger>
            <TabsTrigger value="goals">SDG Goals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
              {mockSDGs.map((sdg) => (
                <Card key={sdg.id} className="overflow-hidden border-t-4" style={{ borderTopColor: `hsl(${(sdg.id * 60) % 360}, 70%, 50%)` }}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-2xl">{sdg.icon}</span>
                      <span>{sdg.id}. {sdg.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="line-clamp-2 h-10">{sdg.description}</CardDescription>
                    <div className="mt-2">
                      <Button variant="ghost" size="sm" className="w-full justify-between">
                        View Details <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Initiatives</CardTitle>
                  <CardDescription>Current sustainability projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSDGInitiatives.map(initiative => {
                      const sdg = mockSDGs.find(s => s.id === initiative.sdgId);
                      const totalProgress = initiative.metrics.reduce((acc, metric) => {
                        const progress = (metric.currentValue / metric.targetValue) * 100;
                        return acc + Math.min(progress, 100);
                      }, 0) / initiative.metrics.length;
                      
                      return (
                        <div key={initiative.id} className="border rounded-md p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{sdg?.icon}</span>
                            <h3 className="font-medium">{initiative.title}</h3>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{initiative.description}</p>
                          <div className="flex items-center justify-between mb-2 text-sm">
                            <span>Overall Progress</span>
                            <span className="font-medium">{Math.round(totalProgress)}%</span>
                          </div>
                          <Progress value={totalProgress} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>SDG Performance</CardTitle>
                  <CardDescription>Impact metrics and progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <LineChart className="h-4 w-4 text-forest-500" />
                      <span>Initiative Growth</span>
                    </div>
                    <span className="text-forest-500 font-medium">+15% this month</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-amber-500" />
                      <span>Goals Achieved</span>
                    </div>
                    <span className="text-amber-500 font-medium">2/12 completed</span>
                  </div>
                  
                  <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="font-medium mb-2">Next Milestone</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Community Education Program: Reach 50 enrolled children
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Current: 45 children</span>
                      <span>Target: 100 children</span>
                    </div>
                    <Progress value={45} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="initiatives">
            <Card>
              <CardHeader>
                <CardTitle>All Active Initiatives</CardTitle>
                <CardDescription>Detailed view of all sustainability projects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Detailed list of initiatives will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>SDG Goals Overview</CardTitle>
                <CardDescription>UN Sustainable Development Goals details and school contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Detailed SDG goals and contributions will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SDG;
