import React from 'react';
import { Brain, TrendingUp, Clock, Users } from 'lucide-react';

const AIInsights: React.FC = () => {
  const insights = [
    {
      type: 'performance',
      icon: TrendingUp,
      title: 'Performance em Alta',
      message: 'Parabéns! Sua taxa de engajamento no Instagram subiu 15% esta semana após você postar 3 vídeos no estilo Reels. Continue com essa estratégia.',
      color: 'from-green-500 to-emerald-500',
      priority: 'high'
    },
    {
      type: 'timing',
      icon: Clock,
      title: 'Horário Ideal',
      message: 'Seus seguidores estão mais ativos às 19h-21h. Considere agendar seus próximos posts neste horário para maximizar o alcance.',
      color: 'from-blue-500 to-cyan-500',
      priority: 'medium'
    },
    {
      type: 'audience',
      icon: Users,
      title: 'Crescimento da Audiência',
      message: 'Você ganhou 1.2K novos seguidores esta semana! O conteúdo sobre "rotina matinal" está atraindo uma audiência 25% mais jovem.',
      color: 'from-purple-500 to-pink-500',
      priority: 'high'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
          <Brain className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Insights da IA</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Análises inteligentes do seu desempenho</p>
        </div>
        <div className="ml-auto flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          IA Ativa
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${insight.color} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">
                    {insight.title}
                  </h4>
                  {insight.priority === 'high' && (
                    <div className="inline-block bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs px-2 py-1 rounded-full font-medium mb-2">
                      Alta Prioridade
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {insight.message}
              </p>
              
              <button className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                Ver detalhes →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIInsights;