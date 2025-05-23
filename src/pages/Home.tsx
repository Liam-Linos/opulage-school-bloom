
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Users, Calendar, BarChart2, GraduationCap, BookOpen, Heart } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-forest-500 to-forest-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Opulage Bridge
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Bridging education and careers with AI-powered lesson planning, student-mentor matching, and personalized career guidance.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Button size="lg" asChild className="bg-amber-400 text-black hover:bg-amber-500">
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                ) : (
                  <Button size="lg" asChild className="bg-amber-400 text-black hover:bg-amber-500">
                    <Link to="/login">Login to Your School</Link>
                  </Button>
                )}
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-xl">
                <div className="aspect-video bg-forest-800/30 rounded-md flex items-center justify-center">
                  <span className="text-6xl">🌉</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-forest-100 text-forest-700 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Lesson Planning</h3>
              <p className="text-gray-600">Intelligent lesson creation and curriculum planning tailored for each class's unique needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Guidance</h3>
              <p className="text-gray-600">Personalized career path discovery through adaptive assessments and skill analysis.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mentor Matching</h3>
              <p className="text-gray-600">Connect students with ideal mentors based on interests, skills, and career goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Supporting Sustainable Development</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform helps schools track and contribute to the UN's Sustainable Development Goals
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="aspect-square bg-gradient-to-br from-forest-50 to-teal-50 rounded-lg flex items-center justify-center shadow-sm border border-gray-100"
              >
                <span className="text-4xl">{i+1}️⃣</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-forest-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your school?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of schools using Opulage Bridge to empower education and shape future careers</p>
          <Button size="lg" className="bg-white text-forest-700 hover:bg-gray-100" asChild>
            <Link to="/login">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Opulage Bridge</h3>
              <p className="text-gray-300">AI-powered education and career pathways</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>AI Lesson Planning</li>
                <li>Career Guidance</li>
                <li>Mentor Matching</li>
                <li>SDG Monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Community Forum</li>
                <li>Support Center</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">© 2024 Opulage Bridge. Open source software.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
