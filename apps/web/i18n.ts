import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => ({
  locales: ['es', 'en'],
  defaultLocale: 'es'
}));
