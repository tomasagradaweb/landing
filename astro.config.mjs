import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static', // Asegúrate de que el sitio sea estático
  vite: {
    resolve: {
      alias: {
        '@assets': '/src/assets', // Asegúrate de que esta ruta sea válida
      },
    },
  },
});
