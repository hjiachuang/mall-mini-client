module.exports = {
  baseUrl: 'https://www.fastmock.site/mock/6578ec24357e74bd007b134a0f0a8811/mall/',
  getBannerUrl: {
    remarks: '获取首页轮播图 banner 的图片链接',
    method: 'get',
    url: 'v1/banner'
  },
  getRecommendUrl: {
    remarks: '获取首页推荐内容',
    method: 'get',
    url: 'v1/recommend'
  },
  checkClassificationListVersion: {
    remarks: '判断当前本地存储的classification版本是否为旧版本，是则获取新的，不是则使用本地的',
    method: 'get',
    url: 'v1/check/classification/version',
    data: 'version=version'
  },
  getClassificationList: {
    remarks: '获取分类页分类列表',
    method: 'get',
    url: 'v1/classification'
  },
  search: {
    remarks: '搜索商品',
    method: 'get',
    url: 'v1/search',
    data: 'type=type&word=word'
  },
  getProductDetail: {
    remarks: '获取商品详情和评论',
    method: 'get',
    url: 'v1/product/detail',
    data: 'id=id'
  },
  getSimpleProductDetail: {
    remarks: '获取商品详情（不包含商品详情图和评价内容）',
    method: 'get',
    url: 'v1/product/detail/simple',
    data: 'id=id'
  },
  getProductsDetail: {
    remarks: '获取商品详情和评论',
    method: 'get',
    url: 'v1/products/detail',
    data: 'ids=id'
  },
  getSimpleProductsDetail: {
    remarks: '获取商品详情（不包含商品详情图和评价内容）',
    method: 'get',
    url: 'v1/products/detail/simple',
    data: 'ids=id'
  },
  getDefaultAddress: {
    remarks: '获取用户默认的收货地址',
    method: 'get',
    url: 'v1/address/default',
    data: 'userId=userId'
  },
  getAllAddress: {
    remarks: '获取用户所有的收货地址',
    method: 'get',
    url: 'v1/address/all',
    data: 'userId=userId'
  },
  getAddressInfo: {
    remarks: '获取某个地址的详细信息',
    method: 'get',
    url: 'v1/address/info',
    data: 'userId=userId&addressId=addressId'
  },
  getValidCoupon: {
    remarks: '获取用户有效的优惠券',
    method: 'get',
    url: 'v1/coupon/valid',
    data: 'userId=userId'
  }
}