// components/order-list/order-list.js
const app = getApp()

Component({
  options: {
    styleIsolation: 'apply-shared' //isolated(默认), apply-shared, shared
  },
  
  properties: {
    orderData: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    globalData: app.globalData,
    orderStatusList: {
      "0": "订单已完成",
      "1": "订单未支付",
      "2": "待商家确认",
      "3": "待商家发货",
      "4": "待买家收货",
      "5": "待买家评价",
    }
  },

  lifetimes: {
    attached() {
      const { orderData, orderData: { orderContent } } = this.properties
      const price = parseFloat(orderContent.discount) * parseFloat(orderData.orderAmount) + parseFloat(orderContent.carriage)
      this.setData({
        price: price.toFixed(2)
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
