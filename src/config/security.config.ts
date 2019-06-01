export const securityConfig = {
  rateLimit: {
    windowMs: 60 * 1000,
    max: 5000,
  },
  payloadLimit: {
    limit: '5mb',
  },
  csrf: {
    cookie: {
      key: 'XSRF-SECRET',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: '86400',
      httpOnly: true,
      path: '/nestjs-scrapper',
    },
  },
};
