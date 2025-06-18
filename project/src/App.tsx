import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import ContentPlanner from './components/ContentPlanner';
import IdeaGenerator from './components/IdeaGenerator';
import TrendingTopics from './components/TrendingTopics';
import PricingPlans from './components/PricingPlans';
import ContentHistory from './components/ContentHistory';
import Settings from './components/Settings';
import HelpCenter from './components/help/HelpCenter';
import { useOnboarding } from './hooks/useOnboarding';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const { isActive: onboardingActive, startOnboarding, resetOnboarding } = useOnboarding();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'planner':
        return <ContentPlanner />;
      case 'ideas':
        return <IdeaGenerator />;
      case 'trending':
        return <TrendingTopics />;
      case 'history':
        return <ContentHistory />;
      case 'pricing':
        return <PricingPlans />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-all duration-500 relative overflow-hidden">
      
      {/* Enhanced Light Theme Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large Floating Geometric Shapes - Light Theme */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-purple-300/60 to-pink-300/60 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-2xl animate-float-slow opacity-80 dark:opacity-30"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-300/70 to-cyan-300/70 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-lg rotate-45 animate-spin-very-slow opacity-70 dark:opacity-25"></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-br from-indigo-300/50 to-purple-300/50 dark:from-indigo-500/8 dark:to-purple-500/8 rounded-full animate-pulse-slow opacity-60 dark:opacity-20"></div>
        
        {/* Medium Floating Orbs */}
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-pink-400/60 to-rose-400/60 dark:from-pink-500/15 dark:to-rose-500/15 rounded-full animate-bounce-slow blur-sm opacity-75 dark:opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-cyan-400/65 to-blue-400/65 dark:from-cyan-500/12 dark:to-blue-500/12 rounded-full animate-float opacity-70 dark:opacity-25"></div>
        
        {/* Geometric Lines and Rotating Circles */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border-2 border-purple-300/40 dark:border-purple-500/10 rounded-full animate-spin-ultra-slow opacity-60 dark:opacity-20"></div>
          <div className="absolute inset-8 w-80 h-80 border-2 border-pink-300/35 dark:border-pink-500/8 rounded-full animate-spin-reverse opacity-50 dark:opacity-15"></div>
          <div className="absolute inset-16 w-64 h-64 border border-blue-300/30 dark:border-blue-500/6 rounded-full animate-spin-slow opacity-40 dark:opacity-10"></div>
        </div>
        
        {/* Triangular Shapes */}
        <div className="absolute top-16 left-1/3 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[70px] border-l-transparent border-r-transparent border-b-purple-400/50 dark:border-b-purple-500/10 animate-float-reverse opacity-60 dark:opacity-20"></div>
        <div className="absolute bottom-20 right-1/3 w-0 h-0 border-l-[35px] border-r-[35px] border-b-[60px] border-l-transparent border-r-transparent border-b-cyan-400/55 dark:border-b-cyan-500/12 animate-bounce-slow opacity-50 dark:opacity-18"></div>
        
        {/* Hexagonal Patterns */}
        <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-gradient-to-br from-indigo-400/50 to-purple-400/50 dark:from-indigo-500/10 dark:to-purple-500/10 transform rotate-45 animate-spin-slow opacity-65 dark:opacity-25 hexagon"></div>
        <div className="absolute bottom-1/3 left-1/5 w-12 h-12 bg-gradient-to-br from-pink-400/60 to-rose-400/60 dark:from-pink-500/12 dark:to-rose-500/12 transform rotate-12 animate-pulse-slow opacity-55 dark:opacity-22 hexagon"></div>
      </div>

      {/* Large Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl animate-pulse-slow opacity-70 dark:opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000 opacity-70 dark:opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-300/20 to-purple-300/20 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-full blur-3xl animate-spin-ultra-slow opacity-60 dark:opacity-20"></div>
      </div>

      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 via-transparent to-pink-200/40 dark:from-purple-900/20 dark:via-transparent dark:to-pink-900/20 animate-gradient-shift opacity-80 dark:opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-200/30 via-transparent to-cyan-200/30 dark:from-blue-900/15 dark:via-transparent dark:to-cyan-900/15 animate-gradient-shift-reverse opacity-70 dark:opacity-30"></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              i % 4 === 0 
                ? 'w-3 h-3 bg-purple-500/40 dark:bg-purple-300/15' 
                : i % 4 === 1 
                ? 'w-2.5 h-2.5 bg-pink-500/45 dark:bg-pink-300/12' 
                : i % 4 === 2
                ? 'w-2 h-2 bg-blue-500/50 dark:bg-blue-300/10'
                : 'w-1.5 h-1.5 bg-cyan-500/55 dark:bg-cyan-300/8'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          ></div>
        ))}
      </div>

      {/* Grid Pattern Overlay - More Visible in Light Mode */}
      <div className="fixed inset-0 opacity-[0.08] dark:opacity-[0.01] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Additional Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Scattered Small Shapes */}
        <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-gradient-to-r from-purple-500/60 to-pink-500/60 dark:from-purple-400/20 dark:to-pink-400/20 rounded-full animate-pulse-slow opacity-70 dark:opacity-30"></div>
        <div className="absolute top-3/4 right-1/6 w-4 h-4 bg-gradient-to-r from-blue-500/65 to-cyan-500/65 dark:from-blue-400/25 dark:to-cyan-400/25 rounded-full animate-bounce-slow opacity-75 dark:opacity-35"></div>
        <div className="absolute top-1/2 left-1/12 w-8 h-8 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 dark:from-indigo-400/15 dark:to-purple-400/15 rounded-lg rotate-45 animate-spin-slow opacity-60 dark:opacity-25"></div>
        <div className="absolute bottom-1/6 left-2/3 w-5 h-5 bg-gradient-to-r from-pink-500/70 to-rose-500/70 dark:from-pink-400/30 dark:to-rose-400/30 rounded-full animate-float opacity-80 dark:opacity-40"></div>
      </div>

      <div className="flex relative z-10">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          onStartOnboarding={startOnboarding}
          onResetOnboarding={resetOnboarding}
        />
        <div className="flex-1 lg:ml-64">
          {/* Header apenas para desktop */}
          <div className="hidden lg:block">
            <Header darkMode={darkMode} />
          </div>
          <main className="p-4 lg:p-6 pt-20 lg:pt-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ajuda" element={<HelpCenter />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;