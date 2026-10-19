export const API_CONFIG = {
  baseUrl: 'http://127.0.0.1:8000/',
  endpoints: {
    blog: '/api/v1/blog',
    blogFeatured: '/api/v1/blog/feautured',
    donate: '/api/v1/donate',
  },
} as const;

