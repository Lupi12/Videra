import { useState, useCallback, useMemo } from 'react';
import { PaginationParams } from '../types/api';

interface UsePaginationProps {
  initialPage?: number;
  initialLimit?: number;
  initialSortBy?: string;
  initialSortOrder?: 'asc' | 'desc';
}

interface UsePaginationReturn {
  // Estado atual
  currentPage: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  search: string;
  
  // Ações
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setSearch: (search: string) => void;
  resetPagination: () => void;
  
  // Navegação
  nextPage: () => void;
  previousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: (totalPages: number) => void;
  
  // Parâmetros para API
  paginationParams: PaginationParams;
  
  // Utilitários
  canGoNext: (totalPages: number) => boolean;
  canGoPrevious: () => boolean;
}

export const usePagination = ({
  initialPage = 1,
  initialLimit = 20,
  initialSortBy = 'createdAt',
  initialSortOrder = 'desc'
}: UsePaginationProps = {}): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);
  const [search, setSearch] = useState('');

  // Ações básicas
  const setPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, page));
  }, []);

  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage);
    setLimit(initialLimit);
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
    setSearch('');
  }, [initialPage, initialLimit, initialSortBy, initialSortOrder]);

  // Navegação
  const nextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback((totalPages: number) => {
    setCurrentPage(totalPages);
  }, []);

  // Utilitários
  const canGoNext = useCallback((totalPages: number) => {
    return currentPage < totalPages;
  }, [currentPage]);

  const canGoPrevious = useCallback(() => {
    return currentPage > 1;
  }, [currentPage]);

  // Parâmetros para API
  const paginationParams = useMemo((): PaginationParams => ({
    page: currentPage,
    limit,
    sortBy,
    sortOrder,
    search: search.trim() || undefined
  }), [currentPage, limit, sortBy, sortOrder, search]);

  return {
    // Estado
    currentPage,
    limit,
    sortBy,
    sortOrder,
    search,
    
    // Ações
    setPage,
    setLimit,
    setSortBy,
    setSortOrder,
    setSearch,
    resetPagination,
    
    // Navegação
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    
    // Parâmetros
    paginationParams,
    
    // Utilitários
    canGoNext,
    canGoPrevious
  };
};