export default {
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  extensionsToTreatAsEsm: [".jsx"],
  setupFilesAfterEnv: ["./src/setupTests.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/reportWebVitals.js",
    "!src/**/*.test.{js,jsx}",
  ],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  transform: { "^.+\\.(js|jsx|ts|tsx)$": "babel-jest" },
  verbose: true,
  maxWorkers: "90%"
};
