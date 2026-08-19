import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'

export const useCategoryStore = defineStore('Category', {
  state: () => ({
    // 一级分类数据
    c1Arr: [],
    // 二级分类数据
    c2Arr: [],
    // 三级分类数据
    c3Arr: [],
    // 已选中的分类ID
    c1Id: '',
    c2Id: '',
    c3Id: '',
  }),
  actions: {
    // 获取一级分类
    async getC1() {
      const res = await reqC1()
      if (res.code === 200) {
        this.c1Arr = res.data
      }
    },
    // 根据一级分类ID，获取二级分类
    async getC2() {
      // 切换一级分类时，清空之前的二/三级选中和数据
      this.c2Arr = []
      this.c3Arr = []
      this.c2Id = ''
      this.c3Id = ''
      const res = await reqC2(this.c1Id)
      if (res.code === 200) {
        this.c2Arr = res.data
      }
    },
    // 根据二级分类ID，获取三级分类
    async getC3() {
      this.c3Arr = []
      this.c3Id = ''
      const res = await reqC3(this.c2Id)
      if (res.code === 200) {
        this.c3Arr = res.data
      }
    },
    // 重置所有分类选择（用于离开页面时清理）
    resetCategory() {
      this.c1Id = ''
      this.c2Id = ''
      this.c3Id = ''
      this.c2Arr = []
      this.c3Arr = []
    },
  },
  getters: {
    // 是否已选完三级分类
    isCategoryReady: (state) => {
      return !!state.c1Id && !!state.c2Id && !!state.c3Id
    },
  },
})
