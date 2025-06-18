import React, { useState } from 'react';
import { Trophy, Star, Zap, Target, X } from 'lucide-react';

const AchievementsBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const achievements = [
    {
      id: 'first_viral',
      title: 'Primeiro Viral!',
      description: 'Seu vídeo atingiu 100K visualizações',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      unlocked: true,
      new: true,
    },
    {
      id: 'consistent_creator',
      title: 'Criador Consistente',
      description: '30 dias postando consecutivos',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      unlocked: true,
      new: false,
    },
    {
      id: 'engagement_master',
      title: 'Mestre do Engajamento',
      description: 'Taxa de engajamento acima de 10%',
      icon: Star,
      color: 'from-purple-500 to-pink-500',
      unlocked: false,
      progress: 82,
    },
  ];

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 dark:from-purple-400/20 dark:via-pink-400/20 dark:to-orange-400/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Conquistas Recentes</h3>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 relative z-10">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`flex-shrink-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 min-w-[200px] border transition-all duration-300 hover:scale-105 ${
                achievement.unlocked 
                  ? 'border-green-200 dark:border-green-700' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center shadow-lg ${
                  achievement.unlocked ? '' : 'grayscale opacity-50'
                }`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {achievement.new && (
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    NOVO!
                  </div>
                )}
              </div>
              
              <h4 className={`font-bold mb-1 ${
                achievement.unlocked 
                  ? 'text-slate-800 dark:text-white' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}>
                {achievement.title}
              </h4>
              
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                {achievement.description}
              </p>

              {!achievement.unlocked && achievement.progress && (
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${achievement.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                  <p className="text-xs text-slate-500 mt-1">{achievement.progress}% completo</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsBanner;