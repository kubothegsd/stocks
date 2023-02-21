/* eslint-disable no-undef */
module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '.+\\.css$': '<rootDir>/styleMock.ts',
  },
  testMatch: ['**/__tests__/*.(spec).(js|jsx|ts|tsx)'],
  testEnvironment: 'jsdom',
};
