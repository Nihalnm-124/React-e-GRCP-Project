module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
  ],

  transform: {
    "^.+\\.(js|jsx)$":
      "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|scss|sass)$":
      "identity-obj-proxy",
  },

  moduleFileExtensions: [
    "js",
    "jsx",
  ],

  collectCoverage: true,

  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/main.jsx",
    "!src/index.js",
  ],

  coverageDirectory:
    "coverage",
};