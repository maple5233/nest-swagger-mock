// eslint-disable-next-line filenames/match-exported
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
