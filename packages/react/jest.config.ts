/** @type {import('jest').Config} */
export default {
    preset: 'jest-puppeteer',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest'
    },
    globals: {
        'ts-jest': {
            tsConfig: {
                importHelpers: true
            }
        }
    },
    setupFiles: ['<rootDir>/tests/jest-shim.ts'],
}
