import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './AdminApp';
import '../index.css';

// Verificar se estamos no ambiente admin
const isAdminRoute = window.location.pathname.startsWith('/admin') || 
                    window.location.hostname.startsWith('admin.');

if (isAdminRoute) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AdminApp />
    </StrictMode>
  );
} else {
  // Redirecionar para o app principal se não for rota admin
  window.location.href = '/';
}