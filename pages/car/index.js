// pages/car/car.js
const app = getApp()
const api = require('../../plugin/api')
const common = require('../../plugin/common')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: app.globalData,
    productList_valid: [],
    productList_inValid: [],
    productSelectList_valid: [],
    productSelectList_inValid: [],
    allSelect_valid: false,
    allSelect_inValid: false
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

  getProductDetail(ids) {
    if(ids.length === 1) {
      const product = []
      wx.request({
        method: api.getSimpleProductDetail.method,
        url: api.baseUrl + api.getSimpleProductDetail.url + '?id=' + ids[0],
        success: (res) => {
          const data = common.processingStatusCode(res)
          product.push(data.product)
          if(data.product.valid) {
            this.setData({
              productList_valid: product,
              productSelectList_valid: [false]
            })
          }else {
            this.setData({
              productList_inValid: product,
              productSelectList_inValid: [false]
            })
          }
          
        }
      })
    }else {
      wx.request({
        method: api.getSimpleProductsDetail.method,
        url: api.baseUrl + api.getSimpleProductsDetail.url + '?ids=' + JSON.stringify(ids),
        success: (res) => {
          const { product } = common.processingStatusCode(res)
          const product_valid = []
          const product_inValid = []
          const productSelectList_valid = []
          const productSelectList_inValid = []
          product.forEach((item) => {
            if(item.valid) {
              product_valid.push(item)
              productSelectList_valid.push(false)
            }else {
              product_inValid.push(item)
              productSelectList_inValid.push(false)
            }
          })
          this.setData({
            productList_valid: product_valid,
            productList_inValid: product_inValid,
            productSelectList_valid,
            productSelectList_inValid
          })
        }
      })
    }
  },

  selectProduct(e) {
    const { index, valid } = e.currentTarget.dataset
    const productSelectList_valid = Object.assign(this.data.productSelectList_valid)
    const productSelectList_inValid = Object.assign(this.data.productSelectList_inValid)
    if(valid === 'true') {
      let allSelect_valid = true
      productSelectList_valid[index] = !productSelectList_valid[index]
      productSelectList_valid.forEach((value) => {
        if(!value) {
          allSelect_valid = false
        }
      })
      this.setData({
        productSelectList_valid,
        allSelect_valid
      })
    }else {
      let allSelect_inValid = true
      productSelectList_inValid[index] = !productSelectList_inValid[index]
      productSelectList_inValid.forEach((value) => {
        if(!value) {
          allSelect_inValid = false
        }
      })
      this.setData({
        productSelectList_inValid,
        allSelect_inValid
      })
    }
  },

  selectAllProduct(e) {
    const { valid } = e.currentTarget.dataset
    const productSelectList_valid = Object.assign(this.data.productSelectList_valid)
    const productSelectList_inValid = Object.assign(this.data.productSelectList_inValid)
    if(valid === 'true') {
      let allSelect_valid = true
      let temp = null
      productSelectList_valid.forEach((value) => {
        if(!value) {
          allSelect_valid = false
        }
      })
      if(allSelect_valid) {
        temp = productSelectList_valid.map(() => false)
      }else {
        temp = productSelectList_valid.map(() => true)
      }
      this.setData({
        productSelectList_valid: temp,
        allSelect_valid: !allSelect_valid
      })
    }else {
      let allSelect_inValid = true
      let temp = null
      productSelectList_inValid.forEach((value) => {
        if(!value) {
          allSelect_inValid = false
        }
      })
      if(allSelect_inValid) {
        temp = productSelectList_inValid.map(() => false)
      }else {
        temp = productSelectList_inValid.map(() => true)
      }
      this.setData({
        productSelectList_inValid: temp,
        allSelect_inValid: !allSelect_inValid
      })
    }
  },

  deleteProduct() {
    const productList_valid = Object.assign(this.data.productList_valid)
    const productList_inValid = Object.assign(this.data.productList_inValid)
    const productSelectList_valid = Object.assign(this.data.productSelectList_valid)
    const productSelectList_inValid = Object.assign(this.data.productSelectList_inValid)
    const allSelect_valid = this.data.allSelect_valid
    const allSelect_inValid = this.data.allSelect_inValid
    wx.showModal({
      title: '确定删除选中内容？',
      success: () => {
        if(allSelect_valid && allSelect_inValid) {
          app.globalData.shoppingCartList = []
          this.setData({
            globalData: app.globalData,
            productList_valid: [],
            productList_inValid: [],
            productSelectList_valid: [],
            productSelectList_inValid: [],
            allSelect_valid: false,
            allSelect_inValid: false
          })
        }else {
          let flag_valid = false
          let flag_inValid = false
          productSelectList_valid.forEach((value) => {
            if(value) {
              flag_valid = true
            }
          })
          productSelectList_inValid.forEach((value) => {
            if(value) {
              flag_inValid = true
            }
          })
          if(!flag_valid && !flag_inValid) {
            wx.showToast({
              title: '未选中商品',
              icon: 'none'
            })
            return
          }
          const productList_valid_temp = []
          const productList_inValid_temp = []
          const productSelectList_valid_temp = []
          const productSelectList_inValid_temp = []
          const shoppingCartListTemp = []
          productSelectList_valid.forEach((value, index) => {
            if(!value) {
              productList_valid_temp.push(productList_valid[index])
              productSelectList_valid_temp.push(false)
              shoppingCartListTemp.push(productList_valid[index].id)
            }
          })
          productSelectList_inValid.forEach((value, index) => {
            if(!value) {
              productList_inValid_temp.push(productList_inValid[index])
              productSelectList_inValid_temp.push(false)
              shoppingCartListTemp.push(productList_inValid[index].id)
            }
          })
          app.globalData.shoppingCartList = shoppingCartListTemp
          this.setData({
            globalData: app.globalData,
            productList_valid: productList_valid_temp,
            productList_inValid: productList_inValid_temp,
            productSelectList_valid: productSelectList_valid_temp,
            productSelectList_inValid: productSelectList_inValid_temp,
            allSelect_valid: false,
            allSelect_inValid: false
          })
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  submit() {
    const productList_valid = Object.assign(this.data.productList_valid)
    const productSelectList_valid = Object.assign(this.data.productSelectList_valid)
    const productSelectList_inValid = Object.assign(this.data.productSelectList_inValid)
    const allSelect_valid = this.data.allSelect_valid
    const allSelect_inValid = this.data.allSelect_inValid
    let flag_inValid = false
    productSelectList_inValid.forEach((value) => {
      if(value) {
        flag_inValid = true
      }
    })
    if(allSelect_inValid || flag_inValid) {
      wx.showToast({
        title: '已失效商品无法结算',
        icon: 'none'
      })
      return
    }
    let url = ''
    if(allSelect_valid) {
      const ids = productList_valid.map((value) => {
        return value.id
      })
      url = '/pages/buy/index?id=' + JSON.stringify(ids)
    }else {
      const ids = []
      productSelectList_valid.forEach((value, index) => {
        if(value) {
          ids.push(productList_valid[index].id)
        }
      })
      url = '/pages/buy/index?id=' + JSON.stringify(ids)
    }
    wx.navigateTo({
      url
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
    const shoppingCartList = Object.assign(app.globalData.shoppingCartList)
    this.getProductDetail(shoppingCartList)
    this.setData({
      globalData: app.globalData,
      allSelect_valid: false,
      allSelect_inValid: false
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