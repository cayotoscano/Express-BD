import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: [
      'apps/**/*.spec.ts',
      'libs/**/*.spec.ts',
      'test/**/*.e2e-spec.ts',
    ],
  },
});
