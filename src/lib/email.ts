import nodemailer from 'nodemailer';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  recipients: string[];
}

// Configuración del email usando variables de entorno
export const emailConfig: EmailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: parseInt(process.env.EMAIL_PORT || '587') === 465,
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  },
  recipients: (process.env.EMAIL_RECIPIENTS || '').split(',').filter(Boolean)
};

export const sendEmail = async (formData: any) => {
  console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
  console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
  console.log('EMAIL_USER está definido:', !!process.env.EMAIL_USER);
  console.log('EMAIL_PASS está definido:', !!process.env.EMAIL_PASS);

  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: emailConfig.auth
  });

  // Formatear los servicios seleccionados
  const services = Array.isArray(formData.services) 
    ? formData.services.join(', ') 
    : formData.services || 'Ninguno seleccionado';

  // Crear el contenido HTML del email
  const htmlContent = `
    <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Nuevo contacto desde el formulario web</h2>
    
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="color: #000; font-size: 18px; margin-bottom: 15px;">Información del Negocio</h3>
      <p><strong>Nombre del negocio:</strong> ${formData.businessName}</p>
      <p><strong>Sitio web:</strong> ${formData.website || 'No proporcionado'}</p>
    </div>
    
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="color: #000; font-size: 18px; margin-bottom: 15px;">Servicios de interés</h3>
      <p>${services}</p>
    </div>
    
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="color: #000; font-size: 18px; margin-bottom: 15px;">Descripción del proyecto</h3>
      <p>${formData.description || 'No proporcionada'}</p>
    </div>
    
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
      <h3 style="color: #000; font-size: 18px; margin-bottom: 15px;">Información de contacto</h3>
      <p><strong>Nombre:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Teléfono:</strong> ${formData.phone || 'No proporcionado'}</p>
    </div>
  `;

  const mailOptions = {
    from: `"Highdatanet Contact" <${emailConfig.auth.user}>`,
    to: emailConfig.recipients.join(', '),
    subject: `📬 Nuevo contacto: ${formData.businessName}`,
    html: htmlContent,
    replyTo: formData.email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
};