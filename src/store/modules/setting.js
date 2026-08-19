// 首页布局状态
import { defineStore } from 'pinia'
export const useLayoutStore = defineStore('Layout', {
  state: () => {
    return {
      isFold: false,//控制首页是否折叠
      refresh: false//控制刷新页面
    }
  },
})
