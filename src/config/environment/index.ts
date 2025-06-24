import { existsSync } from 'fs';

import { Logger } from '@nestjs/common';
import { z } from 'zod';

const logger = new Logger('EnvironmentConfig');

const envPath = '.env';

if (existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const envSchema = z.object({
  API_PORT: z.coerce
    .number()
    .min(1, 'API_PORT must be a positive number')
    .default(3000),
  API_ALLOWED_ORIGINS: z.string().default('*'),
  API_ALLOWED_METHODS: z.string().default('GET,POST,PUT,DELETE'),
  DB_URL: z.string().min(1, 'DB_URL is required'),
  JWT_SIGNING_KEY: z.string().min(1, 'JWT_SIGNING_KEY is required'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error(
    'Environment variables validation failed:',
    parsed.error.message,
  );
  process.exit(1);
}

logger.log('Environment variables validated successfully');

export default parsed.data;
