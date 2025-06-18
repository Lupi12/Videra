import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'support';
  lastLogin: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  adminUser: AdminUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Lista de administradores autorizados (em produção, isso viria do backend)
const AUTHORIZED_ADMINS = [
  'admin@videra.com',
  'suporte@videra.com',
  'dev@videra.com'
];

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Verificar se há uma sessão admin ativa
    const checkAdminSession = async () => {
      try {
        const token = localStorage.getItem('videra_admin_token');
        const userData = localStorage.getItem('videra_admin_user');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          
          // Verificar se o token ainda é válido (simulação)
          if (await validateAdminToken(token)) {
            setAdminUser(user);
            setIsAuthenticated(true);
          } else {
            // Token inválido, limpar dados
            localStorage.removeItem('videra_admin_token');
            localStorage.removeItem('videra_admin_user');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar sessão admin:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminSession();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      // Verificar se o email está na lista de administradores autorizados
      if (!AUTHORIZED_ADMINS.includes(email.toLowerCase())) {
        return {
          success: false,
          error: 'Acesso negado. Este email não possui permissões administrativas.'
        };
      }

      // Simular autenticação (em produção, seria uma chamada para o backend)
      const authResult = await simulateAdminAuth(email, password);
      
      if (authResult.success && authResult.user && authResult.token) {
        // Salvar dados da sessão
        localStorage.setItem('videra_admin_token', authResult.token);
        localStorage.setItem('videra_admin_user', JSON.stringify(authResult.user));
        
        setAdminUser(authResult.user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        return {
          success: false,
          error: authResult.error || 'Credenciais inválidas'
        };
      }
    } catch (error) {
      console.error('Erro no login admin:', error);
      return {
        success: false,
        error: 'Erro interno. Tente novamente.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('videra_admin_token');
    localStorage.removeItem('videra_admin_user');
    setAdminUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      adminUser,
      login,
      logout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth deve ser usado dentro de AdminAuthProvider');
  }
  return context;
};

// Funções auxiliares (simulação - em produção seriam chamadas reais para o backend)
const simulateAdminAuth = async (email: string, password: string): Promise<{
  success: boolean;
  user?: AdminUser;
  token?: string;
  error?: string;
}> => {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Verificar credenciais (simulação)
  if (password === 'admin123' || password === 'videra2024') {
    const user: AdminUser = {
      id: `admin_${Date.now()}`,
      email: email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      role: email.includes('super') ? 'super_admin' : email.includes('suporte') ? 'support' : 'admin',
      lastLogin: new Date().toISOString()
    };

    return {
      success: true,
      user,
      token: `admin_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  return {
    success: false,
    error: 'Email ou senha incorretos'
  };
};

const validateAdminToken = async (token: string): Promise<boolean> => {
  // Simular validação de token
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Em produção, isso seria uma chamada para o backend
  return token.startsWith('admin_token_') && token.length > 20;
};