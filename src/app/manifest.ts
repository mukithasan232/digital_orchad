import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Digital Orchard - Fresh Mango Marketplace',
    short_name: 'DigitalOrchard',
    description: 'Buy premium, chemical-free fresh mangoes directly from the gardens of Rajshahi, Dinajpur, and Chapainawabganj in Bangladesh.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f59e0b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '192x192',
        type: 'image/ico',
      },
    ],
  };
}
