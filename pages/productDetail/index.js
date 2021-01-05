// pages/product-detail/product-detail.js
const app = getApp()
const api = require('../../plugin/api')
const common = require('../../plugin/common')

Page({
  data: {
    globalData: app.globalData,
    fixedNav: false,
    product: {},
    selectItem: "details",
    loadingCar: false,
    loadingBuy: false
  },

  // 获取商品详情
  getProductDetail(id) {
    wx.request({
      method: api.getProductDetail.method,
      url: api.baseUrl + api.getProductDetail.url + '?id=' + id,
      success: (res) => {
        const data = common.processingStatusCode(res)
        this.setData({
          product: data.product
        })
      }
    })
  },
  // 更改导航选项
  changeSelectItem(e) {
    const target = e.currentTarget.dataset.name
    if (target === this.data.selectItem) return
    this.setData({
      selectItem: target
    })
  },
  // 监听页面滚动事件（小程序自带方法）
  onPageScroll(e) {
    let query = wx.createSelectorQuery()
    query.select('#product_detail_content').boundingClientRect((rect) => {
      let top = rect.top
      top = top * app.globalData.pxToRpx
      if (top <= 80) {
        if(this.data.fixedNav) return
        this.setData({
          fixedNav: true
        })
      } else {
        if(!this.data.fixedNav) return
        this.setData({
          fixedNav: false
        })
      }
    }).exec()
  },
  // 添加购物车
  addCar() {
    this.setData({
      loadingCar: true
    })
    if(!app.globalData.loginStatus) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: () => {
          this.setData({
            loadingCar: false
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/index',
            })
          }, 2000)
        }
      })
      return false
    }
    const product = Object.assign(this.data.product)
    const shoppingCartList = Object.assign(app.globalData.shoppingCartList)
    let err = false
    let msg = ""
    let flag = false
    shoppingCartList.forEach((value, index, arr) => {
      if (value.id === product.id) {
        if (shoppingCartList[index].amount.now === shoppingCartList[index].amount.max) {
          err = true
          msg = "购物车商品数量已达库存上限"
        } else {
          shoppingCartList[index].amount.now += 1
          msg = "添加购物车成功"
        }
        flag = true
      }
    })
    if (!flag) {
      const addProduct = {
        id: product.id,
        isValid: true,
        name: product.name,
        mainPic: product.mainPic,
        original: product.original,
        discount: product.discount,
        carriage: product.carriage,
        amount: {
          max: product.stock,
          now: 1
        },
        skus: product.skus
      }
      shoppingCartList.unshift(addProduct)
    }
    app.globalData.shoppingCartList = shoppingCartList
    msg = "添加购物车成功"
    // 发起网络请求同步购物车数据
    wx.showToast({
      title: msg,
      icon: 'none',
      success: () => {
        this.setData({
          loadingCar: false
        })
      }
    })
  },
  // 立即购买
  toBuy() {
    this.setData({
      loadingBuy: true
    })
    if(!app.globalData.loginStatus) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: () => {
          this.setData({
            loadingBuy: false
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/index',
            })
          }, 2000)
        }
      })
      return false
    }
    wx.navigateTo({
      url: `/pages/buy/index?id=${[this.data.product.id]}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductDetail(options.id)
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
    console.log("到底了")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})