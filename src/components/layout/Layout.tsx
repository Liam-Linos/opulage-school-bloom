
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 relative">
        {user && <Sidebar />}
        <main className="flex-1 p-4 md:p-8 mb-16 md:mb-0">
          {children}
        </main>
        {user && <MobileNav />}
      </div>
    </div>
  );
};

export default Layout;
