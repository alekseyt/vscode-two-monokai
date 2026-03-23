// @ts-check

import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig(tseslint.configs.recommendedTypeChecked, {
  languageOptions: {
    parserOptions: {
      projectService: true, // https://typescript-eslint.io/getting-started/typed-linting/
    },
  },
})
