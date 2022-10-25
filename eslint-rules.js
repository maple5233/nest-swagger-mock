// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const { namingConventionOptions } = require('./eslint-naming-rules')

module.exports = {
  /**
   * code format style
   */

  // https://github.com/prettier/eslint-plugin-prettier#options
  // https://prettier.io/docs/en/options.html
  'prettier/prettier': [
    'error',
    {
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: false,
      singleQuote: true,
      quoteProps: 'as-needed',
      jsxSingleQuote: false,
      trailingComma: 'all',
      bracketSpacing: true,
      bracketSameLine: false,
      arrowParens: 'always',
      rangeStart: 0,
      rangeEnd: Infinity,
    },
  ],
  // https://eslint.org/docs/rules/object-shorthand
  'object-shorthand': ['error'],
  // https://eslint.org/docs/rules/no-else-return
  'no-else-return': ['error', { allowElseIf: false }],
  // https://eslint.org/docs/rules/arrow-body-style
  'arrow-body-style': ['error', 'as-needed'],
  // https://eslint.org/docs/rules/quotes
  quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

  /**
   * comments
   */

  // https://typescript-eslint.io/rules/ban-ts-comment
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': true,
      minimumDescriptionLength: 10,
    },
  ],
  // https://eslint.org/docs/rules/no-inline-comments
  'no-inline-comments': ['error'],
  // https://eslint.org/docs/rules/spaced-comment
  'spaced-comment': [
    'error',
    'always',
    {
      line: {
        markers: ['/'],
        exceptions: ['-', '+'],
      },
      block: {
        markers: ['!'],
        exceptions: ['*'],
        balanced: true,
      },
    },
  ],

  /**
   * imports
   */

  // https://typescript-eslint.io/rules/no-require-imports
  '@typescript-eslint/no-require-imports': ['error'],
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
  'import/no-duplicates': ['error'],
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md
  'import/no-mutable-exports': ['error'],
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
  'import/first': ['error'],
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-import-module-exports.md
  'import/no-import-module-exports': ['error'],
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
  'import/extensions': [
    'error',
    'always',
    { ts: 'never', tsx: 'never', js: 'never', jsx: 'never', '': 'never' },
  ],
  // https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md
  'unused-imports/no-unused-imports-ts': 'error',
  // https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-vars.md
  'unused-imports/no-unused-vars': [
    'error',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    },
  ],

  /**
   * other
   */

  // https://eslint.org/docs/rules/complexity
  complexity: ['warn', { max: 15 }],
  // https://eslint.org/docs/rules/no-eval
  'no-eval': ['error'],
  // https://eslint.org/docs/rules/accessor-pairs
  'accessor-pairs': ['error', { setWithoutGet: true, enforceForClassMembers: true }],
  // https://eslint.org/docs/rules/array-callback-return
  'array-callback-return': ['error'],
  // https://eslint.org/docs/rules/class-methods-use-this
  'class-methods-use-this': ['error', { enforceForClassFields: true }],
  // https://eslint.org/docs/rules/prefer-rest-params
  'prefer-rest-params': ['error'],
  // https://eslint.org/docs/rules/default-param-last
  'default-param-last': ['error'],
  // https://eslint.org/docs/rules/no-new-func
  'no-new-func': ['error'],
  // https://eslint.org/docs/rules/no-new-wrappers
  'no-new-wrappers': ['error'],
  // https://eslint.org/docs/rules/no-param-reassign
  'no-param-reassign': ['error', { props: false }],
  // https://eslint.org/docs/rules/no-iterator
  'no-iterator': ['error'],
  // https://eslint.org/docs/rules/no-new-object
  'no-new-object': ['error'],
  // https://eslint.org/docs/rules/no-prototype-builtins
  'no-prototype-builtins': ['error'],
  // https://eslint.org/docs/rules/prefer-object-spread
  'prefer-object-spread': ['error'],
  // https://eslint.org/docs/rules/eqeqeq
  eqeqeq: ['error', 'always'],
  // https://eslint.org/docs/rules/no-case-declarations
  'no-case-declarations': ['warn'],
  // https://eslint.org/docs/rules/no-nested-ternary
  'no-nested-ternary': ['error'],
  // https://eslint.org/docs/rules/no-unneeded-ternary
  'no-unneeded-ternary': ['error'],
  // https://eslint.org/docs/rules/no-multi-assign
  'no-multi-assign': ['error'],
  // https://eslint.org/docs/rules/one-var
  'one-var': ['error', 'never'],
  // https://eslint.org/docs/rules/no-var
  'no-var': ['error'],
  // https://eslint.org/docs/rules/prefer-const
  'prefer-const': ['error'],
  // https://eslint.org/docs/rules/prefer-template
  'prefer-template': ['error'],
  // https://typescript-eslint.io/rules/dot-notation
  '@typescript-eslint/dot-notation': ['error'],
  // https://typescript-eslint.io/rules/explicit-member-accessibility
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      accessibility: 'no-public',
    },
  ],
  // https://typescript-eslint.io/rules/no-useless-constructor
  '@typescript-eslint/no-useless-constructor': ['error'],
  // https://typescript-eslint.io/rules/no-dupe-class-members
  '@typescript-eslint/no-dupe-class-members': ['error'],
  // https://typescript-eslint.io/rules/adjacent-overload-signatures
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  // https://typescript-eslint.io/rules/ban-types
  '@typescript-eslint/ban-types': [
    'warn',
    {
      types: {
        '{}': false,
      },
    },
  ],
  // https://typescript-eslint.io/rules/no-array-constructor
  '@typescript-eslint/no-array-constructor': ['error'],
  // https://typescript-eslint.io/rules/no-empty-function
  '@typescript-eslint/no-empty-function': ['error'],
  // https://typescript-eslint.io/rules/no-empty-interface
  '@typescript-eslint/no-empty-interface': ['error'],
  // https://typescript-eslint.io/rules/no-inferrable-types
  '@typescript-eslint/no-inferrable-types': ['error'],
  // https://typescript-eslint.io/rules/no-loss-of-precision
  '@typescript-eslint/no-loss-of-precision': ['error'],
  // https://typescript-eslint.io/rules/no-misused-new
  '@typescript-eslint/no-misused-new': ['error'],
  // https://typescript-eslint.io/rules/no-namespace
  '@typescript-eslint/no-namespace': ['error'],
  // https://typescript-eslint.io/rules/no-this-alias
  '@typescript-eslint/no-this-alias': ['error'],
  // https://typescript-eslint.io/rules/no-unnecessary-type-constraint
  '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
  // https://typescript-eslint.io/rules/no-var-requires
  '@typescript-eslint/no-var-requires': ['error'],
  // https://typescript-eslint.io/rules/prefer-as-const
  '@typescript-eslint/prefer-as-const': ['error'],
  // https://typescript-eslint.io/rules/triple-slash-reference
  '@typescript-eslint/triple-slash-reference': ['error'],
  // https://typescript-eslint.io/rules/await-thenable
  '@typescript-eslint/await-thenable': ['error'],
  // https://typescript-eslint.io/rules/no-for-in-array
  '@typescript-eslint/no-for-in-array': ['error'],
  // https://typescript-eslint.io/rules/no-implied-eval
  '@typescript-eslint/no-implied-eval': ['error'],
  // https://typescript-eslint.io/rules/no-misused-promises
  '@typescript-eslint/no-misused-promises': ['warn'],
  // https://typescript-eslint.io/rules/no-explicit-any
  '@typescript-eslint/no-explicit-any': ['warn'],
  // https://typescript-eslint.io/rules/no-extra-non-null-assertion
  '@typescript-eslint/no-extra-non-null-assertion': ['error'],
  // https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
  '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
  // https://typescript-eslint.io/rules/no-non-null-assertion
  '@typescript-eslint/no-non-null-assertion': ['warn'],
  // https://typescript-eslint.io/rules/no-unsafe-argument
  '@typescript-eslint/no-unsafe-argument': ['warn'],
  // https://typescript-eslint.io/rules/no-unsafe-assignment
  '@typescript-eslint/no-unsafe-assignment': ['warn'],
  // https://typescript-eslint.io/rules/no-unsafe-call
  '@typescript-eslint/no-unsafe-call': ['warn'],
  // https://typescript-eslint.io/rules/no-unsafe-member-access
  '@typescript-eslint/no-unsafe-member-access': ['warn'],
  // https://typescript-eslint.io/rules/no-unsafe-return
  '@typescript-eslint/no-unsafe-return': ['warn'],
  // https://typescript-eslint.io/rules/no-unnecessary-type-assertion
  '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
  // https://typescript-eslint.io/rules/require-await
  '@typescript-eslint/require-await': ['error'],
  // https://typescript-eslint.io/rules/restrict-plus-operands
  '@typescript-eslint/restrict-plus-operands': ['error'],
  // https://typescript-eslint.io/rules/restrict-template-expressions
  '@typescript-eslint/restrict-template-expressions': [
    'error',
    {
      allowNumber: true,
      allowBoolean: true,
      allowAny: true,
      allowNullish: true,
      allowRegExp: true,
    },
  ],
  // https://typescript-eslint.io/rules/unbound-method
  '@typescript-eslint/unbound-method': ['warn', { ignoreStatic: true }],

  /**
   * naming convention
   */

  // https://typescript-eslint.io/rules/naming-convention
  '@typescript-eslint/naming-convention': ['error', ...namingConventionOptions],
  // https://github.com/selaux/eslint-plugin-filenames#matching-exported-values-match-exported
  'filenames/match-exported': ['error', [null, 'kebab', 'snake', 'camel']],

  /* jest */
  // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-alias-methods.md
  'jest/no-alias-methods': 'warn',
  // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-be.md
  'jest/prefer-to-be': 'warn',
  // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-have-length.md
  'jest/prefer-to-have-length': 'warn',
  // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-contain.md
  'jest/prefer-to-contain': 'warn',
  // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-new-require.md
  'node/no-new-require': ['error'],
  // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-exports-assign.md
  'node/no-exports-assign': ['error'],
  // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-path-concat.md
  'node/no-path-concat': ['error'],
  'node/no-unsupported-features/node-builtins': [
    'error',
    {
      version: '>=14.15.0',
    },
  ],
  'node/process-exit-as-throw': ['error'],
  'node/no-deprecated-api': ['error'],
  'no-async-promise-executor': ['error'],
  'no-misleading-character-class': ['error'],
  'eslint-comments/disable-enable-pair': ['error'],
  'eslint-comments/no-unused-enable': ['error'],
  'eslint-comments/no-unused-disable': ['error'],
  'eslint-comments/no-aggregating-enable': ['error'],
  'eslint-comments/no-duplicate-disable': ['error'],
  'eslint-comments/no-unlimited-disable': ['error'],
  'eslint-comments/require-description': ['error'],
}
