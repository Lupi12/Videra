import React from 'react';
import { Menu, Bell, Search, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle }) => {
  const { adminUser } = useAdminAuth();

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar usuários, transações..."
              className="pl-10 pr-4 py-2 w-80 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {adminUser?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-800 dark:text-white">{adminUser?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{adminUser?.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;