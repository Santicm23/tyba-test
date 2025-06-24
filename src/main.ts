import bootstrap from '@/presentation/server';

bootstrap().catch((error: unknown) => {
  // Handle any errors that occur during the bootstrap process
  console.error(
    'Error during application bootstrap:',
    error instanceof Error ? error.message : String(error),
  );
  process.exit(1);
});
