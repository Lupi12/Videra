import React, { useState } from 'react';
import { Bell, Search, Menu, Zap, User, LogIn } from 'lucide-react';
import SignupForm from './auth/SignupForm';

interface HeaderProps {
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ darkMode }) => {
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <>
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4 relative">
        {/* Header Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent dark:via-purple-400/10"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                placeholder="Buscar conteúdo, hashtags, tendências..."
                className="pl-10 pr-4 py-2 w-80 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* AI Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-400/20 dark:to-emerald-400/20 rounded-full border border-green-200/50 dark:border-green-400/30">
              <Zap className="w-3 h-3 text-green-600 dark:text-green-400 animate-pulse" />
              <span className="text-xs font-medium text-green-700 dark:text-green-300">IA Ativa</span>
            </div>

            {/* Auth Buttons */}
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors">
              <LogIn className="w-4 h-4" />
              <span className="text-sm font-medium">Entrar</span>
            </button>

            <button 
              onClick={() => setShowSignupForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Criar Conta</span>
            </button>

            <button className="relative p-2 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all duration-300 group">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Signup Form Modal */}
      {showSignupForm && (
        <SignupForm onClose={() => setShowSignupForm(false)} />
      )}
    </>
  );
};

export default Header;