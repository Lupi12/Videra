import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  Activity, 
  CreditCard,
  Shield,
  BarChart3,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2
} from 'lucide-react';

interface UserDetail {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  totalPosts: number;
  totalViews: number;
  totalEngagement: number;
  subscription?: {
    id: string;
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadUserDetails(userId);
    }
  }, [userId]);

  const loadUserDetails = async (id: string) => {
    setLoading(true);
    
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    const mockUser: UserDetail = {
      id,
      email: 'creator@exemplo.com',
      name: 'João Silva',
      plan: 'pro',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      lastLogin: '2024-01-20T09:15:00Z',
      totalPosts: 45,
      totalViews: 125000,
      totalEngagement: 8.5,
      subscription: {
        id: 'sub_123',
        status: 'active',
        currentPeriodEnd: '2024-02-15T10:30:00Z',
        cancelAtPeriodEnd: false
      },
      recentActivity: [
        {
          id: '1',
          type: 'post_created',
          description: 'Criou novo post: "Dicas de produtividade"',
          timestamp: '2024-01-20T09:15:00Z'
        },
        {
          id: '2',
          type: 'login',
          description: 'Fez login na plataforma',
          timestamp: '2024-01-20T09:00:00Z'
        },
        {
          id: '3',
          type: 'subscription_renewed',
          description: 'Assinatura Pro renovada automaticamente',
          timestamp: '2024-01-15T10:30:00Z'
        }
      ]
    };
    
    setUser(mockUser);
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Carregando detalhes do usuário...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Usuário não encontrado</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">O usuário solicitado não existe ou foi removido.</p>
        <button
          onClick={() => navigate('/users')}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Voltar para Usuários
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/users')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Detalhes do Usuário</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Informações completas e histórico de atividades
          </p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{user.name}</h2>
              <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.plan === 'pro' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {user.plan === 'pro' ? 'Plano Pro' : 'Plano Gratuito'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                  {user.status === 'active' ? 'Ativo' : user.status === 'inactive' ? 'Inativo' : 'Suspenso'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Suspender
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <Calendar className="w-6 h-6 text-slate-500 dark:text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Membro desde</p>
            <p className="font-bold text-slate-800 dark:text-white">{formatDate(user.createdAt)}</p>
          </div>
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <Activity className="w-6 h-6 text-slate-500 dark:text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Último login</p>
            <p className="font-bold text-slate-800 dark:text-white">
              {user.lastLogin ? formatDate(user.lastLogin) : 'Nunca'}
            </p>
          </div>
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <BarChart3 className="w-6 h-6 text-slate-500 dark:text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Total de posts</p>
            <p className="font-bold text-slate-800 dark:text-white">{user.totalPosts}</p>
          </div>
        </div>
      </div>

      {/* Stats and Subscription */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Stats */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <span className="text-slate-600 dark:text-slate-400">Total de Visualizações</span>
              <span className="font-bold text-slate-800 dark:text-white">
                {user.totalViews.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <span className="text-slate-600 dark:text-slate-400">Taxa de Engajamento</span>
              <span className="font-bold text-slate-800 dark:text-white">{user.totalEngagement}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <span className="text-slate-600 dark:text-slate-400">Posts Publicados</span>
              <span className="font-bold text-slate-800 dark:text-white">{user.totalPosts}</span>
            </div>
          </div>
        </div>

        {/* Subscription Info */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Assinatura</h3>
          {user.subscription ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <span className="text-slate-600 dark:text-slate-400">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.subscription.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {user.subscription.status === 'active' ? 'Ativa' : 'Cancelada'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <span className="text-slate-600 dark:text-slate-400">Próxima Cobrança</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {formatDate(user.subscription.currentPeriodEnd)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <span className="text-slate-600 dark:text-slate-400">Cancelamento Agendado</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {user.subscription.cancelAtPeriodEnd ? 'Sim' : 'Não'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 dark:text-slate-400">Usuário do plano gratuito</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Atividade Recente</h3>
        <div className="space-y-3">
          {user.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
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
      </div>
    </div>
  );
};

export default UserDetails;