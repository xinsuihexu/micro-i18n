import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        carbon: async () =>
          await import('@iconify-json/carbon').then(i => i.icons as any),
      },
    }),
  ],
})
