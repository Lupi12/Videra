import React from 'react';
import { TrendingUp, Zap, BarChart3 } from 'lucide-react';

interface PerformanceChartProps {
  comparisonPeriod: string;
  comparisonType: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ comparisonPeriod, comparisonType }) => {
  const data = [
    { day: 'Seg', views: 45000, engagement: 3200, previous: 38000 },
    { day: 'Ter', views: 52000, engagement: 4100, previous: 45000 },
    { day: 'Qua', views: 48000, engagement: 3800, previous: 42000 },
    { day: 'Qui', views: 61000, engagement: 5200, previous: 48000 },
    { day: 'Sex', views: 75000, engagement: 6800, previous: 58000 },
    { day: 'Sáb', views: 68000, engagement: 5900, previous: 52000 },
    { day: 'Dom', views: 58000, engagement: 4900, previous: 45000 },
  ];

  const maxViews = Math.max(...data.map(d => Math.max(d.views, d.previous)));

  const getComparisonLabel = () => {
    const periodLabels = {
      '7days': '7 dias',
      '30days': '30 dias',
      '90days': '90 dias'
    };
    
    const typeLabels = {
      'previous': 'período anterior',
      'same_last_month': 'mesmo período mês passado',
      'same_last_year': 'mesmo período ano passado'
    };

    return `${periodLabels[comparisonPeriod as keyof typeof periodLabels]} vs. ${typeLabels[comparisonType as keyof typeof typeLabels]}`;
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden group">
      {/* Chart Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 dark:from-purple-400/10 dark:to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-purple-500 dark:text-purple-400 animate-pulse" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Visão Geral do Desempenho</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Comparando {getComparisonLabel()}
          </p>
        </div>
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium bg-green-50/50 dark:bg-green-900/20 px-3 py-1.5 rounded-full">
          <TrendingUp className="w-4 h-4 animate-bounce" />
          <span>+23,5% vs comparação</span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {data.map((item, index) => {
          const viewsHeight = (item.views / maxViews) * 100;
          const previousHeight = (item.previous / maxViews) * 100;
          const engagementHeight = (item.engagement / (maxViews * 0.15)) * 100;
          
          return (
            <div key={index} className="flex items-center gap-4 group/item">
              <div className="w-8 text-sm text-slate-600 dark:text-slate-400 font-medium">{item.day}</div>
              <div className="flex-1 flex items-end gap-2 h-16">
                {/* Current Period */}
                <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden relative">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ height: `${viewsHeight}%`, minHeight: '4px' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                
                {/* Comparison Period */}
                <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden relative opacity-60">
                  <div 
                    className="bg-gradient-to-r from-slate-400 to-slate-500 rounded-lg transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ height: `${previousHeight}%`, minHeight: '4px' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer delay-300"></div>
                  </div>
                </div>
                
                {/* Engagement */}
                <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden relative">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ height: `${engagementHeight}%`, minHeight: '4px' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer delay-500"></div>
                  </div>
                </div>
              </div>
              <div className="w-20 text-right">
                <div className="text-sm font-semibold text-slate-800 dark:text-white">
                  {(item.views / 1000).toFixed(0)}K
                  <span className="text-xs text-green-600 dark:text-green-400 ml-1">
                    (+{(((item.views - item.previous) / item.previous) * 100).toFixed(0)}%)
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{(item.engagement / 1000).toFixed(1)}K</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Período Atual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full animate-pulse delay-300 opacity-60"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Comparação</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse delay-600"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Engajamento</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;