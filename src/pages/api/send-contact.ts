//pages/api/send-contact
import type { APIRoute } from 'astro';
import { sendEmail } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validar datos requeridos
    if (!data.businessName || !data.name || !data.email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Faltan campos requeridos'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Enviar email
    await sendEmail(data);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email enviado correctamente'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error en el endpoint:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};