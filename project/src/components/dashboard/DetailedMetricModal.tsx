import React from 'react';
import { X, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

interface DetailedMetricModalProps {
  metric: string;
  onClose: () => void;
}

const DetailedMetricModal: React.FC<DetailedMetricModalProps> = ({ metric, onClose }) => {
  const metricData = {
    views: {
      title: 'Visualizações Detalhadas',
      current: '2,4M',
      change: '+12,5%',
      data: [
        { period: 'Hoje', value: 45000, change: '+8%' },
        { period: 'Ontem', value: 42000, change: '+15%' },
        { period: 'Últimos 7 dias', value: 285000, change: '+12%' },
        { period: 'Últimos 30 dias', value: 1200000, change: '+18%' },
      ],
      insights: [
        'Pico de visualizações às 19h-21h',
        'Melhor performance no TikTok (+25%)',
        'Conteúdo de fitness gera 40% mais views'
      ]
    },
    engagement: {
      title: 'Taxa de Engajamento',
      current: '8,2%',
      change: '+2,1%',
      data: [
        { period: 'Hoje', value: 9.1, change: '+5%' },
        { period: 'Ontem', value: 8.7, change: '+3%' },
        { period: 'Últimos 7 dias', value: 8.2, change: '+2%' },
        { period: 'Últimos 30 dias', value: 7.8, change: '+8%' },
      ],
      insights: [
        'Stories geram 35% mais engajamento',
        'Perguntas aumentam interação em 50%',
        'Vídeos curtos (<30s) performam melhor'
      ]
    },
    // Add more metrics as needed
  };

  const currentMetric = metricData[metric as keyof typeof metricData];

  if (!currentMetric) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              {currentMetric.title}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {currentMetric.current}
              </span>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                <TrendingUp className="w-4 h-4" />
                {currentMetric.change}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detailed Chart */}
          <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Análise Temporal
            </h3>
            <div className="space-y-4">
              {currentMetric.data.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="font-medium text-slate-800 dark:text-white">{item.period}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-slate-800 dark:text-white">
                      {typeof item.value === 'number' && item.value > 1000 
                        ? `${(item.value / 1000).toFixed(0)}K` 
                        : `${item.value}${typeof item.value === 'number' && item.value < 100 ? '%' : ''}`
                      }
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Insights da IA
            </h3>
            <div className="space-y-3">
              {currentMetric.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/50 dark:bg-slate-800/30 rounded-xl">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">💡</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            Fechar
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all">
            Exportar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedMetricModal;