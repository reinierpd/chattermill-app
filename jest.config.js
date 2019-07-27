module.exports = {
  setupFiles: ['./jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/src/.next/',
    '<rootDir>/node_modules/',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: ['src/components/**/*.jsx'],
  coverageReporters: ["json", "lcov", "text", "clover", "text-summary"],
  modulePaths: ['./src'],
};
