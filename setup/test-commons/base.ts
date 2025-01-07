import type {Config} from '@jest/types'
import path from 'path'

//Sync object
const config: Config.InitialOptions = {
    testEnvironment: 'jsdom',
    verbose: true,
    setupFilesAfterEnv: [
        path.resolve(__dirname, 'src', 'setupTests.js')
    ],
    transform: {
        '\\.[jt]sx?$': ['babel-jest', {
            configFile: path.resolve(__dirname, '.babelrc')
        }],
    },
    moduleNameMapper: {
      '^axios$': require.resolve('axios'),
    },
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
}
export default config

