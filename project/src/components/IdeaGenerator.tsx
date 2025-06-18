import React, { useState, useEffect } from 'react';
import { Lightbulb, Shuffle, Heart, Star, Copy, Loader2, Sparkles } from 'lucide-react';

const IdeaGenerator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);
  
  const categories = [
    { id: 'all', name: 'Todas as Ideias', icon: '💡' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'lifestyle', name: 'Estilo de Vida', icon: '✨' },
    { id: 'food', name: 'Comida', icon: '🍳' },
    { id: 'productivity', name: 'Produtividade', icon: '⚡' },
    { id: 'fashion', name: 'Moda', icon: '👗' },
  ];

  const contentIdeas = [
    {
      id: 1,
      title: 'Rotina Matinal Que Mudou Minha Vida',
      description: 'Compartilhe sua rotina matinal pessoal com dicas rápidas e hábitos',
      category: 'lifestyle',
      platform: 'TikTok',
      difficulty: 'Fácil',
      trending: true,
      hashtags: ['#rotinamatinal', '#produtividade', '#autocuidado', '#estilodevida'],
      viralScore: 85,
    },
    {
      id: 2,
      title: 'Ideias de Café da Manhã Saudável em 5 Minutos',
      description: 'Receitas rápidas e nutritivas para manhãs corridas',
      category: 'food',
      platform: 'Instagram',
      difficulty: 'Fácil',
      trending: true,
      hashtags: ['#cafedamanhasaudavel', '#receitasrapidas', '#nutricao', '#comida'],
      viralScore: 78,
    },
    {
      id: 3,
      title: 'Treino em Casa - Sem Equipamentos',
      description: 'Rotina de exercícios completa que pode ser feita em qualquer lugar',
      category: 'fitness',
      platform: 'YouTube',
      difficulty: 'Médio',
      trending: false,
      hashtags: ['#treinoencasa', '#fitness', '#semequipamentos', '#exercicio'],
      viralScore: 72,
    },
    {
      id: 4,
      title: 'Apps de Produtividade Que Realmente Funcionam',
      description: 'Review e demonstração das ferramentas de produtividade mais eficazes',
      category: 'productivity',
      platform: 'TikTok',
      difficulty: 'Médio',
      trending: true,
      hashtags: ['#produtividade', '#apps', '#organizacao', '#homeoffice'],
      viralScore: 81,
    },
  ];

  useEffect(() => {
    loadIdeas();
  }, [selectedCategory]);

  const loadIdeas = async () => {
    setLoading(true);
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const filteredIdeas = selectedCategory === 'all' 
      ? contentIdeas 
      : contentIdeas.filter(idea => idea.category === selectedCategory);
    
    setIdeas(filteredIdeas);
    setLoading(false);
  };

  const generateNewIdeas = async () => {
    setLoading(true);
    // Simular geração de novas ideias
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Embaralhar ideias existentes para simular novas ideias
    const shuffled = [...contentIdeas].sort(() => Math.random() - 0.5);
    const filtered = selectedCategory === 'all' 
      ? shuffled 
      : shuffled.filter(idea => idea.category === selectedCategory);
    
    setIdeas(filtered);
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aqui você poderia adicionar uma notificação de sucesso
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Gerador de Ideias</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Ideias de conteúdo com IA personalizadas para seu nicho</p>
        </div>
        <button 
          onClick={generateNewIdeas}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Shuffle className="w-4 h-4" />
          )}
          {loading ? 'Gerando...' : 'Gerar Novas Ideias'}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <Sparkles className="w-6 h-6 animate-pulse text-purple-500" />
            <span>Gerando ideias incríveis...</span>
          </div>
        </div>
      )}

      {/* Ideas Grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ideas.map((idea) => (
            <div key={idea.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">{idea.title}</h3>
                    {idea.trending && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                        <Star className="w-3 h-3 fill-current" />
                        Em Alta
                      </div>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{idea.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      📱 {idea.platform}
                    </span>
                    <span className={`px-2 py-1 rounded-full font-medium ${
                      idea.difficulty === 'Fácil'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {idea.difficulty}
                    </span>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      <span className="font-medium text-purple-600 dark:text-purple-400">
                        Score: {idea.viralScore}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {idea.hashtags.map((hashtag: string, index: number) => (
                      <span key={index} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-lg">
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors group/btn"
                    title="Favoritar"
                  >
                    <Heart className="w-4 h-4 text-slate-400 group-hover/btn:text-red-500 transition-colors" />
                  </button>
                  <button 
                    onClick={() => copyToClipboard(idea.title + '\n\n' + idea.description + '\n\n' + idea.hashtags.join(' '))}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors group/btn"
                    title="Copiar"
                  >
                    <Copy className="w-4 h-4 text-slate-400 group-hover/btn:text-purple-500 transition-colors" />
                  </button>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm hover:shadow-lg transition-all">
                  Usar Esta Ideia
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upgrade Banner */}
      <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Precisa de Mais Ideias?</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Nossa IA analisa tópicos em alta, seu desempenho passado e preferências da audiência para gerar 
          ideias de conteúdo personalizadas com maior probabilidade de viralizar.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
            Upgrade para Pro - Ideias Ilimitadas
          </button>
          <button className="px-6 py-3 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-white/70 dark:hover:bg-slate-700/50 transition-all">
            Ver Exemplos de IA
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaGenerator;