import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Lightbulb, 
  TrendingUp, 
  Home,
  Settings,
  User,
  PlayCircle,
  Moon,
  Sun,
  CreditCard,
  History,
  HelpCircle,
  RefreshCw,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onStartOnboarding?: () => void;
  onResetOnboarding?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode,
  onStartOnboarding,
  onResetOnboarding
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Painel', icon: Home, tourId: 'dashboard-stats', category: 'main' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, category: 'main' },
    { id: 'planner', label: 'Planejador', icon: Calendar, category: 'content' },
    { id: 'ideas', label: 'Gerador de Ideias', icon: Lightbulb, tourId: 'idea-generator', category: 'content' },
    { id: 'trending', label: 'Tendências', icon: TrendingUp, category: 'content' },
    { id: 'history', label: 'Histórico', icon: History, category: 'content' },
    { id: 'pricing', label: 'Planos', icon: CreditCard, category: 'account' },
    { id: 'settings', label: 'Configurações', icon: Settings, category: 'account' },
  ];

  const categories = {
    main: { label: 'Principal', items: menuItems.filter(item => item.category === 'main') },
    content: { label: 'Conteúdo', items: menuItems.filter(item => item.category === 'content') },
    account: { label: 'Conta', items: menuItems.filter(item => item.category === 'account') }
  };

  const handleMenuClick = (itemId: string) => {
    if (location.pathname === '/ajuda') {
      navigate('/');
      setTimeout(() => setActiveTab(itemId), 100);
    } else {
      setActiveTab(itemId);
    }
    setIsMobileMenuOpen(false); // Fechar menu mobile após clique
  };

  const handleHelpClick = () => {
    navigate('/ajuda');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile Header (visível apenas em telas pequenas)
  const MobileHeader = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <PlayCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">Videra</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Theme Toggle Mobile */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            )}
          </button>
          
          {/* Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile Menu Overlay
  const MobileMenu = () => (
    <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
      isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
    }`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Menu Panel */}
      <div className={`absolute top-16 left-0 right-0 bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Connect Accounts Button */}
          <div className="mb-6" data-tour="connect-accounts">
            <button className="w-full flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 group">
              <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium text-lg">Conectar Contas</span>
              <ChevronRight className="w-5 h-5 ml-auto" />
            </button>
          </div>

          {/* Menu Categories */}
          {Object.entries(categories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="mb-8">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-2">
                {category.label}
              </h3>
              <div className="space-y-2">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id && location.pathname !== '/ajuda';
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item.id)}
                      data-tour={item.tourId}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 group ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-102'
                      }`}
                    >
                      <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                      <span className="font-medium text-lg">{item.label}</span>
                      <ChevronRight className={`w-5 h-5 ml-auto transition-transform duration-300 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Help Center */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-2">
              Suporte
            </h3>
            <button
              onClick={handleHelpClick}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 group ${
                location.pathname === '/ajuda'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-102'
              }`}
            >
              <HelpCircle className={`w-6 h-6 transition-transform duration-300 ${location.pathname === '/ajuda' ? '' : 'group-hover:scale-110'}`} />
              <span className="font-medium text-lg">Central de Ajuda</span>
              <ChevronRight className={`w-5 h-5 ml-auto transition-transform duration-300 ${location.pathname === '/ajuda' ? 'text-white' : 'text-slate-400'}`} />
            </button>
          </div>

          {/* User Profile */}
          <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800 dark:text-white">Creator Pro</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Plano Gratuito</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Development Tools */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Onboarding (Dev)</p>
              <div className="flex gap-2">
                <button
                  onClick={onStartOnboarding}
                  className="flex-1 text-sm px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Iniciar
                </button>
                <button
                  onClick={onResetOnboarding}
                  className="flex-1 text-sm px-3 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Desktop Sidebar (visível apenas em telas grandes)
  const DesktopSidebar = () => (
    <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl border-r border-slate-200/50 dark:border-slate-700/50 z-50">
      {/* Sidebar Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 dark:from-purple-400/10 dark:to-pink-400/10 rounded-r-3xl"></div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 dark:shadow-purple-400/20">
            <PlayCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Videra</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Analytics de Conteúdo</p>
          </div>
        </div>
        
        {/* Connect Accounts Button - Tour Target */}
        <div className="mb-6" data-tour="connect-accounts">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 group">
            <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium">Conectar Contas</span>
          </button>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && location.pathname !== '/ajuda';
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                data-tour={item.tourId}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 dark:shadow-purple-400/20 transform scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-white hover:scale-102'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute right-0 w-1 h-8 bg-white rounded-l-full"></div>
                )}
              </button>
            );
          })}

          {/* Help Center Link */}
          <button
            onClick={handleHelpClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
              location.pathname === '/ajuda'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 transform scale-105'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-white hover:scale-102'
            }`}
          >
            <HelpCircle className={`w-5 h-5 transition-transform duration-300 ${location.pathname === '/ajuda' ? '' : 'group-hover:scale-110'}`} />
            <span className="font-medium">Central de Ajuda</span>
            {location.pathname === '/ajuda' && (
              <div className="absolute right-0 w-1 h-8 bg-white rounded-l-full"></div>
            )}
          </button>
        </nav>

        {/* Onboarding Controls (Development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Onboarding (Dev)</p>
            <div className="flex gap-2">
              <button
                onClick={onStartOnboarding}
                className="flex-1 text-xs px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                Iniciar
              </button>
              <button
                onClick={onResetOnboarding}
                className="flex-1 text-xs px-2 py-1 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Theme Toggle */}
        <div className="mt-8 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tema</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-12 h-6 bg-slate-300 dark:bg-slate-600 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
                darkMode ? 'transform translate-x-6' : ''
              }`}>
                {darkMode ? (
                  <Moon className="w-3 h-3 text-slate-600" />
                ) : (
                  <Sun className="w-3 h-3 text-yellow-500" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800 dark:text-white">Creator Pro</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Plano Gratuito</p>
          </div>
          <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:rotate-90 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <MobileHeader />
      <MobileMenu />
      <DesktopSidebar />
    </>
  );
};

export default Sidebar;