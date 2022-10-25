// eslint-disable-next-line filenames/match-exported -- jest.config.ts is a special name
import { baseConfig } from '../../jest.config.base'
import * as packageJSON from './package.json'
import type { Config } from 'jest'

const config: Config = {
  ...baseConfig,
  displayName: packageJSON.name,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
