// Tipos para paginação e resposta da API
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

// Tipos para diferentes entidades
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