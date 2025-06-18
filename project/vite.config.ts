import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true,
    port: 5173,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        admin: './admin.html'
      },
      output: {
        // Configuração otimizada para CDN
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          
          // Organizar assets por tipo para melhor cache
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext || '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        // Code splitting otimizado
        manualChunks: {
          // Vendor chunks para melhor cache
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'icons-vendor': ['lucide-react'],
          'ui-vendor': ['shepherd.js'],
          
          // Chunks por funcionalidade
          'auth': [
            './src/components/auth/SignupForm.tsx',
            './src/utils/emailValidation.ts',
            './src/utils/ipValidation.ts'
          ],
          'dashboard': [
            './src/components/Dashboard.tsx',
            './src/components/dashboard/StatsCards.tsx',
            './src/components/dashboard/PerformanceChart.tsx',
            './src/components/dashboard/RecentVideos.tsx',
            './src/components/dashboard/TopHashtags.tsx',
            './src/components/dashboard/PlatformBreakdown.tsx'
          ],
          'analytics': [
            './src/components/Analytics.tsx'
          ],
          'content': [
            './src/components/ContentPlanner.tsx',
            './src/components/ContentHistory.tsx',
            './src/components/IdeaGenerator.tsx'
          ],
          'settings': [
            './src/components/Settings.tsx'
          ],
          'help': [
            './src/components/help/HelpCenter.tsx'
          ],
          // Admin chunks separados
          'admin-core': [
            './src/admin/AdminApp.tsx',
            './src/admin/contexts/AdminAuthContext.tsx'
          ],
          'admin-components': [
            './src/admin/components/AdminDashboard.tsx',
            './src/admin/components/UserManagement.tsx',
            './src/admin/components/AdminLogin.tsx'
          ]
        }
      }
    },
    
    // Otimizações de build
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      }
    },
    
    // Configurações para assets
    assetsInlineLimit: 4096, // 4kb - inline smaller assets
    cssCodeSplit: true,
    sourcemap: false, // Desabilitar sourcemaps em produção para performance
    
    // Configurações de chunk size
    chunkSizeWarningLimit: 1000,
  },
  
  // Configurações para desenvolvimento
  esbuild: {
    target: 'es2020',
    // Remover console.log em produção
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  
  // Configurações de CSS
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      // Configurações para preprocessadores se necessário
    }
  },
  
  // Configurações de preview (para testar build localmente)
  preview: {
    port: 4173,
    host: true,
    cors: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000', // 1 ano para assets com hash
    }
  },
  
  // Configurações de base para CDN
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  
  // Configurações experimentais para performance
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      // Preparação para CDN - permite customizar URLs dos assets
      if (hostType === 'js') {
        // Para arquivos JS, manter caminho relativo por enquanto
        return { relative: true };
      }
      return { relative: true };
    }
  }
});