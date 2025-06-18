import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Sparkles, ArrowRight } from 'lucide-react';

const PricingPlans: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      description: 'Perfeito para começar',
      price: { monthly: 0, yearly: 0 },
      icon: Star,
      color: 'from-slate-500 to-slate-600',
      borderColor: 'border-slate-200',
      popular: false,
      features: [
        'Até 5 vídeos por mês',
        'Analytics básicos',
        'Hashtags sugeridas',
        'Suporte por email',
        '1 plataforma conectada',
        'Histórico de 30 dias'
      ],
      limitations: [
        'Sem gerador de ideias IA',
        'Sem agendamento automático',
        'Sem insights avançados'
      ]
    },
    {
      id: 'pro',
      name: 'Profissional',
      description: 'Para criadores sérios',
      price: { monthly: 29.90, yearly: 299 },
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-200',
      popular: true,
      features: [
        'Vídeos ilimitados',
        'Analytics avançados',
        'Gerador de ideias IA',
        'Agendamento automático',
        'Até 3 plataformas',
        'Histórico completo',
        'Tendências em tempo real',
        'Suporte prioritário',
        'Relatórios personalizados'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Empresarial',
      description: 'Para equipes e agências',
      price: { monthly: 49.90, yearly: 499 },
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      borderColor: 'border-amber-200',
      popular: false,
      features: [
        'Tudo do plano Pro',
        'Múltiplas contas',
        'Colaboração em equipe',
        'API personalizada',
        'Plataformas ilimitadas',
        'White-label disponível',
        'Gerente de conta dedicado',
        'Treinamento personalizado',
        'SLA garantido',
        'Integrações avançadas'
      ],
      limitations: []
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.price.monthly === 0) return 'Grátis';
    const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly / 12;
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.price.monthly === 0) return null;
    const monthlyTotal = plan.price.monthly * 12;
    const savings = monthlyTotal - plan.price.yearly;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Escolha Seu Plano
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Desbloqueie todo o potencial do seu conteúdo com nossos planos flexíveis
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
            Mensal
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-14 h-7 bg-slate-300 dark:bg-slate-600 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
              billingCycle === 'yearly' ? 'transform translate-x-7' : ''
            }`}>
              {billingCycle === 'yearly' && <Sparkles className="w-3 h-3 text-purple-500" />}
            </div>
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              Anual
            </span>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Economize 17%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const savings = getSavings(plan);
          
          return (
            <div
              key={plan.id}
              className={`relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl group ${
                plan.popular 
                  ? 'border-purple-300 dark:border-purple-500 ring-4 ring-purple-100 dark:ring-purple-900/50' 
                  : plan.borderColor + ' dark:border-slate-600'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Mais Popular
                  </div>
                </div>
              )}

              {/* Savings Badge */}
              {billingCycle === 'yearly' && savings && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    -{savings.percentage}%
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-slate-800 dark:text-white mb-1">
                    {getPrice(plan)}
                    {plan.price.monthly > 0 && (
                      <span className="text-lg font-normal text-slate-500 dark:text-slate-400">/mês</span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && savings && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Economize R$ {savings.amount.toFixed(2).replace('.', ',')} por ano
                    </div>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-center gap-3 opacity-60">
                    <div className="w-5 h-5 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-slate-500 dark:text-slate-400 text-xs">✕</span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 text-sm line-through">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : plan.id === 'free'
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
              }`}>
                {plan.id === 'free' ? 'Começar Grátis' : 'Assinar Agora'}
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {plan.id !== 'free' && (
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
                  Cancele a qualquer momento • Sem compromisso
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-8">
          Perguntas Frequentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Posso mudar de plano a qualquer momento?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor imediatamente.
            </p>
          </div>
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Existe período de teste gratuito?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              O plano gratuito permite testar nossas funcionalidades básicas. Para recursos avançados, oferecemos 7 dias grátis.
            </p>
          </div>
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Quais plataformas são suportadas?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Suportamos TikTok, Instagram, YouTube, Twitter e mais. O número de plataformas varia por plano.
            </p>
          </div>
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Como funciona o suporte?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Plano gratuito: email. Pro: chat prioritário. Empresarial: gerente dedicado e suporte 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="text-center mt-12">
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">SSL Seguro</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">LGPD Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">99.9% Uptime</span>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Mais de 10.000 criadores confiam no Videra para impulsionar seu conteúdo
        </p>
      </div>
    </div>
  );
};

export default PricingPlans;