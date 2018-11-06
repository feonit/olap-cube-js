//https://github.com/facebook/jest/issues/1468#issuecomment-361260279
module.exports = {
	"transform": { '^.+\\.js$': '<rootDir>/config/jestPreprocess.js' },
	"rootDir": "../",
	"transformIgnorePatterns": [
		"/node_modules/(?!lodash-es).+\\.js$"
	],
	"coverageDirectory": "./coverage/",
	"collectCoverage": true,
	"collectCoverageFrom": [
		"src/**/*.{js}"
	]
};