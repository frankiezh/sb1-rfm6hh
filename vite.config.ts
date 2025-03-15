import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  console.log('Loaded env vars:', Object.keys(env));
  
  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        fastRefresh: true,
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    publicDir: 'public',
    server: {
      port: 5173,
      strictPort: true,
      fs: {
        strict: false,
        allow: ['..']
      }
    },
    define: {
      'import.meta.env': JSON.stringify({
        VITE_GOOGLE_MAPS_API_KEY: env.VITE_GOOGLE_MAPS_API_KEY,
        VITE_APP_URL: env.VITE_APP_URL,
        MODE: mode,
        DEV: mode === 'development',
        PROD: mode === 'production',
      })
    },
    json: {
      stringify: true,
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            slick: ['react-slick', 'slick-carousel'],
            framer: ['framer-motion'],
            ui: [
              '@radix-ui/react-dialog',
              'lucide-react',
              'class-variance-authority',
              'clsx',
              'tailwind-merge'
            ]
          }
        }
      }
    }
  };
});
