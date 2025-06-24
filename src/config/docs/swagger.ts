import projectInfo from 'package.json';

export const swaggerConfig = {
  title: projectInfo.name,
  description: projectInfo.description,
  version: projectInfo.version,
} as const;
