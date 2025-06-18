import axios from 'axios';

interface IPCheckResponse {
  allowed: boolean;
  ip: string;
  accountCount?: number;
  message?: string;
}

/**
 * Obtém o IP do usuário e verifica se pode criar uma nova conta
 */
export const checkIPLimit = async (): Promise<IPCheckResponse> => {
  try {
    // 1. Obter IP do usuário
    const userIP = await getUserIP();
    
    // 2. Verificar quantas contas já existem para este IP
    // NOTA: Esta é uma simulação. No backend real, você faria:
    // const accountCount = await checkAccountsByIP(userIP);
    
    // Simulação de verificação no backend
    const accountCount = await simulateIPCheck(userIP);
    
    // 3. Aplicar regra de limite (máximo 2 contas por IP)
    const maxAccountsPerIP = 2;
    
    if (accountCount >= maxAccountsPerIP) {
      return {
        allowed: false,
        ip: userIP,
        accountCount,
        message: 'Limite de contas gratuitas por rede atingido.'
      };
    }
    
    return {
      allowed: true,
      ip: userIP,
      accountCount
    };
    
  } catch (error) {
    console.error('Erro na verificação de IP:', error);
    
    // Em caso de erro, permitir o cadastro para não bloquear usuários legítimos
    return {
      allowed: true,
      ip: 'unknown',
      message: 'Não foi possível verificar o limite de IP. Prosseguindo com o cadastro.'
    };
  }
};

/**
 * Obtém o IP público do usuário
 */
const getUserIP = async (): Promise<string> => {
  try {
    // Usar múltiplos serviços como fallback
    const ipServices = [
      'https://api.ipify.org?format=json',
      'https://ipapi.co/json/',
      'https://httpbin.org/ip'
    ];
    
    for (const service of ipServices) {
      try {
        const response = await axios.get(service, { timeout: 5000 });
        
        // Diferentes serviços retornam o IP em campos diferentes
        const ip = response.data.ip || response.data.origin || response.data.query;
        
        if (ip && isValidIP(ip)) {
          return ip;
        }
      } catch (serviceError) {
        console.warn(`Falha no serviço ${service}:`, serviceError);
        continue;
      }
    }
    
    throw new Error('Não foi possível obter o IP do usuário');
    
  } catch (error) {
    console.error('Erro ao obter IP:', error);
    return 'unknown';
  }
};

/**
 * Valida se uma string é um IP válido
 */
const isValidIP = (ip: string): boolean => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

/**
 * Simula a verificação de contas por IP no backend
 * NOTA: No backend real, isso seria uma consulta ao banco de dados
 */
const simulateIPCheck = async (ip: string): Promise<number> => {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simular alguns IPs com contas existentes para teste
  const mockIPDatabase: Record<string, number> = {
    '192.168.1.1': 2, // IP com limite atingido
    '10.0.0.1': 1,    // IP com 1 conta
    '172.16.0.1': 0   // IP sem contas
  };
  
  return mockIPDatabase[ip] || 0;
};

/**
 * Registra uma nova conta com o IP do usuário
 * NOTA: Esta função seria implementada no backend
 */
export const registerAccountWithIP = async (accountData: {
  name: string;
  email: string;
  password: string;
  userIP: string;
  captchaToken: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    // Simular registro no backend
    console.log('Registrando conta:', {
      ...accountData,
      password: '[REDACTED]' // Não logar senhas
    });
    
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular sucesso
    return {
      success: true,
      message: 'Conta criada com sucesso!'
    };
    
  } catch (error) {
    console.error('Erro no registro:', error);
    return {
      success: false,
      message: 'Erro interno. Tente novamente.'
    };
  }
};