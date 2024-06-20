import convertMd2Doc from './convert-md-to-doc'
import projectPath from './project-path'

export default async function (content, path) {
  const env = process.env.NODE_ENV
  const relativeUrl = path.replace(projectPath + '/', '')
  return convertMd2Doc(content, relativeUrl, env)
}
