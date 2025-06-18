import { useEffect, useState } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

interface OnboardingState {
  isActive: boolean;
  hasCompleted: boolean;
  currentStep: number;
}

export const useOnboarding = () => {
  const [state, setState] = useState<OnboardingState>({
    isActive: false,
    hasCompleted: false,
    currentStep: 0
  });

  const createTour = () => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'videra-tour-step',
        scrollTo: { behavior: 'smooth', block: 'center' },
        cancelIcon: {
          enabled: true
        },
        modalOverlayOpeningPadding: 10,
        modalOverlayOpeningRadius: 8
      }
    });

    // Passo 1: Boas-vindas
    tour.addStep({
      title: '🎉 Bem-vindo(a) ao Videra!',
      text: `
        <div class="space-y-4">
          <p class="text-slate-600">Vamos fazer um tour rápido para você conhecer os recursos principais da nossa plataforma de analytics para criadores de conteúdo.</p>
          <div class="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 p-3 rounded-lg">
            <span>💡</span>
            <span>Este tour leva apenas 2 minutos e vai te ajudar a aproveitar ao máximo o Videra!</span>
          </div>
        </div>
      `,
      buttons: [
        {
          text: 'Pular Tour',
          classes: 'btn btn-secondary',
          action: () => {
            tour.complete();
            completeOnboarding();
          }
        },
        {
          text: 'Começar Tour',
          classes: 'btn btn-primary',
          action: () => tour.next()
        }
      ],
      id: 'welcome'
    });

    // Passo 2: Conectar Contas
    tour.addStep({
      title: '🔗 Conecte suas Redes Sociais',
      text: `
        <div class="space-y-3">
          <p class="text-slate-600">Tudo começa aqui! Conecte suas contas do TikTok, Instagram e YouTube para que possamos analisar seus dados e gerar insights valiosos.</p>
          <div class="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
            <strong>Dica:</strong> Seus dados são 100% seguros e nunca compartilhados com terceiros.
          </div>
        </div>
      `,
      attachTo: {
        element: '[data-tour="connect-accounts"]',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Anterior',
          classes: 'btn btn-secondary',
          action: () => tour.back()
        },
        {
          text: 'Próximo',
          classes: 'btn btn-primary',
          action: () => tour.next()
        }
      ],
      id: 'connect-accounts'
    });

    // Passo 3: Painel Principal
    tour.addStep({
      title: '📊 Seu Painel de Controle',
      text: `
        <div class="space-y-3">
          <p class="text-slate-600">Neste painel, você terá uma visão geral completa do seu desempenho em todas as plataformas. Clique em qualquer card para ver análises detalhadas!</p>
          <ul class="text-sm text-slate-600 space-y-1">
            <li>• <strong>Visualizações:</strong> Total de views em todos os seus vídeos</li>
            <li>• <strong>Engajamento:</strong> Taxa de interação da sua audiência</li>
            <li>• <strong>Crescimento:</strong> Evolução dos seus seguidores</li>
          </ul>
        </div>
      `,
      attachTo: {
        element: '[data-tour="dashboard-stats"]',
        on: 'top'
      },
      buttons: [
        {
          text: 'Anterior',
          classes: 'btn btn-secondary',
          action: () => tour.back()
        },
        {
          text: 'Próximo',
          classes: 'btn btn-primary',
          action: () => tour.next()
        }
      ],
      id: 'dashboard-stats'
    });

    // Passo 4: Gerador de Ideias
    tour.addStep({
      title: '💡 Gerador de Ideias com IA',
      text: `
        <div class="space-y-3">
          <p class="text-slate-600">Está sem criatividade? Use nossa IA para gerar ideias de conteúdo incríveis baseadas nas tendências do seu nicho!</p>
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg text-sm">
            <strong class="text-purple-700">🚀 Recurso Premium:</strong>
            <p class="text-slate-600 mt-1">Nossa IA analisa milhões de posts para sugerir conteúdos com alto potencial viral.</p>
          </div>
        </div>
      `,
      attachTo: {
        element: '[data-tour="idea-generator"]',
        on: 'right'
      },
      buttons: [
        {
          text: 'Anterior',
          classes: 'btn btn-secondary',
          action: () => tour.back()
        },
        {
          text: 'Próximo',
          classes: 'btn btn-primary',
          action: () => tour.next()
        }
      ],
      id: 'idea-generator'
    });

    // Passo 5: Fim do Tour
    tour.addStep({
      title: '🎯 Pronto para Decolar!',
      text: `
        <div class="space-y-4">
          <p class="text-slate-600">Parabéns! Agora você conhece os principais recursos do Videra. Explore à vontade e comece a otimizar seu conteúdo!</p>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="bg-green-50 p-3 rounded-lg">
              <div class="font-semibold text-green-700">📈 Analytics</div>
              <div class="text-green-600">Monitore seu crescimento</div>
            </div>
            <div class="bg-blue-50 p-3 rounded-lg">
              <div class="font-semibold text-blue-700">🎯 Tendências</div>
              <div class="text-blue-600">Fique por dentro do que está em alta</div>
            </div>
          </div>
          <div class="text-center text-sm text-slate-500">
            Se tiver dúvidas, procure nossa <strong>Central de Ajuda</strong> no menu!
          </div>
        </div>
      `,
      buttons: [
        {
          text: 'Finalizar Tour',
          classes: 'btn btn-primary btn-large',
          action: () => {
            tour.complete();
            completeOnboarding();
          }
        }
      ],
      id: 'tour-complete'
    });

    // Event listeners
    tour.on('complete', () => {
      setState(prev => ({ ...prev, isActive: false, hasCompleted: true }));
      completeOnboarding();
    });

    tour.on('cancel', () => {
      setState(prev => ({ ...prev, isActive: false }));
      completeOnboarding();
    });

    tour.on('show', (event) => {
      setState(prev => ({ ...prev, currentStep: event.step?.id ? tour.steps.findIndex(step => step.id === event.step?.id) : 0 }));
    });

    return tour;
  };

  const startOnboarding = () => {
    const hasCompletedOnboarding = localStorage.getItem('videra_onboarding_completed');
    
    if (!hasCompletedOnboarding) {
      setState(prev => ({ ...prev, isActive: true }));
      
      // Aguardar um pouco para garantir que os elementos estejam renderizados
      setTimeout(() => {
        const tour = createTour();
        tour.start();
      }, 1000);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('videra_onboarding_completed', 'true');
    setState(prev => ({ ...prev, hasCompleted: true, isActive: false }));
  };

  const resetOnboarding = () => {
    localStorage.removeItem('videra_onboarding_completed');
    setState({ isActive: false, hasCompleted: false, currentStep: 0 });
  };

  const forceStartOnboarding = () => {
    setState(prev => ({ ...prev, isActive: true }));
    const tour = createTour();
    tour.start();
  };

  useEffect(() => {
    // Verificar se deve iniciar o onboarding automaticamente
    const hasCompletedOnboarding = localStorage.getItem('videra_onboarding_completed');
    
    if (!hasCompletedOnboarding) {
      // Aguardar um pouco para garantir que a página carregou completamente
      const timer = setTimeout(() => {
        startOnboarding();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setState(prev => ({ ...prev, hasCompleted: true }));
    }
  }, []);

  return {
    ...state,
    startOnboarding: forceStartOnboarding,
    completeOnboarding,
    resetOnboarding
  };
};