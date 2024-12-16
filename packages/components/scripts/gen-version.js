import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

writeFileSync(
  resolve(cwd(), 'src/version.ts'),
  `export default '${version}'\n`,
)
