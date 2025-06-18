import React from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  HelpCircle,
  CreditCard,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onToggle }) => {
  const { adminUser, logout } = useAdminAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'users', label: 'Usuários', icon: Users, path: '/users' },
    { id: 'subscriptions', label: 'Assinaturas', icon: CreditCard, path: '/subscriptions' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'support', label: 'Suporte', icon: HelpCircle, path: '/support' },
    { id: 'security', label: 'Segurança', icon: Shield, path: '/security' },
    { id: 'alerts', label: 'Alertas', icon: AlertTriangle, path: '/alerts' },
    { id: 'settings', label: 'Configurações', icon: Settings, path: '/settings' },
  ];

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair do painel administrativo?')) {
      logout();
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-900 border-r border-slate-700 transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold">Videra Admin</h1>
                <p className="text-xs text-slate-400">Painel Administrativo</p>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all hover:bg-slate-800 text-slate-300 hover:text-white group ${
                !isOpen ? 'justify-center' : ''
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="font-medium">{item.label}</span>
              )}
              {!isOpen && (
                <div className="absolute left-16 bg-slate-800 text-white px-2 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        {isOpen && adminUser && (
          <div className="mb-4 p-3 bg-slate-800 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {adminUser.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{adminUser.name}</p>
                <p className="text-slate-400 text-xs truncate">{adminUser.email}</p>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all group ${
            !isOpen ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="font-medium">Sair</span>}
          {!isOpen && (
            <div className="absolute left-16 bg-slate-800 text-red-400 px-2 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Sair
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;