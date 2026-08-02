// .stylelintrc.cjs
module.exports = {
  // 继承共享配置，顺序很重要，后面的会覆盖前面的
  extends: [
    'stylelint-config-standard',               // 基础 CSS 规则
    'stylelint-config-standard-scss',          // SCSS 规则
    'stylelint-config-recess-order',           // 属性排序规则
    'stylelint-config-html/vue',               // Vue 文件支持
  ],
  // 自定义规则（你可以根据需要调整）
  rules: {
    // 允许使用未知的伪类（Vue 的 :deep 等需要用到）
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
    // 允许未知的 at 规则（如 Tailwind 的 @apply）
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'layer', 'responsive', 'screen', 'tailwind'],
      },
    ],
    // 关闭属性顺序规则中某些可能会报错的部分（根据实际情况可以打开）
    // 'order/properties-order': null,
  },
}