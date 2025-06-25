import { existsSync } from 'fs';

import { Logger } from '@nestjs/common';
import { z } from 'zod';

// Creating a logger instance
const logger = new Logger('EnvironmentConfig');

// Define the path to the .env file
const envPath = '.env';

if (existsSync(envPath)) {
  // Load environment variables from .env file if it exists
  process.loadEnvFile(envPath);
}

// Validate environment variables using zod
const envSchema = z.object({
  API_PORT: z.coerce
    .number()
    .min(1, 'API_PORT must be a positive number')
    .default(3000),
  API_ALLOWED_ORIGINS: z.string().default('*'),
  API_ALLOWED_METHODS: z.string().default('GET,POST,PUT,DELETE'),
  DB_URL: z.string().min(1, 'DB_URL is required'),
  JWT_SIGNING_KEY: z.string().min(1, 'JWT_SIGNING_KEY is required'),
  GOOGLE_API_KEY: z.string().min(1, 'GOOGLE_API_KEY is required'),
});

// Parse and validate the environment variables
const parsed = envSchema.safeParse(process.env);

let env: z.infer<typeof envSchema>;

if (parsed.success) {
  env = parsed.data;
} else if (!process.env.NODE_ENV?.includes('test')) {
  env = {
    API_PORT: 3000,
    API_ALLOWED_ORIGINS: '',
    API_ALLOWED_METHODS: '',
    DB_URL: '',
    JWT_SIGNING_KEY: '',
    GOOGLE_API_KEY: '',
  };
} else {
  // Log the error and exit the process if validation fails
  logger.error(
    'Environment variables validation failed:',
    parsed.error.message,
  );
  throw new Error(
    `Environment variables validation failed: ${parsed.error.message}`,
  );
}

logger.log('Environment variables validated successfully');

export default env;
