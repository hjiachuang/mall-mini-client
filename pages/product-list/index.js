// pages/product-list/product-list.js
const app = getApp()
const api = require('../../plugin/api')
const common = require('../../plugin/common')

Page({
  data: {
    globalData: app.globalData,
    options: null,
    search: "",
    searchType: "",
    productList: {
      word: "",
      list: null
    }
  },

  toProductDetail(e) {
    const { id } = e.currentTarget.dataset
    if(id !== "") {
      wx.navigateTo({
        url: `/pages/productDetail/index?id=${id}`,
      })
    }
  },

  bindInput(e) {
    this.setData({
      searchType: "userInput",
      search: e.detail.value
    })
  },

  bindSearch(e) {
    if(this.data.search === this.data.productList.word) return
    this.setData({
      productList: {
        word: "",
        list: null
      }
    })
    wx.request({
      method: api.search.method,
      url: api.baseUrl + api.search.url + `?type=${this.data.searchType}&word=${this.data.search}`,
      success: (res) => {
        const data = common.processingStatusCode(res)
        this.setData({
          productList: {
            word: this.data.search,
            list: data.product
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options,
      search: options.name,
      searchType: options.type
    })
    this.bindSearch()
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