// index.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    activeOne: 0,
    activeTwo: 0,
    activeValueOne: 'day',
    activeValueTwo: 1,
    items: [
      {value: 'day', name: '近一天'},
      {value: 'week', name: '近一周'},
      {value: 'month', name: '近一月'},
      {value: 'year', name: '近一年'}
    ],
    itemsOne: [
      {value: '1', name: '整改通知'},
      {value: '2', name: '案件回复'},
      {value: '3', name: '回收站'},
      {value: '4', name: '全部'}
    ],
    waitList: [
      {
        startData:'2021-12-13',
        endData:'2021-12-13',
        xiaoqu: '东欧小区',
        fuzeren: 'sunlong',
        qiyefuzeren: 'ttttttt'
      },
      {
        startData:'2021-12-13',
        endData:'2021-12-13',
        xiaoqu: '东欧小区',
        fuzeren: 'sunlong',
        qiyefuzeren: 'ttttttt'
      }
    ]
  },
  
  choiceDate(e) {
    var i = parseInt(e.target.id)
    if(this.data.activeOne === i) return
    this.setData({
      activeOne: i,
      activeValueOne: this.data.items[i-1].value
    })
    this.requestList()
  },
  choiceOther(e) {
    var i = parseInt(e.target.id)
    if(this.data.activeTwo === i) return
    this.setData({
      activeTwo: i,
      activeValueTwo: this.data.itemsOne[i-1].value
    })
    this.requestList()
  },
  requestList() {
    let that = this
    wx.showLoading({
      title: '加载中...',
    })
    util.request({
      url: 'http://wx.romeo.wang/home/user/detail?userid='+that.data.userid,
      data: {"range": that.data.activeValueOne,"all": that.data.activeValueTwo},
      success: function(res){
        alert(res)
        wx.hideLoading()
      },
      fail: function(err) {
        wx.hideLoading()
      }
    })
  },
  // 事件处理函数
  phoneLogin(){
    this.setData({
      phoneLoginIsShow:true
    })
  },
  close(){
    this.setData({
      phoneLoginIsShow:false
    })
  },
  getCode(){
    var countdown = 60;
    const _this = this;
    var setTime=function(_this){
      if(countdown==0){
        _this.setData({
          getCodeIsShow:false
        })
        countdown = 60;
        return;
      }else{
        countdown--;
        _this.setData({
          getCodeIsShow:true,
          secondCode:countdown
        })
        setTimeout(function () {
          setTime(_this)
        }, 1000)
      }
    }
    setTime(_this);
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.requestList()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
