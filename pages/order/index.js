// pages/order/order.js
const app = getApp()
const orderStatusList = {
  "0": "已完成",
  "1": "未支付",
  "2": "待商家确认",
  "3": "待发货",
  "4": "待收货",
  "5": "待评价",
}

Page({
  data: {
    selectItem: "allOrder",
    scrollX: false,
    scrollLeft: 0,
    order: [
      {
        orderId: "2020121111",
        orderState: "1",
        orderContent: {
          id: "O1CN01gOnNLu1eTQCryn0UM",
          name: "PROYA珀莱雅护手霜滋润保湿男女秋冬季随身小巧便携补水防干裂",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          original: "99.00",
          discount: "89.00",
          carriage: "0.00",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          skus: {
            "规格": "250ml/支 * 1支",
            "颜色": "白色"
          }
        },
        orderAmount: 2,
        orderCreationTime: "2020-12-10 13:32"
      },
      {
        orderId: "2020121112",
        orderState: "2",
        orderContent: {
          id: "O1CN01gOnNLu1eTQCryn0UM",
          name: "PROYA珀莱雅护手霜滋润保湿男女秋冬季随身小巧便携补水防干裂",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          original: "99.00",
          discount: "89.00",
          carriage: "0.00",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          skus: {
            "规格": "250ml/支 * 1支",
            "颜色": "白色"
          }
        },
        orderAmount: 2,
        orderCreationTime: "2020-12-10 13:32"
      },
      {
        orderId: "2020121113",
        orderState: "3",
        orderContent: {
          id: "O1CN01gOnNLu1eTQCryn0UM",
          name: "PROYA珀莱雅护手霜滋润保湿男女秋冬季随身小巧便携补水防干裂",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          original: "99.00",
          discount: "89.00",
          carriage: "0.00",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          skus: {
            "规格": "250ml/支 * 1支",
            "颜色": "白色"
          }
        },
        orderAmount: 2,
        orderCreationTime: "2020-12-10 13:32"
      },
      {
        orderId: "2020121114",
        orderState: "4",
        orderContent: {
          id: "O1CN01gOnNLu1eTQCryn0UM",
          name: "PROYA珀莱雅护手霜滋润保湿男女秋冬季随身小巧便携补水防干裂",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          original: "99.00",
          discount: "89.00",
          carriage: "0.00",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          skus: {
            "规格": "250ml/支 * 1支",
            "颜色": "白色"
          }
        },
        orderAmount: 2,
        orderCreationTime: "2020-12-10 13:32"
      },
      {
        orderId: "2020121115",
        orderState: "5",
        orderContent: {
          id: "O1CN01gOnNLu1eTQCryn0UM",
          name: "PROYA珀莱雅护手霜滋润保湿男女秋冬季随身小巧便携补水防干裂",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          original: "99.00",
          discount: "89.00",
          carriage: "0.00",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          skus: {
            "规格": "250ml/支 * 1支",
            "颜色": "白色"
          }
        },
        orderAmount: 2,
        orderCreationTime: "2020-12-10 13:32"
      },
      {
        orderId: "2020121116",
        orderState: "0",
        orderContent: {
          id: "O1CN01gOnNLu1eTQCryn0UM",
          name: "PROYA珀莱雅护手霜滋润保湿男女秋冬季随身小巧便携补水防干裂",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          original: "99.00",
          discount: "89.00",
          carriage: "0.00",
          mainPic: [
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main1.jpg",
            "images/O1CN01gOnNLu1eTQCryn0UM/O1CN01gOnNLu1eTQCryn0UM_main2.jpg"
          ],
          skus: {
            "规格": "250ml/支 * 1支",
            "颜色": "白色"
          }
        },
        orderAmount: 2,
        orderCreationTime: "2020-12-10 13:32"
      }
    ]
  },

  changeTag(e) {
    const tag = e.currentTarget.dataset.tag
    this.jumpPage(tag)
  },

  jumpPage(tag) {
    if(tag === this.data.selectItem) return
    this.setData({
      scrollX: true
    })
    let scrollLeft = 0
    switch(tag) {
      case "allOrder": 
        break
      case "toBeConfirmed": 
        scrollLeft = 750 / app.globalData.pxToRpx
        break
      case "toBeDelivered":
        scrollLeft = 1500 / app.globalData.pxToRpx
        break
      case "toBeReceived":
        scrollLeft = 2250 / app.globalData.pxToRpx
        break
      case "toBeEvaluated":
        scrollLeft = 3000 / app.globalData.pxToRpx
        break
    }
    this.setData({
      selectItem: tag,
      scrollLeft: scrollLeft,
      scrollX: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tag = options.target
    this.jumpPage(tag)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})