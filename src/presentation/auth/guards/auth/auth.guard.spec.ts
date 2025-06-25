beforeAll(() => {
  process.env.DB_USER = 'mock-value';
  process.env.DB_PASSWORD = 'mock-value';
  process.env.DB_NAME = 'mock-value';
  process.env.DB_HOST = 'mock-value';
  process.env.DB_PORT = 'mock-value';
  process.env.DB_URL = 'mock-value';
  process.env.JWT_SIGNING_KEY = 'mock-value';
  process.env.GOOGLE_API_KEY = 'mock-value';
});

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
