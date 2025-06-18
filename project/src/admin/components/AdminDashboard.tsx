import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  UserPlus, 
  TrendingDown, 
  TrendingUp,
  Activity,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

interface KPIData {
  mrr: {
    current: number;
    change: number;
    trend: 'up' | 'down';
  };
  churnRate: {
    current: number;
    change: number;
    trend: 'up' | 'down';
  };
  newUsers: {
    current: number;
    change: number;
    trend: 'up' | 'down';
  };
  newSubscriptions: {
    current: number;
    change: number;
    trend: 'up' | 'down';
  };
}

interface RecentActivity {
  id: string;
  type: 'user_signup' | 'subscription' | 'cancellation' | 'support_ticket';
  description: string;
  timestamp: string;
  severity: 'info' | 'success' | 'warning' | 'error';
}

const AdminDashboard: React.FC = () => {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    
    // Simular carregamento de dados
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data - em produção viria do backend
    setKpiData({
      mrr: {
        current: 12450,
        change: 15.2,
        trend: 'up'
      },
      churnRate: {
        current: 3.2,
        change: -0.8,
        trend: 'down'
      },
      newUsers: {
        current: 284,
        change: 22.5,
        trend: 'up'
      },
      newSubscriptions: {
        current: 47,
        change: 18.9,
        trend: 'up'
      }
    });

    setRecentActivity([
      {
        id: '1',
        type: 'subscription',
        description: 'Nova assinatura Pro - creator@exemplo.com',
        timestamp: '2024-01-20T10:30:00Z',
        severity: 'success'
      },
      {
        id: '2',
        type: 'user_signup',
        description: 'Novo usuário cadastrado - usuario@teste.com',
        timestamp: '2024-01-20T09:15:00Z',
        severity: 'info'
      },
      {
        id: '3',
        type: 'support_ticket',
        description: 'Ticket de suporte aberto - Problema com sincronização',
        timestamp: '2024-01-20T08:45:00Z',
        severity: 'warning'
      },
      {
        id: '4',
        type: 'cancellation',
        description: 'Cancelamento de assinatura - motivo: preço',
        timestamp: '2024-01-19T16:20:00Z',
        severity: 'error'
      }
    ]);

    setLoading(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'user_signup':
        return <UserPlus className="w-4 h-4" />;
      case 'subscription':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancellation':
        return <AlertTriangle className="w-4 h-4" />;
      case 'support_ticket':
        return <Clock className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: RecentActivity['severity']) => {
    switch (severity) {
      case 'success':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'error':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default:
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Dashboard Administrativo</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Visão geral dos indicadores de negócio do Videra
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Calendar className="w-4 h-4" />
          <span>Atualizado: {new Date().toLocaleString('pt-BR')}</span>
        </div>
      </div>

      {/* KPI Cards */}
      {kpiData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* MRR */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                kpiData.mrr.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {kpiData.mrr.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {kpiData.mrr.change > 0 ? '+' : ''}{kpiData.mrr.change}%
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                {formatCurrency(kpiData.mrr.current)}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">MRR (Receita Mensal Recorrente)</p>
            </div>
          </div>

          {/* Churn Rate */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                kpiData.churnRate.trend === 'down' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {kpiData.churnRate.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {kpiData.churnRate.change > 0 ? '+' : ''}{kpiData.churnRate.change}%
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                {kpiData.churnRate.current}%
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Taxa de Cancelamento</p>
            </div>
          </div>

          {/* New Users */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                kpiData.newUsers.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {kpiData.newUsers.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {kpiData.newUsers.change > 0 ? '+' : ''}{kpiData.newUsers.change}%
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                {kpiData.newUsers.current.toLocaleString('pt-BR')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Novos Usuários (30 dias)</p>
            </div>
          </div>

          {/* New Subscriptions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                kpiData.newSubscriptions.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {kpiData.newSubscriptions.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {kpiData.newSubscriptions.change > 0 ? '+' : ''}{kpiData.newSubscriptions.change}%
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                {kpiData.newSubscriptions.current}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Assinaturas Pro (30 dias)</p>
            </div>
          </div>
        </div>
      )}

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Receita dos Últimos 12 Meses</h3>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 dark:text-slate-400">Gráfico de receita será implementado</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">Integração com Stripe em desenvolvimento</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Atividade Recente</h3>
            <Activity className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSeverityColor(activity.severity)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    {activity.description}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
              Ver todas as atividades →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl hover:shadow-lg transition-all">
            <Users className="w-6 h-6 text-red-500" />
            <div className="text-left">
              <p className="font-medium text-slate-800 dark:text-white">Gerenciar Usuários</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Ver todos os usuários</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl hover:shadow-lg transition-all">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <div className="text-left">
              <p className="font-medium text-slate-800 dark:text-white">Tickets de Suporte</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">3 pendentes</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl hover:shadow-lg transition-all">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            <div className="text-left">
              <p className="font-medium text-slate-800 dark:text-white">Relatórios</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Gerar relatório</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;