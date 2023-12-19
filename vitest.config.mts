import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: {
      core: './src/core',
      modules: './src/modules',
      ioc: './src/ioc',
    },
    include: ['**/*.{e2e,spec}.ts'],
  },
});
