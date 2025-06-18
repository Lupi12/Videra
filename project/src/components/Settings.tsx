import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Mail, 
  Calendar,
  Download,
  Key,
  Link,
  Trash2,
  Plus,
  Check,
  X,
  ExternalLink
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [emailReports, setEmailReports] = useState({
    enabled: false,
    frequency: 'weekly',
    day: 'monday',
    email: 'usuario@email.com'
  });

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'accounts', label: 'Contas Conectadas', icon: Link },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'reports', label: 'Relatórios Automáticos', icon: Mail },
    { id: 'api', label: 'Desenvolvedor', icon: Key },
    { id: 'billing', label: 'Cobrança', icon: CreditCard },
    { id: 'security', label: 'Segurança', icon: Shield },
  ];

  const connectedAccounts = [
    { 
      platform: 'TikTok', 
      username: '@criador_pro', 
      connected: true, 
      color: 'from-pink-500 to-rose-500',
      icon: '🎵',
      followers: '125K'
    },
    { 
      platform: 'Instagram', 
      username: '@criador.pro', 
      connected: true, 
      color: 'from-purple-500 to-pink-500',
      icon: '📸',
      followers: '89K'
    },
    { 
      platform: 'YouTube', 
      username: 'Criador Pro', 
      connected: false, 
      color: 'from-red-500 to-red-600',
      icon: '▶️',
      followers: '0'
    },
  ];

  const apiKeys = [
    {
      id: 1,
      name: 'Zapier Integration',
      key: 'vdr_sk_1234567890abcdef',
      created: '2024-01-15',
      lastUsed: '2024-01-20'
    },
    {
      id: 2,
      name: 'Custom Dashboard',
      key: 'vdr_sk_abcdef1234567890',
      created: '2024-01-10',
      lastUsed: 'Nunca'
    }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Informações Pessoais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nome</label>
            <input
              type="text"
              defaultValue="Creator Pro"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
            <input
              type="email"
              defaultValue="creator@email.com"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
            />
          </div>
        </div>
        <button className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all">
          Salvar Alterações
        </button>
      </div>
    </div>
  );

  const renderAccountsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Redes Sociais Conectadas</h3>
        <div className="space-y-4">
          {connectedAccounts.map((account, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-slate-200/50 dark:border-slate-700/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${account.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <span className="text-xl">{account.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">{account.platform}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {account.connected ? account.username : 'Não conectado'}
                  </p>
                  {account.connected && (
                    <p className="text-xs text-slate-500">{account.followers} seguidores</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {account.connected ? (
                  <>
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                      <Check className="w-4 h-4" />
                      Conectado
                    </span>
                    <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                      Desconectar
                    </button>
                  </>
                ) : (
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all">
                    Conectar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Relatórios Automáticos</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">Ativar envio automático</span>
            <button
              onClick={() => setEmailReports(prev => ({ ...prev, enabled: !prev.enabled }))}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                emailReports.enabled ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                emailReports.enabled ? 'transform translate-x-6' : ''
              }`} />
            </button>
          </div>
        </div>

        {emailReports.enabled && (
          <div className="space-y-4 p-4 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Frequência</label>
                <select
                  value={emailReports.frequency}
                  onChange={(e) => setEmailReports(prev => ({ ...prev, frequency: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
                >
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {emailReports.frequency === 'weekly' ? 'Dia da Semana' : 'Dia do Mês'}
                </label>
                <select
                  value={emailReports.day}
                  onChange={(e) => setEmailReports(prev => ({ ...prev, day: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
                >
                  {emailReports.frequency === 'weekly' ? (
                    <>
                      <option value="monday">Segunda-feira</option>
                      <option value="tuesday">Terça-feira</option>
                      <option value="wednesday">Quarta-feira</option>
                      <option value="thursday">Quinta-feira</option>
                      <option value="friday">Sexta-feira</option>
                      <option value="saturday">Sábado</option>
                      <option value="sunday">Domingo</option>
                    </>
                  ) : (
                    <>
                      <option value="1">Dia 1</option>
                      <option value="15">Dia 15</option>
                      <option value="last">Último dia</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email de Destino</label>
              <input
                type="email"
                value={emailReports.email}
                onChange={(e) => setEmailReports(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
                placeholder="email@exemplo.com"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all">
              Salvar Configurações
            </button>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
          <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Prévia do Relatório</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Veja como será o relatório que será enviado automaticamente:
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Download className="w-4 h-4" />
            Baixar Exemplo (PDF)
          </button>
        </div>
      </div>
    </div>
  );

  const renderAPITab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Chaves de API</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all">
            <Plus className="w-4 h-4" />
            Nova Chave
          </button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="p-4 border border-slate-200/50 dark:border-slate-700/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-slate-800 dark:text-white">{key.name}</h4>
                <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <code className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-mono text-slate-800 dark:text-white">
                  {key.key}
                </code>
                <button className="px-3 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">
                  Copiar
                </button>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>Criada: {key.created}</span>
                <span>Último uso: {key.lastUsed}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
          <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Documentação da API</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Acesse nossa documentação completa para integrar o Videra com suas ferramentas.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <ExternalLink className="w-4 h-4" />
            Ver Documentação
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'accounts':
        return renderAccountsTab();
      case 'reports':
        return renderReportsTab();
      case 'api':
        return renderAPITab();
      case 'notifications':
        return (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Notificações</h3>
            <p className="text-slate-600 dark:text-slate-400">Configurações de notificação em desenvolvimento...</p>
          </div>
        );
      case 'billing':
        return (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Cobrança</h3>
            <p className="text-slate-600 dark:text-slate-400">Informações de cobrança em desenvolvimento...</p>
          </div>
        );
      case 'security':
        return (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Segurança</h3>
            <p className="text-slate-600 dark:text-slate-400">Configurações de segurança em desenvolvimento...</p>
          </div>
        );
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Configurações</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gerencie sua conta e preferências do Videra</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de Navegação */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;