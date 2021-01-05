// pages/add-or-edit-address/add-or-edit-address.js
const app = getApp()
const api = require('../../plugin/api')
const common = require('../../plugin/common')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: "",
    addressId: "",
    addressInfo: {},
    rules: [{
      name: 'addressee',
      rules: {
        required: true,
        message: '请输入正确的姓名'
      },
    }, {
      name: 'phoneNumber',
      rules: [{
        required: true,
        message: '请输入电话号码'
      }, {
        mobile: true,
        message: '请输入正确的电话号码'
      }],
    }, {
      name: 'area',
      rules: {
        required: true,
        message: '请选择所在地区'
      },
    }, {
      name: 'detailedAddress',
      rules: {
        required: true,
        message: '请填写正确的详细地址'
      },
    }]
  },

  getAddressInfo(id) {
    wx.request({
      method: api.getAddressInfo.method,
      url: api.baseUrl + api.getAddressInfo.url + `?userId=${app.globalData.userId}&addressId=${id}`,
      success: (res) => {
        const data = common.processingStatusCode(res)
        this.setData({
          addressInfo: data.address
        })
      }
    })
  },
  // 根据页面内容更改更新addressInfo的内容
  formInputChange(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    switch (field) {
      case "addressDefault":
        this.setData({
          addressInfo: {
            ...this.data.addressInfo,
            default: !this.data.addressInfo.default,
          }
        })
        break
      default:
        this.setData({
          [`addressInfo.${field}`]: value
        })

    }
  },
  // 设置所在地区的内容
  bindRegionChange: function (e) {
    this.setData({
      addressInfo: {
        ...this.data.addressInfo,
        area: e.detail.value,
      }
    })
  },

  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        //提交Server更新保存
        wx.showToast({
          title: '保存成功',
          success: () => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1,
              })
            }, 2000)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const addressId = options.addressId
    if (addressId) {
      this.setData({ addressId })
      this.getAddressInfo(addressId)
    }else {
      this.setData({
        addressInfo: {
          ...this.data.addressInfo,
          area: ['北京市','北京市','东城区']
        }
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