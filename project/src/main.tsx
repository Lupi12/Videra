import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { addResourceHints, registerServiceWorker } from './utils/performance';

// Verificar se não estamos no ambiente admin
const isAdminRoute = window.location.pathname.startsWith('/admin') || 
                    window.location.hostname.startsWith('admin.');

if (!isAdminRoute) {
  // Adicionar resource hints para performance
  addResourceHints();

  // Registrar Service Worker
  registerServiceWorker();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // Redirecionar para admin se necessário
  window.location.href = '/admin.html';
}