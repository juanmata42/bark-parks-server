/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  injectGlobals: true,
  testEnvironment: 'node',
  verbose: true,
  forceExit: true,
  coverageDirectory: 'coverage',
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  // clearMocks: true,
};
