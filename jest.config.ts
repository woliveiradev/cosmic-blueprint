/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  rootDir: './',
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 80,
    },
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleNameMapper: {
    'shared/(.*)': '<rootDir>/src/shared/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
};

export default config;
