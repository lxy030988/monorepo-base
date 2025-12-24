import type { StorybookConfig } from '@storybook/react-vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding'
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    // Add aliases to use source files directly
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@monorepo-base/components': resolve(__dirname, '../../../packages/components/src'),
      '@monorepo-base/hooks': resolve(__dirname, '../../../packages/hooks/src'),
      '@monorepo-base/utils': resolve(__dirname, '../../../packages/utils/src')
    }
    return config
  }
}
export default config
