// pages/buy/buy.js
const app = getApp()
const api = require('../../plugin/api')
const common = require('../../plugin/common')

Page({
  data: {
    globalData: app.globalData,
    showHalfScreenDialog: false,
    productId: [],
    product: [],
    buyAmount: [], // 购买数量
    preferentialAmount: 0, // 选择优惠券后显示的优惠金额
    carriageMax: 0, // 当前商品列表最大邮费
    carriage: 0, // 实际邮费
    total: 0, // 总计(商品总价加上邮费减去优惠券)
    address: null,
    allCoupon: [], // 所有的能用的优惠券
    availableCoupons: [], // 当前订单能用的优惠券
    couponsToBeUsed: [] // 当前选择的优惠券
  },

  getProductDetail(ids) {
    if (ids.length === 1) {
      const products = []
      wx.request({
        method: api.getSimpleProductDetail.method,
        url: api.baseUrl + api.getSimpleProductDetail.url + '?id=' + ids[0],
        success: (res) => {
          const {
            product
          } = common.processingStatusCode(res)
          products.push(product)
          this.setData({
            productId: ids,
            product: products,
            buyAmount: [1],
            preferentialAmount: 0,
            carriageMax: product.carriage,
            carriage: product.carriage.toFixed(2)
          })
        }
      })
    } else {
      wx.request({
        method: api.getSimpleProductsDetail.method,
        url: api.baseUrl + api.getSimpleProductsDetail.url + '?ids=' + JSON.stringify(ids),
        success: (res) => {
          const {
            product
          } = common.processingStatusCode(res)
          let carriageMax = 0
          let buyAmount = []
          product.forEach((value) => {
            buyAmount.push(1)
            if (value.carriage > carriageMax) {
              carriageMax = value.carriage
            }
          })
          this.setData({
            productId: ids,
            product,
            buyAmount,
            preferentialAmount: 0,
            carriageMax,
            carriage: carriageMax.toFixed(2)
          })
        }
      })
    }
  },

  getUserDefaultAddress() {
    wx.request({
      method: api.getDefaultAddress.method,
      url: api.baseUrl + api.getDefaultAddress.url + '?userId=' + app.globalData.userId,
      success: (res) => {
        const {
          address
        } = common.processingStatusCode(res)
        this.setData({
          address
        })
      }
    })
  },

  getEnableCoupon() {
    wx.request({
      method: api.getValidCoupon.method,
      url: api.baseUrl + api.getValidCoupon.url + '?userId=' + app.globalData.userId,
      success: (res) => {
        const {
          coupon
        } = common.processingStatusCode(res)
        this.setData({
          allCoupon: coupon
        })
        this.judgeCoupon()
      }
    })
  },

  selectAddress() {
    // 跳转到收货地址页
    wx.navigateTo({
      url: '/pages/selectAddress/index',
    })
  },

  toDetail() {
    // 跳转到商品详情页
    wx.navigateTo({
      url: '/pages/productDetail/index?id=' + this.data.productId,
    })
  },

  changeAmount(e) {
    const {
      mode,
      index
    } = e.currentTarget.dataset
    let buyAmount = Object.assign(this.data.buyAmount)
    if (mode === 'reduce') {
      if (buyAmount[index] === 1) return
      buyAmount[index]--
      this.setData({
        buyAmount
      })
    } else {
      if (buyAmount[index] === this.data.product[index].stock) return
      buyAmount[index]++
      this.setData({
        buyAmount
      })
    }
    this.judgeCoupon()
  },

  judgeCoupon() {
    const coupon = Object.assign(this.data.allCoupon)
    const product = Object.assign(this.data.product)
    let nowTotalPriceOfGoods = 0
    product.forEach((value, index) => {
      nowTotalPriceOfGoods += parseFloat(value.discount) * this.data.buyAmount[index]
    })
    const availableCoupons = []
    let couponsToBeUsed = Object.assign(this.data.couponsToBeUsed)
    let total = 0
    let preferentialAmount = 0
    let carriage = 0
    coupon.forEach((value) => {
      switch (value.type) {
        case "full-reduction":
          if (value.condition <= nowTotalPriceOfGoods) {
            availableCoupons.push(value)
          }
          break
        case "full-discount":
          if (value.condition <= nowTotalPriceOfGoods) {
            availableCoupons.push(value)
          }
          break
        case "full-free-shipping":
          if (value.condition <= nowTotalPriceOfGoods) {
            availableCoupons.push(value)
          }
          break
      }
    })
    if (couponsToBeUsed.length > 0) {
      if (couponsToBeUsed[0].condition > nowTotalPriceOfGoods) {
        carriage = parseFloat(this.data.carriageMax)
        total = nowTotalPriceOfGoods + carriage
        couponsToBeUsed = []
      } else {
        switch (couponsToBeUsed[0].type) {
          case "full-reduction":
            carriage = parseFloat(this.data.carriageMax)
            total = nowTotalPriceOfGoods - couponsToBeUsed[0].quota + carriage
            preferentialAmount = couponsToBeUsed[0].quota
            break
          case "full-discount":
            carriage = parseFloat(this.data.carriageMax)
            total = nowTotalPriceOfGoods * couponsToBeUsed[0].quota / 10 + carriage
            preferentialAmount = nowTotalPriceOfGoods + carriage - total
            break
          case "full-free-shipping":
            carriage = 0
            total = nowTotalPriceOfGoods
            preferentialAmount = "包邮"
            break
        }
      }
    } else {
      carriage = parseFloat(this.data.carriageMax)
      total = nowTotalPriceOfGoods + carriage
    }
    this.setData({
      availableCoupons,
      couponsToBeUsed,
      total: total.toFixed(2),
      preferentialAmount: preferentialAmount === '包邮' ? preferentialAmount : preferentialAmount.toFixed(2),
      carriage: carriage.toFixed(2)
    })
  },

  showCoupon() {
    this.setData({
      showHalfScreenDialog: true
    })
  },

  selectCoupon(e) {
    const coupon = e.currentTarget.dataset.coupon
    if (coupon === "noUse") {
      this.setData({
        couponsToBeUsed: []
      })
      this.judgeCoupon()
    } else {
      const allCoupon = Object.assign(this.data.allCoupon)
      allCoupon.forEach((value) => {
        if (value.id === coupon) {
          const couponsToBeUsed = [value]
          this.setData({
            couponsToBeUsed
          })
          this.judgeCoupon()
        }
      })
    }
    this.setData({
      showHalfScreenDialog: false
    })
  },

  submit() {
    // 提交订单
    wx.showModal({
      title: '模拟支付',
      content: '暂未开通支付功能，点确定则认为支付成功，点取消则认为取消支付',
      confirmColor: '#10d6bf',
      success: (res) => {
        let title = ''
        let icon = ''
        let url = ''
        if (res.confirm) {
          title = '支付成功'
          icon = 'success'
          url = '/pages/order/index?target=toBeDelivered'

        }
        if (res.cancel) {
          title = '支付失败'
          icon = 'none'
          url = '/pages/order/index?target=toBeConfirmed'
        }
        wx.showToast({
          title,
          icon,
          success: () => {
            setTimeout(() => {
              wx.reLaunch({
                url
              })
            }, 2000)
          }
        })
      }
    })
  },



  /****************************************
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductDetail(JSON.parse(options.id))
    this.getUserDefaultAddress()
    this.getEnableCoupon()
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