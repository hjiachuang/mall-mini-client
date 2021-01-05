//app.js
App({
  onLaunch: function () {
    this.pxToRpx()
  },
  pxToRpx() {
    wx.getSystemInfo({
      success: (result) => {
        const widthPx = result.screenWidth
        const pxToRpx = 750 / widthPx
        this.globalData.pxToRpx = pxToRpx.toFixed(4)
      },
    })
  },
  globalData: {
    userInfo: null,
    userId: "123456",
    loginStatus: false,
    rootPath: "https://api.aidioute.cn/mall/",
    shoppingCartList: [
      "O1CN01gOnNLu1eTQCryn0UM","O1CN01gOnNLu1eTQCryn0UM"
    ]
  }
})