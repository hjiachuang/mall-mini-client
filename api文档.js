const api = {
  baseUrl:
    'https://www.fastmock.site/mock/6578ec24357e74bd007b134a0f0a8811/mall/', // 根路径
  getBannerUrl: {
    remarks: '获取首页轮播图 banner 的图片链接',
    method: 'get',
    url: 'v1/banner',
    response: {
      error: '', // 错误信息
      data: ['url'], // banner链接数组
    },
  },
  getRecommendUrl: {
    remarks: '获取首页推荐内容',
    method: 'get',
    url: 'v1/recommend',
    response: {
      error: '',
      data: {
        imgUrl: '',
        commodities: [
          {
            id: '',
            name: '',
            mainPic: ['url'],
            originalPrice: '100.00',
            currentPrice: '100.00',
            carriage: 0,
            sales: 1,
            stock: 1,
          }
        ],
      },
    },
  },
  getClassificationList: {
    remarks: '获取分类页分类列表',
    method: 'get',
    url: 'v1/classification',
    response: {
      error: '',
      data: [
        {
          name: '',                     // 大分类名
          subclass: [                   // 大分类列表
            {
              subclassName: '',           // 小分类名
              item: [                     // 小分类列表
                {
                  name: '',                  // 分类名
                  img: ''                    // 分类展示照片
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
