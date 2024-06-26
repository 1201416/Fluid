// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    collectCoverage: false,
    moduleFileExtensions: [
      'js',
      'ts',
      'json'
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
      
      '**/?(*.)+(spec|test).ts?(x)',
    ],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
  };
  