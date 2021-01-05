module.exports = {
  // 处理网络请求statusCode
  processingStatusCode: (response) => {
    if(response.statusCode === 200) {
      return response.data
    }else {
      // 状态码非 200的处理。
    }
  },
  // 获取本地storage存储的数据（同步）
  getStorageSync: (key) => {
    const data = wx.getStorageSync(key)
    if(data) {
      return JSON.parse(data)
    }else {
      return null
    }
  },
  // 设置本地storage存储的数据（同步）
  setStorageSync: (key, data) => {
    if(typeof data === 'string') {
      return wx.setStorageSync(key, data)
    }else {
      let newData = JSON.stringify(data)
      return wx.setStorageSync(key, newData)
    }
  },
  // 设置本地storage存储的数据（异步）
  setStorage: (key, data) => {
    if(typeof data === 'string') {
      wx.setStorage({key, data})
    }else {
      let newData = JSON.stringify(data)
      wx.setStorage({key, data: newData})
    }
  }
}