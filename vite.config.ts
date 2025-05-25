import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [react()],
  }

  if (command === 'serve') {
    // Development configuration - use dev.tsx as entry point
    return {
      ...baseConfig,
    }
  } else {
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
})
