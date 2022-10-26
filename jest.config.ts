// eslint-disable-next-line filenames/match-exported -- jest.config.ts is a special file
import { baseConfig } from './jest.config.base'
import type { Config } from 'jest'

const config: Config = {
  ...baseConfig,
  projects: ['<rootDir>/packages/*/jest.config.js'],
}

export default config
