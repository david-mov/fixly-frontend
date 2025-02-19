/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest/presets/default-esm', // Use the ESM preset
  testEnvironment: 'jsdom', // Use jsdom for DOM testing
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Enable ESM support
        tsconfig: 'tsconfig.json', // Path to your tsconfig
      },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Map .js imports to .ts files
    '^preact$': '<rootDir>/node_modules/preact/dist/preact.module.js', // Map preact to its ESM build
    '^preact/jsx-runtime$': '<rootDir>/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js', // Map preact/jsx-runtime to its ESM build
  },
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat .ts and .tsx files as ESM
  transformIgnorePatterns: [
    // Allow transforming specific ESM modules
    'node_modules/(?!(preact|@testing-library/preact)/)',
  ],
};

export default config;
