// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck

import convertMd2Doc from './convert-md-to-doc'
import projectPath from './project-path'

export default async function (content, path) {
  // eslint-disable-next-line node/prefer-global/process
  const env = process.env.NODE_ENV
  const relativeUrl = path.replace(`${projectPath}/`, '')
  return convertMd2Doc(content, relativeUrl, env)
}
