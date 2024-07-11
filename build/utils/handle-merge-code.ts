// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck

function handleMergeCode({ parts, mergedParts, isVue }) {
  const isCompositionApi = parts.api === 'composition'
  if (isVue && ['ts', 'tsx'].includes(parts.language)) {
    // ts and js
    if (parts.template) {
      mergedParts.tsCode += `<template>${parts.template}</template>`
      mergedParts.jsCode += ``
    }
    if (parts.script) {
      if (parts.template) {
        mergedParts.tsCode += '\n\n'
        mergedParts.jsCode += '\n\n'
      }
      mergedParts.tsCode += `<script${
        isCompositionApi ? ' setup' : ''
      } lang="${parts.language}">
${parts.script}
</script>`
      mergedParts.jsCode += ''
    }
    if (parts.style) {
      if (parts.template || parts.script) {
        mergedParts.tsCode += '\n\n'
        mergedParts.jsCode += '\n\n'
      }
      const style = `<style scoped>${parts.style}</style>`
      mergedParts.tsCode += style
      mergedParts.jsCode += style
    }
  }
}
export default handleMergeCode
