
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SDGInitiative, SDGMetric } from '@/types';

interface SDGProgressCardProps {
  initiative: SDGInitiative;
  sdgTitle: string;
}

const SDGProgressCard = ({ initiative, sdgTitle }: SDGProgressCardProps) => {
  const getOverallProgress = (metrics: SDGMetric[]): number => {
    const totalProgress = metrics.reduce((acc, metric) => {
      const metricProgress = (metric.currentValue / metric.targetValue) * 100;
      return acc + metricProgress;
    }, 0);
    
    return Math.round(totalProgress / metrics.length);
  };

  const progress = getOverallProgress(initiative.metrics);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">{initiative.sdgId}:</span>
          <CardTitle className="text-md">{sdgTitle}</CardTitle>
        </div>
        <CardDescription>{initiative.title}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="space-y-3">
            {initiative.metrics.map((metric) => {
              const metricProgress = Math.round((metric.currentValue / metric.targetValue) * 100);
              
              return (
                <div key={metric.id} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>{metric.name}</span>
                    <span className="font-medium">
                      {metric.currentValue} / {metric.targetValue} {metric.unit}
                    </span>
                  </div>
                  <Progress value={metricProgress} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SDGProgressCard;
