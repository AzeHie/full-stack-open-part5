// eslint-disable-next-line no-undef
module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
    '\\.(css|less)$': '<rootDir>/src/tests/styleMock.js',
  },
  testEnvironment: 'jsdom',
};
