// src/lib/strapi.ts

interface Props {
   endpoint: string;
   query?: Record<string, string>;
   wrappedByKey?: string;
   wrappedByList?: boolean;
 }
 
 /**
  * Obtiene datos de la API de Strapi.
  * @param endpoint - El endpoint para realizar la consulta (sin la barra inicial)
  * @param query - Los parámetros de consulta para agregar a la URL
  * @param wrappedByKey - La clave para desempaquetar la respuesta (ej. 'data')
  * @param wrappedByList - Si la respuesta es una lista y quieres desempaquetar el primer elemento
  * @returns Los datos obtenidos de la API de Strapi tipados como T
  * @throws Error si la solicitud falla
  */
 export default async function fetchApi<T>({
   endpoint,
   query,
   wrappedByKey,
   wrappedByList,
 }: Props): Promise<T> {
   // Eliminar la barra inicial si existe
   if (endpoint.startsWith('/')) {
     endpoint = endpoint.slice(1);
   }
 
   // Construir la URL completa
   const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);
 
   // Agregar los parámetros de consulta si existen
   if (query) {
     Object.entries(query).forEach(([key, value]) => {
       url.searchParams.append(key, value);
     });
   }
 
   try {
     // Realizar la solicitud con los encabezados de autenticación
     const res = await fetch(url.toString(), {
       headers: {
         Authorization: `Bearer ${import.meta.env.STRAPI_API_TOKEN}`,
         'Content-Type': 'application/json',
       },
     });
 
     // Manejo de errores HTTP
     if (!res.ok) {
       const errorData = await res.json();
       throw new Error(errorData.message || 'Error en la solicitud a Strapi');
     }
 
     // Parsear la respuesta JSON
     let data = await res.json();
 
     // Desempaquetar por la clave proporcionada si existe
     if (wrappedByKey) {
       data = data[wrappedByKey];
     }
 
     // Si la respuesta es una lista y se especifica, desempaquetar el primer elemento
     if (wrappedByList && Array.isArray(data)) {
       data = data; // Aquí puedes ajustar según tus necesidades
     }
 
     return data as T;
   } catch (error: any) {
     console.error(`Error en fetchApi para el endpoint "${endpoint}":`, error);
     throw error;
   }
 }
 