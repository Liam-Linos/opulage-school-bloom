
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes, show available demo accounts
  const demoAccounts = [
    { role: 'Admin', email: 'admin@school.edu', password: 'password' },
    { role: 'Teacher', email: 'johnson@school.edu', password: 'password' },
    { role: 'Student', email: 'alex@school.edu', password: 'password' },
    { role: 'Parent', email: 'smith@email.com', password: 'password' },
  ];

  const setDemoAccount = (email: string) => {
    setEmail(email);
    setPassword('password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-forest-50 to-teal-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-forest-600">Opulage Schools</h1>
          <p className="text-gray-600 mt-2">Sustainable Schools Manager</p>
        </div>
        
        <Card className="border-forest-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-forest-600">Log In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@school.edu"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-forest-500 hover:bg-forest-600" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <div className="w-full border-t border-gray-200 my-4"></div>
            <div className="text-sm text-gray-500 mb-2">Demo Accounts:</div>
            <div className="grid grid-cols-2 gap-2 w-full">
              {demoAccounts.map((account) => (
                <Button 
                  key={account.email}
                  variant="outline"
                  className="text-xs"
                  onClick={() => setDemoAccount(account.email)}
                >
                  {account.role}
                </Button>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
