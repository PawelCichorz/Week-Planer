module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/*.spec.ts',
      '!**/node_modules/**'
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    verbose: true
  };