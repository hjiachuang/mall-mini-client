// pages/selectAddress/index.js
const app = getApp()
const api = require('../../plugin/api')
const common = require('../../plugin/common')

Page({
  data: {
    globalData: app.globalData,
    address: []
  },

  getAddress() {
    wx.request({
      method: api.getAllAddress.method,
      url: api.baseUrl + api.getAllAddress.url + '?userId=' + app.globalData.userId,
      success: (res) => {
        const { address } = common.processingStatusCode(res)
        this.setData({ address })
      }
    })
  },

  toPage(e) {
    const addressId = e.currentTarget.dataset.addressid
    let url = ""
    if(addressId) {
      url = '/pages/add-or-edit-address/index?addressId=' + addressId
    }else {
      url = '/pages/add-or-edit-address/index'
    }
    wx.navigateTo({
      url
    })
  },

  selectAddress(e) {
    const index = e.currentTarget.dataset.index
    const page = getCurrentPages()
    const prevPage = page[page.length - 2]
    prevPage.setData({
      address: this.data.address[index]
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  deleteAddress(e) {
    const addressId = e.currentTarget.dataset.addressid
    if(addressId) {
      wx.showModal({
        title: "确定删除此地址吗？",
        confirmColor: "#4ece00",
        cancelColor: "#ff4c01",
        success: (res) => {
          if(res.confirm) {
            console.log("确定删除")
            this.deleteServerAddress(addressId)
          }
        }
      })
    }
  },

  deleteServerAddress(id) {
    // 提交Server 删除
    wx.showToast({
      title: '删除成功',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress()
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