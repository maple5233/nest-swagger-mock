// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- commonjs files
const transformer = require('@nestjs/swagger/plugin')

module.exports.name = 'nestjs-swagger-transformer'
// you should change the version number anytime you change the configuration below - otherwise, jest will not detect changes
module.exports.version = 1

module.exports.factory = (cs) =>
  transformer.before(
    {
      classValidatorShim: true,
      introspectComments: true,
      dtoFileNameSuffix: ['.dto.ts', '.model.ts'],
    },
    cs.program,
  )
