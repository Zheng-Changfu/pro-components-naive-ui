/**
 * copy from naive-ui
 */

const warnedMessages = new Set()

export function warnOnce(location: string, message: string): void {
  const mergedMessage = `[pro-naive/${location}]: ${message}`
  if (warnedMessages.has(mergedMessage))
    return
  warnedMessages.add(mergedMessage)
  console.error(mergedMessage)
}

export function warn(location: string, message: string): void {
  console.error(`[pro-naive/${location}]: ${message}`)
}
