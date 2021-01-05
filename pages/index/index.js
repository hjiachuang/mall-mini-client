//index.js

const app = getApp()
const api = require('../../plugin/api')
const common = require('../../plugin/common')

Page({
  data: {
    globalData: app.globalData,
    search: "",
    bannerImg: [],
    classificationList: {
      imgUrl: 'static/images/icon-index-classification.png',
      name: ['美妆个护','品牌精选','家居生活','食品生鲜','白菜好货','童颜童趣','9.9专区','礼品礼盒','今日特卖','热销榜单']
    },
    recommendList: null
  },
  getBannerUrl() {
    wx.request({
      method: api.getBannerUrl.method,
      url: api.baseUrl + api.getBannerUrl.url,
      success: (res) => {
        const data = common.processingStatusCode(res)
        this.setData({
          bannerImg: data.data
        })
      }
    })
  },
  getRecommend() {
    wx.request({
      method: api.getRecommendUrl.method,
      url: api.baseUrl + api.getRecommendUrl.url,
      success: (res) => {
        const data = common.processingStatusCode(res)
        this.setData({
          recommendList: data.data
        })
      }
    })
  },
  bindSearch(e) {
    this.toProductList('userInput', e.detail.value)
  },
  choiceNavbar(e) {
    const word = e.currentTarget.dataset.name
    this.toProductList('classification', word)
  },
  toProductList(type, word) {
    wx.navigateTo({
      url: '/pages/product-list/index?type=' + type + '&name=' + word,
    })
  },
  toProductItem(e) {
    wx.navigateTo({
      url: '/pages/productDetail/index?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad(options) {
    wx.showNavigationBarLoading()
    this.getBannerUrl()
    this.getRecommend()
    setTimeout(()=> {
      wx.hideNavigationBarLoading()
    }, 2000)
  }
})