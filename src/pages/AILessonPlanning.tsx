
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { FileUp, BookOpen, Paperclip, Link2, SendHorizontal, Save, Download } from 'lucide-react';
import { ThemedButton } from '@/components/ui/themed-button';
import LessonPlanComponent from '@/components/lessons/LessonPlanComponent';
import { mockLessonPlans } from '@/data/mockData';

const AILessonPlanning = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(mockLessonPlans[0]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...fileArray]);
      
      toast({
        title: "Files attached",
        description: `${fileArray.length} file(s) attached successfully.`,
      });
    }
  };
  
  const handleAddLink = () => {
    if (linkInput.trim() && linkInput.startsWith('http')) {
      setLinks(prev => [...prev, linkInput]);
      setLinkInput('');
      
      toast({
        title: "Link added",
        description: "Reference link added successfully.",
      });
    } else {
      toast({
        title: "Invalid link",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
    }
  };
  
  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleRemoveLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleGeneratePlan = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please provide details about the lesson you want to create.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation with timeout
    setTimeout(() => {
      setIsGenerating(false);
      
      // Set the newly "generated" plan as the selected plan
      setSelectedPlan({
        ...mockLessonPlans[0],
        title: prompt.split('.')[0] || "New Lesson Plan",
        createdAt: new Date().toISOString(),
      });
      
      toast({
        title: "Plan generated",
        description: "Your AI lesson plan has been created successfully!",
      });
    }, 3000);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Lesson Planning</h1>
            <p className="text-muted-foreground">Create personalized lesson plans using AI</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Saved Plans
            </Button>
            <ThemedButton variant="primary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </ThemedButton>
          </div>
        </div>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-2">
            <TabsTrigger value="create">Create New Plan</TabsTrigger>
            <TabsTrigger value="library">My Plans Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Prompt</CardTitle>
                    <CardDescription>Describe the lesson you want to create</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="prompt">Lesson Description</Label>
                      <Textarea 
                        id="prompt" 
                        placeholder="Describe your lesson. Include grade level, subject, objectives, and any specific activities you'd like to include."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={6}
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <Label>Reference Materials</Label>
                      
                      <div className="flex flex-col gap-3 mt-2">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            className="w-full flex items-center justify-center gap-2"
                            onClick={() => document.getElementById('file-upload')?.click()}
                          >
                            <FileUp className="h-4 w-4" />
                            Attach Files
                          </Button>
                          <input 
                            id="file-upload" 
                            type="file" 
                            multiple 
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                        
                        {attachments.length > 0 && (
                          <div className="bg-muted/50 rounded-md p-2 space-y-2">
                            {attachments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-background rounded p-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                                  <span className="truncate max-w-[180px]">{file.name}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleRemoveAttachment(index)}
                                  className="h-6 w-6 p-0"
                                >
                                  <span className="sr-only">Remove</span>
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Add reference link (URL)" 
                            value={linkInput}
                            onChange={(e) => setLinkInput(e.target.value)}
                          />
                          <Button 
                            variant="outline"
                            onClick={handleAddLink}
                          >
                            <Link2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {links.length > 0 && (
                          <div className="bg-muted/50 rounded-md p-2 space-y-2">
                            {links.map((link, index) => (
                              <div key={index} className="flex items-center justify-between bg-background rounded p-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Link2 className="h-4 w-4 text-muted-foreground" />
                                  <span className="truncate max-w-[180px]">{link}</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleRemoveLink(index)}
                                  className="h-6 w-6 p-0"
                                >
                                  <span className="sr-only">Remove</span>
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-forest-600 hover:bg-forest-700 text-white"
                      disabled={!prompt.trim() || isGenerating}
                      onClick={handleGeneratePlan}
                    >
                      {isGenerating ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Generating Plan...
                        </>
                      ) : (
                        <>
                          <SendHorizontal className="mr-2 h-4 w-4" />
                          Generate Lesson Plan
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Generated Lesson Plan</CardTitle>
                    <CardDescription>AI-created plan based on your requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-130px)] overflow-y-auto">
                    {selectedPlan ? (
                      <LessonPlanComponent lessonPlan={selectedPlan} />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground/30 mb-4" />
                        <h3 className="text-lg font-medium mb-1">No lesson plan generated yet</h3>
                        <p className="text-muted-foreground max-w-md">
                          Provide details about your lesson and click "Generate Lesson Plan" to create a personalized plan using AI.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="library">
            <Card>
              <CardHeader>
                <CardTitle>My Lesson Plans</CardTitle>
                <CardDescription>Browse your saved lesson plans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockLessonPlans.map((plan, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{plan.title}</CardTitle>
                        <CardDescription>
                          {new Date(plan.createdAt).toLocaleDateString()} • {plan.subject}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {plan.description}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" size="sm" className="ml-auto text-forest-600 hover:text-forest-700">
                          View Plan
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

export default AILessonPlanning;
