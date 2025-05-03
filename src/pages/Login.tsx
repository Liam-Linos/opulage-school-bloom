
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { ThemedButton } from '@/components/ui/themed-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn, Phone, MessageSquare } from 'lucide-react';
import { RoleBadge } from '@/components/ui/role-badge';
import { UserRole } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456'); // Default password for demo
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');
  const [communicationPreference, setCommunicationPreference] = useState<'app' | 'whatsapp' | 'sms'>('app');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Default test emails for different roles
  const roleEmails: Record<UserRole, string> = {
    admin: 'admin@opulage.edu',
    teacher: 'teacher@opulage.edu',
    student: 'student@opulage.edu',
    parent: 'parent@opulage.edu'
  };

  // Auto-select demo account on load
  useEffect(() => {
    setEmail(roleEmails[selectedRole]);
  }, []);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roleEmails[role]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Add a console log to debug
      console.log(`Attempting login with: ${email} (${selectedRole})`);
      
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard');
        
        // Show a toast notification about communication preference
        if (communicationPreference !== 'app') {
          toast({
            title: `${communicationPreference.toUpperCase()} notifications enabled`,
            description: `You'll receive updates via ${communicationPreference}`,
          });
        }
      } else {
        // This helps debug the login issue
        console.error('Login failed. Check if the email matches exactly.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-forest-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-forest-700 mb-2">Opulage Schools</h1>
          <p className="text-gray-600">Sustainable education management</p>
        </div>
        
        <Card className="border-forest-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Role Selection */}
            <div className="mb-6">
              <Label className="mb-2 block">Select role for demo:</Label>
              <div className="flex flex-wrap gap-2">
                {(['admin', 'teacher', 'student', 'parent'] as UserRole[]).map(role => (
                  <div 
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={`
                      cursor-pointer transition-all p-2 rounded-md border
                      ${selectedRole === role ? 'border-forest-500 bg-forest-50 shadow-sm' : 'border-gray-200'}
                    `}
                  >
                    <RoleBadge role={role} />
                  </div>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Demo password: "123456" (pre-filled for you)
                </p>
              </div>
              
              {/* Communication Preferences - only show for parent role */}
              {selectedRole === 'parent' && (
                <div className="bg-gray-50 p-3 rounded-md border space-y-3">
                  <Label className="font-medium">Communication preferences</Label>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare size={16} />
                      <span>In-app notifications</span>
                    </div>
                    <Switch 
                      checked={communicationPreference === 'app'} 
                      onCheckedChange={() => setCommunicationPreference('app')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare size={16} />
                      <span>WhatsApp messages</span>
                    </div>
                    <Switch 
                      checked={communicationPreference === 'whatsapp'} 
                      onCheckedChange={() => setCommunicationPreference('whatsapp')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone size={16} />
                      <span>SMS messages</span>
                    </div>
                    <Switch 
                      checked={communicationPreference === 'sms'} 
                      onCheckedChange={() => setCommunicationPreference('sms')} 
                    />
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    You can change these settings later in your profile
                  </p>
                </div>
              )}
              
              <ThemedButton 
                type="submit" 
                className="w-full"
                variant="primary"
                disabled={loading}
              >
                <LogIn className="h-4 w-4 mr-2" />
                {loading ? "Logging in..." : "Sign In"}
              </ThemedButton>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              <p>Demo account emails:</p>
              <div className="grid grid-cols-2 gap-1 mt-1">
                <div>Admin: {roleEmails.admin}</div>
                <div>Teacher: {roleEmails.teacher}</div>
                <div>Student: {roleEmails.student}</div>
                <div>Parent: {roleEmails.parent}</div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
