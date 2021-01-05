// pages/classification/classification.js
const app = getApp()
const api = require('../../plugin/api')
const common = require('../../plugin/common')

Page({
  data: {
    globalData: app.globalData,
    search: "",
    selectedItem: 0,
    scrollId: "",
    classificationList: null,
    offsetTop: null
  },

  //设置当前选中的分类项
  switchCate(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      scrollId: "classification" + index,
      selectedItem: index
    })
  },

  //scroll-view滚动方法
  scroll(e) {
    let selectedItem = 0
    let offsetTop = e.detail.scrollTop
    const offsetTopList = Object.assign(this.data.offsetTop)
    for (let i = 0; i < offsetTopList.length; i++) {
      if (offsetTopList[i] <= offsetTop) {
        selectedItem = i
      } else {
        break
      }
    }
    this.setData({
      selectedItem
    })
  },

  //判断是否需要获取右边每项大分类距离顶部的距离
  getOffsetTop(isOld) {
    console.log("判断是否需要获取右边每项大分类距离顶部的距离")
    const offsetTop = common.getStorageSync('offsetTop')
    if (offsetTop) {
      if (isOld) {
        this.getOffsetTopFun()
      } else {
        this.setData({
          offsetTop
        })
        wx.hideNavigationBarLoading()
      }
    } else {
      this.getOffsetTopFun()
    }
  },

  //获取右边每项大分类距离顶部的距离
  getOffsetTopFun() {
    console.log("获取右边每项大分类距离顶部的距离")
    let searchHeight = 0
    wx.createSelectorQuery().select("#classification_search_wrapper").fields({
      size: true
    }, rect => {
      searchHeight = rect.height
    }).exec()
    const list = this.data.classificationList
    const offsetTop = []
    for (let i = 0; i < list.length; i++) {
      const id = '#classification' + i
      wx.createSelectorQuery().select(id).boundingClientRect(rect => {
        offsetTop.push(rect.top - searchHeight - 2)
        if (i + 1 === list.length) {
          this.setData({
            offsetTop
          })
          common.setStorageSync('offsetTop', offsetTop)
          wx.hideNavigationBarLoading()
        }
      }).exec()
    }
  },

  //获取分类页分类列表
  getClassificationList() {
    console.log("获取分类列表")
    const classification = common.getStorageSync('classification')
    if (classification) {
      wx.request({
        method: api.checkClassificationListVersion.method,
        url: api.baseUrl + api.checkClassificationListVersion.url + '?version=' + classification.version,
        success: (res) => {
          const data = common.processingStatusCode(res)
          if (data.data.isOld) {
            this.setData({
              classificationList: data.data.classification
            })
            this.getOffsetTop(true)
          } else {
            this.setData({
              classificationList: classification
            })
            this.getOffsetTop(false)
          }
        }
      })
    } else {
      wx.request({
        method: api.getClassificationList.method,
        url: api.baseUrl + api.getClassificationList.url,
        success: (res) => {
          const data = common.processingStatusCode(res)
          this.setData({
            classificationList: data.data.classificationList
          })
          common.setStorage('classification', data.data.classificationList)
          this.getOffsetTop(true)
        }
      })
    }
  },

  bindSearch(e) {
    wx.navigateTo({
      url: '/pages/product-list/index?type=userInput&name=' + e.detail.value,
    })
  },

  //跳转到商品列表页
  toProductList(e) {
    const data = e.currentTarget.dataset
    const urlData = `/pages/product-list/index?class=${data.class}&subClass=${data.subclass}&name=${data.name}&type=classification`
    wx.navigateTo({
      url: urlData,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showNavigationBarLoading()
    this.getClassificationList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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