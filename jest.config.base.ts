import type { Config } from 'jest'

export const baseConfig: Config = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.(t|j)s', '!**/__test__/**/*', '!**/dist/**/*', '!**/coverage/**/*'],
  coveragePathIgnorePatterns: ['(__tests__/.*.mock).(jsx?|tsx?)$', '/node_modules/'],
  coverageReporters: ['cobertura', 'clover', 'json', 'json-summary', 'lcov', 'text'],
  maxWorkers: 1,
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
}
