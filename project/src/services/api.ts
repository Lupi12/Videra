import axios, { AxiosResponse } from 'axios';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('videra_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('videra_auth_token');
      console.warn('Token de autenticação inválido');
    }
    return Promise.reject(error);
  }
);

// Tipos para API
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedResponse<T> {
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

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface ContentItem {
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

export interface AnalyticsData {
  id: string;
  date: string;
  views: number;
  engagement: number;
  platform: string;
  contentId?: string;
}

export interface TrendingTopic {
  id: string;
  topic: string;
  category: string;
  growth: string;
  posts: string;
  engagement: string;
  platforms: string[];
  timeframe: string;
  difficulty: string;
  hashtags: string[];
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  userId: string;
  metadata?: Record<string, any>;
}

// Utilitário para construir query string de paginação
const buildPaginationQuery = (params: PaginationParams): string => {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
  if (params.search) searchParams.append('search', params.search);
  
  return searchParams.toString();
};

// Mock data para desenvolvimento
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
];

// Função para simular paginação com dados mock
const paginateMockData = <T>(data: T[], params: PaginationParams): PaginatedResponse<T> => {
  const page = params.page || 1;
  const limit = params.limit || 20;
  const search = params.search?.toLowerCase() || '';
  
  // Filtrar dados se houver busca
  let filteredData = data;
  if (search && data.length > 0 && 'title' in data[0]) {
    filteredData = data.filter((item: any) => 
      item.title?.toLowerCase().includes(search) ||
      item.platform?.toLowerCase().includes(search)
    );
  }
  
  // Ordenar dados
  if (params.sortBy && filteredData.length > 0) {
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

// API de Conteúdo com Paginação
export const contentAPI = {
  // Listar conteúdo com paginação
  getContent: async (params: PaginationParams = {}): Promise<PaginatedResponse<ContentItem>> => {
    try {
      const query = buildPaginationQuery({ limit: 20, ...params });
      
      // Tentar fazer requisição real primeiro
      try {
        const response: AxiosResponse<PaginatedResponse<ContentItem>> = await apiClient.get(`/content?${query}`);
        return response.data;
      } catch (error) {
        // Se falhar, usar dados mock
        console.warn('API não disponível, usando dados mock');
        return paginateMockData(mockContentData, { limit: 20, ...params });
      }
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
      throw error;
    }
  },

  // Buscar conteúdo específico
  getContentById: async (id: string): Promise<APIResponse<ContentItem>> => {
    try {
      const response: AxiosResponse<APIResponse<ContentItem>> = await apiClient.get(`/content/${id}`);
      return response.data;
    } catch (error) {
      // Usar dados mock
      const mockItem = mockContentData.find(item => item.id === id);
      if (mockItem) {
        return { success: true, data: mockItem };
      }
      throw error;
    }
  },

  // Criar novo conteúdo
  createContent: async (content: Partial<ContentItem>): Promise<APIResponse<ContentItem>> => {
    try {
      const response: AxiosResponse<APIResponse<ContentItem>> = await apiClient.post('/content', content);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar conteúdo:', error);
      throw error;
    }
  },

  // Atualizar conteúdo
  updateContent: async (id: string, content: Partial<ContentItem>): Promise<APIResponse<ContentItem>> => {
    try {
      const response: AxiosResponse<APIResponse<ContentItem>> = await apiClient.put(`/content/${id}`, content);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar conteúdo:', error);
      throw error;
    }
  },

  // Deletar conteúdo
  deleteContent: async (id: string): Promise<APIResponse<void>> => {
    try {
      const response: AxiosResponse<APIResponse<void>> = await apiClient.delete(`/content/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar conteúdo:', error);
      throw error;
    }
  }
};

// API de Analytics com Paginação
export const analyticsAPI = {
  // Dados de analytics com paginação
  getAnalytics: async (params: PaginationParams & { 
    startDate?: string; 
    endDate?: string; 
    platform?: string; 
    period?: string;
  } = {}): Promise<PaginatedResponse<AnalyticsData>> => {
    try {
      const query = buildPaginationQuery({ limit: 50, ...params });
      
      try {
        const response: AxiosResponse<PaginatedResponse<AnalyticsData>> = await apiClient.get(`/analytics?${query}`);
        return response.data;
      } catch (error) {
        // Usar dados mock
        console.warn('API de analytics não disponível, usando dados mock');
        return paginateMockData(mockAnalyticsData, { limit: 50, ...params });
      }
    } catch (error) {
      console.error('Erro ao carregar analytics:', error);
      throw error;
    }
  },

  // Resumo de analytics (sem paginação - dados agregados)
  getAnalyticsSummary: async (period: string = '30d'): Promise<APIResponse<{
    totalViews: number;
    totalEngagement: number;
    totalFollowers: number;
    growthRate: number;
  }>> => {
    try {
      const response = await apiClient.get(`/analytics/summary?period=${period}`);
      return response.data;
    } catch (error) {
      // Retornar dados mock
      return {
        success: true,
        data: {
          totalViews: 2400000,
          totalEngagement: 8.2,
          totalFollowers: 125000,
          growthRate: 12.5
        }
      };
    }
  },

  // Dados para gráficos (otimizado para performance)
  getChartData: async (type: string, period: string = '7d'): Promise<APIResponse<any[]>> => {
    try {
      const response = await apiClient.get(`/analytics/charts/${type}?period=${period}`);
      return response.data;
    } catch (error) {
      // Retornar dados mock para gráficos
      return {
        success: true,
        data: [
          { day: 'Seg', views: 45000, engagement: 3200 },
          { day: 'Ter', views: 52000, engagement: 4100 },
          { day: 'Qua', views: 48000, engagement: 3800 },
          { day: 'Qui', views: 61000, engagement: 5200 },
          { day: 'Sex', views: 75000, engagement: 6800 },
          { day: 'Sáb', views: 68000, engagement: 5900 },
          { day: 'Dom', views: 58000, engagement: 4900 },
        ]
      };
    }
  }
};

// Cache simples para requisições frequentes
class APICache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttlMinutes: number = 5): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const apiCache = new APICache();

// Wrapper para requisições com cache
export const cachedRequest = async <T>(
  key: string,
  requestFn: () => Promise<T>,
  ttlMinutes: number = 5
): Promise<T> => {
  const cached = apiCache.get(key);
  if (cached) {
    return cached;
  }

  const result = await requestFn();
  apiCache.set(key, result, ttlMinutes);
  return result;
};

export default apiClient;