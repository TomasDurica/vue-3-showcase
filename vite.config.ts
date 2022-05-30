import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import transformerDirective from '@unocss/transformer-directives'
import postcssNesting from 'postcss-nesting'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      transformers: [
        transformerDirective()
      ]
    }),
    AutoImport({
      imports: [
        'vue'
      ],
      eslintrc: {
        enabled: true
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssNesting()
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
