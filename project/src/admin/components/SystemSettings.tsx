import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Mail, 
  Database,
  Key,
  Globe,
  Bell,
  Save,
  RefreshCw
} from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'Videra',
    siteUrl: 'https://videra.com',
    adminEmail: 'admin@videra.com',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    maxFreeUsers: 1000,
    maxProUsers: 10000,
    sessionTimeout: 24,
    backupFrequency: 'daily'
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSaving(false);
    alert('Configurações salvas com sucesso!');
  };

  const handleInputChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Configurações do Sistema</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gerencie as configurações globais do Videra
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Salvar Alterações
            </>
          )}
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Configurações Gerais</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Nome do Site
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              URL do Site
            </label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => handleInputChange('siteUrl', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email do Administrador
            </label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleInputChange('adminEmail', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Timeout de Sessão (horas)
            </label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Configurações de Segurança</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <div>
              <h4 className="font-medium text-slate-800 dark:text-white">Modo de Manutenção</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Desabilita o acesso público ao site</p>
            </div>
            <button
              onClick={() => handleInputChange('maintenanceMode', !settings.maintenanceMode)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                settings.maintenanceMode ? 'transform translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <div>
              <h4 className="font-medium text-slate-800 dark:text-white">Registro de Novos Usuários</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Permite que novos usuários se cadastrem</p>
            </div>
            <button
              onClick={() => handleInputChange('registrationEnabled', !settings.registrationEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.registrationEnabled ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                settings.registrationEnabled ? 'transform translate-x-6' : ''
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* User Limits */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <Key className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Limites de Usuários</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Máximo de Usuários Gratuitos
            </label>
            <input
              type="number"
              value={settings.maxFreeUsers}
              onChange={(e) => handleInputChange('maxFreeUsers', parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Máximo de Usuários Pro
            </label>
            <input
              type="number"
              value={settings.maxProUsers}
              onChange={(e) => handleInputChange('maxProUsers', parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Notificações</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <div>
              <h4 className="font-medium text-slate-800 dark:text-white">Notificações por Email</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Receber alertas importantes por email</p>
            </div>
            <button
              onClick={() => handleInputChange('emailNotifications', !settings.emailNotifications)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                settings.emailNotifications ? 'transform translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Frequência de Backup
            </label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800 dark:text-white"
            >
              <option value="hourly">A cada hora</option>
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
            </select>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Status do Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl">
            <Database className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="font-medium text-slate-800 dark:text-white">Banco de Dados</p>
            <p className="text-sm text-green-600 dark:text-green-400">Operacional</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl">
            <Mail className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="font-medium text-slate-800 dark:text-white">Serviço de Email</p>
            <p className="text-sm text-green-600 dark:text-green-400">Operacional</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="font-medium text-slate-800 dark:text-white">Segurança</p>
            <p className="text-sm text-green-600 dark:text-green-400">Protegido</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;