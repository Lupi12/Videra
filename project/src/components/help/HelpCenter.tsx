import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Mail,
  ExternalLink,
  Star,
  Shield,
  Zap,
  BarChart3,
  Lightbulb,
  Settings
} from 'lucide-react';

const HelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('getting-started');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Primeiros Passos',
      icon: Star,
      color: 'from-green-500 to-emerald-500',
      faqs: [
        {
          id: 'connect-accounts',
          question: 'Como conecto minhas redes sociais?',
          answer: `
            <div class="space-y-3">
              <p>Para conectar suas redes sociais ao Videra:</p>
              <ol class="list-decimal list-inside space-y-2 text-sm">
                <li>Vá até a seção <strong>'Configurações'</strong> no menu lateral</li>
                <li>Clique em <strong>'Contas Conectadas'</strong></li>
                <li>Escolha a plataforma que deseja conectar (TikTok, Instagram, YouTube)</li>
                <li>Clique em <strong>'Conectar'</strong> e autorize o Videra a acessar seus dados</li>
                <li>Aguarde a sincronização dos dados (pode levar alguns minutos)</li>
              </ol>
              <div class="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                <strong>💡 Dica:</strong> Recomendamos conectar todas as suas plataformas para ter uma visão completa do seu desempenho.
              </div>
            </div>
          `
        },
        {
          id: 'first-analysis',
          question: 'Quanto tempo leva para ver meus primeiros dados?',
          answer: `
            <div class="space-y-3">
              <p>Após conectar suas contas, o tempo de sincronização varia:</p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li><strong>Instagram:</strong> 5-10 minutos</li>
                <li><strong>TikTok:</strong> 10-15 minutos</li>
                <li><strong>YouTube:</strong> 15-30 minutos</li>
              </ul>
              <p class="text-sm text-slate-600">Os dados históricos (últimos 90 dias) são importados automaticamente. Para dados mais antigos, entre em contato com nosso suporte.</p>
            </div>
          `
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics e Métricas',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      faqs: [
        {
          id: 'engagement-rate',
          question: 'O que significa "Taxa de Engajamento"?',
          answer: `
            <div class="space-y-3">
              <p>A Taxa de Engajamento é uma métrica fundamental que mede a interação do público com seu conteúdo.</p>
              <div class="bg-slate-50 p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Como calculamos:</h4>
                <p class="text-sm font-mono bg-white p-2 rounded border">
                  (Curtidas + Comentários + Compartilhamentos) ÷ Visualizações × 100
                </p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div class="bg-green-50 p-3 rounded-lg">
                  <div class="font-semibold text-green-700">Excelente</div>
                  <div class="text-green-600">Acima de 10%</div>
                </div>
                <div class="bg-yellow-50 p-3 rounded-lg">
                  <div class="font-semibold text-yellow-700">Bom</div>
                  <div class="text-yellow-600">5% - 10%</div>
                </div>
                <div class="bg-red-50 p-3 rounded-lg">
                  <div class="font-semibold text-red-700">Precisa Melhorar</div>
                  <div class="text-red-600">Abaixo de 5%</div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 'viral-score',
          question: 'Como funciona o Score Viral?',
          answer: `
            <div class="space-y-3">
              <p>O Score Viral é uma métrica exclusiva do Videra que prevê o potencial de viralização do seu conteúdo.</p>
              <div class="space-y-2 text-sm">
                <p><strong>Fatores considerados:</strong></p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Velocidade de crescimento das visualizações</li>
                  <li>Taxa de engajamento nas primeiras horas</li>
                  <li>Compartilhamentos e saves</li>
                  <li>Tempo médio de visualização</li>
                  <li>Comentários e interações</li>
                </ul>
              </div>
              <div class="bg-purple-50 p-3 rounded-lg text-sm text-purple-700">
                <strong>🚀 Dica Pro:</strong> Conteúdos com Score Viral acima de 80 têm 5x mais chances de viralizar!
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: 'ai-features',
      title: 'Recursos de IA',
      icon: Lightbulb,
      color: 'from-purple-500 to-pink-500',
      faqs: [
        {
          id: 'idea-generator',
          question: 'Como funciona o "Gerador de Ideias"?',
          answer: `
            <div class="space-y-3">
              <p>Nossa IA analisa milhões de dados para sugerir conteúdos com alto potencial de viralização.</p>
              <div class="space-y-2 text-sm">
                <p><strong>O que a IA analisa:</strong></p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Tendências atuais do seu nicho</li>
                  <li>Seu histórico de conteúdo de melhor desempenho</li>
                  <li>Hashtags em alta</li>
                  <li>Horários ideais para publicação</li>
                  <li>Formatos de conteúdo que mais engajam</li>
                </ul>
              </div>
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg text-sm">
                <strong class="text-purple-700">💡 Como usar:</strong>
                <p class="text-slate-600 mt-1">Vá em "Gerador de Ideias", escolha sua categoria e clique em "Gerar Ideias". A IA criará sugestões personalizadas para você!</p>
              </div>
            </div>
          `
        },
        {
          id: 'ai-insights',
          question: 'O que são os "Insights da IA"?',
          answer: `
            <div class="space-y-3">
              <p>Os Insights da IA são análises automáticas que identificam padrões no seu conteúdo e sugerem melhorias.</p>
              <div class="space-y-2 text-sm">
                <p><strong>Tipos de insights:</strong></p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Performance:</strong> "Seus vídeos de fitness geram 40% mais engajamento"</li>
                  <li><strong>Timing:</strong> "Publique às 19h para 25% mais visualizações"</li>
                  <li><strong>Conteúdo:</strong> "Vídeos com duração de 30-45s performam melhor"</li>
                  <li><strong>Audiência:</strong> "Sua audiência prefere conteúdo educativo"</li>
                </ul>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: 'security',
      title: 'Segurança e Privacidade',
      icon: Shield,
      color: 'from-green-500 to-teal-500',
      faqs: [
        {
          id: 'data-security',
          question: 'Meus dados estão seguros?',
          answer: `
            <div class="space-y-3">
              <p><strong>Sim, seus dados estão 100% seguros!</strong> Levamos a segurança muito a sério.</p>
              <div class="space-y-2 text-sm">
                <p><strong>Nossas medidas de segurança:</strong></p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Criptografia SSL/TLS em todas as comunicações</li>
                  <li>Dados armazenados em servidores seguros na AWS</li>
                  <li>Acesso apenas via APIs oficiais das plataformas</li>
                  <li>Nunca armazenamos senhas das suas redes sociais</li>
                  <li>Conformidade com LGPD e GDPR</li>
                </ul>
              </div>
              <div class="bg-green-50 p-3 rounded-lg text-sm text-green-700">
                <strong>🔒 Garantia:</strong> Nunca compartilharemos seus dados com terceiros sem sua permissão explícita.
              </div>
            </div>
          `
        },
        {
          id: 'data-usage',
          question: 'Como vocês usam meus dados?',
          answer: `
            <div class="space-y-3">
              <p>Usamos seus dados exclusivamente para fornecer insights e melhorar sua experiência.</p>
              <div class="space-y-2 text-sm">
                <p><strong>Para que usamos:</strong></p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Gerar analytics e relatórios personalizados</li>
                  <li>Criar sugestões de conteúdo via IA</li>
                  <li>Identificar tendências do seu nicho</li>
                  <li>Melhorar nossos algoritmos de recomendação</li>
                </ul>
                <p><strong>NÃO usamos para:</strong></p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Vender para terceiros</li>
                  <li>Publicidade externa</li>
                  <li>Qualquer uso não autorizado</li>
                </ul>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: 'plans',
      title: 'Planos e Pagamento',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      faqs: [
        {
          id: 'plan-differences',
          question: 'Qual a diferença entre os planos?',
          answer: `
            <div class="space-y-3">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div class="border rounded-lg p-3">
                  <h4 class="font-semibold text-slate-700 mb-2">Gratuito</h4>
                  <ul class="space-y-1 text-xs">
                    <li>• Até 5 vídeos/mês</li>
                    <li>• Analytics básicos</li>
                    <li>• 1 plataforma</li>
                    <li>• Suporte por email</li>
                  </ul>
                </div>
                <div class="border-2 border-purple-200 rounded-lg p-3 bg-purple-50">
                  <h4 class="font-semibold text-purple-700 mb-2">Profissional</h4>
                  <ul class="space-y-1 text-xs">
                    <li>• Vídeos ilimitados</li>
                    <li>• IA Gerador de Ideias</li>
                    <li>• 3 plataformas</li>
                    <li>• Analytics avançados</li>
                    <li>• Suporte prioritário</li>
                  </ul>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="font-semibold text-amber-700 mb-2">Empresarial</h4>
                  <ul class="space-y-1 text-xs">
                    <li>• Tudo do Pro</li>
                    <li>• Múltiplas contas</li>
                    <li>• API personalizada</li>
                    <li>• Gerente dedicado</li>
                    <li>• White-label</li>
                  </ul>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 'upgrade-plan',
          question: 'Como faço upgrade do meu plano?',
          answer: `
            <div class="space-y-3">
              <p>Fazer upgrade é simples e rápido:</p>
              <ol class="list-decimal list-inside space-y-2 text-sm">
                <li>Vá em <strong>"Planos"</strong> no menu lateral</li>
                <li>Escolha o plano desejado</li>
                <li>Clique em <strong>"Assinar Agora"</strong></li>
                <li>Preencha os dados de pagamento</li>
                <li>Confirme a assinatura</li>
              </ol>
              <div class="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                <strong>💳 Formas de pagamento:</strong> Cartão de crédito, PIX, boleto bancário
              </div>
              <div class="bg-green-50 p-3 rounded-lg text-sm text-green-700">
                <strong>✅ Garantia:</strong> 7 dias de teste grátis em qualquer plano pago!
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Solução de Problemas',
      icon: Settings,
      color: 'from-slate-500 to-slate-600',
      faqs: [
        {
          id: 'sync-issues',
          question: 'Meus dados não estão sincronizando. O que fazer?',
          answer: `
            <div class="space-y-3">
              <p>Se seus dados não estão atualizando, tente estas soluções:</p>
              <ol class="list-decimal list-inside space-y-2 text-sm">
                <li><strong>Reconecte a conta:</strong> Vá em Configurações > Contas Conectadas > Reconectar</li>
                <li><strong>Verifique permissões:</strong> Certifique-se de que autorizou todas as permissões</li>
                <li><strong>Aguarde:</strong> Sincronizações podem levar até 30 minutos</li>
                <li><strong>Limpe o cache:</strong> Ctrl+F5 para recarregar a página</li>
                <li><strong>Contate o suporte:</strong> Se o problema persistir</li>
              </ol>
              <div class="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-700">
                <strong>⚠️ Atenção:</strong> Contas privadas podem ter limitações na sincronização de dados.
              </div>
            </div>
          `
        },
        {
          id: 'missing-videos',
          question: 'Por que alguns vídeos não aparecem?',
          answer: `
            <div class="space-y-3">
              <p>Alguns vídeos podem não aparecer por estes motivos:</p>
              <ul class="list-disc list-inside space-y-1 text-sm ml-4">
                <li><strong>Vídeos muito antigos:</strong> Importamos apenas os últimos 90 dias</li>
                <li><strong>Vídeos privados:</strong> Não conseguimos acessar conteúdo privado</li>
                <li><strong>Vídeos deletados:</strong> Conteúdo removido não aparece</li>
                <li><strong>Limitações da API:</strong> Algumas plataformas têm restrições</li>
              </ul>
              <div class="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                <strong>💡 Solução:</strong> Para importar dados mais antigos, entre em contato com nosso suporte.
              </div>
            </div>
          `
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Central de Ajuda
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Encontre respostas para suas dúvidas sobre o Videra
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por dúvidas, recursos, problemas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white text-lg shadow-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Guia de Início</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Aprenda o básico para começar a usar o Videra
            </p>
            <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm flex items-center gap-1">
              Ver Guia <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Chat ao Vivo</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Fale conosco em tempo real (Seg-Sex, 9h-18h)
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1">
              Iniciar Chat <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Suporte por Email</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Envie sua dúvida e responderemos em até 24h
            </p>
            <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm flex items-center gap-1">
              Enviar Email <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {filteredFAQs.map((category) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === category.id;
            
            return (
              <div
                key={category.id}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                        {category.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {category.faqs.length} pergunta{category.faqs.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-200/50 dark:border-slate-700/50">
                    {category.faqs.map((faq) => {
                      const isFAQExpanded = expandedFAQ === faq.id;
                      
                      return (
                        <div key={faq.id} className="border-b border-slate-200/30 dark:border-slate-700/30 last:border-b-0">
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full p-6 text-left hover:bg-slate-50/30 dark:hover:bg-slate-700/30 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-slate-800 dark:text-white pr-4">
                                {faq.question}
                              </h4>
                              {isFAQExpanded ? (
                                <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                          
                          {isFAQExpanded && (
                            <div className="px-6 pb-6">
                              <div 
                                className="prose prose-sm max-w-none text-slate-600 dark:text-slate-400"
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-700/50">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Não encontrou o que procurava?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Nossa equipe está sempre pronta para ajudar você a aproveitar ao máximo o Videra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                Falar com Suporte
              </button>
              <button className="px-6 py-3 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-white/70 dark:hover:bg-slate-700/50 transition-all font-medium">
                Sugerir Melhoria
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;