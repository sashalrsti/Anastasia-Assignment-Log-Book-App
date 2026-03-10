const { createDefaultPreset } = require("ts-jest");

const tsJest = createDefaultPreset();

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",

  transform: {
    ...tsJest.transform,
  },

  testMatch: [
    "**/tests/**/*.test.ts"
  ],

  moduleFileExtensions: ["ts", "js", "json"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  }
};