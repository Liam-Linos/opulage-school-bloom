
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  // Get role-specific theme colors
  getRoleTheme: () => {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  // New contact methods
  sendWhatsAppMessage: (phone: string, message: string) => Promise<boolean>;
  sendSMS: (phone: string, message: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  loading: true,
  getRoleTheme: () => ({
    primaryColor: 'forest',
    secondaryColor: 'amber',
    accentColor: 'teal',
  }),
  sendWhatsAppMessage: async () => false,
  sendSMS: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const storedUser = localStorage.getItem('opulage-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Get theme colors based on user role
  const getRoleTheme = () => {
    if (!user) {
      return {
        primaryColor: 'forest',
        secondaryColor: 'amber',
        accentColor: 'teal',
      };
    }

    switch (user.role) {
      case 'admin':
        return {
          primaryColor: 'forest',   // Dark green for authority
          secondaryColor: 'amber',  // Amber for attention
          accentColor: 'teal',      // Teal for data focus
        };
      case 'teacher':
        return {
          primaryColor: 'amber',    // Warm amber for teaching
          secondaryColor: 'forest', // Green secondary
          accentColor: 'teal',      // Teal accent
        };
      case 'student':
        return {
          primaryColor: 'teal',     // Bright teal for students
          secondaryColor: 'amber',  // Amber secondary
          accentColor: 'forest',    // Green accent
        };
      case 'parent':
        return {
          primaryColor: 'blue',     // Reliable blue for parents
          secondaryColor: 'amber',  // Amber for warmth
          accentColor: 'forest',    // Green accent
        };
      default:
        return {
          primaryColor: 'forest',
          secondaryColor: 'amber',
          accentColor: 'teal',
        };
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo, we'll accept any password and look up the user by email
    setLoading(true);
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fix: Match email case-insensitively
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('opulage-user', JSON.stringify(foundUser));
        
        // Show a welcome toast with role-specific message
        toast({
          title: `Welcome, ${foundUser.name}`,
          description: `You're logged in as a ${foundUser.role}`,
          variant: "default",
        });
        
        return true;
      }
      
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    setUser(null);
    localStorage.removeItem('opulage-user');
  };

  // WhatsApp messaging function (simulated)
  const sendWhatsAppMessage = async (phone: string, message: string): Promise<boolean> => {
    try {
      // In a real app, you would integrate with WhatsApp Business API
      // For demo, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "WhatsApp message sent",
        description: `Message sent to ${phone}`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Failed to send WhatsApp message",
        description: "Please try again later",
        variant: "destructive",
      });
      
      return false;
    }
  };

  // SMS messaging function (simulated)
  const sendSMS = async (phone: string, message: string): Promise<boolean> => {
    try {
      // In a real app, you would integrate with an SMS gateway like Twilio, Africa's Talking, etc.
      // For demo, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "SMS sent",
        description: `Message sent to ${phone}`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Failed to send SMS",
        description: "Please try again later",
        variant: "destructive",
      });
      
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      getRoleTheme, 
      sendWhatsAppMessage, 
      sendSMS 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
