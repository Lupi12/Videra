import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Search, Eye, Heart, Share2, MoreHorizontal, Play, Download, Edit3, Loader2 } from 'lucide-react';
import { usePagination } from '../hooks/usePagination';

interface ContentItem {
  id: string;
  title: string;
  platform: string;
  publishedAt: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  thumbnail: string;
  status: 'published' | 'scheduled' | 'draft' | 'failed';
  performance: 'viral' | 'good' | 'average';
  engagementRate: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  meta?: {
    sortBy?: string;
    sortOrder?: string;
    search?: string;
  };
}

const ContentHistory: React.FC = () => {
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [loading, setLoading] = useState(false);
  const [contentData, setContentData] = useState<PaginatedResponse<ContentItem> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pagination = usePagination({
    initialLimit: 12,
    initialSortBy: 'publishedAt',
    initialSortOrder: 'desc'
  });

  // Mock data para demonstração
  const mockContentData: ContentItem[] = [
    {
      id: '1',
      title: 'Rotina Matinal Que Mudou Minha Vida',
      platform: 'TikTok',
      publishedAt: '2024-01-15T08:00:00Z',
      views: 245000,
      likes: 18500,
      shares: 2300,
      comments: 1200,
      thumbnail: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'published',
      performance: 'viral',
      engagementRate: 8.2,
    },
    {
      id: '2',
      title: 'Ideias de Café da Manhã Saudável',
      platform: 'Instagram',
      publishedAt: '2024-01-14T12:00:00Z',
      views: 125000,
      likes: 9200,
      shares: 1100,
      comments: 850,
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'published',
      performance: 'good',
      engagementRate: 9.1,
    },
    {
      id: '3',
      title: 'Treino em Casa Sem Equipamentos',
      platform: 'YouTube',
      publishedAt: '2024-01-13T16:30:00Z',
      views: 89000,
      likes: 6800,
      shares: 890,
      comments: 450,
      thumbnail: 'https://images.pexels.com/photos/4753990/pexels-photo-4753990.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'published',
      performance: 'average',
      engagementRate: 7.6,
    },
    {
      id: '4',
      title: 'Dicas de Produtividade para Criadores',
      platform: 'TikTok',
      publishedAt: '2024-01-12T10:15:00Z',
      views: 156000,
      likes: 12400,
      shares: 1800,
      comments: 920,
      thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'published',
      performance: 'good',
      engagementRate: 9.5,
    },
    {
      id: '5',
      title: 'Setup de Home Office Perfeito',
      platform: 'Instagram',
      publishedAt: '2024-01-11T14:20:00Z',
      views: 78000,
      likes: 5600,
      shares: 670,
      comments: 340,
      thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'published',
      performance: 'average',
      engagementRate: 8.1,
    },
    {
      id: '6',
      title: 'Receitas Rápidas e Saudáveis',
      platform: 'YouTube',
      publishedAt: '2024-01-10T09:45:00Z',
      views: 203000,
      likes: 15600,
      shares: 2100,
      comments: 1350,
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'published',
      performance: 'viral',
      engagementRate: 9.3,
    }
  ];

  // Função para simular paginação com dados mock
  const paginateMockData = (data: ContentItem[], params: any): PaginatedResponse<ContentItem> => {
    const page = params.page || 1;
    const limit = params.limit || 12;
    const search = params.search?.toLowerCase() || '';
    
    // Filtrar dados se houver busca
    let filteredData = data;
    if (search) {
      filteredData = data.filter((item) => 
        item.title?.toLowerCase().includes(search) ||
        item.platform?.toLowerCase().includes(search)
      );
    }

    // Filtrar por plataforma
    if (filterPlatform !== 'all') {
      filteredData = filteredData.filter(item => item.platform === filterPlatform);
    }
    
    // Ordenar dados
    if (params.sortBy) {
      filteredData.sort((a: any, b: any) => {
        const aValue = a[params.sortBy];
        const bValue = b[params.sortBy];
        
        if (params.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }
    
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      meta: {
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        search: params.search,
      }
    };
  };

  // Carregar dados quando parâmetros mudarem
  useEffect(() => {
    loadContent();
  }, [pagination.paginationParams, filterPlatform]);

  const loadContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const params = {
        ...pagination.paginationParams,
        platform: filterPlatform !== 'all' ? filterPlatform : undefined
      };
      
      const response = paginateMockData(mockContentData, params);
      setContentData(response);
    } catch (err) {
      setError('Erro ao carregar conteúdo. Tente novamente.');
      console.error('Erro ao carregar conteúdo:', err);
    } finally {
      setLoading(false);
    }
  };

  const performanceColors = {
    viral: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    good: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    average: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  };

  const performanceLabels = {
    viral: 'Viral',
    good: 'Bom',
    average: 'Médio',
  };

  const platformColors = {
    TikTok: 'from-pink-500 to-rose-500',
    Instagram: 'from-purple-500 to-pink-500',
    YouTube: 'from-red-500 to-red-600',
  };

  const handleSearch = (searchTerm: string) => {
    pagination.setSearch(searchTerm);
    pagination.setPage(1); // Reset para primeira página ao buscar
  };

  const handleSortChange = (sortBy: string) => {
    const newOrder = pagination.sortBy === sortBy && pagination.sortOrder === 'desc' ? 'asc' : 'desc';
    pagination.setSortBy(sortBy);
    pagination.setSortOrder(newOrder);
    pagination.setPage(1);
  };

  const handlePlatformFilter = (platform: string) => {
    setFilterPlatform(platform);
    pagination.setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Histórico de Conteúdo</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Acompanhe o desempenho de todo seu conteúdo publicado
            {contentData && ` (${contentData.pagination.totalItems} itens)`}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm hover:shadow-lg transition-all">
            <Download className="w-4 h-4" />
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar conteúdo..."
              value={pagination.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-slate-100/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
            />
          </div>
          
          <select
            value={`${pagination.sortBy}-${pagination.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              pagination.setSortBy(sortBy);
              pagination.setSortOrder(sortOrder as 'asc' | 'desc');
              pagination.setPage(1);
            }}
            className="px-4 py-2 bg-slate-100/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
          >
            <option value="publishedAt-desc">Mais Recentes</option>
            <option value="publishedAt-asc">Mais Antigos</option>
            <option value="views-desc">Mais Visualizações</option>
            <option value="engagementRate-desc">Maior Engajamento</option>
            <option value="title-asc">Título A-Z</option>
          </select>
          
          <select
            value={filterPlatform}
            onChange={(e) => handlePlatformFilter(e.target.value)}
            className="px-4 py-2 bg-slate-100/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
          >
            <option value="all">Todas as Plataformas</option>
            <option value="TikTok">TikTok</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
          </select>
          
          <select
            value={pagination.limit}
            onChange={(e) => {
              pagination.setLimit(Number(e.target.value));
              pagination.setPage(1);
            }}
            className="px-4 py-2 bg-slate-100/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
          >
            <option value={6}>6 por página</option>
            <option value={12}>12 por página</option>
            <option value={24}>24 por página</option>
            <option value={48}>48 por página</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Carregando conteúdo...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
          <p className="text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={loadContent}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Content Grid */}
      {!loading && !error && contentData && (
        <>
          {contentData.data.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">Nenhum conteúdo encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {contentData.data.map((content) => (
                <div
                  key={content.id}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute top-2 left-2">
                      <div className={`bg-gradient-to-r ${platformColors[content.platform as keyof typeof platformColors]} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                        {content.platform}
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${performanceColors[content.performance as keyof typeof performanceColors]}`}>
                        {performanceLabels[content.performance as keyof typeof performanceLabels]}
                      </span>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {content.title}
                    </h3>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                      {new Date(content.publishedAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Eye className="w-4 h-4" />
                        <span>{(content.views / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Heart className="w-4 h-4" />
                        <span>{(content.likes / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Share2 className="w-4 h-4" />
                        <span>{(content.shares / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-medium">{content.engagementRate}%</span> engajamento
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors group/btn">
                          <Edit3 className="w-4 h-4 text-slate-400 group-hover/btn:text-purple-500 transition-colors" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors group/btn">
                          <Download className="w-4 h-4 text-slate-400 group-hover/btn:text-blue-500 transition-colors" />
                        </button>
                      </div>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {contentData.pagination.totalPages > 1 && (
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
                {/* Informações de itens */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Mostrando {((contentData.pagination.currentPage - 1) * contentData.pagination.itemsPerPage) + 1} a {Math.min(contentData.pagination.currentPage * contentData.pagination.itemsPerPage, contentData.pagination.totalItems)} de {contentData.pagination.totalItems} itens
                  </span>
                </div>

                {/* Controles de navegação */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => pagination.setPage(1)}
                    disabled={contentData.pagination.currentPage === 1}
                    className="px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Primeira
                  </button>
                  
                  <button
                    onClick={() => pagination.setPage(contentData.pagination.currentPage - 1)}
                    disabled={!contentData.pagination.hasPreviousPage}
                    className="px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Anterior
                  </button>

                  <span className="px-4 py-2 text-sm font-medium text-slate-800 dark:text-white">
                    Página {contentData.pagination.currentPage} de {contentData.pagination.totalPages}
                  </span>

                  <button
                    onClick={() => pagination.setPage(contentData.pagination.currentPage + 1)}
                    disabled={!contentData.pagination.hasNextPage}
                    className="px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Próxima
                  </button>
                  
                  <button
                    onClick={() => pagination.setPage(contentData.pagination.totalPages)}
                    disabled={contentData.pagination.currentPage === contentData.pagination.totalPages}
                    className="px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Última
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Summary Stats */}
      {!loading && !error && contentData && contentData.data.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Resumo do Histórico</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {contentData.pagination.totalItems}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total de Conteúdos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {(contentData.data.reduce((sum, item) => sum + item.views, 0) / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total de Visualizações</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                {(contentData.data.reduce((sum, item) => sum + item.engagementRate, 0) / contentData.data.length).toFixed(1)}%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Engajamento Médio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {contentData.data.filter(item => item.performance === 'viral').length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Conteúdos Virais</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentHistory;