import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const baseConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }



  if (mode === 'package') {
    // Production build configuration
    return {
      ...baseConfig,
      build: {
        lib: {
          entry: 'src/widget.tsx',
          name: 'ChatWidget',
          fileName: 'chat-widget',
          formats: ['iife'] // Immediately Invoked Function Expression for script tag usage
        },
        rollupOptions: {
          external: [], // Don't externalize any dependencies
          output: {
            globals: {}
          }
        },
        cssCodeSplit: false, // Include CSS in the JS bundle
      },
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    }

  }
  return {
    ...baseConfig,
    base: '/boreal-chat/',
  }
})