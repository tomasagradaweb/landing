import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@assets': '/src/assets', // Asegúrate de que esta ruta sea la correcta
      },
    },
  },
});
