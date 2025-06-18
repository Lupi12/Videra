import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, Shield, CheckCircle } from 'lucide-react';
import { validateEmail, isDisposableEmail } from '../../utils/emailValidation';
import { checkIPLimit } from '../../utils/ipValidation';

interface SignupFormProps {
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [emailValidationStatus, setEmailValidationStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // IMPORTANTE: Você precisa adicionar essas chaves no seu arquivo .env
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_SITE_KEY';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro específico quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Validação em tempo real do email
    if (name === 'email' && value) {
      handleEmailValidation(value);
    }
  };

  const handleEmailValidation = async (email: string) => {
    if (!validateEmail(email)) {
      setEmailValidationStatus('invalid');
      setErrors(prev => ({ ...prev, email: 'Formato de email inválido' }));
      return;
    }

    setEmailValidationStatus('checking');
    
    try {
      const isDisposable = await isDisposableEmail(email);
      if (isDisposable) {
        setEmailValidationStatus('invalid');
        setErrors(prev => ({ 
          ...prev, 
          email: 'Por favor, use um endereço de e-mail permanente.' 
        }));
      } else {
        setEmailValidationStatus('valid');
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } catch (error) {
      console.error('Erro na validação do email:', error);
      setEmailValidationStatus('valid'); // Assumir válido em caso de erro na API
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (!captchaToken) {
      newErrors.captcha = 'Por favor, complete a verificação reCAPTCHA';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (emailValidationStatus === 'invalid') return;

    setIsLoading(true);

    try {
      // 1. Verificar limite de IP
      const ipCheck = await checkIPLimit();
      if (!ipCheck.allowed) {
        setErrors({ general: 'Limite de contas gratuitas por rede atingido.' });
        setIsLoading(false);
        return;
      }

      // 2. Verificar novamente se o email é descartável
      const isDisposable = await isDisposableEmail(formData.email);
      if (isDisposable) {
        setErrors({ email: 'Por favor, use um endereço de e-mail permanente.' });
        setIsLoading(false);
        return;
      }

      // 3. Enviar dados para o backend (simulado)
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        captchaToken,
        userIP: ipCheck.ip
      };

      console.log('Dados de cadastro:', signupData);
      
      // Simular chamada para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sucesso - mostrar mensagem e fechar modal
      alert('Conta criada com sucesso! Verifique seu email para ativar a conta.');
      onClose();

    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErrors({ general: 'Erro interno. Tente novamente em alguns minutos.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getEmailStatusIcon = () => {
    switch (emailValidationStatus) {
      case 'checking':
        return <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />;
      case 'valid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'invalid':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Criar Conta no Videra
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Comece a otimizar seu conteúdo hoje mesmo
          </p>
        </div>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errors.general}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`pl-10 pr-4 py-3 w-full bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white ${
                  errors.name ? 'border-red-300 dark:border-red-600' : 'border-slate-300 dark:border-slate-600'
                }`}
                placeholder="Seu nome completo"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`pl-10 pr-12 py-3 w-full bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white ${
                  errors.email ? 'border-red-300 dark:border-red-600' : 'border-slate-300 dark:border-slate-600'
                }`}
                placeholder="seu@email.com"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getEmailStatusIcon()}
              </div>
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            )}
            {emailValidationStatus === 'checking' && (
              <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">Verificando email...</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`pl-10 pr-12 py-3 w-full bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white ${
                  errors.password ? 'border-red-300 dark:border-red-600' : 'border-slate-300 dark:border-slate-600'
                }`}
                placeholder="Mínimo 8 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Confirmar Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`pl-10 pr-12 py-3 w-full bg-slate-50 dark:bg-slate-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white ${
                  errors.confirmPassword ? 'border-red-300 dark:border-red-600' : 'border-slate-300 dark:border-slate-600'
                }`}
                placeholder="Confirme sua senha"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          {/* reCAPTCHA */}
          <div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
              theme="light"
              className="flex justify-center"
            />
            {errors.captcha && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center">{errors.captcha}</p>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || emailValidationStatus === 'checking'}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Criando...
                </>
              ) : (
                'Criar Conta'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Já tem uma conta?{' '}
            <button className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
              Fazer Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;