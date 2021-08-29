const util = require('../../utils/util')
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: 'radio',
      path: 'page/component/pages/radio/radio'
    }
  },

  data: {
    items: [
      {value: 'yes', name: '收悉', checked: 'true'},
      {value: 'no', name: '驳回'}
    ],
    chooseValue: 'yes'
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    // this.chooseValue = e.detail.value
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items,
      chooseValue: e.detail.value
    })
  },

  login (e) {
    wx.showLoading({
      title: '保存中...',
    })
    wx.request({
      url: 'http://wx.romeo.wang/home/login',
      data: {chooseValue: this.data.chooseValue},
      method: 'POST', 
      header: {"content-type": "application/x-www-form-urlencoded"},
      success: function(res){
        console.log(res)
        wx.hideLoading()
      },
      fail: function(err) {
        wx.hideLoading()
      }
    })
    util.navigateTo({
      url:"../notDeal/notDeal"
    })
  }
})