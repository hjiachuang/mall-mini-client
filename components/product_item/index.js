// components/product-list/index.js
const app = getApp()
Component({
  
  options: {
    styleIsolation: 'apply-shared' //isolated(默认), apply-shared, shared
  },
  
  properties: {
    product: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    globalData: app.globalData
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
