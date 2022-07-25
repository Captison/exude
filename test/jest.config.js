/**
    Testing Configuration
    ---------------------------------------------------------------------------
    See: https://jestjs.io/docs/configuration
*/
var paths = require('../paths');
var webpackConfig = require('../build/webpack.config');


var test = paths.sub(paths.test);
var { resolve: { alias = {}, extensions = [] } } = webpackConfig();

module.exports =
{
    // mock all imported modules?
    automock: false,
    // stop running tests after this number of failures
    bail: 0,
    // array of file glob patterns from which to collect coverage data
    collectCoverageFrom: undefined,
    // directory of coverage output
    coverageDirectory: undefined,
    // array of regexp strings for files to ignore for coverage
    coveragePathIgnorePatterns: [ '/node_modules/' ],
    // code coverage instrumentation provider
    coverageProvider: 'babel',
    // array of reporter names (all istanbul names supported)
    coverageReporters: [ 'clover', 'json', 'lcov', 'text' ],
    // coverage enforcement minimum threshold
    coverageThreshold: undefined,
    // custom dependency extractor
    dependencyExtractor: undefined,
    // display label for test suite run from this configuration
    displayName: 'Exude UI',
    // show helpful error messages when calling deprecated APIs?
    errorOnDeprecated: false,
    // specify additional files needed to run as ECMAScript Modules
    extensionsToTreatAsEsm: [],
    // reconfigure long app timers for shorter testing time
    fakeTimers: {},
    // force files into coverage (e.g., test files ignored by default)
    forceCoverageMatch: [''],
    // set of global variables available to every test.
    globals: {},
    // path to a setup file that exports a function (`function(global, project)`)
    globalSetup: undefined,
    // path to a teardown file that exports a function (`function(global, project)`)
    globalTeardown: undefined,
    // jest haste map config
    haste: undefined,
    // inject jest's default globals (describe, expect, etc.) into every test
    injectGlobals: true,
    // maximum nimber of tests that can run concurrently
    maxConcurrency: 5,
    // number of worker-pool threads for testing
    // maxWorkers: undefined
    // array of module directory names to be searched
    moduleDirectories: [ 'node_modules' ],
    // list of extensions used by files under test
    moduleFileExtensions: extensions.map(e => e.slice(1)),
    // stubbed module mapping (for resources unavailable at test time)
    moduleNameMapper: Object.keys(alias).reduce((o, a) => ({ ...o, [`^${a}(.*)$`]: alias[a] + '$1' }), {}),
    // array of regexp patterns for files to ignore (cannot `require()`)
    modulePathIgnorePatterns: [],
    // alternative to setting NODE_PATH env variable
    modulePaths: [],
    // activate native OS notifications for test results?
    notify: false,
    // options: always, failure, success, change, success-change, failure-change
    notifyMode: 'failure-change',
    // specify a module that has jest preset config file at the root
    preset: undefined,
    // module used to update inline snapshots
    prettierPath: 'prettier',
    // list of projects (in monorepo) to run jest
    projects: undefined,
    // array of names of test reporters to use
    reporters: undefined,
    // reset all mock state before each test?
    resetMocks: false,
    // reset module registry before each test?
    resetModules: false,
    // points to a module or file that has a custom resolver
    resolver: undefined,
    // restore initial mock implementation before each test
    restoreMocks: false,
    // root directory from which to look for test and module files
    rootDir: paths.root,
    // list of directory paths that jest should search for files in.
    roots: [ '<rootDir>' ],
    // specify test runner
    runner: 'jest-runner',
    // specify extra properties to be defined inside a vm for faster lookups
    sandboxInjectedGlobals: undefined,
    // array of module paths for files to run once per test file (before env setup)
    setupFiles: [],
    // array of module paths for files to run once per test file (after env setup)    
    setupFilesAfterEnv: [],
    // number of seconds after which a test is considered too slow
    slowTestThreshold: 5,
    // snapshot formatting options
    snapshotFormat: undefined,
    // path to snapshot resolver module
    snapshotResolver: undefined,
    // array of paths to snapshot serializer modules for snapshot testing
    snapshotSerializers: [],
    // test environment
    testEnvironment: 'node',
    // options passed to test environment
    testEnvironmentOptions: {},
    // system exit code for test failures
    testFailureExitCode: 1,
    // array of glob patterns identifying test files
    testMatch: [ test('**', '*.spec.(js|vue)') ],
    // array of regexp pattern strings identifying test files to skip
    testPathIgnorePatterns: [ '/node_modules/' ],
    // pattern used to detect test files
    testRegex: null,
    // specify a module that has a function to accept results object
    testResultsProcessor: undefined,
    // specify custom test runner function
    testRunner: 'jest-circus/runner',
    // sepecify custom test sequencer
    testSequencer: '@jest/test-sequencer',
    // default timeout of a test in milliseconds
    testTimeout: 5000,
    // regexp filename patterns mapped to code transpilers
    transform: { '\\.[jt]sx?$': 'babel-jest' },
    // array of regexp file paths to ignore for file transpilations
    transformIgnorePatterns: [ '/node_modules/', '\\.pnp\\.[^\\\/]+$' ],
    // array of regexp file patterns to prevent automatic mocking for
    unmockedModulePathPatterns: [],
    // show info about each test being run
    verbose: true,
    // array of regexp patterns to ignore in watch mode
    watchPathIgnorePatterns: [],
    // specify custom watch plugins
    watchPlugins: [],
    // use a watchman for file crawling?
    watchman: true
};
