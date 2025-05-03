
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { ThemedButton } from '@/components/ui/themed-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { RoleBadge } from '@/components/ui/role-badge';
import { UserRole } from '@/types';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Default test emails for different roles
  const roleEmails: Record<UserRole, string> = {
    admin: 'admin@opulage.edu',
    teacher: 'teacher@opulage.edu',
    student: 'student@opulage.edu',
    parent: 'parent@opulage.edu'
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roleEmails[role]);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
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
                  For demo purposes, any password will work with the selected email
                </p>
              </div>
              
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
