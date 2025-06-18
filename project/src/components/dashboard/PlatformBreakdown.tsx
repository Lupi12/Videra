import React from 'react';
import { Sparkles } from 'lucide-react';

const PlatformBreakdown: React.FC = () => {
  const platforms = [
    { name: 'TikTok', views: 1200000, percentage: 52, color: 'from-pink-500 to-rose-500', icon: '🎵' },
    { name: 'Instagram', views: 680000, percentage: 29, color: 'from-purple-500 to-pink-500', icon: '📸' },
    { name: 'YouTube', views: 450000, percentage: 19, color: 'from-red-500 to-red-600', icon: '▶️' },
  ];

  const totalViews = platforms.reduce((sum, platform) => sum + platform.views, 0);

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden group">
      {/* Platform Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400 animate-spin-slow" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Divisão por Plataforma</h3>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-700/50 px-3 py-1 rounded-full">
          Total: {(totalViews / 1000000).toFixed(1)}M visualizações
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {platforms.map((platform, index) => (
          <div key={index} className="space-y-3 group/platform">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                  {platform.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white group-hover/platform:text-purple-600 dark:group-hover/platform:text-purple-400 transition-colors">
                    {platform.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {(platform.views / 1000000).toFixed(1)}M visualizações
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-slate-800 dark:text-white">{platform.percentage}%</div>
              </div>
            </div>
            
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden relative">
              <div 
                className={`h-full bg-gradient-to-r ${platform.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                style={{ width: `${platform.percentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl backdrop-blur-sm relative z-10">
        <h4 className="font-semibold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          Insight de Performance
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          TikTok é sua plataforma mais forte este mês. Considere criar mais conteúdo otimizado para o algoritmo do TikTok.
        </p>
      </div>
    </div>
  );
};

export default PlatformBreakdown;