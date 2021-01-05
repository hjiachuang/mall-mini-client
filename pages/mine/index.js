// pages/mine/mine.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: app.globalData,
    toptipsShow: false,
    toptipsMsg: ""
  },

  getUserInfo(res) {
    if(res.detail.errMsg === "getUserInfo:ok") {
      app.globalData.userInfo = res.detail.userInfo
      app.globalData.loginStatus = true
      this.setData({
        globalData: app.globalData
      })
    }else {
      wx.showToast({
        title: '登录失败',
        icon: "none",
        mask: true
      })
    }
  },

  toOrder(e) {
    if(!app.globalData.loginStatus) {
      wx.showToast({
        title: '请先登录',
        icon: "none",
        mask: true
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/index',
        })
      }, 2000)
      return
    }
    const target = e.currentTarget.dataset.tag
    wx.navigateTo({
      url: '/pages/order/index?target=' + target,
    })
  },

  toPage(e) {
    const page = e.currentTarget.dataset.page
    let url = null
    if(page === 'coupon' || page === 'address') {
      if(!app.globalData.loginStatus) {
        wx.showToast({
          title: '请先登录',
          icon: "none",
          mask: true
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/login/index',
          })
        }, 2000)
        return
      }
    }
    switch(page) {
      case "coupon": 
        url = "/pages/coupon/index"
        break
      case "address": 
        url = "/pages/address/index"
        break
      case "about":
        url = "/pages/about/index"
        break
    }
    wx.navigateTo({
      url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.userInfoReadyCallback = res => {
      this.setData({
        globalData: app.globalData
      })
    }
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
    this.setData({
      globalData: app.globalData
    })
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