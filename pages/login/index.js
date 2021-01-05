// pages/login/login.js
const app = getApp()

Page({
  data: {
    globalData: app.globalData,
    logo_url: app.globalData.rootPath + 'static/images/logo.webp'
  },

  getUserInfo(res) {
    if(res.detail.errMsg === "getUserInfo:ok") {
      app.globalData.userInfo = res.detail.userInfo
      app.globalData.loginStatus = true
      wx.navigateBack({
        delta: 1,
      })
    }else {
      wx.showToast({
        title: '登录失败',
        icon: "none",
        mask: true
      })
    }
  },

  toHome() {
    wx.switchTab({
      url: '/pages/index/index',
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