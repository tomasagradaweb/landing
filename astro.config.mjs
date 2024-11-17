import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  vite: {
    ssr: {
      noExternal: ['nodemailer'], 
    },
    resolve: {
      alias: {
        '@assets': '/src/assets',
      },
    },
  },
});
