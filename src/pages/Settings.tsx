
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { Settings as SettingsIcon, UserCog, Bell, Lock, Globe, Database } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </div>
        
        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="account" className="flex gap-2 items-center">
              <UserCog className="h-4 w-4" /> Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2 items-center">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2 items-center">
              <Lock className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex gap-2 items-center">
              <Globe className="h-4 w-4" /> Appearance
            </TabsTrigger>
            <TabsTrigger value="system" className="flex gap-2 items-center">
              <Database className="h-4 w-4" /> System
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your account information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={user?.role} disabled />
                  <p className="text-sm text-gray-500">Your role cannot be changed</p>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t p-6">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Email Notifications</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System Announcements</p>
                        <p className="text-sm text-gray-500">Important announcements about the system</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Academic Updates</p>
                        <p className="text-sm text-gray-500">Updates about academic records and performance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SDG Initiatives</p>
                        <p className="text-sm text-gray-500">Updates about sustainability initiatives and events</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <h3 className="font-medium pt-4">In-App Notifications</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Messages</p>
                        <p className="text-sm text-gray-500">Notifications for new messages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Announcements</p>
                        <p className="text-sm text-gray-500">Notifications for new announcements</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t p-6">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t p-6">
                <Button variant="outline">Cancel</Button>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact Mode</p>
                      <p className="text-sm text-gray-500">Display more content on screen with smaller spacing</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Label>Font Size</Label>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">Small</Button>
                      <Button variant="outline" size="sm" className="bg-gray-100">Medium</Button>
                      <Button variant="outline" size="sm">Large</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t p-6">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Offline Mode</p>
                      <p className="text-sm text-gray-500">Enable offline data access and synchronization</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Sync Frequency</p>
                      <p className="text-sm text-gray-500">How often to sync data when online</p>
                    </div>
                    <select className="rounded border px-2 py-1">
                      <option>Real-time</option>
                      <option>Every 15 minutes</option>
                      <option>Every hour</option>
                      <option>Manual sync only</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Usage Analytics</p>
                      <p className="text-sm text-gray-500">Share anonymous usage data to help improve the system</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t p-6">
                <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                  Clear Local Data
                </Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
