import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        projects: [
            'packages/*',
            'tests/*/vitest.config.{e2e,unit}.ts',
            {
                test: {
                    globals: true,
                    setupFiles: ['./src/tests/allocateRooms.test.ts']
                }
            }]
    }

});