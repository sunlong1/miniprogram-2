//login.js
const util = require('../../utils/util')
const app = getApp()
Page({
  data:{
    msg: null,
    code: null,
    wxlogin: null,
    imageUrl: []
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    let that = this
    // 微信用户登陆
    wx.login({
      success: function(res) {
		console.log(res)
        if (res.code) {
          that.setData({
            code: res.code
          })
        } else {
          that.setData({
            msg: '微信登陆调用失败！',
            wxlogin: true
          })
        }
      },
      fail: function(){
        that.setData({
          msg: "微信登陆调用失败！",
          wxlogin: true
        })
      }
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  login: function(e){
    console.log(e.detail.value)
    let that = this
    let params =  e.detail.value
    params.imageUrl = that.data.imageUrl
    //loading
    wx.showLoading({
      title: '保存中...',
    })
    wx.request({
      url: 'http://wx.romeo.wang/home/login',
      data: params,
      method: 'POST', 
      header: {"content-type": "application/x-www-form-urlencoded"},
      success: function(res){
        // success
        if(res.data.err){
          that.setData({
            msg: res.data.msg
          })
        }else{
          wx.setStorageSync('userInfo', res.data.userInfo)
          app.globalData.userInfo = res.data.userInfo
          wx.navigateBack({ delta: 1 })
        }
        wx.hideLoading()
      },
      fail: function(err) {
        wx.hideLoading()
      }
    })
    util.navigateTo({
      url:"../success/success"
    })
  },
  wxlogin: function(){
    wx.getUserInfo({
      success: function(res){
        app.globalData.userInfo = {"nickname":res.userInfo.nickName, "avatar":res.userInfo.avatarUrl, "id":"weixin"}
        wx.setStorageSync('userInfo', app.globalData.userInfo)
        wx.navigateBack({ delta: 1 })
      }
    })
  },
  upLoadImage: function(){
    var that = this;
    wx.chooseImage({
      count: 9, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var uploadedImageLists = that.data.imageUrl;
        console.log(res.tempFilePaths);
        var totalImages = uploadedImageLists.concat(res.tempFilePaths);
        // for(var i = 0; i < res.tempFilePaths.length; i++) {
        //   uploadedImageLists.push(res.tempFilePaths[i]);
        // }
        var aNum = 0;
        if(totalImages.length >= 9) {
          totalImages.length = 9;
          aNum = 1;
        }
        //uploadedImageLists.concat(res.tempFilePaths);
        console.log(totalImages)
          that.setData({
            num: 0,
            addNum: aNum,
            imageUrl:totalImages
          })
      }
    })
  },
  removeImage: function(e){
    var that = this;
    var currentImageLists = that.data.imageUrl; 
    currentImageLists.splice(e.target.dataset.index,1);
    that.setData({
        imageUrl:currentImageLists
    })
    if(currentImageLists.length < 9 && currentImageLists.length >= 1) {
       that.setData({
            addNum: 0
       })
    } else if(currentImageLists.length == 0) {
       that.setData({
            addNum: 1,
            num: 1
       })
    }
  },
  preImage:function(e){
    var that = this;
    var currentImageUrl = that.data.imageUrl[e.target.dataset.index]
    wx.previewImage({
      current: currentImageUrl, // 当前显示图片的http链接
      urls: that.data.imageUrl // 需要预览的图片http链接列表
    })
  }
})