# Sistema de Prevenção de Fraudes - Videra

## 🛡️ Fase 1: Barreiras Essenciais na Inscrição

### ✅ Implementações Concluídas

#### 1. **Google reCAPTCHA v3**
- **Localização**: `src/components/auth/SignupForm.tsx`
- **Funcionalidade**: Previne cadastros automatizados por bots
- **Configuração Necessária**:
  ```bash
  # Crie um arquivo .env na raiz do projeto
  VITE_RECAPTCHA_SITE_KEY=sua_chave_do_site_aqui
  RECAPTCHA_SECRET_KEY=sua_chave_secreta_aqui
  ```
- **Como obter as chaves**:
  1. Acesse: https://www.google.com/recaptcha/admin/create
  2. Escolha reCAPTCHA v3
  3. Adicione seu domínio
  4. Copie as chaves para o arquivo `.env`

#### 2. **Bloqueio de E-mails Descartáveis**
- **Localização**: `src/utils/emailValidation.ts`
- **Biblioteca**: `disposable-email-domains` (60k+ domínios conhecidos)
- **Funcionalidade**: 
  - Validação em tempo real durante a digitação
  - Bloqueia domínios como tempmail.org, guerrillamail.com, etc.
  - Mensagem de erro: "Por favor, use um endereço de e-mail permanente."

#### 3. **Limitação por Endereço IP**
- **Localização**: `src/utils/ipValidation.ts`
- **Funcionalidade**:
  - Detecta automaticamente o IP público do usuário
  - Limita a 2 contas gratuitas por IP
  - Usa múltiplos serviços de IP como fallback
  - Mensagem de erro: "Limite de contas gratuitas por rede atingido."

### 🔧 **Configuração do Backend (Necessária)**

Para que o sistema funcione completamente, você precisará implementar no backend:

#### 1. **Verificação do reCAPTCHA**
```javascript
// Exemplo de verificação no backend (Node.js)
const verifyRecaptcha = async (token) => {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  });
  
  const data = await response.json();
  return data.success && data.score > 0.5; // Score mínimo para v3
};
```

#### 2. **Tabela de Usuários (SQL)**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_ip INET NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  plan_type VARCHAR(50) DEFAULT 'free',
  tokens_used INTEGER DEFAULT 0,
  token_reset_date DATE DEFAULT CURRENT_DATE
);

-- Índice para consultas rápidas por IP
CREATE INDEX idx_users_ip ON users(user_ip);
```

#### 3. **Verificação de Limite por IP**
```javascript
const checkIPLimit = async (ip) => {
  const count = await db.query(
    'SELECT COUNT(*) FROM users WHERE user_ip = $1 AND plan_type = $2',
    [ip, 'free']
  );
  
  return count.rows[0].count < 2; // Máximo 2 contas gratuitas por IP
};
```

### 📦 **Dependências Instaladas**

```json
{
  "react-google-recaptcha": "^3.1.0",
  "disposable-email-domains": "^1.0.62",
  "axios": "^1.6.0",
  "@types/react-google-recaptcha": "^2.1.9"
}
```

### 🚀 **Próximos Passos**

1. **Configure as chaves do reCAPTCHA** no arquivo `.env`
2. **Implemente a verificação no backend** usando os exemplos acima
3. **Teste o sistema** criando múltiplas contas
4. **Prossiga para a Fase 2** quando estiver pronto

### 🔍 **Como Testar**

1. Tente criar uma conta sem completar o reCAPTCHA
2. Use um email de domínio descartável (ex: test@tempmail.org)
3. Crie 2 contas do mesmo IP e tente criar uma terceira
4. Verifique se todas as validações estão funcionando

---

## 📋 **Checklist de Implementação**

- [x] ✅ reCAPTCHA v3 implementado
- [x] ✅ Validação de emails descartáveis
- [x] ✅ Limitação por IP (frontend)
- [ ] ⏳ Configuração das chaves reCAPTCHA
- [ ] ⏳ Implementação backend da verificação IP
- [ ] ⏳ Testes de segurança

**Status**: Fase 1 implementada no frontend. Aguardando configuração das chaves e implementação backend.