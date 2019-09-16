module.exports = {
    roots: ['<rootDir>/test/e2e', '<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/test/**',
    ],
    coverageReporters: ['text'],
    testEnvironment: 'node',
    testSequencer: '<rootDir>/jest.sequencer.js',
    globalSetup: '<rootDir>/test/e2e/setup.ts',
    globalTeardown: '<rootDir>/test/e2e/teardown.ts',
};
