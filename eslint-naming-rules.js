const namingConventionOptions = [
  {
    selector: 'default',
    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
  },
  {
    selector: 'function',
    format: ['camelCase', 'PascalCase'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
  },
  {
    selector: ['classProperty', 'typeProperty'],
    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
  },
  {
    selector: ['objectLiteralProperty'],
    /**
     * objectLiteralProperty has too many case, such as react dynamic component or http header
     * And unfortunately, this rule cannot support dash naming like 'a-b-c'
     *
     * eg1:
     * const tabs = [
     * { key: 'overview', Component: Overview },
     * { key: 'basicInfo', Component: JobBasicInformation },
     * ]
     * const RenderByKey = ({key: string}) => {
     *     const { Component } = tabs.find(tab => tab.key === this.props.key)
     *     return <Component />
     * }
     *
     * eg2:
     * const httpHeader = {
     *     'Content-Type': 'application/json',
     * }
     */
    format: null,
  },
  {
    selector: 'typeLike',
    format: ['PascalCase'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
  },
  {
    selector: 'interface',
    format: ['PascalCase'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
    custom: {
      regex: '^(I[A-Z]).*(?![$]).$',
      match: true,
    },
  },
  {
    selector: 'enum',
    format: ['PascalCase'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
  },
  {
    selector: 'enumMember',
    format: ['UPPER_CASE'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
  },
  {
    selector: 'typeParameter',
    format: ['PascalCase'],
    leadingUnderscore: 'forbid',
    trailingUnderscore: 'forbid',
    custom: {
      regex: '^T([A-Z].*)?(?<![$])$',
      match: true,
    },
  },
  {
    selector: ['parameter', 'variable'],
    format: ['camelCase'],
    modifiers: ['unused'],
    leadingUnderscore: 'allow',
    trailingUnderscore: 'forbid',
  },
]

exports.namingConventionOptions = namingConventionOptions

exports.configureNamingConvention = ({ filePaths = [], level = 'error' }) => {
  const rules = {
    // https://typescript-eslint.io/rules/naming-convention
    '@typescript-eslint/naming-convention': [level, ...namingConventionOptions],
  }
  if (filePaths.length === 0) {
    return {
      rules,
    }
  }
  return {
    files: filePaths,
    rules,
  }
}
