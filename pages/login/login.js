// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    phoneLoginIsShow:true,
    getCodeIsShow:false,
    secondCode:60,
    codeText:"获取验证码",
    height:0,
    top:0
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
  login (e) {
    if (!e.detail.value.phone) {
      wx.showToast({
        title: '请输入您的手机号',
        icon: 'none',
        duration: 1500
      });
      return
    }
    if (!e.detail.value.code) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1500
      });
      return
    }
    wx.showLoading({
      title: '提交中...',
    })
	console.log(e.detail.value)
    console.log(8888)
    setTimeout(function(){
      wx.hideLoading()
      wx.navigateTo({url: '../chart/chart'})
    },1000)
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
	console.log(this.location)
	console.log(app.globalData)
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
		  console.log(res)
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
    wx.showLoading({
      title: '登陆中...',
    })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.hideLoading()
    wx.navigateTo({
      url: '../chart/chart'
    })
  }
})
