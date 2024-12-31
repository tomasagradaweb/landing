// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server', // Cambiado de 'static' a 'server'
  adapter: vercel(),
  vite: {
    define: {
      'import.meta.env.STRAPI_URL': JSON.stringify(process.env.STRAPI_URL),
      'import.meta.env.STRAPI_API_TOKEN': JSON.stringify(process.env.STRAPI_API_TOKEN)
    },
    ssr: {
      external: ['nodemailer'],
    },
    resolve: {
      alias: {
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@data': '/src/data',
        '@styles': '/src/styles',
        '@assets': '/src/assets',
        '@interfaces': '/src/interfaces',
        '@lib': '/src/'
      },
    },
  },
});
