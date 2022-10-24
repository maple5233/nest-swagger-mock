#!/usr/bin/env node
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'

import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * @type {Record<string, string>}
 */
const result = await inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Package name',
  },
])
const packageName = result.name
await fs.copy(
  path.join(dirname, '..', 'packages', 'template'),
  path.join(dirname, '..', 'packages', packageName),
  {
    recursive: true,
    overwrite: false,
    errorOnExist: true,
  },
)
const packageJsonPath = path.join(dirname, '..', 'packages', packageName, 'package.json')
/**
 * @type {Record<string, any>}
 */
const packageJson = await fs.readJson(packageJsonPath)
packageJson.name = packageName
delete packageJson.private
await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
await fs.rm(path.join(dirname, '..', 'packages', packageName, 'dist'), {
  recursive: true,
  force: true,
})
await fs.rm(path.join(dirname, '..', 'packages', packageName, 'coverage'), {
  recursive: true,
  force: true,
})
