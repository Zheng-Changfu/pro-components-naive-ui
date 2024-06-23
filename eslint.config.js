import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: false,
  gitignore: false,
  rules: {
    'no-console': 'off',
    'vue/html-comment-content-spacing': 'off',
  },
})
