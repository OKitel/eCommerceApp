import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(css|s[ca]ss|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
    'swiper/css': '<rootDir>/src/__mocks__/styleMock.ts',
  },
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['__tests__/test-utils.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  resetMocks: false,
  setupFiles: ['<rootDir>/dotenv.setup.ts', 'jest-localstorage-mock'],
  collectCoverageFrom: ['src/**'],
  coveragePathIgnorePatterns: ['node_modules', './src/__mocks__', './src/__tests__'],
};

export default config;
