import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, Hash, Eye, Heart, Loader2, Filter, Search } from 'lucide-react';

const TrendingTopics: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [searchTerm, setSearchTerm] = useState('');

  const trendingTopics = [
    {
      id: 1,
      topic: 'Rotinas Matinais',
      category: 'Estilo de Vida',
      growth: '+245%',
      posts: '1,2M',
      engagement: '8,9%',
      platforms: ['TikTok', 'Instagram', 'YouTube'],
      timeframe: '24h',
      difficulty: 'Fácil',
      hashtags: ['#rotinamatinal', '#produtividade', '#autocuidado'],
      viralScore: 92,
    },
    {
      id: 2,
      topic: 'Treinos Rápidos',
      category: 'Fitness',
      growth: '+189%',
      posts: '856K',
      engagement: '12,4%',
      platforms: ['TikTok', 'Instagram'],
      timeframe: '12h',
      difficulty: 'Médio',
      hashtags: ['#treinorapido', '#fitness', '#academiaemcasa'],
      viralScore: 88,
    },
    {
      id: 3,
      topic: 'Receitas Saudáveis',
      category: 'Comida',
      growth: '+167%',
      posts: '2,1M',
      engagement: '6,7%',
      platforms: ['Instagram', 'YouTube', 'TikTok'],
      timeframe: '6h',
      difficulty: 'Fácil',
      hashtags: ['#receitassaudaveis', '#culinaria', '#nutricao'],
      viralScore: 85,
    },
    {
      id: 4,
      topic: 'Dicas de Estudo',
      category: 'Educação',
      growth: '+134%',
      posts: '445K',
      engagement: '9,8%',
      platforms: ['TikTok', 'YouTube'],
      timeframe: '3h',
      difficulty: 'Fácil',
      hashtags: ['#dicasdeestudo', '#educacao', '#produtividade'],
      viralScore: 82,
    },
    {
      id: 5,
      topic: 'Organização Minimalista',
      category: 'Lifestyle',
      growth: '+156%',
      posts: '678K',
      engagement: '7,3%',
      platforms: ['Instagram', 'TikTok'],
      timeframe: '8h',
      difficulty: 'Médio',
      hashtags: ['#organizacao', '#minimalismo', '#decoracao'],
      viralScore: 79,
    },
  ];

  const platforms = [
    { name: 'TikTok', color: 'from-pink-500 to-rose-500', icon: '🎵' },
    { name: 'Instagram', color: 'from-purple-500 to-pink-500', icon: '📸' },
    { name: 'YouTube', color: 'from-red-500 to-red-600', icon: '▶️' },
  ];

  useEffect(() => {
    loadTrends();
  }, [selectedPlatform, selectedTimeframe]);

  const loadTrends = async () => {
    setLoading(true);
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const filteredTopics = trendingTopics.filter(topic => {
    const matchesPlatform = selectedPlatform === 'all' || topic.platforms.includes(selectedPlatform);
    const matchesSearch = topic.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Tópicos em Tendência</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Descubra o que está em alta em todas as plataformas</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
          >
            <option value="all">Todas as Plataformas</option>
            <option value="TikTok">TikTok</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
          </select>
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
          >
            <option value="1h">Última hora</option>
            <option value="6h">Últimas 6 horas</option>
            <option value="24h">Últimas 24 horas</option>
            <option value="7d">Últimos 7 dias</option>
          </select>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar tópicos ou categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-slate-100/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-600/50 transition-colors text-slate-800 dark:text-white">
            <Filter className="w-4 h-4" />
            Filtros Avançados
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Carregando tendências...</span>
          </div>
        </div>
      )}

      {/* Trending Topics Grid */}
      {!loading && (
        <div className="grid grid-cols-1 gap-4">
          {filteredTopics.map((topic, index) => (
            <div key={topic.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">#{index + 1}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{topic.topic}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg">{topic.category}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Em alta há {topic.timeframe}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-lg font-medium ${
                          topic.difficulty === 'Fácil'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        }`}>
                          {topic.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold text-lg mb-1">
                        <TrendingUp className="w-5 h-5" />
                        {topic.growth}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Taxa de crescimento</p>
                      <div className="mt-2 flex items-center gap-1 text-purple-600 dark:text-purple-400 text-sm font-medium">
                        <span>Score: {topic.viralScore}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Eye className="w-4 h-4" />
                      <span>{topic.posts} posts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Heart className="w-4 h-4" />
                      <span>{topic.engagement} engajamento médio</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {topic.platforms.map((platformName) => {
                        const platform = platforms.find(p => p.name === platformName);
                        return platform ? (
                          <div
                            key={platformName}
                            className={`w-6 h-6 bg-gradient-to-r ${platform.color} rounded-full flex items-center justify-center text-xs`}
                            title={platformName}
                          >
                            {platform.icon}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {topic.hashtags.map((hashtag, index) => (
                      <span key={index} className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-lg">
                        <Hash className="w-3 h-3" />
                        {hashtag.replace('#', '')}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Melhor horário para postar: 18h-21h
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm hover:shadow-lg transition-all">
                      Criar Conteúdo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-orange-50/50 to-yellow-50/50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-orange-200/50 dark:border-orange-700/50">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Alerta de Tendência</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Entre nas tendências cedo para maximizar seu alcance. Tópicos geralmente atingem o pico em 48-72 horas 
          após começarem a fazer sucesso. Considere criar sua versão com um ângulo único.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2 bg-white/50 dark:bg-slate-800/50 border border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-300 rounded-xl text-sm hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors">
            Configurar Alertas
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl text-sm hover:shadow-lg transition-all">
            Upgrade para Tendências em Tempo Real
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;