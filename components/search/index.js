// components/search/index.js
Component({

  options: {
    styleIsolation: 'apply-shared' //isolated(默认), apply-shared, shared
  },

  properties: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      value: '搜索'
    },
    focus: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showSearch: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindFocus(e) {
      this.setData({
        showSearch: true
      })
      this.triggerEvent('focus', e.detail)
    },
    bindBlur(e) {
      this.triggerEvent('blur', e.detail)
    },
    bindInput(e) {
      this.setData({
        value: e.detail.value
      })
      this.triggerEvent('input', e.detail)
    },
    deleteValue() {
      this.setData({
        value: '',
        showSearch: false
      })
    },
    search(e) {
      this.triggerEvent('search', {value: this.data.value})
    }
  }
})
