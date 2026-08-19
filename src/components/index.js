import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局对象：SvgIcon + Category + 全部图标
const allGlobalComponents = {
  SvgIcon,
  Category,
  ...ElementPlusIconsVue
}
// 对外暴露所有全局组件
export default {
  install(app) {
    Object.keys(allGlobalComponents).forEach(key => {
      app.component(key, allGlobalComponents[key])
    });
    // 将element-plus提供图标注册为全局组件
    Object.keys(ElementPlusIconsVue).forEach(key => {
      app.component(key, ElementPlusIconsVue[key])
    })
  }
}