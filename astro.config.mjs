import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import unocss from '@unocss/astro'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetUno from '@unocss/preset-uno'

// https://astro.build/config
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    tailwind({
      theme: {},
    }),
    unocss({
      presets: [
        presetIcons(),
        presetUno(),
        presetWebFonts({
          provider: 'google',
          fonts: {
            sans: ['Quicksand', 'Ruda', 'Zen Dots', 'Red Hat Display'],
            mono: ['Fira Code', 'Fira Mono:400,700'],
          },
        }),
      ],
    }),
  ],
})
