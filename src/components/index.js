import SvgIcon from './SvgIcon/index.vue'
// 全局对象
const allGlobalComponents = {
  SvgIcon
}
// 对外暴露所有全局组件
export default {
  install(app) {
    Object.keys(allGlobalComponents).forEach(key => {
      app.component(key, allGlobalComponents[key])
    })
  }
}