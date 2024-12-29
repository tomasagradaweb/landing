declare module '@vercel/analytics/astro' {
  const Analytics: () => any;
  export default Analytics;
}
  
declare module '@strapi/blocks-react-renderer' {
  import { FunctionComponent } from 'react';
  export const BlocksRenderer: FunctionComponent<any>;
}