import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Download, TrendingUp, Loader2, BarChart3 } from 'lucide-react';

// Interfaces locais para evitar problemas de importação
interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  platform?: string;
  period?: string;
}

interface AnalyticsData {
  id: string;
  date: string;
  views: number;
  engagement: number;
  platform: string;
  contentId?: string;
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

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<PaginatedResponse<AnalyticsData> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  // Mock data para demonstração
  const mockAnalyticsData: AnalyticsData[] = [
    {
      id: '1',
      date: '2024-01-15',
      views: 45000,
      engagement: 3200,
      platform: 'TikTok',
      contentId: '1'
    },
    {
      id: '2',
      date: '2024-01-14',
      views: 52000,
      engagement: 4100,
      platform: 'Instagram',
      contentId: '2'
    },
    {
      id: '3',
      date: '2024-01-13',
      views: 48000,
      engagement: 3800,
      platform: 'YouTube',
      contentId: '3'
    },
    {
      id: '4',
      date: '2024-01-12',
      views: 61000,
      engagement: 5200,
      platform: 'TikTok',
      contentId: '4'
    },
    {
      id: '5',
      date: '2024-01-11',
      views: 75000,
      engagement: 6800,
      platform: 'Instagram',
      contentId: '5'
    },
    {
      id: '6',
      date: '2024-01-10',
      views: 68000,
      engagement: 5900,
      platform: 'YouTube',
      contentId: '6'
    },
    {
      id: '7',
      date: '2024-01-09',
      views: 58000,
      engagement: 4900,
      platform: 'TikTok',
      contentId: '7'
    }
  ];

  // Função para simular paginação com dados mock
  const paginateMockData = (data: AnalyticsData[], params: PaginationParams): PaginatedResponse<AnalyticsData> => {
    const page = params.page || 1;
    const limit = params.limit || 50;
    
    // Filtrar dados por plataforma se especificado
    let filteredData = data;
    if (params.platform && params.platform !== 'all') {
      filteredData = data.filter(item => item.platform === params.platform);
    }
    
    // Ordenar dados
    if (params.sortBy) {
      filteredData.sort((a: any, b: any) => {
        const aValue = a[params.sortBy!];
        const bValue = b[params.sortBy!];
        
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
    loadAnalytics();
  }, [selectedPlatform, dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const params: PaginationParams = {
        page: 1,
        limit: 50,
        sortBy: 'date',
        sortOrder: 'desc',
        platform: selectedPlatform !== 'all' ? selectedPlatform : undefined,
        period: dateRange
      };
      
      const response = paginateMockData(mockAnalyticsData, params);
      setAnalyticsData(response);
    } catch (err) {
      setError('Erro ao carregar analytics. Tente novamente.');
      console.error('Erro ao carregar analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Analytics</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Análise profunda do desempenho do seu conteúdo</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm hover:shadow-lg transition-all">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Carregando analytics...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
          <p className="text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={loadAnalytics}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Analytics Content */}
      {!loading && !error && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total de Visualizações</h4>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">2.4M</p>
              <p className="text-sm text-green-600 dark:text-green-400">+12.5% vs período anterior</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Taxa de Engajamento</h4>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">8.2%</p>
              <p className="text-sm text-green-600 dark:text-green-400">+2.1% vs período anterior</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Novos Seguidores</h4>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">1.2K</p>
              <p className="text-sm text-green-600 dark:text-green-400">+18.3% vs período anterior</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Score Viral</h4>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">87</p>
              <p className="text-sm text-green-600 dark:text-green-400">+15.2% vs período anterior</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Tendências de Engajamento</h3>
              <div className="h-64 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-purple-500 dark:text-purple-400 mx-auto mb-2" />
                  <p className="text-slate-600 dark:text-slate-400">Analytics avançados em breve</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    {analyticsData ? `${analyticsData.pagination.totalItems} pontos de dados` : 'Carregando dados...'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Demografia da Audiência</h3>
              <div className="h-64 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-slate-600 dark:text-slate-400">Insights demográficos carregando...</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    Plataforma: {selectedPlatform === 'all' ? 'Todas' : selectedPlatform}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          {analyticsData && analyticsData.data.length > 0 && (
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Dados Detalhados</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Data</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Plataforma</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Visualizações</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Engajamento</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Taxa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.data.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="py-3 px-4 text-slate-800 dark:text-white">
                          {new Date(item.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.platform === 'TikTok' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' :
                            item.platform === 'Instagram' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {item.platform}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-800 dark:text-white font-medium">
                          {item.views.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-slate-800 dark:text-white font-medium">
                          {item.engagement.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-slate-800 dark:text-white font-medium">
                          {((item.engagement / item.views) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Performance Insights */}
          <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Insights de Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Melhor Horário</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Seus posts performam melhor entre <strong>19h-21h</strong> nos fins de semana.
                </p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Plataforma Destaque</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>TikTok</strong> está gerando 40% mais engajamento que outras plataformas.
                </p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Tendência</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Crescimento consistente de <strong>+15%</strong> no engajamento mensal.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;