// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server', // Cambiado de 'static' a 'server'
  adapter: vercel(),
  vite: {
    ssr: {
      external: ['nodemailer'],
    },
    resolve: {
      alias: {
        '@assets': '/src/assets',
      },
    },
  },
});
