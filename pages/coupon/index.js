// pages/coupon/coupon.js
const app = getApp()

Page({
  data: {
    globalData: app.globalData,
    selectItem: 'enable',
    scrollX: false,
    scrollLeft: 0,
    coupon: {
      enable: [
        {
          id: "coupon-111",
          type: "full-reduction",
          quota: 10,
          condition: 50,
          title: "一次消费满50元可减10元",
          periodOfValidity: "2020.12.01-2020.12.31"
        },
        {
          id: "coupon-112",
          type: "full-discount",
          quota: 8,
          condition: 50,
          title: "一次消费满50元可打8折",
          periodOfValidity: "2020.12.01-2020.12.31"
        },
        {
          id: "coupon-113",
          type: "full-free-shipping",
          condition: 50,
          title: "一次消费满50元包邮",
          periodOfValidity: "2020.12.01-2020.12.31"
        },
        {
          id: "coupon-114",
          type: "full-reduction",
          quota: 10,
          condition: 50,
          title: "一次消费满50元可减10元",
          periodOfValidity: "2020.12.01-2020.12.31"
        },
        {
          id: "coupon-115",
          type: "full-discount",
          quota: 8,
          condition: 50,
          title: "一次消费满50元可打8折",
          periodOfValidity: "2020.12.01-2020.12.31"
        },
        {
          id: "coupon-116",
          type: "full-free-shipping",
          condition: 50,
          title: "一次消费满50元包邮",
          periodOfValidity: "2020.12.01-2020.12.31"
        }
      ],
      enabled: [
        {
          id: "coupon-101",
          type: "full-reduction",
          quota: 10,
          condition: 50,
          title: "一次消费满50元可减10元",
          periodOfValidity: "2020.10.01-2020.10.31"
        },
        {
          id: "coupon-102",
          type: "full-discount",
          quota: 8,
          condition: 50,
          title: "一次消费满50元可打8折",
          periodOfValidity: "2020.10.01-2020.10.31"
        },
        {
          id: "coupon-103",
          type: "full-free-shipping",
          condition: 50,
          title: "一次消费满50元包邮",
          periodOfValidity: "2020.10.01-2020.10.31"
        }
      ],
      invalid: [
        {
          id: "coupon-91",
          type: "full-reduction",
          quota: 10,
          condition: 50,
          title: "一次消费满50元可减10元",
          periodOfValidity: "2020.10.01-2020.10.31"
        },
        {
          id: "coupon-92",
          type: "full-discount",
          quota: 8,
          condition: 50,
          title: "一次消费满50元可打8折",
          periodOfValidity: "2020.10.01-2020.10.31"
        },
        {
          id: "coupon-93",
          type: "full-free-shipping",
          condition: 50,
          title: "一次消费满50元包邮",
          periodOfValidity: "2020.10.01-2020.10.31"
        }
      ]
    }
  },

  changeTag(e) {
    const tag = e.currentTarget.dataset.tag
    if(tag === this.data.selectItem) return
    this.setData({
      scrollX: true
    })
    let scrollLeft = 0
    switch(tag) {
      case "enable": 
        break
      case "enabled": 
        scrollLeft = 750 / app.globalData.pxToRpx
        break
      case "invalid":
        scrollLeft = 1500 / app.globalData.pxToRpx
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