// index.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    channel: ''
  },
  jump () {
    util.navigateTo({
      url:"../chart/chart"
    })
  },
  again () {
    // let url = ''
    // console.log(this.data.channel)
    // if (this.data.channel==='xunjian') {
    //   url = "../xunjian/xunjian"
    // } else if(this.data.channel==='dengji') {
    //   url = "../dengji/dengji"
    // }
    // util.navigateTo({
    //   url: url
    // })
    wx.navigateBack({
      delta: 1 // 返回上一级页面。
    })
  },
  onLoad:function(options){
    console.log(options)
    this.setData({
      channel: options.channel
    })
  }
})
