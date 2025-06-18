import React from 'react';
import { Eye, Heart, Share2, Users, TrendingUp, Clock } from 'lucide-react';

interface StatsCardsProps {
  onCardClick: (metric: string) => void;
}

const StatsCards: React.FC<StatsCardsProps> = ({ onCardClick }) => {
  const stats = [
    {
      id: 'views',
      label: 'Total de Visualizações',
      value: '2,4M',
      change: '+12,5%',
      trend: 'up',
      icon: Eye,
      color: 'purple',
      comparison: '+245K vs período anterior',
    },
    {
      id: 'engagement',
      label: 'Taxa de Engajamento',
      value: '8,2%',
      change: '+2,1%',
      trend: 'up',
      icon: Heart,
      color: 'pink',
      comparison: '+1.8% vs período anterior',
    },
    {
      id: 'shares',
      label: 'Compartilhamentos',
      value: '45,2K',
      change: '+18,3%',
      trend: 'up',
      icon: Share2,
      color: 'blue',
      comparison: '+7.2K vs período anterior',
    },
    {
      id: 'followers',
      label: 'Seguidores',
      value: '125K',
      change: '+5,7%',
      trend: 'up',
      icon: Users,
      color: 'green',
      comparison: '+6.8K vs período anterior',
    },
    {
      id: 'watch_time',
      label: 'Tempo Médio',
      value: '24s',
      change: '+8,9%',
      trend: 'up',
      icon: Clock,
      color: 'orange',
      comparison: '+2.1s vs período anterior',
    },
    {
      id: 'viral_score',
      label: 'Score Viral',
      value: '87',
      change: '+15,2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'cyan',
      comparison: '+11 pontos vs período anterior',
    },
  ];

  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    cyan: 'from-cyan-500 to-cyan-600',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            onClick={() => onCardClick(stat.id)}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden cursor-pointer"
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-400/10 dark:to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                <TrendingUp className="w-3 h-3 animate-pulse" />
                {stat.change}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-2xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{stat.value}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{stat.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-500">{stat.comparison}</p>
            </div>

            {/* Click indicator */}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-xs text-purple-600 dark:text-purple-400">📊</span>
              </div>
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;